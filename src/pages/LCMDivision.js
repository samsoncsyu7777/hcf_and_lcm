import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { MyInput } from "../components/InputComponents";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyQuestion } from "../components/QuestionComponents";
import { StageButtons } from "../components/StageComponents";
import questions from "../questions/Questions";
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import { calculateFactors, calculateResults } from "../functions/HCFPrimeFunctions";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import { pagesStyles } from "../themes/styles";

//×÷👍👍🏻
export const LCMDivision = ({ languageIndex, topic, learningTool }) => {
  const [inputIntegersArray, setInputIntegersArray] = useState([null, null]);
  const [inputIntegerFocusedIndex, setInputIntegerFocusedIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDivisionColomns, setShowDivisionColomns] = useState(false);
  const [divisorsArray, setDivisorsArray] = useState([]);
  const [firstQuotientsArray, setFirstQuotientsArray] = useState([]);
  const [secondQuotientsArray, setSecondQuotientsArray] = useState([]);
  const [divisorFocusedIndex, setDivisorFocusedIndex] = useState(0);
  const [firstQuotientFocusedIndex, setFirstQuotientFocusedIndex] = useState(0);
  const [secondQuotientFocusedIndex, setSecondQuotientFocusedIndex] = useState(0);
  const [numberOfQuotientCorrect, setNumberOfQuotientCorrect] = useState(0);
  const [divisionCompleted, setDivisionCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [commonFactorsArray, setCommonFactorsArray] = useState([]);
  const [commonInputsArray, setCommonInputsArray] = useState([]);
  const [commonArrayFocusedIndex, setCommonArrayFocusedIndex] = useState(0);
  const [lcmResultArray, setLcmResultArray] = useState([null]);
  const [lcmInputArray, setLcmInputArray] = useState([null]);
  const [lcmArrayFocusedIndex, setLcmArrayFocusedIndex] = useState(0);
  const [primeNumbers, setPrimeNumbers] = useState([]);
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
    "", "", "L.C.M.(Highest/Greatest Common Factor) of ", "L.C.M.(Facteur commun le plus élevé / le plus grand) sur "
  ];

  const questionTextRight = [
    "的L.C.M.(最大公因數)", "的L.C.M.(最大公因数)", "", ""
  ];

  const mustBeAPrimeText = [
    "進行質因數分解時，你需要運用質數，例如2,3,5,7,...。",
    "进行质因数分解时，你需要运用质数，例如2,3,5,7,...。",
    "When performing prime factorization, you need to use prime numbers, such as 2,3,5,7,....",
    "Lors de la factorisation des nombres premiers, vous devez utiliser des nombres premiers, tels que 2,3,5,7,...."
  ];

  const mustBeAFactorTextLeft = [
    "這數必須是", "这数必须是", "This number must be a factor of ", "Ce nombre doit être un facteur de "
  ];

  const mustBeAFactorTextRight = [
    "的因數。", "的因数。", ".", "."
  ];

  const quotientIsAPrimeQuestionLeft = [
    "如果再找不到任何質數來整除",
    "如果再找不到任何质数来整除",
    "If you can't find any prime numbers to divide ",
    "Si vous ne trouvez pas de nombres premiers à diviser "
  ];

  const quotientIsAPrimeQuestionRight = [
    "，請按", "，请按", ", please press ", ", veuillez appuyer sur "
  ];

  const completeButtonText = [
    "完成", "完成", "Completed", "Terminé"
  ];

  const divisionCompletedText = [
    "這兩數是互質，已不能再同時被一個質數整除。你完成這質因數分解的短除。",
    "这两数是互质，已不能再同时被一个质数整除。你完成这质因数分解的短除。",
    "These two numbers are relatively prime and can no longer be divisible by a prime number at the same time. You completed this short division of prime factorization.",
    "Ces deux nombres sont relativement premiers et ne peuvent plus être divisibles par un nombre premier en même temps. Vous avez terminé cette courte division de la factorisation des nombres premiers."
  ];

  const divisionIncompleteHint = [
    "這兩數仍可被一些質數同時整除。",
    "这两数仍可被一些质数同时整除。",
    "These two numbers are still divisible by some prime numbers at the same time.",
    "Ces deux nombres sont toujours divisibles par quelques nombres premiers en même temps."
  ];

  const commonFactorTextLeft = [
    "綜合", "綜合", "Combining all factors of ", "Combinant tous les facteurs de "
  ];

  const commonFactorTextRight = [
    "的所有因數", "的所有因数", "", ""
  ];

  const commonFactorHint = [
    "由小至大寫出兩數的所有因數(黃色方格)。",
    "由小至大写出两数的所有因数(黄色方格)。",
    "Write all the factors of the two numbers from small to large (yellow blocks).",
    "Écrivez tous les facteurs des deux nombres de petit à grand (blocs jaunes)."
  ];

  const tryText = [
    "嘗試 ", "尝试 ", "Try ", "Essayer "
  ];

  const commonFactorsCorrectText = [
    "你成功寫出兩數的所有因數",
    "你成功写出两数的所有因数",
    "You successfully write all the factors of the two numbers.",
    "Vous écrivez avec succès tous les facteurs des deux nombres."
  ];

  const lcmHint = [
    "把上行所有因數乘起來。",
    "把上行所有因数乘起来。",
    "Multiply all the factors above.",
    "Multipliez tous les facteurs ci-dessus."
  ];

  const lcmCorrectText = [
    "做得好!你求得正確的L.C.M.。",
    "做得好!你求得正确的L.C.M.。",
    "Well done! You got the right L.C.M.。",
    "Bien joué! Vous avez le bon L.C.M.。"
  ];

  useEffect(() => {
    setPrimeNumbers(getPrimeNumbers());
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
    setShowDivisionColomns(false);
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
          setShowDivisionColomns(false);
          setShowResult(false);
          break;
        case "commonFactor":
          checkAnswer(index, e.target.value, commonFactorsArray, setCommonArrayFocusedIndex, groupType);
          break;
        case "lcm":
          checkAnswer(index, e.target.value, lcmResultArray, setLcmArrayFocusedIndex, groupType);
          break;
        case "divisor":
          checkDivisor(index, e.target.value, firstQuotientsArray[index], secondQuotientsArray[index], setDivisorFocusedIndex);
          break;
        case "firstQuotient":
          checkQuotient(index, e.target.value, divisorsArray, firstQuotientsArray, setDivisorsArray, setFirstQuotientsArray, setFirstQuotientFocusedIndex, secondQuotientsArray, setSecondQuotientsArray, setSecondQuotientFocusedIndex);
          break;
        case "secondQuotient":
          checkQuotient(index, e.target.value, divisorsArray, secondQuotientsArray, setDivisorsArray, setSecondQuotientsArray, setSecondQuotientFocusedIndex, firstQuotientsArray, setFirstQuotientsArray, setFirstQuotientFocusedIndex);
          break;
      }
    }
  };

  function checkDivisor(index, value, firstQuotient, secondQuotient, setAnswerFocusedIndex) {
    //correct divisor
    if (firstQuotient % value == 0 && secondQuotient % value == 0) {//} && value > 1 && value < quotient) {
      if (primeNumbers.includes(parseInt(value))) {
        setTimeout(() => {
          setAnswerFocusedIndex(index + 1);
          setOpenAlert(false);
        }, 50);
      } else {
        //not a prime factor
        setOpenAlert(false);
        if (value > 0) {
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("error");
          setErrorMessage(mustBeAPrimeText[languageIndex]);
        }
      }
    } else {
      //not a factor
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        setErrorMessage(mustBeAFactorTextLeft[languageIndex] + firstQuotient + "," + secondQuotient + mustBeAFactorTextRight[languageIndex]);
      }
    }
  }

  function checkQuotient(index, value, divisorsArray, quotientsArray, setDivisorsArray, setQuotientsArray, setAnswerFocusedIndex, anotherQuotientsArray, setAnotherQuotientsArray, setAnotherQuotientFocusedIndex) {
    if (divisorFocusedIndex == index) {
      //correct quotient
      setTimeout(() => {
        setOpenAlert(false);
      }, timeDelay);
      if (value == quotientsArray[index - 1] / divisorsArray[index - 1] && divisorsArray[index - 1] != 1) {
        if (numberOfQuotientCorrect == 0) {
          setNumberOfQuotientCorrect(1);
          setAnswerFocusedIndex(index + 1);
        } else {
          setTimeout(() => {
            var tmpDivisorsArray = [...divisorsArray];
            var tmpQuotientsArray = [...quotientsArray];
            var tmpAnotherQuotientsArray = [...anotherQuotientsArray];
            tmpQuotientsArray[index] = parseInt(value);
            tmpDivisorsArray.push(null);
            tmpQuotientsArray.push(null);
            tmpAnotherQuotientsArray.push(null);
            setDivisorsArray(tmpDivisorsArray);
            setQuotientsArray(tmpQuotientsArray);
            setAnotherQuotientsArray(tmpAnotherQuotientsArray);
            setAnswerFocusedIndex(index + 1);
            setAnotherQuotientFocusedIndex(index + 1);
            setNumberOfQuotientCorrect(0);
          }, 50);
        }
      } else {
        //incorrect quotient
        setOpenAlert(false);
        if (value > 0) {
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("error");
          setErrorMessage(quotientsArray[index - 1] + " ÷ " + divisorsArray[index - 1] + " = ?");
        }
      }
    }
  }

  function checkAnswer(index, value, factorsArray, setAnswerFocusedIndex, groupType, inputInteger) {
    //correct factor
    if (value == factorsArray[index]) {
      if (groupType == "lcm") {
        setErrorMessage("👍🏻" + lcmCorrectText[languageIndex]);
        setWholeCompleted(true);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
      } else if (index == factorsArray.length - 1) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
        setErrorMessage("👍🏻" + commonFactorsCorrectText[languageIndex]);
      } else {
        setAnswerFocusedIndex(index + 1);
        setTimeout(() => {
          setOpenAlert(false);
        }, timeDelay);
      }
      //incorrect factor
    } else {
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        if (groupType == "lcm") {
          setErrorMessage(lcmHint[languageIndex]);
        } else if (groupType == "commonFactor") {
          setErrorMessage(commonFactorHint[languageIndex]);
        }
      }
    }
  }

  const completeClick = (e, firstQuotient, secondQuotient) => {
    if (inputIntegersArray[1] * firstQuotient == lcmResultArray[0] && inputIntegersArray[0] * secondQuotient == lcmResultArray[0]) {
      setDivisionCompleted(true);
      setErrorMessage("👍🏻" + divisionCompletedText[languageIndex]);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      setShowResult(true);
    } else {
      setErrorMessage(divisionIncompleteHint[languageIndex]);
      setSeverity("error");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    }
  };

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
      setShowDivisionColomns(false);
      setTimeout(() => {
        setShowDivisionColomns(true);
      }, 200);
      setDivisorsArray([null, null]);
      setFirstQuotientsArray([inputIntegersArray[0], null]);
      setSecondQuotientsArray([inputIntegersArray[1], null]);
      setDivisorFocusedIndex(0);
      setFirstQuotientFocusedIndex(1);
      setSecondQuotientFocusedIndex(1);
      setNumberOfQuotientCorrect(0);
      setDivisionCompleted(false);
      setShowResult(false);
      setCommonArrayFocusedIndex(0);
      setLcmInputArray([null]);
      setLcmArrayFocusedIndex(0);
      setWholeCompleted(false);
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[0], primeNumbers);
      var factorsArray0 = factorsArray;
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[1], primeNumbers);
      var factorsArray1 = factorsArray;
      var { factorsArray, inputsArray } = calculateResults(factorsArray0, factorsArray1);
      var tmpHcf = 1;
      var i;
      for (i = 0; i < factorsArray.length; i++) {
        tmpHcf *= factorsArray[i];
      }
      var tmpFactorsArray = factorsArray;
      var tmpInputsArray = inputsArray;
      if (factorsArray[0] == 1) {
        tmpFactorsArray.pop();
        tmpInputsArray.pop();
      }
      tmpFactorsArray.push(inputIntegersArray[0] / tmpHcf);
      tmpFactorsArray.push(inputIntegersArray[1] / tmpHcf);
      tmpInputsArray.push(null);
      tmpInputsArray.push(null);
      tmpFactorsArray.sort((a, b) => a - b);
      setCommonFactorsArray(tmpFactorsArray);
      setCommonInputsArray(tmpInputsArray);
      var tmpLcm = inputIntegersArray[0] * inputIntegersArray[1] / tmpHcf;
      setLcmResultArray([tmpLcm]);
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
        showDivisionColomns &&
        <Grid className={classes.centerRow}>
          <Grid className={classes.divisionColomn}>
            <Grid className={classes.divisionInsideWideColumn}>
              {
                divisorsArray.map((divisor, index) => {
                  return <Grid key={index} className={classes.divisionRow}>
                    {
                      ((index < divisorsArray.length - 2) || ((index == divisorsArray.length - 2) && !divisionCompleted)) &&
                      <Box
                        border={0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setDivisorsArray}
                          focusedIndex={divisorFocusedIndex}
                          inputsArray={divisorsArray}
                          clickable={false}
                          groupType="divisor"
                          handleChange={handleChange}
                          highlighted={divisionCompleted}
                        />
                      </Box>
                    }
                    {
                      ((index < divisorsArray.length - 1) || ((index == divisorsArray.length - 1) && !divisionCompleted)) &&
                      <Box
                        borderBottom={(index < divisorsArray.length - 2) || (index == divisorsArray.length - 2 && (!divisionCompleted) || index == 0) ? 2 : 0}
                        borderLeft={(index < divisorsArray.length - 2) || (index == divisorsArray.length - 2 && (!divisionCompleted) || index == 0) ? 2 : 0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setFirstQuotientsArray}
                          focusedIndex={firstQuotientFocusedIndex}
                          inputsArray={firstQuotientsArray}
                          clickable={false}
                          groupType="firstQuotient"
                          handleChange={handleChange}
                          highlighted={(index == divisorsArray.length - 2) && divisionCompleted}
                        />
                        <MyInput
                          index={index}
                          setInputValue={setSecondQuotientsArray}
                          focusedIndex={secondQuotientFocusedIndex}
                          inputsArray={secondQuotientsArray}
                          clickable={false}
                          groupType="secondQuotient"
                          handleChange={handleChange}
                          highlighted={(index == divisorsArray.length - 2) && divisionCompleted}
                        />
                      </Box>
                    }
                  </Grid>
                })
              }
            </Grid>
            <Grid className={classes.centerRow}>
              <Typography className={classes.commonText}>
                {quotientIsAPrimeQuestionLeft[languageIndex]}
                {firstQuotientsArray[firstQuotientFocusedIndex - 1]},&nbsp;{secondQuotientsArray[secondQuotientFocusedIndex - 1]}
                {quotientIsAPrimeQuestionRight[languageIndex]}
              </Typography>
              <Button
                className={classes.completeButton}
                variant="contained"
                color="primary"
                onClick={e => { completeClick(e, firstQuotientsArray[firstQuotientFocusedIndex - 1], secondQuotientsArray[secondQuotientFocusedIndex - 1]) }}
              >
                {completeButtonText[languageIndex]}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      }
      {
        showResult && <Grid >
          <Grid className={classes.centerRow}>
            <Grid className={classes.factorsRows}>
              <Paper >
                <Grid container className={classes.factorsRows}>
                  <Typography className={classes.commonText}>
                    {commonFactorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{commonFactorTextRight[languageIndex]}&nbsp;:
                  </Typography>
                  {
                    commonInputsArray.map((factor, index) => {
                      return <Grid key={index} style={{ display: "flex" }}>
                        {(index > 0) && <Typography className={classes.commonText}>×</Typography>}
                        <MyInput
                          index={index}
                          setInputValue={setCommonInputsArray}
                          focusedIndex={commonArrayFocusedIndex}
                          inputsArray={commonInputsArray}
                          clickable={false}
                          groupType="commonFactor"
                          handleChange={handleChange}
                        />
                      </Grid>
                    })
                  }
                </Grid>
                <Grid container className={classes.factorsRows}>
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
