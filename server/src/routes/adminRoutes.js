const express = require("express");
const router = express.Router();
const adminMiddleware = require(
  "../middlewares/adminMiddleware"
);

const {
  getDashboardStats,
} = require("../controllers/adminController");

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);

module.exports = router;