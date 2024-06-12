const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const authMiddleware = require("../authentication/authMiddleware");

router.post("/send", authMiddleware, sendMessage);
router.get("/", authMiddleware, getMessages);

module.exports = router;
