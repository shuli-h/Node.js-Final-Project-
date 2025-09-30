const express = require("express");
const router = express.Router();

router.get("/login-status", (req, res) => {
  if (req.session && req.session.user) {
    res.json({
      loggedIn: true,
      name: req.session.user.name,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error while logging out" });
    }
    res.clearCookie("connect.sid");

    res.json({
      message: "You have successfully logged out",
      redirectTo: "/login",
    });
  });
});

module.exports = router;
