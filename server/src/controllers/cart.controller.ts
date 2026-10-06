import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

// the logged-in user's cart
export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            // No cart yet is normal — not an error, just an empty cart
            return res.status(200).json({ message: "Cart is empty", cart: { items: [] } });
        }

        return res.status(200).json({ message: "Cart Retrieved!", cart });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve cart!" });
    }
};

// add a product to the cart (or increase its quantity if already there)
export const addToCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "productId is required!" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found!" });
        }

        const qty = quantity || 1;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // create their cart now
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: qty }],
            });
        } else {
            // check if this product is already in it
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += qty;
            } else {
                cart.items.push({ product: productId, quantity: qty });
            }

            await cart.save();
        }

        return res.status(200).json({ message: "Item added to cart!", cart });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add item to cart!" });
    }
};

// change the quantity of one item already in the cart
export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "A valid quantity is required!" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found!" });
        }

        const item = cart.items.find((item) => item.product.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Item Not In Cart!" });
        }

        item.quantity = quantity;
        await cart.save();

        return res.status(200).json({ message: "Cart Item Updated!", cart });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update cart item!" });
    }
};

// remove one item from the cart
export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found!" });
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();

        return res.status(200).json({ message: "Item Removed From Cart!", cart });
    } catch (error) {
        return res.status(500).json({ message: "Failed to remove cart item!" });
    }
};
