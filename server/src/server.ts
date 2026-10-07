import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express"
import {connectDB} from "./config/database"
import { authRouther } from "./routers/auth.router";
import { categoryRouter } from "./routers/category.router";
import { productRouter } from "./routers/product.router";
import { cartRouter } from "./routers/cart.router";
import { orderRouter } from "./routers/order.router";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

const allowedOrigins = process.env.CLIENT_ORIGIN
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use("/api/v1", authRouther);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

connectDB();

// Swagger configuration
const options = {
    definition: {
        openapi: "3.0.0",
        components: {
            securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
            },
        },
        info: {
            title: "UmuraraShop API Management",
            description: "API management for UmuraraShop.",
            version: "1.0.0",
            contact: {
                name: "Jean D Amour",
                email: "damourj77@gmail.com",
            }
        },
        servers: [
            {
                url: "http://localhost:3000/"
            },
            {
                url: "https://umurara-shop.onrender.com/"
            }
        ]
    },
    apis: ["./src/routers/*.ts"],
};

// Initialize Swagger
const swagger = swaggerJsDoc(options);

// Set up Swagger UI
app.use(
    "/api-docs", swaggerUI.serve, swaggerUI.setup(swagger) 
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});