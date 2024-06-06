require("dotenv").config();

const { app } = require("./loaders/server");
const { connectDb } = require("./loaders/db");

connectDb();
