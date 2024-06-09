const express = require("express");

const router = express.Router();
const Joi = require("joi");

const AuthController = require("../controllers/auth");

const validateBodyMiddleware = require("../middlewares/validate-body");

const signUpSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

router.route("/sign-up").post(validateBodyMiddleware(signUpSchema), AuthController.signUp);
router.route("/sign-in").post(validateBodyMiddleware(signInSchema), AuthController.signIn);

module.exports = router;
