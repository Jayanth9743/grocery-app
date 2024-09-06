import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';
import groceryRouter from './routes/groceryRouter.js';
import cartRouter from './routes/cartRouter.js';
import wishListRouter from './routes/wishListRouter.js';


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/users',userRouter);
app.use('/groceries',groceryRouter);
app.use("/images", express.static("images"));
app.use('/cart',cartRouter);
app.use('/wishList',wishListRouter);



//connenct db
connectDB();




app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
});