import { useState, useEffect } from "react";
import Axios from "axios";
import EmployeeCard from "./EmployeeCard";
import { Container, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import AddEmployee from "./AddEmployee";
import QueueIcon from "@material-ui/icons/Queue";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function Employees() {
  const [employeesList, setEmployeesList] = useState([]);
  const [clone, setClone] = useState([]);

  const [openAddEmployee, setOpenAddEmployee] = useState(false);

  const handleInputChange = (e) => {
    let updateList = clone;
    updateList = updateList.filter((item) => {
      return (
        item.first_name.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1 ||
        item.last_name.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1 ||
        item.department.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1
      );
    });

    setEmployeesList(updateList);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/employees").then((response) => {
      console.log(response);
      setEmployeesList(response.data);
      setClone(response.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddEmployee(true)}
          style={{ marginTop: 20 }}
        >
          Add new Employee &nbsp; <QueueIcon style={{ width: 20 }} />
        </Button>
        <AddEmployee
          openAddEmployee={openAddEmployee}
          setOpenAddEmployee={setOpenAddEmployee}
          employeesList={employeesList}
          setEmployeesList={setEmployeesList}
        />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <TextField
          size="small"
          name="search"
          style={{ width: 450 }}
          onChange={(e) => handleInputChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Search by Name or Department"
          type="text"
        />
      </Row>
      <Row style={{ marginTop: 10 }}>
        Total Employees: {employeesList.length}
      </Row>

      <Row>
        {employeesList.map((employee) => (
          <EmployeeCard
            key={employee._id}
            employee={employee}
            employeesList={employeesList}
            setEmployeesList={setEmployeesList}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Employees;
