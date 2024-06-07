const express = require("express");
const Joi = require("joi");
const TradeController = require("../controllers/trade");
const validateBodyMiddleware = require("../../middlewares/validate-body");

const { requireAuthenticate, requireAdmin } = require("../../middlewares/require-auth");

const router = express.Router();

const tradeSchema = Joi.object({
  userId: Joi.string().guid().required(),
  shareId: Joi.string().guid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

router.route("/").get(requireAuthenticate, requireAdmin, TradeController.list);
router.route("/mine").get(requireAuthenticate, TradeController.myTrades);
router.route("/:tradeId").get(requireAuthenticate, requireAdmin, TradeController.read);
router.route("/buy").post(requireAuthenticate, validateBodyMiddleware(tradeSchema), TradeController.buy);
router.route("/sell").post(requireAuthenticate, validateBodyMiddleware(tradeSchema), TradeController.sell);

module.exports = router;
