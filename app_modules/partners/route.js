
const auth = require("../../auth-module");
const bcrypt = require("bcrypt");
const { Partner } = require("../partners/schema");
const express = require("express");
const router = express.Router();
const partnerController = require("./controller");


router.post("/login", partnerController.login);
router.post("/", partnerController.createNewPartner);

module.exports = router;