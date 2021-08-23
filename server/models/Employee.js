const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
