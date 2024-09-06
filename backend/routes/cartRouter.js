import express from "express";
import { getCartData, addToCart, removeFromCart, deleteItemFromCart, clearCart  } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.get("/",authMiddleware, getCartData);
cartRouter.post("/removeItem",authMiddleware, deleteItemFromCart);
cartRouter.post("/empty",authMiddleware, clearCart);

export default cartRouter;