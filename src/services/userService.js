const BaseService = require("./baseService");
const UserModel = require("../models/user");

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }
}

module.exports = new UserService();
