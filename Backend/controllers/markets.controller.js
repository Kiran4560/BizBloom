
const Market = require("../models/market");
const User = require("../models/user");

//Creating new market
const addMarket = async (req,res)=>{
    const {title, phonenum, imageURL,address,lat,lng,description,openingTime, closingTime,profession}=req.body;
    const ownerId = req.user._id; 
    try{
        let existingMarket = await Market.findOne({title:title,profession:profession,ownerId:ownerId});
        if(existingMarket){
            console.log("This user already owns a market with same title and profession, use different title");
            res.status(422).json({error: "This user already have market with same title and profession, use different title"});
        }

    }catch(err){
        console.log(err.message);
        res.status.json({error:err.message});
    }
    
    const newMarket = new Market({
        title: title,
        phonenum: phonenum,
        imageURL: imageURL || null,
        address: address,
        location:{ lat: lat, lng: lng },
        description:description,
        rating: 0,
        reviews: [],
        openingTime: openingTime,
        closingTime: closingTime,
        profession: profession,
        ownerId: ownerId
    });
    
    
// Save the new Market
try {
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

exports.addMarket = addMarket;