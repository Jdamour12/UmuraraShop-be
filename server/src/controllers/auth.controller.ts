import {User} from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {Request, Response} from "express";
import { sendWelcomeEmail, sendResetEmail } from "../services/emailService";

export const createAccount = async (req:Request, res:Response) =>{
    try {
        const {firstName, lastName, phone, email, password} = req.body;

    if(!firstName || !lastName || !email || !phone || !password) {
        return res.status(400).json({message: "Names, contacts, and password are required!"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(409).json({message: "User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword
    });

    let welcomeEmailSent = true;

    try {
        await sendWelcomeEmail(email, firstName);
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }

    return res.status(201).json({
        message: "User registered successfully",
        welcomeEmailSent,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
        },
    });

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Email and Password Required!"});
        }

        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return res.status(401).json({message: "Invalid email or password!"});
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword) {
            return res.status(401).json({message: "Invalid email or password!"});
        }

        const token = jwt.sign(
            {
                userId:user._id,
                role: user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Uswer Logged In Successfully.",
            token,
            user: {
                id: user._id,
                names: user.firstName +" "+ user.lastName,
                email: user.email,
                role: user.role,
            },
    });
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const forgotPassword = async (req:Request, res:Response) => {
    try {
        const {email} = req.body;

        if(!email) {
            return res.status(400).json({message: "Email is required!"});
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found!"});
        }

        const resetCode = crypto.randomInt(100000, 1000000).toString();
        const resetCodeExpiration = new Date();
        resetCodeExpiration.setHours(resetCodeExpiration.getHours() + 1); // 1 hour

        user.resetCode = resetCode;
        user.resetCodeExpiration = resetCodeExpiration;
        await user.save();

        await sendResetEmail(email, user.firstName, resetCode);

        return res.status(200).json({message: "Password reset email sent successfully!"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const resetPassword = async (req:Request, res:Response) => {
    try {
        const {email, resetCode, newPassword} = req.body;
        if(!email || !resetCode || !newPassword) {
            return res.status(400).json({message: "Email, reset code, and new password are required!"});
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found!"});
        }

        if(user.resetCode !== resetCode) {
            return res.status(400).json({message: "Invalid reset code!"});
        }

        if(user.resetCodeExpiration < new Date() ) {
            return res.status(400).json({message: "Reset code has expired!"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetCode = resetCode;
        user.resetCodeExpiration = new Date();
        await user.save();

        await sendResetEmail(email, user.firstName, "Your password has been reset successfully.");

        return res.status(200).json({message: "Password reset successfully!"});
    }catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}