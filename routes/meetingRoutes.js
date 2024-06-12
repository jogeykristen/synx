const express = require("express");
const router = express.Router();
const {
  scheduleMeeting,
  cancelMeeting,
  getAllMeetings,
} = require("../controllers/meetingController");
const authMiddleware = require("../authentication/authMiddleware");

router.post("/schedule", authMiddleware, scheduleMeeting);
router.delete("/:meetingId", authMiddleware, cancelMeeting);
router.get("/", authMiddleware, getAllMeetings);

module.exports = router;
