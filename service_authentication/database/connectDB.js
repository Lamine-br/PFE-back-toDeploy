const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		const DB_URL = `mongodb+srv://jlbrahami:${process.env.DB_PASSWORD}@cluster-interim.mpjwcii.mongodb.net/interim`;

		await mongoose.connect(DB_URL);

		console.log("Connected to MongoDB!");
	} catch (error) {
		console.error("Connection to MongoDB failed:", error);
	}
};

module.exports = connectDB;
