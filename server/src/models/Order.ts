import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrderItem {
    product: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    deliveryAddress: string;
    status: "pending" | "delivered" | "cancelled";
    orderNumber: string;
}

const orderItemSchema = new Schema<IOrderItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        deliveryAddress: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "delivered", "cancelled"],
            default: "pending",
        },
        orderNumber: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
