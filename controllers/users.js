const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const { limit = "5", skip = "0" } = req.query;
  const condition = { isActive: true };

  const [total, users] = await Promise.all([
    User.countDocuments(condition),
    User.find(condition).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({ user });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { isActive: false });

  res.json(user);
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
