const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");

const collections = ["users", "categories", "products", "roles"];

const searchUsers = async (value = "", res = response) => {
  const isMongoID = ObjectId.isValid(value);

  if (isMongoID) {
    const user = await User.findById(value);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(value, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ isActive: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (value = "", res = response) => {
  const isMongoID = ObjectId.isValid(value);

  if (isMongoID) {
    const category = await Category.findById(value);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(value, "i");
  const categories = await Category.find({ name: regex, isActive: true });

  res.json({
    results: categories,
  });
};

const searchProducts = async (value = "", res = response) => {
  const isMongoID = ObjectId.isValid(value);

  if (isMongoID) {
    const product = await Product.findById(value).populate("category", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(value, "i");
  const products = await Product.find({
    name: regex,
    isActive: true,
  }).populate("category", "name");

  res.json({
    results: products,
  });
};

const search = (req, res = response) => {
  const { collection, value } = req.params;

  if (!collections.includes(collection)) {
    return res.status(400).json({
      message: "Invalid collection",
    });
  }

  switch (collection) {
    case "users":
      searchUsers(value, res);
      break;
    case "categories":
      searchCategories(value, res);
      break;
    case "products":
      searchProducts(value, res);
      break;

    default:
      res.status(400).json({
        message: "Error",
      });
  }
};

module.exports = {
  search,
};
