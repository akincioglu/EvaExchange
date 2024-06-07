const httpStatus = require("http-status");
const userService = require("../../services/userService");
const shareService = require("../services/shareService");
const tradeService = require("../services/tradeService");

class TradeController {
  constructor() {
    this.userService = userService;
    this.shareService = shareService;
    this.tradeService = tradeService;
  }

  buy = async (req, res) => {
    const { userId, shareId, quantity } = req.body;
    try {
      const trade = await this.tradeService.buy(userId, shareId, quantity);
      res.status(httpStatus.CREATED).json(trade);
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  sell = async (req, res) => {
    const { userId, shareId, quantity } = req.body;
    try {
      const trade = await this.tradeService.sell(userId, shareId, quantity);
      res.status(httpStatus.CREATED).json(trade);
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
}

module.exports = new TradeController();
