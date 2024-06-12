const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("synx", "root", "Password123##", {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;
