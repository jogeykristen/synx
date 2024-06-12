const { User, Organization } = require("../models/index");

const getOrgById = async (orgId) => {
  const user = await Organization.findByPk(orgId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const showAll = async (req, res) => {
  const users = await Organization.findAll();
  if (!users) {
    throw new Error("No organization found");
  }
  return users;
};

module.exports = { getOrgById, showAll };
