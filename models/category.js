const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, isActive, ...rest } = this.toObject();
  return rest;
};

module.exports = model("Category", CategorySchema);
