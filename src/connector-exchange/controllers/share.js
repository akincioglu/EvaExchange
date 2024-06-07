const httpStatus = require("http-status");
const shareService = require("../services/shareService");

class ShareController {
  constructor() {
    this.shareService = shareService;
  }

  list = async (req, res) => {
    try {
      const shares = await this.shareService.list();
      res.status(httpStatus.OK).json(shares);
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  read = async (req, res) => {
    try {
      const share = await this.shareService.read(req.params.symbol);
      res.status(httpStatus.OK).json(share);
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const share = await this.shareService.create(req.body);
      res.status(httpStatus.CREATED).json(share);
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const updatedShare = await this.shareService.update(
        req.params.shareId,
        req.body
      );
      res.status(httpStatus.OK).json(updatedShare);
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.shareService.delete(req.params.symbol);
      res.status(httpStatus.OK).send();
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
}

module.exports = new ShareController();
