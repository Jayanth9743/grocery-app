import userModel from "../models/userModel.js";

const addToWishList = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let wishListData = userData.wishListData || {};

        if (!wishListData[req.body.itemId]) {
            wishListData[req.body.itemId] = true;
        }

        await userModel.findByIdAndUpdate(req.user.id, { wishListData });
        res.json({ success: true, message: "Item added to wishList" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFromWishList = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let wishListData = userData.wishListData || {};

        if (wishListData[req.body.itemId]) {
            delete wishListData[req.body.itemId];
        }

        await userModel.findByIdAndUpdate(req.user.id, { wishListData });
        res.json({ success: true, message: "Item removed from wishList" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWishListData = async (req, res) => {
    try{
        let userData  = await userModel.findById(req.user.id);
        let wishListData = userData.wishListData || {};
        res.json({ success: true, wishListData });
    }catch(error){
        res.status(500).json({ message: error.message });
}
};

export { addToWishList, removeFromWishList, getWishListData };