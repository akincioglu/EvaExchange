const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../../loaders/db");

const Share = sequelize.define("Share", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(3),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Share;
