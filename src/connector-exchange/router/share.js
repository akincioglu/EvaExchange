const express = require("express");
const Joi = require("joi");
const ShareController = require("../controllers/share");
const validateBodyMiddleware = require("../../middlewares/validate-body");

const router = express.Router();

const shareSchema = Joi.object({
  name: Joi.string().uppercase().length(3).required(),
  price: Joi.number().precision(2).required(),
});

router.route("/").get(validateBodyMiddleware(shareSchema), ShareController.list);
router.route("/").post(validateBodyMiddleware(shareSchema), ShareController.create);
router.route("/:shareId").get(ShareController.read);
router.route("/:shareId").put(validateBodyMiddleware(shareSchema), ShareController.update);
router.route("/:shareId").delete(ShareController.delete);

module.exports = router;
