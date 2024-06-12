const sequelize = require("../config/database");
const User = require("./User");
const Message = require("./Message");
const Meeting = require("./Meetings");
const Organization = require("./Organization");

// Define User to Organization relationship
User.belongsTo(Organization, { foreignKey: "organizationId" });
Organization.hasMany(User, { foreignKey: "organizationId" });

// Define User to Message relationships
User.hasMany(Message, { foreignKey: "senderId" });
User.hasMany(Message, { foreignKey: "receiverId" });
Message.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

// Define User to Meeting relationships
User.hasMany(Meeting, { foreignKey: "organizerId" });
User.hasMany(Meeting, { foreignKey: "participantId" });
Meeting.belongsTo(User, { as: "organizer", foreignKey: "organizerId" });
Meeting.belongsTo(User, { as: "participant", foreignKey: "participantId" });

module.exports = {
  sequelize,
  User,
  Message,
  Meeting,
  Organization,
};
