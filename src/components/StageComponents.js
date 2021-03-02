import React from "react";
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
const stageButtonsStyles = makeStyles(() =>
  createStyles({
    centerRow: {
      display: "flex",
      justifyContent: "center",
    },
    verticalCenterRow: {
      display: "flex",
      alignItems: "center",
    },
    stageText: {
      fontSize: 20,
      color: myTheme.color.myBlue,
    },
  })
);

export const StageButtons = ({
  stageText,
  stages,
  handleStageClick,
  stageState,
  manual,
}) => {
  const classes = stageButtonsStyles();
  const buttonsInLine = 7;
  let linesOfStages = [0];
  if (stages.length > buttonsInLine) {
    linesOfStages.push(1);
  }
  return (
    <Grid>
      <Grid
        container
        className={`${classes.centerRow} ${classes.verticalCenterRow}`}
      >
        <Typography className={classes.stageText}>{stageText}</Typography>
        {linesOfStages.map((line, lineIndex) => {
          return <ButtonGroup key={line} size="small" color="primary" aria-label="outlined primary button group">
          {stages.map((stage, index) => {
            let color =
              stageState === parseInt(stage) ? "secondary" : "primary";
            let bgColor =
              stageState === parseInt(stage) ? myTheme.color.myYellow : "";
            return (
              index >= line * buttonsInLine && index < (line + 1) * buttonsInLine && <Button
                key={parseInt(stage)}
                color={color}
                style={{ backgroundColor: bgColor }}
                onClick={() => handleStageClick(parseInt(stage))}
              >
                {parseInt(stage) + 1}
              </Button>
            );
          })}
        </ButtonGroup>
        })}
        <Button
          size="small"
          variant="outlined"
          color={stageState === -1 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -1 ? myTheme.color.myYellow : "",
          }}
          onClick={() => handleStageClick(-1)}
        >
          {manual}
        </Button>
      </Grid>
    </Grid>
  );
};
