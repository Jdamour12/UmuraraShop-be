import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: "customer" | "admin";
    isActive: boolean;
    resetCode: string;
    resetCodeExpiration: Date;
}

const userSchema =  new Schema<IUser> (
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],

        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6, 
            select: false
        },
        role: {
            type: String, 
            enum: ["customer", "admin"], 
            default: "customer"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        resetCode: {
            type: String,
            default: null
    },
        resetCodeExpiration: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model<IUser>("User", userSchema);