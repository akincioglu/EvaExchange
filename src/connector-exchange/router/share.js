const express = require("express");
const Joi = require("joi");
const ShareController = require("../controllers/share");
const validateBodyMiddleware = require("../../middlewares/validate-body");
const { requireAuthenticate, requireAdmin } = require("../../middlewares/require-auth");

const router = express.Router();

const shareSchema = Joi.object({
  name: Joi.string().uppercase().length(3).required(),
  price: Joi.number().precision(2).required(),
});

router.route("/").get(requireAuthenticate, ShareController.list);
router.route("/").post(requireAuthenticate, requireAdmin, validateBodyMiddleware(shareSchema), ShareController.create);
router.route("/:shareId").get(requireAuthenticate, ShareController.read);
router.route("/:shareId").put(requireAuthenticate, requireAdmin, validateBodyMiddleware(shareSchema), ShareController.update);
router.route("/:shareId").delete(requireAuthenticate, requireAdmin, ShareController.delete);

module.exports = router;
