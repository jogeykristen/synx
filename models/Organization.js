const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Organization = sequelize.define("Organization", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Organization;
