import { Request, Response } from "express";
import { Category } from "../models/Category";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ message: "Categories Retrieved Successfully.", categories });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve categories!" });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category Not Found!" });
        }

        return res.status(200).json({ message: "Category Retrieved!", category });
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve category!" });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required!" });
        }

        const existingCategory = await Category.findOne({ name: name.trim() });

        if (existingCategory) {
            return res.status(409).json({ message: "Category already exists!" });
        }

        const category = await Category.create({ name, description });

        return res.status(201).json({ message: "Category Created!", category });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create category!" });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name, description, isActive } = req.body;

        if (name) {
            const existingCategory = await Category.findOne({ name: name.trim() });

            if (existingCategory && existingCategory._id.toString() !== req.params.id) {
                return res.status(409).json({ message: "Category name already in use!" });
            }
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, isActive },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category Not Found!" });
        }

        return res.status(200).json({ message: "Category Updated!", category });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update category!" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category Not Found!" });
        }

        return res.status(200).json({ message: "Category Deleted Successfully!", category });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete category!" });
    }
};
