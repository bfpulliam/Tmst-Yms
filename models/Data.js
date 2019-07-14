const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DataSchema = new Schema({
  id: {
    type: String,
  },
  message: {
    type: String
  },
  timestamps: {
    type: Date,
    default: Date.now
  }

});

module.exports = Data = mongoose.model("data", DataSchema);