const router = require("express").Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getEmployees);

router.get("/employees/:id", employeeController.getEmployeeById);

router.post("/employees", employeeController.addEmployee);

router.delete("/employees/:id", employeeController.deleteEmployee);

router.put("/employees/:id", employeeController.updateEmployee);

module.exports = router;
