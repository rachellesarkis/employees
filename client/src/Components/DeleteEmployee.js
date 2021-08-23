import React from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddEmployee({
  openDeleteEmployee,
  setOpenDeleteEmployee,
  employeesList,
  setEmployeesList,
  id,
}) {
  const deleteEmployee = () => {
    Axios.delete(`http://localhost:8000/employees/${id}`).then((response) => {
      console.log(response);
      const filteredArray = employeesList.filter((el) => el._id !== id);
      setEmployeesList(filteredArray);
    });
  };
  return (
    <div>
      <Dialog
        open={openDeleteEmployee}
        onClose={() => setOpenDeleteEmployee(false)}
      >
        <DialogTitle>
          Are you sure you want to delete this employee?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => deleteEmployee()} color="primary" autoFocus>
            Delete
          </Button>
          <Button onClick={() => setOpenDeleteEmployee(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
