const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const requestor = await User.findById(uid);

    if (!requestor) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Client not found" });
    }

    if (!requestor.isActive) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Client inactive" });
    }

    req.user = requestor;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { validateJWT };
