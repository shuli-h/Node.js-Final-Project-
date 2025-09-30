const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  department: { type: String, required: true },
  shifts: [
    {
      date: { type: Date },
      time: { type: String },
    },
  ],
});

const Employee = mongoose.model("employee", employeeSchema, "employees");

module.exports = Employee;
