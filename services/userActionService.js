const usersAction = require("../models/usersAction");
const { logUserAction } = require("../repositories/userActionRepo");

async function canUserPerformAction(username, action) {
  const user = await usersAction.findOne({ username });
  if (!user) throw new Error("User not found");

  const today = new Date().toDateString();
  const lastActionDay = new Date(user.lastActionDate).toDateString();

  if (today !== lastActionDay) {
    user.dailyActionCount = 0;
    user.lastActionDate = new Date();
  }

  if (user.dailyActionCount >= user.maxDailyActions) {
    throw new Error("Daily action limit reached");
  }

  user.dailyActionCount++;
  await user.save();

  await logUserAction(username, action);
}

module.exports = {
  canUserPerformAction,
};
