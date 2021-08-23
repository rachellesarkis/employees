import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SuccessBar({ openBar, setOpenBar }) {
  return (
    <div>
      <Snackbar
        open={openBar}
        autoHideDuration={6000}
        onClose={() => setOpenBar(false)}
      >
        <Alert onClose={() => setOpenBar(false)} severity="success">
          Employee successfully updated!
        </Alert>
      </Snackbar>
    </div>
  );
}
