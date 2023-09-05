const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({ method: "GET" });
};

const postUsers = (req, res = response) => {
  const body = req.body;

  res.json({ method: "POST", ...body });
};

const putUsers = (req, res = response) => {
  res.json({ method: "PUT" });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
};
