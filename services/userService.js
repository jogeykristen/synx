const { User, Organization } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async ({
  username,
  email,
  password,
  role,
  organizationName,
}) => {
  let user;
  let organization;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    [organization, created] = await Organization.findOrCreate({
      where: { name: organizationName },
      defaults: { name: organizationName },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed = ", hashedPassword);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      organizationId: organization.id,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  var user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const tokenPayload = { id: user.id, email: user.email, role: user.role };
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: "1h" });
  return token;
};

const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await User.destroy({ where: { id: userId } });
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const showAll = async (req, res) => {
  const users = await User.findAll();
  if (!users) {
    throw new Error("No users found");
  }
  return users;
};

const updateUser = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  if (updateData.organizationName) {
    const [organization, created] = await Organization.findOrCreate({
      where: { name: updateData.organizationName },
      defaults: { name: updateData.organizationName },
    });
    updateData.organizationId = organization.id;
    delete updateData.organizationName;
  }

  await user.update(updateData);
  return user;
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  getUserById,
  showAll,
  updateUser,
};
