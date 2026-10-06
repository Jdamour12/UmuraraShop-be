import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import cloudinary from "../config/cloudinary";

const uploadToCloudinary = (buffer: Buffer): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "products",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(buffer);
    });
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate("category");
        return res.status(200).json({ message: "Products Retrieved Successfully.", products });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve products!" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");

        if (!product) {
            return res.status(404).json({ message: "Product Not Found!" });
        }

        return res.status(200).json({ message: "Product Retrieved!", product });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve product!" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "Name, description, price, and category are required!" });
        }

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({ message: "Invalid category!" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required!" });
        }

        const uploadResult = await uploadToCloudinary(req.file.buffer);

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            imageUrl: uploadResult.secure_url,
            imagePublicId: uploadResult.public_id,
        });

        return res.status(201).json({ message: "Product Created!", product });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create product!" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category, isActive } = req.body;

        if (category) {
            const categoryExists = await Category.findById(category);

            if (!categoryExists) {
                return res.status(400).json({ message: "Invalid category!" });
            }
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found!" });
        }

        const updates: any = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (price !== undefined) updates.price = price;
        if (stock !== undefined) updates.stock = stock;
        if (category !== undefined) updates.category = category;
        if (isActive !== undefined) updates.isActive = isActive;

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer);
            await cloudinary.uploader.destroy(product.imagePublicId);
            updates.imageUrl = uploadResult.secure_url;
            updates.imagePublicId = uploadResult.public_id;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({ message: "Product Updated!", product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update product!" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found!" });
        }

        await cloudinary.uploader.destroy(product.imagePublicId);

        return res.status(200).json({ message: "Product Deleted Successfully!", product });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete product!" });
    }
};
