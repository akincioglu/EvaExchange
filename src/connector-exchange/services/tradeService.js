const BaseService = require("../../services/baseService");
const TradeModel = require("../models/trade");
const UserModel = require("../../models/user");
const ShareModel = require("../models/share");

class TradeService extends BaseService {
  constructor() {
    super(TradeModel);
    this.userModel = UserModel;
    this.shareModel = ShareModel;
  }

  async buy(userId, shareId, quantity) {
    const user = await UserModel.findOne({ id: userId });
    const share = await ShareModel.findOne({ id: shareId });

    if (!user || !share) {
      throw new Error("Invalid user or share");
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
      const user = await UserModel.findOne({ id: userId });
      const share = await ShareModel.findOne({ id: shareId });

      if (!user || !share) {
        throw new Error("Invalid user or share");
      }

      const userTrades = await TradeModel.findAll({
        userId: user.id,
        shareId: share.id,
      });

      const totalBought = userTrades.filter((trade) => trade.type === "BUY").reduce((acc, trade) => acc + trade.quantity, 0);

      const totalSold = userTrades.filter((trade) => trade.type === "SELL").reduce((acc, trade) => acc + trade.quantity, 0);

      console.log(totalBought, totalSold);

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
