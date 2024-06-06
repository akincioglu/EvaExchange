const httpStatus = require("http-status");
const userService = require("../services/userService");
const { generateAccessToken, checkPassword } = require("../helpers/converter");

class AuthController {
  constructor() {
    this.userService = userService;
    this.generateAccessToken = generateAccessToken;
    this.checkPassword = checkPassword;
  }
  signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await this.userService.create({ name, email, password });
      res.status(httpStatus.CREATED).json(user);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.read({ email });

      if (!user) {
        throw new Error("User not found.");
      }

      const isPasswordValid = await this.checkPassword(password, user);

      if (!isPasswordValid) {
        throw new Error("password is not valid.");
      }

      res.status(httpStatus.OK).json({ token: await this.generateAccessToken(user) });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };
}

module.exports = new AuthController();
