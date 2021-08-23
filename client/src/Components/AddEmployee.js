import React, { useState } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Col, Row } from "react-bootstrap";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function AddEmployee({
  openAddEmployee,
  setOpenAddEmployee,
  employeesList,
  setEmployeesList,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const addToList = () => {
    console.log(firstName, lastName, department, jobTitle, location);
    let array = {
      first_name: firstName,
      last_name: lastName,
      department: department,
      job_title: jobTitle,
      location: location,
    };
    Axios.post("http://localhost:8000/employees", array).then((response) => {
      console.log(response);
      setEmployeesList([...employeesList, response.data.employee]);
      setOpenAddEmployee(false);
    });
  };
  return (
    <div>
      <Dialog open={openAddEmployee} onClose={() => setOpenAddEmployee(false)}>
        <DialogTitle>Add a new employee</DialogTitle>
        <DialogContent>
          <Row style={{ marginTop: 10, marginBottom: 10 }}>
            <Col>
              <TextField
                type="text"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                label="First Name"
                variant="outlined"
              />
            </Col>
            <Col>
              <TextField
                type="text"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                label="Last Name"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10, marginBottom: 10 }}>
            <Col>
              <FormControl variant="outlined" style={{ minWidth: 223 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                >
                  <MenuItem value={"Information Technology"}>
                    Information Technology
                  </MenuItem>
                  <MenuItem value={"Marketing"}>Marketing</MenuItem>
                  <MenuItem value={"Accounting"}>Accounting</MenuItem>
                  <MenuItem value={"Human Resources"}>Human Resources</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col>
              <TextField
                type="text"
                onChange={(event) => {
                  setJobTitle(event.target.value);
                }}
                label="Job Title"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10, marginBottom: 10 }}>
            <Col>
              <TextField
                type="text"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                label="Location"
                variant="outlined"
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button onClick={addToList} color="primary" autoFocus>
            Add
          </Button>
          <Button onClick={() => setOpenAddEmployee(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
