const experss = require("express");
const { login, register } = require("../controllers/userController");

const router = experss.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
