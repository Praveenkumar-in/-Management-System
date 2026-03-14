const mongoose = require("mongoose");

const queueSessionSchema = new mongoose.Schema({

 sessionDate: {
  type: Date,
  default: Date.now
 },

 activeQueue: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Token"
 }],

 counterNumber: {
  type: Number,
  default: 1
 }

});

module.exports = mongoose.model("QueueSession", queueSessionSchema);