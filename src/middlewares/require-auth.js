const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuthenticate = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Login first for to do this.",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).json({ message: err.message, statusCode: httpStatus.FORBIDDEN });
    }

    try {
      const user = await User.findOne({ id: decoded.id });

      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "User not found", statusCode: httpStatus.UNAUTHORIZED });
      }

      req.user = user;
      next();
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
    }
  });
};

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Login first for to do this.",
      statusCode: httpStatus.UNAUTHORIZED,
    });
  }
  if (req.user.role !== "admin") {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "You have no permission",
      statusCode: httpStatus.FORBIDDEN,
    });
  }
  next();
};

module.exports = { requireAuthenticate, requireAdmin };
