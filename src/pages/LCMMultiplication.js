import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { MyInput } from "../components/InputComponents";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyQuestion } from "../components/QuestionComponents";
import { StageButtons } from "../components/StageComponents";
import questions from "../questions/Questions";
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import { calculateMultiples, calculateResults } from "../functions/LCMFunctions";
import { pagesStyles } from "../themes/styles";

//×÷👍👍🏻
export const LCMMultiplication = ({ languageIndex, topic, learningTool }) => {
  const [inputIntegersArray, setInputIntegersArray] = useState([null, null]);
  const [inputIntegerFocusedIndex, setInputIntegerFocusedIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMultipleRows, setShowMultipleRows] = useState(false);
  const [firstMultiplesArray, setFirstMultiplesArray] = useState([]);
  const [secondMultiplesArray, setSecondMultiplesArray] = useState([]);
  const [firstInputsArray, setFirstInputsArray] = useState([]);
  const [secondInputsArray, setSecondInputsArray] = useState([]);
  const [firstArrayFocusedIndex, setFirstArrayFocusedIndex] = useState(0);
  const [secondArrayFocusedIndex, setSecondArrayFocusedIndex] = useState(0);
  const [numberOfArraysCorrect, setNumberOfArraysCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [severity, setSeverity] = useState("error");
  const numberOfArrays = 2;
  const [commonMultiplesArray, setCommonMultiplesArray] = useState([]);
  const [commonInputsArray, setCommonInputsArray] = useState([]);
  const [commonArrayFocusedIndex, setCommonArrayFocusedIndex] = useState(0);
  const [lcmResultArray, setLcmResultArray] = useState([null]);
  const [lcmInputArray, setLcmInputArray] = useState([null]);
  const [lcmArrayFocusedIndex, setLcmArrayFocusedIndex] = useState(0);
  const [wholeCompleted, setWholeCompleted] = useState(false);
  const [stageOrder, setStageOrder] = useState({ stage: 0, order: 0 });
  const timeDelay = 200;

  const stageText = ["階段", "阶段", "Stage", "Étape"];
  const manual = ["自擬題目", "自拟题目", "Personal Task", "Tâche personnelle"];

  const mustBeIntegerMessages = [
    "輸入的數必須是整數。",
    "输入的数必须是整数。",
    "The inputted numbers should be integers.",
    "Les nombres entrés doivent être des entiers."
  ];

  const mustBeInRangeMessage = [
    "輸入的數必須在1至99以內。",
    "输入的数必须在1至99以内。",
    "The inputted numbers should be in the range of 1 and 99.",
    "Les nombres saisis doivent être compris entre 1 et 99."
  ];

  const mustBeDifferentMessage = [
    "兩數必須不相同。",
    "两数必须不相同。",
    "The two integers should not be the same.",
    "Les deux nombres entiers ne devraient pas être identiques."
  ];

  const questionTextLeft = [
    "", "", "L.C.M.(Least Common Multiple) of ", "L.C.M.(Multiple moins commun) sur "
  ];

  const questionTextRight = [
    "的L.C.M.(最小公倍數)", "的L.C.M(最小公倍数)", "", ""
  ];

  const multipleTextLeft = [
    "", "", "Multiples of ", "Multiples de "
  ];

  const multipleTextRight = [
    "的倍數", "的倍数", "", ""
  ];

  const commonMultipleTextLeft = [
    "", "", "Common multiples of ", "Multiples communs de "
  ];

  const commonMultipleTextRight = [
    "的公倍數", "的公倍数", "", ""
  ];

  const commonMultipleHint = [
    "由小至大找出相同的倍數。",
    "由小至大找出相同的倍数。",
    "Find the common multiples from small to large.",
    "Trouvez les multiples communs de petit à grand."
  ];

  const lcmHint = [
    "在上行的公倍數中找出最小的一個。",
    "在上行的公倍数中找出最小的一个。",
    "Find the smallest one among the common multiples.",
    "Trouvez le plus petit parmi les multiples communs."
  ];

  const tryText = [
    "嘗試 ", "尝试 ", "Try ", "Essayer "
  ];

  const multiplesCorrectTextLeft = [
    "你成功列出", "你成功列出", "You successfully listed the multiples of ", "Vous avez répertorié avec succès les multiples de "
  ];

  const multiplesCorrectTextRight = [
    "的倍數。", "的倍数。", ".", "."
  ];

  const commonMultiplesCorrectText = [
    "你成功列出所有公倍數。",
    "你成功列出所有公倍数。",
    "You successfully list all common multiples.",
    "Vous avez réussi à répertorier tous les multiples communs."
  ];

  const lcmCorrectText = [
    "做得好!你求得正確的L.C.M.。",
    "做得好!你求得正确的L.C.M.。",
    "Well done! You got the right L.C.M..",
    "Bien joué! Vous avez le bon L.C.M.."
  ];

  useEffect(() => {
    if (questions.length === 0) {
      if (stageOrder === { stage: -1, order: 0 }) {
        setInputIntegersArray([null, null]);
      } else {
        setStageOrder({ stage: -1, order: 0 });
      }
    } else {
      if (stageOrder === { stage: 0, order: 0 }) {
        setQuestion(stageOrder.stage, stageOrder.order);
      } else {
        setStageOrder({ stage: 0, order: 0 });
      }
    }
  }, []);

  useEffect(() => {
    setShowMultipleRows(false);
    setShowResult(false);
    if (stageOrder.stage > -1) {
      setQuestion(stageOrder.stage, stageOrder.order);
    } else {
      setInputIntegersArray([0, 0]);
    }
  }, [stageOrder]);

  const handleStageClick = (stage) => {
    setStageOrder({ stage: stage, order: 0 });
  };

  const setQuestion = (
    stage,
    order
  ) => {
    setInputIntegersArray(questions[stage][order])
  };

  useEffect(() => {
    if (stageOrder.stage > -1 && inputIntegersArray[1] != null) {
      okClick();
    }
  }, [inputIntegersArray])

  function nextClick() {
    if (stageOrder.stage > -1) {
      if (
        stageOrder.order <
        questions[stageOrder.stage].length - 1
      ) {
        setStageOrder({ stage: stageOrder.stage, order: stageOrder.order + 1 });
      } else if (
        stageOrder.stage <
        questions.length - 1
      ) {
        setStageOrder({ stage: stageOrder.stage + 1, order: 0 });
      } else {
        setStageOrder({ stage: -1, order: 0 });
      }
    } else {
      setInputIntegersArray([0, 0]);
    }
  }

  const closeAlert = (e) => {
    setOpenAlert(false);
  };

  const handleChange = (e, focusedIndex, index, inputsArray, setInputValue, groupType, clickable) => {
    setOpenAlert(false);
    if (focusedIndex == index || clickable) {
      var tmpArray = [...inputsArray];
      tmpArray[index] = parseInt(e.target.value);
      setInputValue(tmpArray);
      switch (groupType) {
        case "inputInteger":
          setShowMultipleRows(false);
          setShowResult(false);
          break;
        case "firstMultiple":
          checkAnswer(index, e.target.value, firstMultiplesArray, setFirstArrayFocusedIndex);
          break;
        case "secondMultiple":
          checkAnswer(index, e.target.value, secondMultiplesArray, setSecondArrayFocusedIndex);
          break;
        case "commonMultiple":
          checkAnswer(index, e.target.value, commonMultiplesArray, setCommonArrayFocusedIndex, groupType);
          break;
        case "lcm":
          checkAnswer(index, e.target.value, lcmResultArray, setLcmArrayFocusedIndex, groupType);
          break;
      }
    }
  };

  function checkAnswer(index, value, multiplesArray, setAnswerFocusedIndex, groupType) {
    if (value == multiplesArray[index]) {
      if (groupType == "lcm") {
        setErrorMessage("👍🏻" + lcmCorrectText[languageIndex]);
        setWholeCompleted(true);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
      } else if (index == multiplesArray.length - 1) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
        if (groupType == "commonMultiple") {
          setErrorMessage("👍🏻" + commonMultiplesCorrectText[languageIndex]);
        } else {
          setErrorMessage("👍🏻" + multiplesCorrectTextLeft[languageIndex] + multiplesArray[multiplesArray.length - 1] + multiplesCorrectTextRight[languageIndex]);
          if (numberOfArraysCorrect == numberOfArrays - 1) {
            setShowResult(true);
          } else {
            setNumberOfArraysCorrect(numberOfArraysCorrect + 1);
          }
        }
      } else {
        setAnswerFocusedIndex(index + 1);
        setTimeout(() => {
          setOpenAlert(false);
        }, timeDelay);
      }
    } else {
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        if (groupType == "lcm") {
          setErrorMessage(lcmHint[languageIndex]);
        } else if (groupType == "commonMultiple") {
          setErrorMessage(commonMultipleHint[languageIndex]);
        } else if (index == 0) {
          var tryIntegerString = multiplesArray[0] + " ";
          setErrorMessage(tryText[languageIndex] + tryIntegerString);
        } else {
          var tryIntegerString = multiplesArray[index - 1] + "+" + multiplesArray[0];
          setErrorMessage(tryText[languageIndex] + tryIntegerString);
        }
      }
    }
  }

  const okClick = (e) => {
    if (inputIntegersArray[0] != parseInt(inputIntegersArray[0]) || inputIntegersArray[1] != parseInt(inputIntegersArray[1])) {
      setErrorMessage(mustBeIntegerMessages[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else if (inputIntegersArray[0] < 1 || inputIntegersArray[0] > 99 || inputIntegersArray[1] < 1 || inputIntegersArray[1] > 99) {
      setErrorMessage(mustBeInRangeMessage[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else if (inputIntegersArray[0] == inputIntegersArray[1]) {
      setErrorMessage(mustBeDifferentMessage[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else {
      setOpenAlert(false);
      setShowMultipleRows(false);
      setTimeout(() => {
        setShowMultipleRows(true);
      }, timeDelay);
      setFirstArrayFocusedIndex(0);
      setSecondArrayFocusedIndex(0);
      setNumberOfArraysCorrect(0);
      setShowResult(false);
      setCommonArrayFocusedIndex(0);
      setLcmInputArray([null]);
      setLcmArrayFocusedIndex(0);
      setWholeCompleted(false);
      var { multiplesArray, inputsArray } = calculateMultiples(inputIntegersArray[0], inputIntegersArray[1]);
      setFirstMultiplesArray(multiplesArray);
      setFirstInputsArray(inputsArray);
      var multiplesArray0 = multiplesArray;
      var { multiplesArray, inputsArray } = calculateMultiples(inputIntegersArray[1], inputIntegersArray[0]);
      setSecondMultiplesArray(multiplesArray);
      setSecondInputsArray(inputsArray);
      var multiplesArray1 = multiplesArray;
      var { multiplesArray, inputsArray } = calculateResults(multiplesArray0, multiplesArray1);
      setCommonMultiplesArray(multiplesArray);
      setCommonInputsArray(inputsArray);
      setLcmResultArray([multiplesArray[0]]);
    }
  };

  const classes = pagesStyles();

  return (
    <MyFrame topic={topic} learningTool={learningTool}>
      <Grid className={classes.spaceGrid} />
      {questions.length > 0 && (
        <StageButtons
          stageText={stageText[languageIndex] + "："}
          stages={Object.keys(questions)}
          handleStageClick={handleStageClick}
          stageState={stageOrder.stage}
          manual={manual[languageIndex]}
        />
      )}
      <Grid className={classes.spaceGrid} />
      <MyQuestion
        questionTextLeft={questionTextLeft[languageIndex]}
        setInputIntegersArray={setInputIntegersArray}
        inputIntegerFocusedIndex={inputIntegerFocusedIndex}
        inputIntegersArray={inputIntegersArray}
        setInputIntegerFocusedIndex={setInputIntegerFocusedIndex}
        handleChange={handleChange}
        questionTextRight={questionTextRight[languageIndex]}
        okClick={okClick}
      />
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
      {
        showMultipleRows && <Grid>
          <Grid className={classes.centerRow}>
            <Grid container className={classes.multiplesRows}>
              <Typography className={classes.commonText}>
                {multipleTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]}&nbsp;{multipleTextRight[languageIndex]}&nbsp;:
              </Typography>
              {
                firstInputsArray.map((multiple, index) => {
                  return <Grid key={index} style={{ display: "flex" }}>
                    <MyInput
                      index={index}
                      setInputValue={setFirstInputsArray}
                      focusedIndex={firstArrayFocusedIndex}
                      inputsArray={firstInputsArray}
                      clickable={false}
                      groupType="firstMultiple"
                      handleChange={handleChange}
                    />
                    <Typography className={classes.commonText}>{(firstInputsArray.length - 1 > index) ? "," : ",..."}</Typography>
                  </Grid>
                })
              }
            </Grid>
          </Grid>
          <Grid className={classes.centerRow}>
            <Grid container className={classes.multiplesRows}>
              <Typography className={classes.commonText}>
                {multipleTextLeft[languageIndex]}&nbsp;{inputIntegersArray[1]}&nbsp;{multipleTextRight[languageIndex]}&nbsp;:
              </Typography>
              {
                secondInputsArray.map((multiple, index) => {
                  return <Grid key={index} style={{ display: "flex" }}>
                    <MyInput
                      index={index}
                      setInputValue={setSecondInputsArray}
                      focusedIndex={secondArrayFocusedIndex}
                      inputsArray={secondInputsArray}
                      clickable={false}
                      groupType="secondMultiple"
                      handleChange={handleChange}
                    />
                    <Typography className={classes.commonText}>{(secondInputsArray.length - 1 > index) ? "," : ",..."}</Typography>
                  </Grid>
                })
              }
            </Grid>
          </Grid>
        </Grid>
      }
      {
        showResult && <Grid >
          <Grid className={classes.centerRow}>
            <Grid className={classes.multiplesRows}>
              <Paper >
                <Grid container className={classes.multiplesRows}>
                  <Typography className={classes.commonText}>
                    {commonMultipleTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{commonMultipleTextRight[languageIndex]}&nbsp;:
                  </Typography>
                  {
                    commonInputsArray.map((multiple, index) => {
                      return <Grid key={index} style={{ display: "flex" }}>
                        <MyInput
                          index={index}
                          setInputValue={setCommonInputsArray}
                          focusedIndex={commonArrayFocusedIndex}
                          inputsArray={commonInputsArray}
                          clickable={false}
                          groupType="commonMultiple"
                          handleChange={handleChange}
                        />
                        <Typography className={classes.commonText}>{(commonInputsArray.length - 1 > index) ? "," : ",..."}</Typography>
                      </Grid>
                    })
                  }
                </Grid>
                <Grid container className={classes.multiplesRows}>
                  <Typography className={classes.commonText}>
                    {questionTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{questionTextRight[languageIndex]}&nbsp;:
                  </Typography>
                  <MyInput
                    index={0}
                    setInputValue={setLcmInputArray}
                    focusedIndex={lcmArrayFocusedIndex}
                    inputsArray={lcmInputArray}
                    clickable={false}
                    groupType="lcm"
                    handleChange={handleChange}
                  />
                  {
                    wholeCompleted && <Button
                      className={classes.okButton}
                      variant="contained"
                      onClick={nextClick}
                      color="primary"
                    ><ForwardRoundedIcon className={classes.resetArrow} /></Button>
                  }
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      }
    </MyFrame>
  );
}
