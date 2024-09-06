import groceryModel from "../models/groceryModel.js";


const addGrocery = async (req, res) => {
    const {name, description, category, price, image} =  req.body;
    try{
        const newGrocery = new groceryModel({
            name,
            description,
            category,
            price,
            image
        });
        const savedGrocery = await newGrocery.save();
    }catch(err){
        res.status(500).json({message: err.message});
}
};

const allGroceries = async (req, res) => {
    const {category, limit} = req.query;
    const query = category ? {category} : {};

    try{
        const groceries = await groceryModel.find(query)
        .limit(limit ? parseInt(limit) : 0);
        res.status(200).json(groceries);
} catch(err){
    res.status(500).json({message: err.message});
}
};

export { allGroceries, addGrocery };