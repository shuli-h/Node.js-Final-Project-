const express = require("express");
const router = express.Router();
const employeeService = require("../services/employeeService");
const { canUserPerformAction } = require("../services/userActionService");

router.get("/", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    await canUserPerformAction(username, "View Employees List");
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    await canUserPerformAction(username, "View Employee by ID");
    const employee = await employeeService.getEmployeeById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    await canUserPerformAction(username, "Add New Employee");
    const newEmployee = await employeeService.addNewEmployee(req.body);
    res.json(newEmployee);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    await canUserPerformAction(username, "Update Employee");
    const id = req.params.id.trim();
    const updateEmployee = await employeeService.updateEmployees(id, req.body);

    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(updateEmployee);
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const username = req.session?.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    await canUserPerformAction(username, "Delete Employee");
    const id = req.params.id.trim();
    const deletedEmployee = await employeeService.deleteEmployee(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
