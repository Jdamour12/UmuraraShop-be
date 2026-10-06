/**
 * @swagger
 * components:
 *      schemas:
 *        User:
 *          type: object
 *          required:
 *            - firstName
 *            - lastName
 *            - phone
 *            - email
 *            - password
 *          properties:
 *            firstName:
 *              type: string
 *              description: The first name of the user
 *            lastName:
 *              type: string
 *              description: The last name of the user
 *            email:
 *              type: string
 *              format: email
 *            phone:
 *              type: string
 *              description: The phone number of the user
 *            password:
 *              type: string
 *              format: password
 *            role:
 *              type: string
 *              enum: [customer, admin]
 *              description: Assigned by the server, defaults to "customer"
 *
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /api/v1/auth/register:
 *    post:
 *      summary: Create a new user account
 *      description: This endpoint allows you to create a new user account.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: The user account was created
 *          400:
 *              description: Names, contacts, and password are required
 *          409:
 *              description: User already exists
 *          500:
 *              description: Internal server error
 *
 * /api/v1/auth/login:
 *    post:
 *      summary: Log in to the user account
 *      description: This endpoint allows you to log in to your user account.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *      responses:
 *          200:
 *              description: The user is logged in, returns a JWT bearer token
 *          400:
 *              description: Email and password are required
 *          401:
 *              description: Invalid email or password
 *          500:
 *              description: Internal server error
 *
 * /api/v1/auth/forgot-password:
 *    post:
 *      summary: Request a password reset
 *      description: This endpoint allows you to request a password reset.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *      responses:
 *          200:
 *              description: Password reset email sent successfully
 *          400:
 *              description: Email is required
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal server error
 * /api/v1/auth/reset-password:
 *    post:
 *      summary: Reset the user password
 *      description: This endpoint allows you to reset your user password using a reset code.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - resetCode
 *                - newPassword
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                resetCode:
 *                  type: string
 *                  description: The reset code sent to the user's email
 *                newPassword:
 *                  type: string
 *                  format: password
 *      responses:
 *          200:
 *              description: Password reset successfully
 *          400:
 *              description: Email, reset code, and new password are required
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal server error
 */

import { Router } from "express";
import { createAccount, forgotPassword, login, resetPassword } from "../controllers/auth.controller";

export const authRouther = Router();

authRouther.post("/auth/register", createAccount);
authRouther.post('/auth/login', login);
authRouther.post('/auth/forgot-password', forgotPassword);
authRouther.post('/auth/reset-password', resetPassword);