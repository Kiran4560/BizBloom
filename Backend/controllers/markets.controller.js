
const Market = require("../models/market");
const User = require("../models/user");

//****************************************************************ADD-MARKET FUNTION***********************************************************************************
                                                
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
      profession
    } = req.body;
    const ownerId = req.user._id;
  
    try {
      let existingMarket = await Market.findOne({ title: title, profession: profession, ownerId: ownerId });
      if (existingMarket) {
        console.log("This user already owns a market with same title and profession, use different title");
        return res.status(422).json({ error: "This user already owns a market with the same title and profession, use a different title" });
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
        ownerId: ownerId
      });
  
      await newMarket.save();
      console.log("New Market added");
      console.log(newMarket);
  
      // Update user's market field
      await User.updateOne({ _id: ownerId }, { $push: { markets: newMarket._id } });
  
      // Fetch updated user
      const user = await User.findOne({ _id: ownerId });
  
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
          favourites: marketId
        }
      });
  
      // Fetch updated user
      const user = await User.findOne({ _id: ownerId });
  
      console.log("Market deleted");
      return res.status(200).json({ message: "Market deleted successfully", user: user });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
  };
  
  exports.addMarket = addMarket;
  exports.deleteMarket = deleteMarket;
