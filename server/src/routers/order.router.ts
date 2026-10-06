/**
 * @swagger
 * components:
 *   schemas:
 *      OrderItem:
 *          type: object
 *          properties:
 *              product:
 *                  type: string
 *                  description: The id of the product (or the populated product object)
 *              quantity:
 *                  type: number
 *              price:
 *                  type: number
 *                  description: The product's price at the moment the order was placed
 *      Order:
 *          type: object
 *          properties:
 *              user:
 *                  type: string
 *                  description: The id of the user who placed the order
 *              items:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/OrderItem'
 *              totalAmount:
 *                  type: number
 *              deliveryAddress:
 *                  type: string
 *                  description: Where the order should be delivered
 *              status:
 *                  type: string
 *                  enum: [pending, delivered, cancelled]
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Placing and managing orders
 * /api/v1/order:
 *     post:
 *      summary: Place an order from the logged-in user's cart
 *      tags: [Orders]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - deliveryAddress
 *                      properties:
 *                          deliveryAddress:
 *                              type: string
 *      responses:
 *          201:
 *              description: The order was placed, stock was reduced, and the cart was cleared
 *          400:
 *              description: Cart is empty, deliveryAddress is missing, or not enough stock
 *          500:
 *              description: Failed to place order
 *
 * /api/v1/orders:
 *     get:
 *      summary: Get every order from every user
 *      tags: [Orders]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: A list of all orders
 *          403:
 *              description: Admins only
 *
 * /api/v1/orders/my:
 *     get:
 *      summary: Get the logged-in user's own orders
 *      tags: [Orders]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: A list of the user's own orders
 *
 * /api/v1/order/{id}:
 *     get:
 *      summary: Get one order by id
 *      description: Admins can view any order. Customers can only view their own.
 *      tags: [Orders]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The order id
 *      responses:
 *          200:
 *              description: The requested order
 *          403:
 *              description: You can only view your own orders
 *          404:
 *              description: Order not found
 *
 * /api/v1/order/{id}/cancel:
 *     put:
 *      summary: Cancel your own order
 *      description: Only works while the order is still "pending". Restores the ordered quantities back to product stock.
 *      tags: [Orders]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The order id
 *      responses:
 *          200:
 *              description: Order cancelled
 *          400:
 *              description: Only pending orders can be cancelled
 *          403:
 *              description: You can only cancel your own orders
 *          404:
 *              description: Order not found
 *
 * /api/v1/order/{id}/status:
 *     put:
 *      summary: Update an order's status
 *      description: Setting status to "cancelled" restores the ordered quantities back to product stock.
 *      tags: [Orders]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The order id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - status
 *                      properties:
 *                          status:
 *                              type: string
 *                              enum: [pending, delivered, cancelled]
 *      responses:
 *          200:
 *              description: Order status updated
 *          400:
 *              description: Invalid status value
 *          403:
 *              description: Admins only
 *          404:
 *              description: Order not found
 */

import { Router } from "express";
import {
    placeOrder,
    getAllOrders,
    getMyOrders,
    getOrderById,
    cancelMyOrder,
    updateOrderStatus,
} from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

export const orderRouter = Router();

orderRouter.post("/order", authMiddleware, placeOrder);
orderRouter.get("/orders", authMiddleware, isAdmin, getAllOrders);
orderRouter.get("/orders/my", authMiddleware, getMyOrders);
orderRouter.get("/order/:id", authMiddleware, getOrderById);
orderRouter.put("/order/:id/cancel", authMiddleware, cancelMyOrder);
orderRouter.put("/order/:id/status", authMiddleware, isAdmin, updateOrderStatus);
