import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const myInputStyles = makeStyles((theme) => ({
  myInputText: {
    width: "6vw",
    height: "2.4vw",
    fontSize: "2vw",
    margin: "0.5vw",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      width: "12vw",
      height: "4.8vw",
      fontSize: "4vw",
    },
  },
}));

export const MyInput = ({ index, setInputValue, focusedIndex, inputsArray, setFocusedIndex, clickable, groupType, handleChange, highlighted }) => {

  const inputClick = (e) => {
    if (clickable) {
      setFocusedIndex(index);
    }
  }

  const classes = myInputStyles();
  var bgColor = highlighted? myTheme.color.myYellow: (index == focusedIndex) ? myTheme.color.myPink : myTheme.color.myWhite;

  return (
      <input
        className={classes.myInputText}
        style={{ backgroundColor: bgColor }}
        placeholder={(groupType == "inputInteger")? "1~99": ""}
        value={inputsArray[index] == 0? "": inputsArray[index]}
        step="1"
        max="999"
        min="1"
        type="number"
        disabled={(index == focusedIndex || clickable) ? "" : "disabled"}
        onClick={e => { inputClick(e) }}
        onChange={e => { handleChange(e, focusedIndex, index, inputsArray, setInputValue, groupType, clickable) }}
      />
  )
}

