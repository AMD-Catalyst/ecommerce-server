const Cart = require("../models/Cart");

const newCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    const savedCart = await await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;

    const updateCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateCart) {
      return res.status(400).json({ message: `Cart not found` });
    }

    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCart = await Cart.findByIdAndDelete(id);

    if (!deleteCart) {
      return res.status(400).json({ message: `Cart not found` });
    }

    res.status(200).json(deleteCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    const getCart = await Cart.findOne({ userId: id });

    if (!getCart) {
      return res.status(400).json({ message: `Cart not found` });
    }

    res.status(200).json(getCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
};
