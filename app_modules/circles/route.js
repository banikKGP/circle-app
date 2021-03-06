
const auth = require("../../auth-module");
const bcrypt = require("bcrypt");
const { Partner } = require("../partners/schema");
const express = require("express");
const router = express.Router();
const controller = require("./controller");


router.post("/login", controller.login);
router.post("/", controller.createNewCircle);
router.post("/invitationLink", auth.circleAuth, controller.createInvitationLink);

module.exports = router;