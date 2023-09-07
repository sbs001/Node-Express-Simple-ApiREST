const { response } = require("express");
const bcrypt = require("bcryptjs");

const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");

const postLogin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        message: "Inactive user",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  postLogin,
};
