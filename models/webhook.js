const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Webhook = sequelize.define("Webhook", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Webhook;
