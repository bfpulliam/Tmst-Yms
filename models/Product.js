const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProductSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  timestamps: {
    type: Date,
    default: Date.now
  }

});

module.exports = Product = mongoose.model("products", ProductSchema);