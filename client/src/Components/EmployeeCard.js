import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteEmployee from "./DeleteEmployee";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
});

function EmployeeCard({ employee, employeesList, setEmployeesList }) {
  const classes = useStyles();
  const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {employee.first_name} {employee.last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <SupervisedUserCircleIcon /> {employee.department}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <WorkIcon /> {employee.job_title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <LocationOnIcon /> {employee.location}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/employee/${employee._id}`}>
            <Button size="small" color="primary">
              Edit
            </Button>
          </Link>
          <Button
            size="small"
            color="secondary"
            onClick={() => setOpenDeleteEmployee(true)}
          >
            Delete
          </Button>
          <DeleteEmployee
            openDeleteEmployee={openDeleteEmployee}
            setOpenDeleteEmployee={setOpenDeleteEmployee}
            employeesList={employeesList}
            id={employee._id}
            setEmployeesList={setEmployeesList}
          />
        </CardActions>
      </Card>
    </>
  );
}

export default EmployeeCard;
