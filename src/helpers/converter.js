const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateAccessToken = (user, expiresIn = "24h") => {
  return jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn });
};

const checkPassword = async (password, user) => {
  try {
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
  } catch (error) {
    console.error("An error occoured", error.message);
  }
};

module.exports = {
  generateAccessToken,
  checkPassword,
};
