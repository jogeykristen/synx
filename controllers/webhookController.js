const { Webhook } = require("../models");

const registerWebhook = async (req, res) => {
  const { url, event } = req.body;
  try {
    const webhook = await Webhook.create({ url, event });
    res.status(201).json(webhook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.findAll();
    res.status(200).json(webhooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWebhook = async (req, res) => {
  const { id } = req.params;
  try {
    const webhook = await Webhook.findByPk(id);
    if (!webhook) {
      throw new Error("Webhook not found");
    }
    await webhook.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerWebhook, listWebhooks, deleteWebhook };
