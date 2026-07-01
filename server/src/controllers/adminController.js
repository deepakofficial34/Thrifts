const User = require("../models/UserModel");
const Product = require("../models/Product");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const soldProducts =
      await Product.countDocuments({
        status: "sold",
      });

    const availableProducts =
      await Product.countDocuments({
        status: "available",
      });

    const products = await Product.find({});

products.forEach((p) => {
  console.log(
    p.title,
    "|",
    JSON.stringify(p.status)
  );
});

    console.log(products);
      console.log(
  "Total:",
  totalProducts
);

console.log(
  "Sold:",
  soldProducts
);

console.log(
  "Available:",
  availableProducts
);
    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      soldProducts,
      availableProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};