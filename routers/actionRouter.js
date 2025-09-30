const express = require("express");
const router = express.Router();
const { handleUserAction } = require("../services/actionService");

router.post("/do-action", async (req, res) => {
  const username = req.session?.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    const updatedUser = await handleUserAction(username);
    res.status(200).json({
      message: `Action performed. You have ${updatedUser.dailyActionCount} actions today.`,
    });
  } catch (err) {
    if (err.message === "Daily limit reached") {
      return res.status(400).json({
        message:
          "You reached your action limit for today. You are being logged out.",
      });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
