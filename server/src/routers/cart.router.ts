/**
 * @swagger
 * components:
 *   schemas:
 *      CartItem:
 *          type: object
 *          properties:
 *              product:
 *                  type: string
 *                  description: The id of the product (or the populated product object)
 *              quantity:
 *                  type: number
 *                  description: How many units of this product are in the cart
 *      Cart:
 *          type: object
 *          properties:
 *              user:
 *                  type: string
 *                  description: The id of the user this cart belongs to
 *              items:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/CartItem'
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The logged-in user's shopping cart API
 * /api/v1/cart:
 *     get:
 *      summary: Get the logged-in user's cart
 *      tags: [Cart]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: The user's cart
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cart'
 *          401:
 *              description: Not authenticated
 *
 *     post:
 *      summary: Add a product to the cart
 *      description: Adds a product to the cart, or increases its quantity if it's already there.
 *      tags: [Cart]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - productId
 *                      properties:
 *                          productId:
 *                              type: string
 *                          quantity:
 *                              type: number
 *      responses:
 *          200:
 *              description: Item added to cart
 *          400:
 *              description: productId is required
 *          404:
 *              description: Product not found
 *          500:
 *              description: Failed to add item to cart
 *
 * /api/v1/cart/item/{productId}:
 *     put:
 *      summary: Update the quantity of one item in the cart
 *      tags: [Cart]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: productId
 *            schema:
 *              type: string
 *            required: true
 *            description: The product id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - quantity
 *                      properties:
 *                          quantity:
 *                              type: number
 *      responses:
 *          200:
 *              description: Cart item updated
 *          400:
 *              description: A valid quantity is required
 *          404:
 *              description: Cart not found or item not in cart
 *          500:
 *              description: Failed to update cart item
 *
 *     delete:
 *      summary: Remove one item from the cart
 *      tags: [Cart]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: productId
 *            schema:
 *              type: string
 *            required: true
 *            description: The product id
 *      responses:
 *          200:
 *              description: Item removed from cart
 *          404:
 *              description: Cart not found
 *          500:
 *              description: Failed to remove cart item
 */

import { Router } from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const cartRouter = Router();

cartRouter.get("/cart", authMiddleware, getCart);
cartRouter.post("/cart", authMiddleware, addToCart);
cartRouter.put("/cart/item/:productId", authMiddleware, updateCartItem);
cartRouter.delete("/cart/item/:productId", authMiddleware, removeCartItem);
