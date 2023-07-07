const User = require("../models/User");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(password, saltRounds);
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json({ message: `User Not Found` });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: `User Not Found` });
    }

    res.status(200).json({ message: "User has been Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);

    if (!result) {
      return res.status(400).json({ message: `User Not Found` });
    }

    const { password, ...other } = result._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { recent } = req.query;

    const result = recent
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastYear = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 1)
    );
    const result = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getStats,
};
