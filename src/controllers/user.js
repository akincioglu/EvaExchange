const httpStatus = require("http-status");
const userService = require("../services/userService");

class UserController {
  constructor() {
    this.userService = userService;
  }

  list = async (req, res) => {
    try {
      const users = await this.userService.list();
      res.status(httpStatus.OK).json(users);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  read = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await this.userService.read({ id: userId });
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  createPortfolio = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await this.userService.read({ id: userId });
      if (!user) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "User not found" });
      }
      const [updatedCount, updatedUsers] = await this.userService.update(user.id, req.body);

      const updatedUser = updatedUsers[0];

      return res.status(httpStatus.OK).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

module.exports = new UserController();
