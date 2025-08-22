const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", portfolioSchema);
