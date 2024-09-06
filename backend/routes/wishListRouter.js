import express from "express";
import { getWishListData, addToWishList, removeFromWishList } from "../controllers/wishListController.js";
import authMiddleware from "../middlewares/auth.js";

const wishListRouter = express.Router();

wishListRouter.post("/add",authMiddleware, addToWishList);
wishListRouter.post("/remove",authMiddleware, removeFromWishList);
wishListRouter.get("/",authMiddleware, getWishListData);

export default wishListRouter;