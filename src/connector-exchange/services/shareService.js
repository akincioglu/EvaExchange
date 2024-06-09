const BaseService = require("../../services/baseService");
const ShareModel = require("../models/share");

class ShareService extends BaseService {
  constructor() {
    super(ShareModel);
  }
}

module.exports = new ShareService();
