require("dotenv").config();

const { app } = require("./loaders/server");
const db = require("./loaders/db");

const helmetMiddleware = require("./middlewares/helmet");
const jsonMiddleware = require("./middlewares/json");

const routes = require("./routes/index");

const { AuthRoutes } = require("./routes");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synchronization with the database was achieved.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(helmetMiddleware);
app.use(jsonMiddleware);
app.use("/auth", AuthRoutes);
// app.use('/users', UserRoutes)
