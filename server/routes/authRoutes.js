const express = require("express");
const { logout } = require("../controllers/authController");
const router = express.Router();

router.get("/logout", logout);

module.exports = router;
