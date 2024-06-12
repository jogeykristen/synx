const express = require("express");
const authMiddleware = require("../authentication/authMiddleware");
const {
  adminRoleMiddleware,
  adminOrUserRoleMiddleware,
} = require("../authentication/roleMiddleware");
const { getOrgById, showOrg } = require("../controllers/orgController");

const router = express.Router();

router.get("/:orgId", authMiddleware, adminOrUserRoleMiddleware, getOrgById);
router.get("/", authMiddleware, adminOrUserRoleMiddleware, showOrg);

module.exports = router;
