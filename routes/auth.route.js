const { login, signup } = require("../controllers/auth.controller");

const router = require("express").Router();

// login user
router.post("/login", login);

// create new user
router.post("/signup", signup);

module.exports = router;
