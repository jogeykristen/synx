const { Meeting, User } = require("../models");

const scheduleMeeting = async ({
  organizerId,
  participantId,
  scheduledTime,
}) => {
  try {
    const organizer = await User.findByPk(organizerId);
    const participant = await User.findByPk(participantId);

    if (!organizer || !participant) {
      throw new Error("Organizer and participant must be valid users");
    }

    const meeting = await Meeting.create({
      organizerId,
      participantId,
      scheduledTime,
    });
    return meeting;
  } catch (error) {
    throw new Error(error.message);
  }
};

const cancelMeeting = async (meetingId) => {
  try {
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      throw new Error("Meeting not found");
    }
    await meeting.destroy();
    return "Meeting canceled successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllMeetings = async () => {
  try {
    const meetings = await Meeting.findAll();
    return meetings;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { scheduleMeeting, cancelMeeting, getAllMeetings };
