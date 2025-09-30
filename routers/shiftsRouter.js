const express = require("express");
const router = express.Router();
const shiftsService = require("../services/shiftsService");
const { canUserPerformAction } = require("../services/userActionService");

router.post("/", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username)
      return res.status(401).json({ message: "Unauthorized: Please log in" });

    await canUserPerformAction(username, "Create New Shift");
    const shift = await shiftsService.createNewShift(req.body);
    res.json(shift);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username)
      return res.status(401).json({ message: "Unauthorized: Please log in" });

    await canUserPerformAction(username, "Update Shift");
    const updated = await shiftsService.updateExistingShift(
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.put("/assign/:id", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username)
      return res.status(401).json({ message: "Unauthorized: Please log in" });

    await canUserPerformAction(username, "Assign Employees To Shift");
    const result = await shiftsService.assignEmployeesToShift(
      req.params.id,
      req.body.employeeIds
    );
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username)
      return res.status(401).json({ message: "Unauthorized: Please log in" });

    await canUserPerformAction(username, "View Shifts");
    const shifts = await shiftsService.getShifts();
    res.json(shifts);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

module.exports = router;
