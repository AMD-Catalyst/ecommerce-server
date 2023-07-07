const Order = require("../models/Order");

const newOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updateOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateOrder) {
      return res.status(400).json({ message: `Order not found` });
    }

    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteOrder = await Order.findByIdAndDelete(id);

    if (!deleteOrder) {
      return res.status(400).json({ message: `Order not found` });
    }

    res.status(200).json(deleteOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const getOrder = await Order.findOne({ userId: id });

    if (!getOrder) {
      return res.status(400).json({ message: `Order not found` });
    }

    res.status(200).json(getOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMonthlyIncome = async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
};
