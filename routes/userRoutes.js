const express = require("express");
const {
  registerUser,
  login,
  deleteUser,
  getUserById,
  showUsers,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../authentication/authMiddleware");
const {
  adminRoleMiddleware,
  adminOrUserRoleMiddleware,
} = require("../authentication/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.delete(
  "/delete/:userId",
  authMiddleware,
  adminRoleMiddleware,
  deleteUser
);

router.put("/update/:userId", authMiddleware, adminRoleMiddleware, updateUser);

router.get("/:userId", authMiddleware, adminOrUserRoleMiddleware, getUserById);
router.get("/", authMiddleware, adminOrUserRoleMiddleware, showUsers);

module.exports = router;
