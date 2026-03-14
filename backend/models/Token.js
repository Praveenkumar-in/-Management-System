const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({

 tokenNumber: {
  type: Number,
  required: true
 },

 studentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },

 status: {
  type: String,
  enum: ["waiting", "serving", "completed", "skipped"],
  default: "waiting"
 },

 createdAt: {
  type: Date,
  default: Date.now
 }

});

module.exports = mongoose.model("Token", tokenSchema);