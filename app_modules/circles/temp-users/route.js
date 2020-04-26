const auth = require("../../../auth-module");
const express = require("express");
const router = express.Router();
const controller = require("./controller");


router.post("/", auth.circleAuth, controller.addUser);
router.get("/", auth.circleAuth, controller.getUser);
router.get("/all", auth.circleAuth, controller.getAllUser);

module.exports = router;