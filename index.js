// index.js

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, User, Organization } = require("./models");
const userRoutes = require("./routes/userRoutes");
const orgRoutes = require("./routes/organizationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/org", orgRoutes);
app.use("/messages", messageRoutes);
app.use("/meetings", meetingRoutes);
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
