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
import { calculateFactors } from "../functions/HCFPrimeFunctions";
import { calculateResults } from "../functions/LCMPrimeFunctions";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import { pagesStyles } from "../themes/styles";

//×÷👍👍🏻
export const LCMPrimeFactorization = ({ languageIndex, topic, learningTool }) => {
  const [inputIntegersArray, setInputIntegersArray] = useState([null, null]);
  const [inputIntegerFocusedIndex, setInputIntegerFocusedIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDivisionColomns, setShowDivisionColomns] = useState(false);
  const [firstDivisorsArray, setFirstDivisorsArray] = useState([]);
  const [firstQuotientsArray, setFirstQuotientsArray] = useState([]);
  const [secondDivisorsArray, setSecondDivisorsArray] = useState([]);
  const [secondQuotientsArray, setSecondQuotientsArray] = useState([]);
  const [firstDivisorFocusedIndex, setFirstDivisorFocusedIndex] = useState(0);
  const [secondDivisorFocusedIndex, setSecondDivisorFocusedIndex] = useState(0);
  const [firstQuotientFocusedIndex, setFirstQuotientFocusedIndex] = useState(0);
  const [secondQuotientFocusedIndex, setSecondQuotientFocusedIndex] = useState(0);
  const [firstDivisionCompleted, setFirstDivisionCompleted] = useState(false);
  const [secondDivisionCompleted, setSecondDivisionCompleted] = useState(false);
  const [showFactorsColomns, setShowFactorsColomns] = useState(false);
  const [firstFactorsArray, setFirstFactorsArray] = useState([]);
  const [secondFactorsArray, setSecondFactorsArray] = useState([]);
  const [firstInputsArray, setFirstInputsArray] = useState([]);
  const [secondInputsArray, setSecondInputsArray] = useState([]);
  const [firstArrayFocusedIndex, setFirstArrayFocusedIndex] = useState(0);
  const [secondArrayFocusedIndex, setSecondArrayFocusedIndex] = useState(0);
  const [numberOfArraysCorrect, setNumberOfArraysCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [severity, setSeverity] = useState("error");
  const numberOfArrays = 2;
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
    "", "", "L.C.M.(Least Common Multiple) of ", "L.C.M.(Multiple moins commun) sur "
  ];

  const questionTextRight = [
    "的L.C.M.(最小公倍數)", "的L.C.M.(最小公倍数)", "", ""
  ];

  const factorTextLeft = [
    "", "", "Prime factorization of ", "Factorisation prime de "
  ];

  const factorTextRight = [
    "的質因數分解", "的质因数分解", "", ""
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
    "如果", "如果", "If ", "Si "
  ];

  const quotientIsAPrimeQuestionRight = [
    "是質數，請按", "是质数，请按", " is a prime number, please press ", " est un nombre premier, veuillez appuyer sur "
  ];

  const completeButtonText = [
    "完成", "完成", "Completed", "Terminé"
  ];

  const divisionCompletedText = [
    "這是質數，不能再被2,3,5,7,...整除。你完成這質因數分解的短除。",
    "这是质数，不能再被2,3,5,7,...整除。你完成这质因数分解的短除。",
    "This is a prime number and can no longer be divisible by 2,3,5,7,... You completed this short division of prime factorization.",
    "C'est un nombre premier et ne peut plus être divisible par 2,3,5,7,... Vous avez terminé cette courte division de la factorisation des nombres premiers."
  ];

  const divisionIncompleteHint = [
    "這數是一個合成數，仍可以被一些質數整除。",
    "这数是一个合成数，仍可以被一些质数整除。",
    "This number is a composite number, still divisible by some prime numbers.",
    "Ce nombre est un nombre composé, toujours divisible par quelques nombres premiers."
  ];

  const primeFactorHint = [
    "把上面的質因數(黃色方格)由小至大列寫出來。",
    "把上面的质因数(黄色方格)由小至大列写出来。",
    "Write down the prime factors above (yellow blocks) from small to large.",
    "Notez les facteurs premiers ci-dessus (blocs jaunes) de petit à grand."
  ];

  const commonFactorTextLeft = [
    "綜合", "综合", "Combining all prime factors of ", "Combinant tous les facteurs premiers de "
  ];

  const commonFactorTextRight = [
    "的所有質因數", "的共有因数", "", ""
  ];

  const commonFactorHint = [
    "要成為兩數的公倍數，必須包含兩數所有的質因數。",
    "要成为两数的公倍数，必须包含两数所有的质因数。",
    "To be a common multiple of two numbers, it must include all the prime factors of the two numbers.",
    "Pour être un multiple commun de deux nombres, il doit inclure tous les facteurs premiers des deux nombres."
  ];

  const tryText = [
    "嘗試 ", "尝试 ", "Try ", "Essayer "
  ];

  const factorsCorrectTextLeft = [
    "你成功寫出", "你成功写出", "You successfully write the prime factorization of ", "Vous écrivez avec succès la factorisation première de "
  ];

  const factorsCorrectTextRight = [
    "的質因數分解。", "的质因数分解。", ".", "."
  ];

  const commonFactorsCorrectText = [
    "你成功寫出兩數包含的所有質因數。",
    "你成功写出两数包含的所有质因数。",
    "You successfully write all the prime factors contained in the two numbers.",
    "Vous écrivez avec succès tous les facteurs premiers contenus dans les deux nombres."
  ];

  const lcmHint = [
    "把上行所有的質因數乘起來。",
    "把上行所有的质因数乘起来。",
    "Multiply all the prime factors above.",
    "Multipliez tous les facteurs premiers ci-dessus."
  ];

  const lcmCorrectText = [
    "做得好!你求得正確的L.C.M.。",
    "做得好!你求得正确的L.C.M.。",
    "Well done! You got the right L.C.M..",
    "Bien joué! Vous avez le bon L.C.M.."
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
    setShowFactorsColomns(false);
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
          setShowFactorsColomns(false);
          setShowResult(false);
          break;
        case "firstFactor":
          checkAnswer(index, e.target.value, firstFactorsArray, setFirstArrayFocusedIndex, groupType, inputIntegersArray[0]);
          break;
        case "secondFactor":
          checkAnswer(index, e.target.value, secondFactorsArray, setSecondArrayFocusedIndex, groupType, inputIntegersArray[1]);
          break;
        case "commonFactor":
          checkAnswer(index, e.target.value, commonFactorsArray, setCommonArrayFocusedIndex, groupType);
          break;
        case "lcm":
          checkAnswer(index, e.target.value, lcmResultArray, setLcmArrayFocusedIndex, groupType);
          break;
        case "firstDivisor":
          checkDivisor(index, e.target.value, firstQuotientsArray[index], setFirstDivisorFocusedIndex);
          break;
        case "secondDivisor":
          checkDivisor(index, e.target.value, secondQuotientsArray[index], setSecondDivisorFocusedIndex);
          break;
        case "firstQuotient":
          checkQuotient(index, e.target.value, firstDivisorsArray, firstQuotientsArray, setFirstDivisorsArray, setFirstQuotientsArray, setFirstQuotientFocusedIndex, firstDivisorFocusedIndex);
          break;
        case "secondQuotient":
          checkQuotient(index, e.target.value, secondDivisorsArray, secondQuotientsArray, setSecondDivisorsArray, setSecondQuotientsArray, setSecondQuotientFocusedIndex, secondDivisorFocusedIndex);
          break;
      }
    }
  };

  function checkDivisor(index, value, quotient, setAnswerFocusedIndex) {
    //correct divisor
    if (quotient % value == 0) {
      if (primeNumbers.includes(parseInt(value))) {
        setTimeout(() => {
          setAnswerFocusedIndex(index + 1);
          setOpenAlert(false);
        }, timeDelay);
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
        setErrorMessage(mustBeAFactorTextLeft[languageIndex] + quotient + mustBeAFactorTextRight[languageIndex]);
      }
    }
  }

  function checkQuotient(index, value, divisorsArray, quotientsArray, setDivisorsArray, setQuotientsArray, setAnswerFocusedIndex, divisorIndex) {
    if (divisorIndex == index && !primeNumbers.includes(quotientsArray[index - 1])) {
      //correct quotient
      if (value == quotientsArray[index - 1] / divisorsArray[index - 1]) {
        setTimeout(() => {
          var tmpDivisorsArray = [...divisorsArray];
          var tmpQuotientsArray = [...quotientsArray];
          tmpQuotientsArray[index] = parseInt(value);
          tmpDivisorsArray.push(null);
          tmpQuotientsArray.push(null);
          setDivisorsArray(tmpDivisorsArray);
          setQuotientsArray(tmpQuotientsArray);
          setAnswerFocusedIndex(index + 1);
          setOpenAlert(false);
        }, timeDelay);
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
      } else if (["firstFactor", "secondFactor", "commonFactor"].includes(groupType)) {
        if (index == factorsArray.length - 1) {
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("success");
          setAnswerFocusedIndex(-1);
          if (groupType == "commonFactor") {
            setErrorMessage("👍🏻" + commonFactorsCorrectText[languageIndex]);
          } else {
            setErrorMessage("👍🏻" + factorsCorrectTextLeft[languageIndex] + inputInteger + factorsCorrectTextRight[languageIndex]);
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
        } else {
          setErrorMessage(primeFactorHint[languageIndex]);
        }
      }
    }
  }

  const completeClick = (e, quotient, setDivisionCompleted, anotherDivisionCompleted) => {
    if (primeNumbers.includes(quotient)) {
      setDivisionCompleted(true);
      setErrorMessage("👍🏻" + divisionCompletedText[languageIndex]);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      if (anotherDivisionCompleted) {
        setShowFactorsColomns(true);
      }
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
      }, timeDelay);
      setFirstDivisorsArray([null, null]);
      setFirstQuotientsArray([inputIntegersArray[0], null]);
      setSecondDivisorsArray([null, null]);
      setSecondQuotientsArray([inputIntegersArray[1], null]);
      setFirstDivisorFocusedIndex(0);
      setSecondDivisorFocusedIndex(0);
      setFirstQuotientFocusedIndex(1);
      setSecondQuotientFocusedIndex(1);
      setFirstDivisionCompleted(false);
      setSecondDivisionCompleted(false);
      setShowFactorsColomns(false);
      setFirstArrayFocusedIndex(0);
      setSecondArrayFocusedIndex(0);
      setNumberOfArraysCorrect(0);
      setShowResult(false);
      setCommonArrayFocusedIndex(0);
      setLcmInputArray([null]);
      setLcmArrayFocusedIndex(0);
      setWholeCompleted(false);
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[0], primeNumbers);
      setFirstFactorsArray(factorsArray);
      setFirstInputsArray(inputsArray);
      var factorsArray0 = factorsArray;
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[1], primeNumbers);
      setSecondFactorsArray(factorsArray);
      setSecondInputsArray(inputsArray);
      var factorsArray1 = factorsArray;
      var { factorsArray, inputsArray } = calculateResults(factorsArray0, factorsArray1);
      setCommonFactorsArray(factorsArray);
      setCommonInputsArray(inputsArray);
      var tmpLcm = 1;
      var i;
      for (i = 0; i < factorsArray.length; i++) {
        tmpLcm *= factorsArray[i];
      }
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
        <Grid container className={classes.centerRow}>
          <Grid className={classes.divisionColomn}>
            <Grid className={classes.divisionInsideColumn}>
              {
                firstDivisorsArray.map((divisor, index) => {
                  return <Grid key={index} className={classes.divisionRow}>
                    {
                      ((index < firstDivisorsArray.length - 2) || ((index == firstDivisorsArray.length - 2) && !firstDivisionCompleted)) &&
                      <Box
                        border={0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setFirstDivisorsArray}
                          focusedIndex={firstDivisorFocusedIndex}
                          inputsArray={firstDivisorsArray}
                          clickable={false}
                          groupType="firstDivisor"
                          handleChange={handleChange}
                          highlighted={firstDivisionCompleted}
                        />
                      </Box>
                    }
                    {
                      ((index < firstDivisorsArray.length - 1) || ((index == firstDivisorsArray.length - 1) && !firstDivisionCompleted)) &&
                      <Box
                        borderBottom={(index < firstDivisorsArray.length - 2) || (index == firstDivisorsArray.length - 2 && (!firstDivisionCompleted) || index == 0) ? 2 : 0}
                        borderLeft={(index < firstDivisorsArray.length - 2) || (index == firstDivisorsArray.length - 2 && (!firstDivisionCompleted) || index == 0) ? 2 : 0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setFirstQuotientsArray}
                          focusedIndex={firstQuotientFocusedIndex}
                          inputsArray={firstQuotientsArray}
                          clickable={false}
                          groupType="firstQuotient"
                          handleChange={handleChange}
                          highlighted={(index == firstDivisorsArray.length - 2) && firstDivisionCompleted}
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
                {firstQuotientsArray[firstQuotientFocusedIndex - 1]}
                {quotientIsAPrimeQuestionRight[languageIndex]}
              </Typography>
              <Button
                className={classes.completeButton}
                variant="contained"
                color="primary"
                onClick={e => { completeClick(e, firstQuotientsArray[firstQuotientFocusedIndex - 1], setFirstDivisionCompleted, secondDivisionCompleted) }}
              >
                {completeButtonText[languageIndex]}
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.divisionColomn}>
            <Grid className={classes.divisionInsideColumn}>
              {
                secondDivisorsArray.map((divisor, index) => {
                  return <Grid key={index} className={classes.divisionRow}>
                    {
                      ((index < secondDivisorsArray.length - 2) || ((index == secondDivisorsArray.length - 2) && !secondDivisionCompleted)) &&
                      <Box
                        border={0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setSecondDivisorsArray}
                          focusedIndex={secondDivisorFocusedIndex}
                          inputsArray={secondDivisorsArray}
                          clickable={false}
                          groupType="secondDivisor"
                          handleChange={handleChange}
                          highlighted={secondDivisionCompleted}
                        />
                      </Box>
                    }
                    {
                      ((index < secondDivisorsArray.length - 1) || ((index == secondDivisorsArray.length - 1) && !secondDivisionCompleted)) &&
                      <Box
                        borderBottom={(index < secondDivisorsArray.length - 2) || (index == secondDivisorsArray.length - 2 && (!secondDivisionCompleted) || index == 0) ? 2 : 0}
                        borderLeft={(index < secondDivisorsArray.length - 2) || (index == secondDivisorsArray.length - 2 && (!secondDivisionCompleted) || index == 0) ? 2 : 0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setSecondQuotientsArray}
                          focusedIndex={secondQuotientFocusedIndex}
                          inputsArray={secondQuotientsArray}
                          clickable={false}
                          groupType="secondQuotient"
                          handleChange={handleChange}
                          highlighted={(index == secondDivisorsArray.length - 2) && secondDivisionCompleted}
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
                {secondQuotientsArray[secondQuotientFocusedIndex - 1]}
                {quotientIsAPrimeQuestionRight[languageIndex]}
              </Typography>
              <Button
                className={classes.completeButton}
                variant="contained"
                color="primary"
                onClick={e => { completeClick(e, secondQuotientsArray[secondQuotientFocusedIndex - 1], setSecondDivisionCompleted, firstDivisionCompleted) }}
              >
                {completeButtonText[languageIndex]}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      }
      {
        showFactorsColomns && <Grid>
          <Grid className={classes.centerRow}>
            <Grid container className={classes.factorsRows}>
              <Typography className={classes.commonText}>
                {factorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]}&nbsp;{factorTextRight[languageIndex]}&nbsp;:
              </Typography>
              {
                firstInputsArray.map((factor, index) => {
                  return <Grid key={index} style={{ display: "flex" }}>
                    {(index > 0) && <Typography className={classes.commonText}>×</Typography>}
                    <MyInput
                      index={index}
                      setInputValue={setFirstInputsArray}
                      focusedIndex={firstArrayFocusedIndex}
                      inputsArray={firstInputsArray}
                      clickable={false}
                      groupType="firstFactor"
                      handleChange={handleChange}
                    />
                  </Grid>
                })
              }
            </Grid>
          </Grid>
          <Grid className={classes.centerRow}>
            <Grid container className={classes.factorsRows}>
              <Typography className={classes.commonText}>
                {factorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[1]}&nbsp;{factorTextRight[languageIndex]}&nbsp;:
              </Typography>
              {
                secondInputsArray.map((factor, index) => {
                  return <Grid key={index} style={{ display: "flex" }}>
                    {(index > 0) && <Typography className={classes.commonText}>×</Typography>}
                    <MyInput
                      index={index}
                      setInputValue={setSecondInputsArray}
                      focusedIndex={secondArrayFocusedIndex}
                      inputsArray={secondInputsArray}
                      clickable={false}
                      groupType="secondFactor"
                      handleChange={handleChange}
                    />
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
