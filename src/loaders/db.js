require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

if (!DB_USERNAME || !DB_PASSWORD || !DB_NAME || !DB_HOST) {
  throw new Error("DB_USERNAME, DB_PASSWORD, DB_HOST environment variables are required.");
}

const connectDb = async () => {
  try {
    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      dialect: "postgres",
    });

    await sequelize.authenticate();
    console.log(`Database: ${DB_NAME} connection success!`);
  } catch (error) {
    console.error("An error occoured while try to connect database", error);
  }
};

module.exports = {
  connectDb,
};
