const mongoose = require("mongoose");

const departmentsSchema = mongoose.Schema({
  name: { type: String, required: true },
  manager: { type: String, required: true },
});

const departments = mongoose.model("departments", departmentsSchema);

module.exports = departments;
