const { Message, User } = require("../models");

const sendMessage = async ({ senderId, receiverId, content }) => {
  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      throw new Error("Sender or Receiver does not exist");
    }

    const message = await Message.create({
      senderId,
      receiverId,
      content,
    });

    return message;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMessages = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    const sentMessages = await Message.findAll({ where: { senderId: userId } });
    const receivedMessages = await Message.findAll({
      where: { receiverId: userId },
    });

    return { sentMessages, receivedMessages };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { sendMessage, getMessages };
