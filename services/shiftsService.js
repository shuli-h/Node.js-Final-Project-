const shiftsRepo = require("../repositories/shiftsRepo");

const createNewShift = (data) => shiftsRepo.createShift(data);

const updateExistingShift = (id, data) => shiftsRepo.updateShift(id, data);

const assignEmployeesToShift = (shiftId, employeeIds = []) =>
  shiftsRepo.assignEmployeesToShift(shiftId, employeeIds);

const getShifts = () => shiftsRepo.getAllShifts();

module.exports = {
  createNewShift,
  updateExistingShift,
  assignEmployeesToShift,
  getShifts,
};
