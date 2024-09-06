import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/user',authMiddleware, getUser)

export default userRouter;