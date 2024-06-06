const express = require("express");

const router = express.Router();
const requireAuthMiddleware = require("../middlewares/require-auth");
const UserController = require("../controllers/user");

router.route("/").get(requireAuthMiddleware, UserController.index);
router.route("/:userId").get(requireAuthMiddleware, UserController.read);

module.exports = router;
