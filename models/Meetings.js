const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Meeting = sequelize.define("Meeting", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organizerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  participantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scheduledTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("scheduled", "canceled"),
    defaultValue: "scheduled",
    allowNull: false,
  },
});

module.exports = Meeting;
