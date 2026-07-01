const express = require("express");
const router = express.Router();
const authMiddleware = require(
  "../middlewares/authMiddleware"
);

const {
  registerUser,
  loginUser,
  forgotPassword, resetPassword, getProfile,  getProfileStats,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPassword
); 
router.get(
  "/profile",
  authMiddleware,
  getProfile
);
router.get(
  "/profile-stats",
  authMiddleware,
  getProfileStats
);

module.exports = router;