const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../../loaders/db");
const User = require("../../models/user");
const Share = require("./share");

const Trade = sequelize.define("Trade", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  type: {
    type: DataTypes.ENUM("BUY", "SELL"),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

User.hasMany(Trade, { foreignKey: "userId" });
Trade.belongsTo(User, { foreignKey: "userId" });
Share.hasMany(Trade, { foreignKey: "shareId" });
Trade.belongsTo(Share, { foreignKey: "shareId" });

module.exports = Trade;
