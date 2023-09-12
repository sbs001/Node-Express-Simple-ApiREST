const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  isAvaliable: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, isActive, ...rest } = this.toObject();
  return rest;
};

module.exports = model("Product", ProductSchema);
