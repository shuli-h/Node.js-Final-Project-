const Shift = require("../models/shifts");

const getAllShifts = async () => {
  try {
    return await Shift.find();
  } catch (error) {
    console.error("Error fetching shifts:", error);
    throw error;
  }
};

const createShift = async (shiftData) => {
  try {
    const newShift = new Shift(shiftData);
    return await newShift.save();
  } catch (error) {
    console.error("Error creating shift:", error);
    throw error;
  }
};

const getShiftById = async (id) => {
  try {
    return await Shift.findById(id.trim());
  } catch (error) {
    console.error("Error fetching shift by id:", error);
    throw error;
  }
};

const updateShift = async (id, data) => {
  try {
    const shiftId = id.trim();
    const updated = await Shift.findByIdAndUpdate(shiftId, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new Error("Shift not found");
    return updated;
  } catch (error) {
    console.error("Error updating shift:", error);
    throw error;
  }
};

const assignEmployeesToShift = async (shiftId, employeeIds) => {
  try {
    if (!Array.isArray(employeeIds)) {
      throw new Error("employeeIds must be an array");
    }

    const id = shiftId.trim();
    const shift = await Shift.findById(id);
    if (!shift) throw new Error("Shift not found");

    const updated = await Shift.findByIdAndUpdate(
      id,
      { $addToSet: { employees: { $each: employeeIds } } },
      { new: true }
    );
    return updated;
  } catch (error) {
    console.error("Error assigning employees:", error);
    throw error;
  }
};

module.exports = {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  assignEmployeesToShift,

  assignEmployees: assignEmployeesToShift,
};
