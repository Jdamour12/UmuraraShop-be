import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const clounaryName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!clounaryName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration is missing in the environment variables.");
}

cloudinary.config({
    cloud_name: clounaryName,
    api_key: apiKey,
    api_secret: apiSecret,
});

export default cloudinary;