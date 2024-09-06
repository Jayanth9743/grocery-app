import userModel from "../models/userModel.js";

// Controller to get cart data
export const getCartData = async (req, res) => {
  try {
    const userData = await userModel.findById(req.user.id);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, cart: userData.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};

// Controller to add item to cart
export const addToCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.user.id);
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
      const newQuantity = req.body.quantity || 1; // Expect quantity from frontend
  
      cartData[req.body.itemId] = newQuantity;
  
      await userModel.findByIdAndUpdate(req.user.id, { cartData });
  
      res.json({ success: true, message: "Cart updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating cart" });
    }
  };
  

// Controller to remove item from cart
export const removeFromCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.user.id);
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
  
      if (cartData[req.body.itemId]) {
        if (req.body.quantity > 0) {
          cartData[req.body.itemId] = req.body.quantity; 
        } else {
          delete cartData[req.body.itemId];
        }
      } else {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
      }
  
      await userModel.findByIdAndUpdate(req.user.id, { cartData });
  
      res.json({ success: true, message: "Cart updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating cart" });
    }
  };
  

 // Completely delete an item from the cart
export const deleteItemFromCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.user.id);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
  
      if (!cartData[req.body.itemId]) {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
      }
  
      delete cartData[req.body.itemId];
  
      await userModel.findByIdAndUpdate(req.user.id, { cartData });
  
      res.json({ success: true, message: "Item deleted from cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error deleting item from cart" });
    }
  };
  

  //completely clear the cart
export const clearCart = async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });
        res.json({ success: true, message: "Cart cleared" });
    }   catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error clearing cart" });
    }
    };
  