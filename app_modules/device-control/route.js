
const auth = require("../../auth-module");
const express = require("express");
const router = express.Router();
const controller = require("./controller");


// router.post("/", auth.loginAuth, controller.create); //register new device
router.get("/:id", auth.loginAuth, controller.readById);
router.put("/:id", auth.loginAuth, controller.updateById);
// router.delete("/:id", auth.loginAuth, controller.deleteById);
module.exports = router;