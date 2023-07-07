const Product = require("../models/Product");

const newProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(400).json({ message: `Product not found` });
    }

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(400).json({ message: `Product not found` });
    }

    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const getProduct = await Product.findById(id);

    if (!getProduct) {
      return res.status(400).json({ message: `Product not found` });
    }

    res.status(200).json(getProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { recent, category, homeProduct } = req.query;

    let products;

    if (recent) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (category) {
      products = await Product.find({
        categories: {
          $in: [category],
        },
      });
    } else if (homeProduct) {
      products = await Product.find().sort({ createdAt: -1 }).limit(8);
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
