const messageService = require("../services/messageService");

const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await messageService.sendMessage({
      senderId,
      receiverId,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const userId = req.user.id;
  try {
    const messages = await messageService.getMessages(userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendMessage, getMessages };
