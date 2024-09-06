import express from "express";
import { allGroceries, addGrocery } from "../controllers/groceryController.js";

const groceryRouter = express.Router();

groceryRouter.get('/',allGroceries);
groceryRouter.post('/addGroceries', addGrocery);

export default groceryRouter;