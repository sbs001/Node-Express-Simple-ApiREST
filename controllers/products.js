const { response } = require("express");

const { Product } = require("../models");

const getProducts = async (req, res = response) => {
  const { limit = "5", skip = "0" } = req.query;
  const condition = { isActive: true };
  const [total, products] = await Promise.all([
    Product.countDocuments(condition),
    Product.find(condition)
      .populate("creator", "name")
      .populate("category", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.json({ total, products });
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("creator", "name")
    .populate("category", "name");

  if (!product.isActive) {
    return res.status(403).json({
      message: "Product inactive",
    });
  }

  res.json(product);
};

const postCreateProduct = async (req, res = response) => {
  console.log("sdsd")
  const { isActive, user, ...body } = req.body;

  const product = await Product.findOne({ name: body.name });
  if (product) {
    return res.status(400).json({
      message: "This product already exists",
    });
  }

  const data = {
    ...body,
    creator: req.user._id,
  };

  const newProduct = new Product(data);

  await newProduct.save();

  res.status(201).json(newProduct);
};

const putProduct = async (req, res = response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  putProduct,
  getProduct,
  getProducts,
  deleteProduct,
  postCreateProduct,
};
