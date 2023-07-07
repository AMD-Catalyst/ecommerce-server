const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: `You are not authenticated` });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: `Token is not valid` });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json(error);
  }
  // const authHeader = req.headers.authorization || req.headers.Authorization;

  // if (!authHeader) {
  //   return res.status(401).json({ message: `You are not authenticated` });
  // }

  // const token = authHeader.split(" ")[1];

  // jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ message: `Token is not valid` });
  //   }

  //   req.user = user;
  //   next();
  // });
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed.");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed.");
    }
  });
};

module.exports = {
  verifyJWT,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
};
