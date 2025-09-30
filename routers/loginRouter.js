const express = require("express");
const loginServices = require("../services/loginService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await loginServices.login(username, email);

    req.session.user = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    res.json({
      message: "Login successful",
      name: user.name,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  res.json({ message: `Welcome, ${req.session.user.name}` });
});

module.exports = router;
