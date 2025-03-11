import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongoDbURL = process.env.MONGO_DB_URI as string

export default (async () => {
	try {
		await mongoose.connect(mongoDbURL)
		console.log("MongoDB Connected!")
	} catch (e) {
		console.log(`Error >>> ${e}`)
		process.exit(1)
	}
})();