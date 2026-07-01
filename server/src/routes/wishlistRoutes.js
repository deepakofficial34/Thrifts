const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const protect =
  require("../middlewares/authMiddleware");

router.post(
  "/:productId",
  protect,
  addToWishlist
);

router.get(
  "/",
  protect,
  getWishlist
);

router.delete(
  "/:productId",
  protect,
  removeFromWishlist
);

module.exports = router;