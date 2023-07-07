const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: `All fields are required.` });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: `Password do not match!` });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(403).json({ message: `Username Already Exist!` });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(403).json({ message: `Email Already Exist!` });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  try {
    const { username, password: pass } = req.body;

    if (!username || !pass) {
      return res
        .status(400)
        .json({ message: `Username and Password are required.` });
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: `Username/Email or Password is Invalid.` });
    }

    const match = await bcrypt.compare(pass, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ message: `Username or Password is Invalid.` });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "3d" }
    );

    res.cookie("token", accessToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const { password, ...other } = user._doc;

    res.status(200).json({ ...other, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginStatus = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.ACCESS_TOKEN);

  if (!verified) {
    return res.json(false);
  }

  res.json(true);
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  // res.cookie("token", "", {
  //   maxAge: 0,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  // });

  res.status(200).json({ message: "Successfully Logout." });
};

module.exports = {
  register,
  login,
  loginStatus,
  logout,
};
