const Role = require("../models/role");
const User = require("../models/user");

const roleValidation = async (role) => {
  const existingRole = await Role.findOne({ role });
  if (role && !existingRole) {
    throw new Error("Invalid role");
  }
};

const emailValidation = async (email = "") => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("This email has been registered");
  }
};

const idUserIdValidation = async (id) => {
  const existingId = await User.findById(id);
  if (!existingId) {
    throw new Error("Id not found");
  }
};

module.exports = {
  roleValidation,
  emailValidation,
  idUserIdValidation,
};
