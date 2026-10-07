import mongoose = require("mongoose");

export const connectDB = async () => {
    try {
        const databaseUrl = process.env.DB_URL;

        if (!databaseUrl) {
            throw new Error("DB_URL is not configured");
        }

        await mongoose.connect(databaseUrl);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Failed to connect to the database!", error);
    }
}