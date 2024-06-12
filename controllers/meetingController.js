const meetingService = require("../services/meetingService");

const scheduleMeeting = async (req, res) => {
  const { organizerId, participantId, scheduledTime } = req.body;
  try {
    const meeting = await meetingService.scheduleMeeting({
      organizerId,
      participantId,
      scheduledTime,
    });
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelMeeting = async (req, res) => {
  const meetingId = req.params.meetingId;
  try {
    const message = await meetingService.cancelMeeting(meetingId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const meetings = await meetingService.getAllMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  scheduleMeeting,
  cancelMeeting,
  getAllMeetings,
};
