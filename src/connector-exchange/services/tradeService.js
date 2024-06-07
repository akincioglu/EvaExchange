const BaseService = require("../../services/baseService");
const TradeModel = require("../models/trade");
const userService = require("../../services/userService");
const shareService = require("../services/shareService");

class TradeService extends BaseService {
  constructor() {
    super(TradeModel);
    this.userService = userService;
    this.shareService = shareService;
  }

  async buy(userId, shareId, quantity) {
    const user = await this.userService.read({ id: userId });
    const share = await this.shareService.read({ id: shareId });

    if (!user || !share) {
      throw new Error("Invalid user or share");
    }

    if (!user.portfolioRegistered) {
      throw new Error("User's portfolio is not registered");
    }

    return await TradeModel.create({
      type: "BUY",
      quantity,
      price: share.price * quantity,
      userId: user.id,
      shareId: share.id,
    });
  }

  async sell(userId, shareId, quantity) {
    try {
      const user = await this.userService.read({ id: userId });
      const share = await this.shareService.read({ id: shareId });

      if (!user || !share) {
        throw new Error("Invalid user or share");
      }

      if (!user.portfolioRegistered) {
        throw new Error("User's portfolio is not registered");
      }

      const userTrades = await TradeModel.findAll({
        userId: user.id,
        shareId: share.id,
      });

      const totalBought = userTrades.filter((trade) => trade.type === "BUY").reduce((acc, trade) => acc + trade.quantity, 0);

      const totalSold = userTrades.filter((trade) => trade.type === "SELL").reduce((acc, trade) => acc + trade.quantity, 0);

      const currentQuantity = totalBought - totalSold;

      if (currentQuantity < quantity) {
        throw new Error("Insufficient shares");
      }

      return await TradeModel.create({
        type: "SELL",
        quantity,
        price: quantity * share.price,
        userId: user.id,
        shareId: share.id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TradeService();
