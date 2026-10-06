import mongoose = require("mongoose");

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Failed to connect to the database!", error);
        process.exit();
    }
}