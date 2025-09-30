const departmentRepo = require("../repositories/departmentsRepo");
const employeeRepo = require("../repositories/employeeRepo");

const getAllDepartmentsWithEmployees = async () => {
  const departments = await departmentRepo.getAllDepartments();
  const employees = await employeeRepo.findAllEmployees();

  return departments.map((dep) => ({
    ...dep.toObject(),
    employees: employees.filter((emp) => emp.department === dep.name),
  }));
};

const getDepartmentDetails = async (id) => {
  const department = await departmentRepo.getDepartmentById(id);
  if (!department) {
    throw new Error("Department not found");
  }

  const employees = await employeeRepo.findAllEmployees();
  return {
    ...department.toObject(),
    employees: employees.filter((emp) => emp.department === department.name),
  };
};

const createDepartment = (data) => departmentRepo.createDepartment(data);

const updateDepartment = async (id, data) => {
  const existing = await departmentRepo.getDepartmentById(id);
  if (!existing) {
    throw new Error("Department not found");
  }
  return departmentRepo.updateDepartment(id, data);
};

const deleteDepartment = async (id) => {
  const department = await departmentRepo.getDepartmentById(id);
  if (!department) {
    throw new Error("Department not found");
  }

  const departmentName = department.name;
  await departmentRepo.deleteDepartment(id);
  await employeeRepo.removeDepartmentFromEmployees(departmentName);
};

module.exports = {
  getAllDepartmentsWithEmployees,
  getDepartmentDetails,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
