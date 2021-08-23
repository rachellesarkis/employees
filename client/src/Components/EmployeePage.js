import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import SuccessBar from "./SuccessBar";

const EmployeePage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    department: "",
    job_title: "",
    location: "",
  });

  const updateEmployee = () => {
    Axios.put(`http://localhost:8000/employees/${id}`, employee).then(
      (response) => {
        console.log(response);
        setOpenBar(true);
      }
    );
  };

  useEffect(() => {
    Axios.get(`http://localhost:8000/employees/${id}`).then((response) => {
      setEmployee(response.data);
      console.log(response.data);
    });
  }, [id]);

  const [openBar, setOpenBar] = React.useState(false);

  return (
    <Container>
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col md={2}>First Name: </Col>
        <Col md={10}>
          <TextField
            type="text"
            onChange={(e) =>
              setEmployee({ ...employee, first_name: e.target.value })
            }
            value={employee.first_name}
            variant="outlined"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col md={2}>Last Name: </Col>
        <Col md={10}>
          <TextField
            type="text"
            onChange={(e) =>
              setEmployee({ ...employee, last_name: e.target.value })
            }
            value={employee.last_name}
            variant="outlined"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col md={2}>Department: </Col>
        <Col md={10}>
          <FormControl variant="outlined" style={{ minWidth: 223 }}>
            <Select
              value={employee.department}
              onChange={(e) => {
                setEmployee({ ...employee, department: e.target.value });
              }}
            >
              <MenuItem value={"Information Technology"}>
                Information Technology
              </MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
              <MenuItem value={"Accounting"}>Accounting</MenuItem>
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col md={2}>Job Title: </Col>
        <Col md={10}>
          <TextField
            type="text"
            onChange={(e) =>
              setEmployee({ ...employee, job_title: e.target.value })
            }
            value={employee.job_title}
            variant="outlined"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col md={2}>Location: </Col>
        <Col md={10}>
          <TextField
            type="text"
            onChange={(e) =>
              setEmployee({ ...employee, location: e.target.value })
            }
            value={employee.location}
            variant="outlined"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateEmployee()}
            style={{ marginTop: 20 }}
          >
            Update Employee
          </Button>
        </Col>
      </Row>
      <SuccessBar openBar={openBar} setOpenBar={setOpenBar} />
    </Container>
  );
};

export default EmployeePage;
