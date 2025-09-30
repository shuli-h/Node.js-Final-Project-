const fs = require("fs/promises");
const path = require("path");

const logFilePath = path.join(__dirname, "../data/userLog.json");

async function logUserAction(username, action) {
  try {
    const data = await fs.readFile(logFilePath, "utf-8");
    const log = JSON.parse(data);

    const newAction = {
      username,
      action,
      timestamp: new Date().toISOString(),
    };

    log.actions.push(newAction);
    await fs.writeFile(logFilePath, JSON.stringify(log, null, 2));
  } catch (err) {
    console.error("Error logging user action:", err);
    throw err;
  }
}

module.exports = {
  logUserAction,
};
