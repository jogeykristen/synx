const express = require("express");
const {
  registerWebhook,
  listWebhooks,
  deleteWebhook,
} = require("../controllers/webhookController");
const router = express.Router();

router.post("/create", registerWebhook);
router.get("/show", listWebhooks);
router.delete("/:id", deleteWebhook);

module.exports = router;
