const express = require("express");
const router = express.Router();
const { canUserPerformAction } = require("../services/userActionService");
const usersAction = require("../models/usersAction");

router.get("/users", async (req, res) => {
  try {
    const users = await usersAction.find(
      {},
      "username maxDailyActions dailyActionCount lastActionDate"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/employees", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username)
      return res.status(401).json({ message: "Unauthorized: Please log in" });

    await canUserPerformAction(username, "View Employees Page");
    res.json({ message: "Employees list would go here" });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

module.exports = router;
