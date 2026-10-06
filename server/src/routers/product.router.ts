/**
 * @swagger
 * components:
 *   schemas:
 *      Product:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the product
 *              description:
 *                  type: string
 *                  description: The description of the product
 *              price:
 *                  type: number
 *                  description: The price of the product
 *              stock:
 *                  type: number
 *                  description: How many units are in stock
 *              category:
 *                  type: string
 *                  description: The id of the category this product belongs to
 *              imageUrl:
 *                  type: string
 *                  description: The image URL of the product (set by the server)
 *              imagePublicId:
 *                  type: string
 *                  description: The Cloudinary public id of the image (set by the server)
 *              isActive:
 *                  type: boolean
 *                  description: Whether the product is visible in the shop
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * /api/v1/products:
 *     get:
 *      summary: Get the list of all the products
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: A list of products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *
 *     post:
 *      summary: Create a new product
 *      description: This endpoint allows an admin to create a new product with an image.
 *      tags: [Products]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - description
 *                          - price
 *                          - category
 *                          - image
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: number
 *                          stock:
 *                              type: number
 *                          category:
 *                              type: string
 *                              description: Category id
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          201:
 *              description: The product was created
 *          400:
 *              description: Missing required fields, invalid category, or missing image
 *          403:
 *              description: Admins only
 *          500:
 *              description: Failed to create product
 *
 * /api/v1/product/{id}:
 *     get:
 *      summary: Get a product by ID
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The product ID
 *      responses:
 *          200:
 *              description: The requested product
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *
 *     put:
 *        summary: Update a product by ID
 *        tags: [Products]
 *        security:
 *            - bearerAuth: []
 *        parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: The product id
 *        requestBody:
 *          required: false
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: number
 *                          stock:
 *                              type: number
 *                          category:
 *                              type: string
 *                          isActive:
 *                              type: boolean
 *                          image:
 *                              type: string
 *                              format: binary
 *        responses:
 *            200:
 *                description: The updated product
 *            400:
 *                description: Invalid category
 *            403:
 *                description: Admins only
 *            404:
 *                description: Product not found
 *            500:
 *                description: Failed to update product
 *
 *     delete:
 *          summary: Remove a product by id
 *          tags: [Products]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: The product id
 *          responses:
 *              200:
 *                  description: The product was deleted
 *              403:
 *                  description: Admins only
 *              404:
 *                  description: Product not found
 */

import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { upload } from "../middlewares/upload.middleware";

export const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/product/:id", getProductById);
productRouter.post("/products", authMiddleware, isAdmin, upload.single("image"), createProduct);
productRouter.put("/product/:id", authMiddleware, isAdmin, upload.single("image"), updateProduct);
productRouter.delete("/product/:id", authMiddleware, isAdmin, deleteProduct);
