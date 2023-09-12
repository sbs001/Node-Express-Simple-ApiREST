const { Role, Category, User, Product } = require("../models");

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

const categoryIdValidation = async (id) => {
  const existingId = await Category.findById(id);
  if (!existingId) {
    throw new Error("Category not found");
  }
};

const productIdValidation = async (id) => {
  const existingId = await Product.findById(id);
  if (!existingId) {
    throw new Error("Product not found");
  }
};

module.exports = {
  roleValidation,
  emailValidation,
  idUserIdValidation,
  productIdValidation,
  categoryIdValidation,
};
