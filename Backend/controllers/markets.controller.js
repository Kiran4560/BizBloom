const Market = require("../models/market");
const User = require("../models/user");
const Profession = require("../models/professions");
//****************************************************************ADD-MARKET FUNTION***********************************************************************************

//calculate distance between two points
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
//Creating new market

const addMarket = async (req, res) => {
  const {
    title,
    phonenum,
    imageURL,
    address,
    lat,
    lng,
    description,
    openingTime,
    closingTime,
    profession,
  } = req.body;
  const ownerId = req.user._id;

  try {
    let existingMarket = await Market.findOne({
      title: title,
      profession: profession,
      ownerId: ownerId,
    });
    if (existingMarket) {
      console.log(
        "This user already owns a market with same title and profession, use different title"
      );
      return res.status(422).json({
        error:
          "This user already owns a market with the same title and profession, use a different title",
      });
    }

    const newMarket = new Market({
      title: title,
      phonenum: phonenum,
      imageURL: imageURL || null,
      address: address,
      location: { lat: lat, lng: lng },
      description: description,
      rating: 0,
      reviews: [],
      openingTime: openingTime,
      closingTime: closingTime,
      profession: profession,
      ownerId: ownerId,
    });

    await newMarket.save();
    console.log("New Market added");
    console.log(newMarket);

    // Update user's market field
    await User.updateOne(
      { _id: ownerId },
      { $push: { markets: newMarket._id } }
    );
  
    // Fetch updated user
    const user = await User.findOne({ _id: ownerId });
  
    //Add to profession db
     const existingProfession = await Profession.find({profession:profession});
     if(!existingProfession){
    const newProfession = new Profession({
      profession:profession
    });
    await newProfession.save();
  }

    return res.status(201).json({ market: newMarket, user: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

//****************************************************************DELETE-MARKET FUNCTION***********************************************************************************

// Deleting a market
const deleteMarket = async (req, res) => {
    const { marketId } = req.params;
    const ownerId = req.user._id;
  
    try {
      // Find the market to ensure it exists and belongs to the user
      const market = await Market.findOne({ _id: marketId, ownerId: ownerId });
  
      if (!market) {
        console.log("Market not found or user not authorized");
        return res.status(404).json({ error: "Market not found or user not authorized" });
      }
  
      // Delete the market
      await Market.deleteOne({ _id: marketId });
  
      // Remove the market ID from the user's markets array and favourites array
      await User.updateOne({ _id: ownerId }, { 
        $pull: { 
          markets: marketId,
          favourites: marketId,
        },
      }
    );

    // Fetch updated user
    const user = await User.findOne({ _id: ownerId });

    console.log("Market deleted");
    return res.status(200).json({ message: "Market deleted successfully", user: user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

//****************************************************************UPDATE-MARKET FUNCTION***********************************************************************************

// Updating a market
const updateMarket = async (req, res) => {
  const { marketId } = req.params;
  const ownerId = req.user._id; // Ensure user ID is available in req.user

  // Find the market to ensure it exists and belongs to the user
  const market = await Market.findOne({ _id: marketId });

  if (!market) {
    console.log("Market not found");
    return res.status(404).json({ error: "Market not found" });
  }

  // Check if the ownerId of the market matches the authenticated user's ID
  if (market.ownerId.toString() !== ownerId) {
    console.log("User not authorized to update this market");
    return res.status(403).json({ error: "User not authorized to update this market" });
  }

  // Extract the fields from the request body
  const updatedFields = req.body;

  // Update the market with the updatedFields
  try {
    await Market.updateOne({ _id: marketId }, { $set: updatedFields });

    // Fetch the updated market
    const updatedMarket = await Market.findOne({ _id: marketId });

    console.log("Market updated Successfully", updatedMarket);

    return res.status(200).json({ message: "Market updated successfully", market: updatedMarket });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

//****************************************************************GET-All-MARKET FUNCTION***********************************************************************************

const getAllMarket = async (req, res) => {

  // Get search, filter, and sort queries

  const search = req.query.search || "";
  const profession = req.query.profession || "";

  //sort on basis of rating
  const rating = req.query.rating || "";

  //sort on basis of distance
  const userLat = parseFloat(req.query.lat); // User's latitude
  const userLng = parseFloat(req.query.lng); // User's longitude

  // Build query object
  const query = {
    title: { $regex: search, $options: "i" }
  };

  // If profession filter is not empty
  if (profession !== "") {
    query.profession = profession;
  }

  let sortOption = {};
  //if sort is present sort in descending order
  if (rating !== "") {
    sortOption[rating] = -1; 
  }

  try {
    // Get all markets
    let allMarkets = await Market.find(query).sort(sortOption);


    // Check if there are no markets
    if (allMarkets.length === 0) {
      console.log("No market found");
      return res.status(200).json({ message: "No market found" });
    }

    // Calculate distance for each market and add it to the market object
    if(!isNaN(userLat) && !isNaN(userLng)){
       allMarkets = allMarkets.map((market)=>{
        const distance = calculateDistance(
          userLat,
          userLng,
          market.location.lat,
          market.location.lng
        );
        return {...market._doc, distance};
       });
    }

     // Sort markets based on distance
     allMarkets.sort((a, b) => a.distance - b.distance);
       
    console.log("All markets found successfully", allMarkets);
    return res.status(200).json({ markets: allMarkets });
  } catch (err) {
    console.error("Error fetching markets:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserMarket = async(req,res)=>{
    try {
         const ownerId = req.user._id;
         let allMarkets;

        try{
         // Get all Markets of user
         allMarkets = await Market.find({ownerId:ownerId}).sort({rating:-1});
         console.log("User market data fetched successfully");
        }catch(err){
            console.error(err.message);
           return res.status(500).json({ error: "Error while fetching the data" });
        }
    
        // Check if there are no markets under this user
        if (allMarkets.length === 0) {
          console.log("User don't have any market registered yet");
          return res.status(200).json({ message: "User don't have any market registered yet" });
        }
           
        console.log("User markets found successfully", allMarkets);
        return res.status(200).json({ Usermarkets: allMarkets });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
};
/*======================================filter market===========================================*/

exports.addMarket = addMarket;
exports.deleteMarket = deleteMarket;
exports.updateMarket = updateMarket;
exports.getAllMarket = getAllMarket;
exports.getUserMarket =  getUserMarket;
