const { User, Organization } = require("../models/index");
const orgService = require("../services/orgService");

const getOrgById = async (req, res) => {
  const userId = req.params.orgId;
  try {
    const user = await orgService.getOrgById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const showOrg = async (req, res) => {
  try {
    const user = await orgService.showAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getOrgById, showOrg };
