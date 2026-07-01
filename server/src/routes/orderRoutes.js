const express = require("express");
const router = express.Router();

const {
  createOrder,verifyPayment,getMyPurchases,
} = require("../controllers/orderController");

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

router.post(
  "/create/:productId",
  authMiddleware,
  createOrder
);
router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);
router.get(
  "/my-purchases",
  authMiddleware,
  getMyPurchases
);

module.exports = router;