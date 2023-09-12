const User = require("../models/user");

const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ message: "Internal user validation" });
  }
  const { role } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(400).json({ message: "invalid role" });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({ message: "Internal user validation" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    next();
  };
};

module.exports = { isAdminRole, hasRole };
