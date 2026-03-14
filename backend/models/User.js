const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  registerNumber: {
    type: String,
    unique: true,
    sparse: true
  },

  username: {
    type: String,
    unique: true,
    sparse: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },

  phoneNumber: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);