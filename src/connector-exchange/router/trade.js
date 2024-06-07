const express = require("express");
const Joi = require("joi");
const TradeController = require("../controllers/trade");
const validateBodyMiddleware = require("../../middlewares/validate-body");

const router = express.Router();

const tradeSchema = Joi.object({
  userId: Joi.string().guid().required(),
  shareId: Joi.string().guid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

router
  .route("/buy")
  .post(validateBodyMiddleware(tradeSchema), TradeController.buy);
router
  .route("/sell")
  .post(validateBodyMiddleware(tradeSchema), TradeController.sell);

module.exports = router;
