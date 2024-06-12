const { User, Organization } = require("../models/index");
const userService = require("../services/userService");

const registerUser = async (req, res) => {
  const { username, email, password, role, organizationName } = req.body;
  try {
    const user = await userService.createUser({
      username,
      email,
      password,
      role,
      organizationName,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("error = ", error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const showUsers = async (req, res) => {
  try {
    const user = await userService.showAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  login,
  deleteUser,
  getUserById,
  showUsers,
  updateUser,
};
