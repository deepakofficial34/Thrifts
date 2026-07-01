const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/UserModel");
const testRoutes = require("./routes/testRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminRoutes =
  require("./routes/adminRoutes");
const orderRoutes = require(
  "./routes/orderRoutes"
);
const app = express();
const passport = require("passport");
require("./config/passport");

const googleAuthRoutes = require("./routes/googleAuthRoutes");
app.use("/api/test", testRoutes);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", googleAuthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use(
  "/api/admin",
  adminRoutes
);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Thrifts API is running",
  });
});

const PORT = process.env.PORT || 8000;

connectDB();

console.log(User.modelName);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});