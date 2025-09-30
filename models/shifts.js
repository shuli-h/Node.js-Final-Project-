const mongoose = require("mongoose");

const shiftSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
  ],
});

module.exports = mongoose.model("shifts", shiftSchema);
