const express = require("express");
const router = express.Router();
const departmentService = require("../services/departmentsService");
const { canUserPerformAction } = require("../services/userActionService");

router.get("/", async (req, res) => {
  const username = req.session?.user?.username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    await canUserPerformAction(username, "View Departments");

    const departments =
      await departmentService.getAllDepartmentsWithEmployees();
    res.json(departments);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const username = req.session?.user?.username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    await canUserPerformAction(username, "View Department Details");

    const department = await departmentService.getDepartmentDetails(
      req.params.id
    );
    res.json(department);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const username = req.session?.user?.username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    await canUserPerformAction(username, "Create Department");

    const newDep = await departmentService.createDepartment(req.body);
    res.status(201).json(newDep);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const username = req.session?.user?.username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    await canUserPerformAction(username, "Update Department");

    const updated = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const username = req.session?.user?.username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    await canUserPerformAction(username, "Delete Department");

    await departmentService.deleteDepartment(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

module.exports = router;
