import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    imagePublicId: string;
    category: Types.ObjectId;
    isActive: boolean;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },
        imagePublicId: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
