const EmployeeModel = require("../models/Employee");

const emplopyeeController = {
  // GET ALL EMPLOYEES
  getEmployees: async (req, res) => {
    EmployeeModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },

  // GET EMPLOYEE BY ID
  getEmployeeById: async (req, res) => {
    const id = req.params.id;
    EmployeeModel.findById(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  // ADD EMPLOYEE
  addEmployee: async (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const department = req.body.department;
    const job_title = req.body.job_title;
    const location = req.body.location;
    const employee = new EmployeeModel({
      first_name: first_name,
      last_name: last_name,
      department: department,
      job_title: job_title,
      location: location,
    });

    try {
      await employee.save();
      res.json({ message: "Employee Sucessfully Added", employee });
    } catch (err) {
      console.log(err);
    }
  },

  // DELETE EMPLOYEE
  deleteEmployee: async (req, res) => {
    const id = req.params.id;

    await EmployeeModel.findByIdAndRemove(id).exec();
    res.send("deleted");
  },

  // UPDATE EMPLOYEE
  updateEmployee: async (req, res) => {
    const id = req.params.id;
    EmployeeModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          department: req.body.department,
          job_title: req.body.job_title,
          location: req.body.location,
        },
      }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};

module.exports = emplopyeeController;
