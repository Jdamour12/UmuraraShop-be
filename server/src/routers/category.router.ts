/**
 * @swagger
 * components:
 *   schemas:
 *      Category:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the category
 *              description:
 *                  type: string
 *                  description: A short description of the category
 *              isActive:
 *                  type: boolean
 *                  description: Whether the category is active
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The category managing API
 * /api/v1/categories:
 *     get:
 *      summary: Get the list of all categories
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: A list of categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Category'
 *
 * /api/v1/category:
 *     post:
 *      summary: Create a new category
 *      description: This endpoint allows an admin to create a new category.
 *      tags: [Categories]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          201:
 *              description: The category was created
 *          400:
 *              description: Category name is required
 *          403:
 *              description: Admins only
 *          409:
 *              description: Category already exists
 *          500:
 *              description: Failed to create category
 *
 * /api/v1/category/{id}:
 *     get:
 *      summary: Get a category by ID
 *      tags: [Categories]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The category ID
 *      responses:
 *          200:
 *              description: The requested category
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          404:
 *              description: Category not found
 *
 *     put:
 *        summary: Update a category by ID
 *        tags: [Categories]
 *        security:
 *            - bearerAuth: []
 *        parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: The category id
 *        requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *        responses:
 *            200:
 *                description: The updated category
 *            403:
 *                description: Admins only
 *            404:
 *                description: Category not found
 *            409:
 *                description: Category name already in use
 *            500:
 *                description: Failed to update category
 *
 *     delete:
 *          summary: Remove a category by id
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: The category id
 *          responses:
 *              200:
 *                  description: The category was deleted
 *              403:
 *                  description: Admins only
 *              404:
 *                  description: Category not found
 */

import { Router } from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

export const categoryRouter = Router();

categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.post("/category", authMiddleware, isAdmin, createCategory);
categoryRouter.put("/category/:id", authMiddleware, isAdmin, updateCategory);
categoryRouter.delete("/category/:id", authMiddleware, isAdmin, deleteCategory);
