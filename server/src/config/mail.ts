// import nodemailer from "nodemailer";
import {Resend} from "resend";
import dotenv from "dotenv"

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

// export const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: process.env.EMAIL_PORT,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });