const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect_db = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

module.exports = connect_db;
