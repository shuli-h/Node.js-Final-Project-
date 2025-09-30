const mongoose = require("mongoose");

const userActionSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  dailyActionCount: { type: Number, default: 0 },
  lastActionDate: { type: Date, default: () => new Date() },
  maxActionsPerDay: { type: Number, required: true },
});

module.exports = mongoose.model("useractions", userActionSchema);
