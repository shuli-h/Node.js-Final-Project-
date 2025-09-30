const employeeRepo = require("../repositories/employeeRepo");

async function getAllEmployees() {
  return await employeeRepo.findAllEmployees();
}

async function getEmployeeById(id) {
  return await employeeRepo.getEmployeesId(id);
}

async function addNewEmployee(employeeData) {
  return await employeeRepo.createEmployee(employeeData);
}

async function updateEmployees(id, employeeData) {
  console.log("Updating employee ID:", id);
  return await employeeRepo.updateEmployee(id, employeeData);
}

async function deleteEmployee(id) {
  return await employeeRepo.deleteEmployee(id);
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
  updateEmployees,
  deleteEmployee,
};
