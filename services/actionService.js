const actionRepo = require("../repositories/actionRepo");

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

async function handleUserAction(username) {
  let userAction = await actionRepo.findUserAction(username);

  if (!userAction) {
    userAction = await actionRepo.createUserAction(username);
  }

  const today = new Date();

  if (!isSameDay(userAction.lastActionDate, today)) {
    userAction = await actionRepo.resetUserAction(userAction);
  }

  const maxActions = userAction.maxActionsPerDay ?? 5;

  if (userAction.dailyActionCount >= maxActions) {
    throw new Error("Daily limit reached");
  }

  return await actionRepo.incrementUserAction(userAction);
}

module.exports = {
  handleUserAction,
};
