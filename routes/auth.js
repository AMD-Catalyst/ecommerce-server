const router = require("express").Router();
const { register, login, loginStatus, logout } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/loginStatus", loginStatus);
router.get("/logout", logout);

module.exports = router;
