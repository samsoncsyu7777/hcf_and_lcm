import React from "react";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { MyInput } from "./InputComponents";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const myQuestionStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      alignItems: 'flex-end',
    },
  },
  commonText: {
    fontSize: "2vw",
    margin: '0.5vw',
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
      textAlign: "center",
    },
  },
  okButton: {
    height: "3vw",
    width: "6vw",
    fontSize: "2vw",
    margin: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "6vw",
      width: "12vw",      
      fontSize: "4vw",
    },
  },
}));

export const MyQuestion = (props) => {
  const classes = myQuestionStyles();
  const { 
    questionTextLeft,
    setInputIntegersArray,
    inputIntegerFocusedIndex,
    inputIntegersArray,
    setInputIntegerFocusedIndex,
    handleChange,
    questionTextRight,
    okClick
   } = props; 

  return (
    <Grid className={classes.centerRow}>
        <Typography className={classes.commonText}>{questionTextLeft}</Typography>
        {
          inputIntegersArray.map((input, index) => {
            return <Grid key={index} style={{display: "flex"}}>
              <MyInput
                index={index}
                setInputValue={setInputIntegersArray}
                focusedIndex={inputIntegerFocusedIndex}
                inputsArray={inputIntegersArray}
                clickable={true}
                setFocusedIndex={setInputIntegerFocusedIndex}
                groupType="inputInteger"
                handleChange={handleChange}
              />
              {(inputIntegersArray.length - 1 > index) && <Typography className={classes.commonText}>,</Typography>}
            </Grid>
          })
        }
        <Typography className={classes.commonText}>{questionTextRight}</Typography>
        <Button
          className={classes.okButton}
          variant="contained"
          color="primary"
          onClick={okClick}
        >OK</Button>
      </Grid>
  )
}