import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const myFrameStyles = makeStyles((theme) => ({
  frame: {

  },
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  topic: {
    fontSize: "2.4vw",
    color: myTheme.color.myOrange,
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.8vw",
      textAlign: "center",
    },
  },
  learningTool: {
    fontSize: "1.6vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.2vw",
    },
  },
}));

export const MyFrame = (props) => {
  const classes = myFrameStyles();
  const { children, topic, learningTool, ...otherProps } = props; 

  return (
    <Grid className={classes.frame} {...otherProps}>
      <Grid className={classes.centerRow}>
        <Typography className={classes.topic}>{topic}</Typography>
      </Grid>
      <Grid className={classes.centerRow}>
        <Typography className={classes.learningTool}>{learningTool}</Typography>
      </Grid>
      {children}
    </Grid>
  )
}