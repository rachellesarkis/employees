const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const EmployeeModel = require("./models/Employee");

const PORT = process.env.port || 8000;

app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://rachelle_dev:sGJiTaK2ml42uep3@directroy.kiiaw.mongodb.net/employees?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// ADD EMPLOYEE
app.post("/employees", async (req, res) => {
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
});

// GET ALL EMPLOYEES
app.get("/employees", async (req, res) => {
  EmployeeModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// GET EMPLOYEE BY ID
app.get("/employees/:id", (req, res) => {
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
});

// DELETE EMPLOYEE
app.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;

  await EmployeeModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

// UPDATE EMPLOYEE
app.put("/employees/:id", (req, res) => {
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
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
