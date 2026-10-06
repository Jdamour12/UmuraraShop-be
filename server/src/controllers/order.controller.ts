import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { sendOrderReceivedEmail } from "../services/emailService";

// turn the logged-in user's cart into a real order
export const placeOrder = async (req: Request, res: Response) => {
    try {
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const userId = (req as any).user.userId;
        const { deliveryAddress } = req.body || {};

        if (!deliveryAddress) {
            return res.status(400).json({ message: "deliveryAddress is required!" });
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty!" });
        }

        const user = await User.findById(userId).select("email firstName");

        if (!user) {
            return res.status(401).json({ message: "Authenticated user not found!" });
        }

        // make sure every item still has enough stock before placing the order
        for (const item of cart.items) {
            const product = item.product as any;
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}!` });
            }
        }

        let totalAmount = 0;

        const orderItems = cart.items.map((item) => {
            const product = item.product as any;
            const price = product.price;
            totalAmount += price * item.quantity;

            return {
                product: product._id,
                quantity: item.quantity,
                price,
            };
        });

        await sendOrderReceivedEmail(user.email, user.firstName, orderNumber);

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount,
            deliveryAddress,
            orderNumber,
        });

        // reduce stock for every product that was just ordered
        for (const item of cart.items) {
            const product = await Product.findById((item.product as any)._id);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        // checkout is done — empty the cart
        cart.items = [];
        await cart.save();

        return res.status(201).json({ message: "Order Placed!", order });
    } catch (error) {
        return res.status(500).json({ message: "Failed to place order!" });
    }
};

// admin only, every order from every user
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate("items.product").populate("user", "firstName lastName email");
        return res.status(200).json({ message: "Orders Retrieved Successfully.", orders });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve orders!" });
    }
};

// the logged-in user's own orders
export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const orders = await Order.find({ user: userId }).populate("items.product");

        return res.status(200).json({ message: "Orders Retrieved Successfully.", orders });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve orders!" });
    }
};

// one order; admins can view any, customers only their own
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { userId, role } = (req as any).user;

        const order = await Order.findById(req.params.id).populate("items.product");

        if (!order) {
            return res.status(404).json({ message: "Order Not Found!" });
        }

        if (role !== "admin" && order.user.toString() !== userId) {
            return res.status(403).json({ message: "You can only view your own orders!" });
        }

        return res.status(200).json({ message: "Order Retrieved!", order });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve order!" });
    }
};

// the logged-in user cancels their own order, only while it's still pending
export const cancelMyOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order Not Found!" });
        }

        if (order.user.toString() !== userId) {
            return res.status(403).json({ message: "You can only cancel your own orders!" });
        }

        if (order.status !== "pending") {
            return res.status(400).json({ message: "Only pending orders can be cancelled!" });
        }

        // restore stock since this order never shipped
        for (const item of order.items) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.status = "cancelled";
        await order.save();

        return res.status(200).json({ message: "Order Cancelled!", order });
    } catch (error) {
        return res.status(500).json({ message: "Failed to cancel order!" });
    }
};

// admin only, move an order to its next status
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        if (!["pending", "delivered", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Status must be pending, delivered, or cancelled!" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order Not Found!" });
        }

        if (order.status === "cancelled") {
            return res.status(400).json({ message: "This order is already cancelled and cannot be updated!" });
        }

        // restore stock if the order is being cancelled
        if (status === "cancelled") {
            for (const item of order.items) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order Status Updated!", order });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update order status!" });
    }
};
