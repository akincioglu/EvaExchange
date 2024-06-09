const { APP_PORT } = process.env;

const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app).listen(APP_PORT, () => {
  console.log(`server online on port: ${APP_PORT}`);
});

module.exports = {
  server,
  app,
};
