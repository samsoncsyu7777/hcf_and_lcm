import React from "react";
import {
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const alertSnackbarStyles = makeStyles((theme) => ({
  alert: {
    fontSize: "2vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSnackbar = ({ open, closeAlert, errorMessage, severity }) => {
  const classes = alertSnackbarStyles();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={closeAlert}
    >
      <Alert
        className={classes.alert}
        onClose={closeAlert}
        severity={severity}
      >
        <div>{errorMessage}</div>
      </Alert>
    </Snackbar>
  );
};