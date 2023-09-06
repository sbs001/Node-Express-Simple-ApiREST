const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...rest } = this.toObject();
  return rest;
};

module.exports = model("User", UserSchema);
