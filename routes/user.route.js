const { Router } = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

// get all users
router.get("/get/all", getUsers);

// get user by id
router.get("/:id", getUser);

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
