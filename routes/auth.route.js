const { login, signup, logout } = require("../controllers/auth.controller");
const { protectedRoute } = require("../utils/protectedRoute");

const router = require("express").Router();

// login user
router.post("/login", login);

// create new user
router.post("/signup", signup);

// logout user
router.post("/logout", protectedRoute, logout);

module.exports = router;
