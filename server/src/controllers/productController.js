const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
  title,
  description,
  price,
  originalPrice,
  category,
  condition,
  brand,
  location,
  productAge,
} = req.body;

let imageUrl = "";
//Fix the details validation.
if (req.file) {
  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
  );

  imageUrl = result.secure_url;
}
    
const product = await Product.create({
  title,
  description,
  price,
  originalPrice,
  category,
  condition,
  brand,
  location,
  productAge,

  images: [imageUrl],

  seller: req.user.userId,
});

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
  ? {
      title: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
  : {};

const category = req.query.category
  ? { category: req.query.category }
  : {};

  let sort = { createdAt: -1 };

if (req.query.sort === "low") {
  sort = { price: 1 };
}

if (req.query.sort === "high") {
  sort = { price: -1 };
}

if (req.query.sort === "oldest") {
  sort = { createdAt: 1 };
}

    const page = Number(req.query.page) || 1;
const limit = 6;
const skip = (page - 1) * limit;

const products = await Product.find({
  ...keyword,
  ...category,
})
.sort(sort)
.skip(skip)
.limit(limit)
.populate("seller", "name email");
const totalProducts =
  await Product.countDocuments({
    ...keyword,
    ...category,
  });

    res.status(200).json({
  success: true,
  count: products.length,
  totalProducts,
  currentPage: page,
  totalPages: Math.ceil(
    totalProducts / limit
  ),
  products,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
  req.params.id
).populate("seller", "name email");
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.userId,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
  req.params.id
);

if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found",
  });
}

if (
  product.seller.toString() !==
  req.user.userId
) {
  return res.status(403).json({
    success: false,
    message: "Not authorized",
  });
}

Object.assign(product, req.body);

if (req.file) {
  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
  );

  product.images = [result.secure_url];
}

await product.save();

res.status(200).json({
  success: true,
  product,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
  req.params.id
);

if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found",
  });
}

if (
  product.seller.toString() !==
  req.user.userId
) {
  return res.status(403).json({
    success: false,
    message: "Not authorized",
  });
}

await product.deleteOne();

res.status(200).json({
  success: true,
  message: "Product deleted",
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createProduct,getProducts,getProductById,updateProduct,
  deleteProduct,getMyProducts,

};