import { CartModel } from "../../model/cart.model.js";


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;  
    // Check if the product is already in the cart for the current user
    const productAvailable = await CartModel.findOne({ productId, userId: currentUser });

    if (productAvailable) {
      return res.status(200).json({
        success: false,
        message: "This product is already in the cart.",
      });
    }

    const payLoad = {
      userId: currentUser,
      productId: productId,
      quantity: 1, 
    };

    const newProduct = new CartModel(payLoad);
    const savedProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully to the cart.",
      data: savedProduct,
    });

  } catch (error) {
    console.error("Error adding to cart: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred, please check your information.",
      error: error.message,  // Log the specific error message for debugging
    });
  }
}




export const getCart = async (req, res) => {
  const userId = req.userId; // Ensure this is set correctly by the authMiddleware
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is missing or invalid.",
    });
  }

  try {
    // Find all items in the cart for the given user, populate product details
    const cartData = await CartModel.find({ userId }).populate("productId");

    if (!cartData || cartData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found in the cart.",
      });
    }

    // Count the number of items in the cart
    const count = await CartModel.countDocuments({ userId });

    res.status(200).json({
      success: true,
      data: cartData,
      count,
      message: "All items in the cart fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching cart items.",
      error: error.message, // Send specific error message for debugging
    });
  }
};


export const updateQuantity = async (req, res) => {
  try {
const productId=req.body.productId
const quantity=req.body.quantity
  console.log("quantity",quantity)

   
    const updateCart = await CartModel.updateOne(
      { _id: productId},
      { ...(quantity&&{quantity}) }
    )

    console.log("updateCart",updateCart)
    if (!updateCart) {
      return res.status(404).json({
        message: "Cart item not found.",
        success: false,
      });
    }

    res.status(200).json({
      message: "Quantity updated successfully.",
      success: true,
      data: updateCart,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const deleteProduct = async (req,res) => {
  try {
    const {productId}=req.body
    console.log("productId",productId)
    const product = await CartModel.findById(productId);
      
      // Check if the product was found
      if (!product) {
          return { success: false, message: "Product not found." };
      }

      // If found, delete the product
      await CartModel.findByIdAndDelete(productId);
      return  res.status(200).json({ success: true, message: "Product successfully deleted." });
  } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An error occurred while deleting the product." };
  }
};

export const deleteAllCartItems = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is available in req.userId

    // Delete all items in the cart for the user
    await CartModel.deleteMany({ userId });

    res.status(200).json({ message: 'All cart items deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete cart items', error: error.message });
  }
};


