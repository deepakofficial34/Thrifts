const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const protect = require("../middlewares/authMiddleware");

const {
  createProduct,
  getProducts,getProductById,updateProduct,
  deleteProduct,getMyProducts,
} = require("../controllers/productController");

router.post(
  "/",
  protect,
  upload.single("image"),
  createProduct
);
router.get(
  "/my-products",
  protect,
  getMyProducts
);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);


module.exports = router;
