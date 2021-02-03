import React from "react";
import {
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const headingSelectStyles = makeStyles((theme) => ({
  headingSelectRow: {
    direction: "row",
    display: "flex",
    padding: "0.5vw",
    paddingBottom: "1.4vh",
  },
  selectLabel: {
    fontSize: "1.8vw",
    color: myTheme.color.myBlack,
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.6vw",
    },
  },
  selectText: {
    fontSize: "1.4vw",
    color: myTheme.color.myBlue,
    height: "2vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.8vw",
      height: "4vw",
    },
  },
  selectWidth: {
    width: "12vw",
    [theme.breakpoints.down("xs")]: {
      width: "24vw",
    },
  },
  selectIcon: {
    fontSize: "2vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },
}));

export const HeadingSelect = ({ selectLabel, selectIndex, setItemIndex, itemsArray }) => {
  const handleSelect = (event, setItemIndex) => {
    setItemIndex(event.target.value);
  };

  const classes = headingSelectStyles();

  return (
    <Grid className={classes.headingSelectRow}>
      <InputLabel className={classes.selectLabel}>{selectLabel}:</InputLabel>
      <Select
        variant="outlined"
        className={`${classes.selectText} ${classes.selectWidth}`}
        inputProps={{
          classes: {
            icon: classes.selectIcon,
          },
        }}
        value={selectIndex}
        onChange={e => { handleSelect(e, setItemIndex) }}
      >
        {
          itemsArray.map((language, index) => {
            return <MenuItem className={classes.selectText} value={index}>{language}</MenuItem>
          })
        }
      </Select>
    </Grid>
  )
}