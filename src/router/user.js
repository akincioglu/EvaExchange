const express = require("express");
const Joi = require("joi");

const router = express.Router();
const { requireAuthenticate, requireAdmin } = require("../middlewares/require-auth");
const validateBodyMiddleware = require("../middlewares/validate-body");
const UserController = require("../controllers/user");

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid("admin", "customer").optional(),
  portfolioRegistered: Joi.boolean().optional(),
  password: Joi.string().min(8).optional(),
});

router.route("/").get(requireAuthenticate, requireAdmin, UserController.list);
router.route("/:userId").get(requireAuthenticate, UserController.read);
router.route("/:userId").put(requireAuthenticate, validateBodyMiddleware(updateUserSchema), UserController.createPortfolio);

module.exports = router;
