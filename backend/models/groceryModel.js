import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
})

const groceryModel = mongoose.model.grocery || mongoose.model("grocery", grocerySchema);
export default groceryModel;