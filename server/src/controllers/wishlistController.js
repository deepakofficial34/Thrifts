const Wishlist = require("../models/Wishlist");

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const existingWishlist =
      await Wishlist.findOne({
        user: req.user.userId,
        product: req.params.productId,
      });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message:
          "Product already in wishlist",
      });
    }

    const wishlist =
      await Wishlist.create({
        user: req.user.userId,
        product: req.params.productId,
      });

    res.status(201).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist =
      await Wishlist.find({
        user: req.user.userId,
      }).populate("product");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove from wishlist
const removeFromWishlist =
  async (req, res) => {
    try {
      await Wishlist.findOneAndDelete({
        user: req.user.userId,
        product: req.params.productId,
      });

      res.status(200).json({
        success: true,
        message:
          "Removed from wishlist",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};