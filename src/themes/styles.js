import { makeStyles} from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";

export const pagesStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  commonText: {
    fontSize: "2vw",
    margin: '0.5vw',
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },
  divisionColomn: {
    margin: "2vw",
  },
  divisionInsideColumn: {
    width: "30vw",
    [theme.breakpoints.down("xs")]: {
      width: "50vw",
    },
  },
  divisionInsideWideColumn: {
    width: "40vw",
    [theme.breakpoints.down("xs")]: {
      width: "60vw",
    },
  },
  divisionRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  factorsRows: {
    width: "80vw",
    [theme.breakpoints.down("xs")]: {
      width: "95vw",
    },
  },
  multiplesRows: {
    width: "80vw",
    [theme.breakpoints.down("xs")]: {
      width: "95vw",
    },
  },
/*  okButton: {
    height: "3vw",
    width: "6vw",
    fontSize: "2vw",
    margin: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "6vw",
      width: "12vw",
      fontSize: "4vw",
    },
  },*/
  completeButton: {
    height: "3vw",
    width: "7vw",
    fontSize: "1vw",
    margin: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "6vw",
      width: "14vw",
      fontSize: "2vw",
    },
  },
}));