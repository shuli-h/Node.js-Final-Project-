const usersAction = require("../models/usersAction");

const findUserAction = async (username) => {
  try {
    return await usersAction.findOne({ username });
  } catch (err) {
    console.error("Error finding user action:", err);
    throw err;
  }
};

const createUserAction = async (username) => {
  try {
    const existing = await usersAction.findOne({ username });
    if (existing) {
      return existing;
    }
    const action = new usersAction({ username });
    return await action.save();
  } catch (err) {
    console.error("Error creating user action:", err);
    throw err;
  }
};

const resetUserAction = async (userAction) => {
  userAction.dailyActionCount = 0;
  userAction.lastActionDate = new Date();
  return await userAction.save();
};

const incrementUserAction = async (userAction) => {
  userAction.dailyActionCount += 1;
  userAction.lastActionDate = new Date();
  return await userAction.save();
};

module.exports = {
  findUserAction,
  createUserAction,
  resetUserAction,
  incrementUserAction,
};
