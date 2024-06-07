const express = require("express");
const TradeRouters = require("./trade");
const ShareRouters = require("./share");

const router = express.Router();

router.use("/trade", TradeRouters);
router.use("/share", ShareRouters);

module.exports = router;
