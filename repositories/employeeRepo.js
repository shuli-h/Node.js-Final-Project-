const employee = require("../models/employee");

const findAllEmployees = async () => {
  try {
    return await employee.find();
  } catch (err) {
    console.error("Error fetching employees:", err);
    throw err;
  }
};

const getEmployeesId = async (id) => {
  try {
    return await employee.findById(id);
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    throw err;
  }
};

const createEmployee = async (employeeData) => {
  try {
    const existing = await employee.findOne({
      fullName: employeeData.fullName,
    });
    if (existing) {
      throw new Error(
        `Employee with name '${employeeData.fullName}' already exists.`
      );
    }

    const newEmployee = new employee(employeeData);
    return await newEmployee.save();
  } catch (err) {
    console.error("Error creating employee:", err);
    throw err;
  }
};

const updateEmployee = async (id, employeeData) => {
  try {
    console.log("Repo layer - updating ID:", id);
    return await employee.findByIdAndUpdate(id, employeeData, { new: true });
  } catch (err) {
    console.error("Error updating employee:", err);
    throw err;
  }
};

const deleteEmployee = async (id) => {
  try {
    return await employee.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error deleting employee:", err);
    throw err;
  }
};

const removeDepartmentFromEmployees = async (departmentName) => {
  try {
    await employee.updateMany(
      { department: departmentName },
      { $unset: { department: "" } }
    );
  } catch (err) {
    console.error("Error removing department from employees:", err);
    throw err;
  }
};

module.exports = {
  findAllEmployees,
  getEmployeesId,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  removeDepartmentFromEmployees,
};
