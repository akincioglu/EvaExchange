const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/apiError");

const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    next(new ApiError("Login first for to do this.", httpStatus.UNAUTHORIZED));
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      next(new ApiError(err.message, httpStatus.FORBIDDEN));
      return;
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
