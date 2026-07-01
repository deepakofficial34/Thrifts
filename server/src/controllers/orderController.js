const razorpay = require("../config/razorpay");
const Product = require("../models/Product");
const Order = require("../models/Order");
const crypto = require("crypto");

// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const options = {
      amount: product.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder =
      await razorpay.orders.create(options);

    const order = await Order.create({
      buyer: req.user.userId,
      seller: product.seller,
      product: product._id,
      amount: product.price,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      order,
      razorpayOrder,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await Order.findByIdAndUpdate(
      orderId,
      {
        status: "paid",
        paymentId: razorpay_payment_id,
      }
    );

    const order =
      await Order.findById(orderId);

    await Product.findByIdAndUpdate(
      order.product,
      {
        status: "sold",
      }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyPurchases = async (
  req,
  res
) => {
  try {

    const orders =
      await Order.find({
        buyer: req.user.userId,
        status: "paid",
      })
        .populate("product")
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,getMyPurchases,
};