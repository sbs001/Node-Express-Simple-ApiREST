const { response } = require("express");

const { Category } = require("../models");

const getCategories = async (req, res = response) => {
  const { limit = "5", skip = "0" } = req.query;
  const condition = { isActive: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(condition),
    Category.find(condition)
      .populate("creator", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.json({ total, categories });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("creator", "name");

  if (!category.isActive) {
    return res.status(403).json({
      message: "Category inactive",
    });
  }

  res.json(category);
};

const postCreateCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const category = await Category.findOne({ name });
  if (category) {
    return res.status(400).json({
      message: "This category already exists",
    });
  }

  const data = {
    name,
    creator: req.user._id,
  };

  const newCategory = new Category(data);

  await newCategory.save();

  res.status(201).json(newCategory);
};

const putCategory = async (req, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(id, { name }, { new: true });

  res.json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { isActive: false });

  res.json(category);
};

module.exports = {
  putCategory,
  getCategory,
  getCategories,
  deleteCategory,
  postCreateCategory,
};
