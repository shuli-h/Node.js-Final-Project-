const department = require("../models/departments");

const getAllDepartments = async () => {
  try {
    return await department.find();
  } catch (err) {
    console.error("Error fetching departments:", err);
    throw err;
  }
};

const getDepartmentById = async (id) => {
  try {
    return await department.findById(id);
  } catch (err) {
    console.error("Error fetching department by ID:", err);
    throw err;
  }
};

const createDepartment = async (data) => {
  try {
    const existing = await department.findOne({ name: data.name });
    if (existing) {
      return existing;
    }
    return await department.create(data);
  } catch (err) {
    console.error("Error creating department:", err);
    throw err;
  }
};

const updateDepartment = async (id, data) => {
  try {
    return await department.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    console.error("Error updating department:", err);
    throw err;
  }
};

const deleteDepartment = async (id) => {
  try {
    return await department.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error deleting department:", err);
    throw err;
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
