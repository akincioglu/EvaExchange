require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

if (!DB_USERNAME || !DB_PASSWORD || !DB_NAME || !DB_HOST) {
  throw new Error("DB_USERNAME, DB_PASSWORD, DB_HOST environment variables are required.");
}

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to database.");
  })
  .catch((err) => {
    console.error("Connection error =>", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
