import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import {
  HeadingSelect,
} from "../components/MathsLearningComponents";
import {
  HCFFactorization,
} from "./HCFFactorization";
import {
  LCMMultiplication,
} from "./LCMMultiplication";
import {
  HCFPrimeFactorization,
} from "./HCFPrimeFactorization";
import {
  LCMPrimeFactorization,
} from "./LCMPrimeFactorization";
import {
  HCFDivision,
} from "./HCFDivision";
import {
  LCMDivision,
} from "./LCMDivision";
import { withStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
import constants from "../constants/MathsLearningConstants";
import pic1 from "../assets/cross1.png";
import pic2 from "../assets/cross2.jpg";
import pic3 from "../assets/zacchaeus1.jpg";
import prayerImage from "../assets/prayer1.jpg";

const mathsLearningStyle = (theme) => ({
  mathsLearningContainer: {
    margin: "1vw",
    minHeight: "97vh",
    backgroundImage: myTheme.color.skyGradient,
  },
  headingContainer: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scriptureVerseRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scriptureVerseBorder: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80vw",
    borderWidth: "0.5vw",
    borderImage: myTheme.color.conicGradient,
    border: "solid",
    [theme.breakpoints.down("xs")]: {
      width: "95vw",
    },
  },
  scriptureImage: {
    height: "8vw",
    padding: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "20vw",
    },
  },
  scriptureVerse: {
    width: "70vw",
    fontSize: "2vw",
    color: myTheme.color.myGreen,
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      fontSize: "4vw",
    },
  },
  prayerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  prayerImage: {
    height: "6vw",
    padding: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "12vw",
    },
  },
  prayerText: {
    width: "65vw",
    fontSize: "2vw",
    color: myTheme.color.myGreen,
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      fontSize: "4vw",
    },
  },
  emailText: {
    width: "92vw",
    textAlign: "right",
    fontSize: "1.5vw",
    color: myTheme.color.myBrown,
    [theme.breakpoints.down("xs")]: {
      fontSize: "3vw",
    },
  },
  commonText: {
    fontSize: "1.4vw",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.8vw",
    },
  },
});

function MathsLearning(props) {
  const [languageIndex, setLanguageIndex] = useState(2);//0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState(0);//0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState(0);
  const [learningToolIndex, setLearningToolIndex] = useState(0);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState(0);

  const numberOfBibleVersions = 2;
  const numberOfTopics = 2;
  const numberOfLearningTools = 3;
  const numberOfScriptureVerses = 3;
  const scriptureImages = [pic1, pic2, pic3];

  const {
    languages,
    bibleVersions,
    bibleVersionsQuestion,
    topics,
    topicsQuestion,
    learningTools,
    learningToolsQuestion,
    scriptureVerses,
    prayers,
    noticificationText,
    applicationHint,
  } = constants;
  
  useEffect(() => {
    const queryString = props.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("lang") != null && urlParams.get("lang") != "" && urlParams.get("lang") >= 0 && urlParams.get("lang") < 4) {
      setLanguageIndex(parseInt(urlParams.get("lang")));
    } 
    if (urlParams.get("ver") != null && urlParams.get("ver") != "" && urlParams.get("ver") >= 0 && urlParams.get("ver") < numberOfBibleVersions) {
      setBibleVersionIndex(parseInt(urlParams.get("ver")));
    }
    setScriptureVerseIndex(Math.floor(Math.random() * numberOfScriptureVerses));
  }, []);

  const renderSwitch = () => {
    switch (topicIndex) {
      case 0: {
        switch (learningToolIndex) {
          case 0:
            return <HCFFactorization
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 1:
            return <HCFPrimeFactorization
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 2:
            return <HCFDivision
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
        };
      };
      case 1: {
        switch (learningToolIndex) {
          case 0:
            return <LCMMultiplication
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 1:
            return <LCMPrimeFactorization
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 2:
            return <LCMDivision
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
        };
      };
    };
  };

  const { classes } = props;

  return (
    <Grid className={classes.mathsLearningContainer} spacing={0}>
      <Grid container className={classes.headingContainer}>
        <HeadingSelect
          selectLabel="Language"
          selectIndex={languageIndex}
          setItemIndex={setLanguageIndex}
          itemsArray={languages}
        />
        <HeadingSelect
          selectLabel={bibleVersionsQuestion[languageIndex]}
          selectIndex={bibleVersionIndex}
          setItemIndex={setBibleVersionIndex}
          itemsArray={bibleVersions.slice(languageIndex * numberOfBibleVersions, languageIndex * numberOfBibleVersions + numberOfBibleVersions)}
        />
        <HeadingSelect
          selectLabel={topicsQuestion[languageIndex]}
          selectIndex={topicIndex}
          setItemIndex={setTopicIndex}
          itemsArray={topics.slice(languageIndex * numberOfTopics, languageIndex * numberOfTopics + numberOfTopics)}
        />
        <HeadingSelect
          selectLabel={learningToolsQuestion[languageIndex]}
          selectIndex={learningToolIndex}
          setItemIndex={setLearningToolIndex}
          itemsArray={learningTools.slice((languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools, (languageIndex * numberOfTopics + topicIndex + 1) * numberOfLearningTools)}
        />
      </Grid>
      <Grid className={classes.scriptureVerseRow} >
        <Grid className={classes.scriptureVerseBorder} border={1}>
          <img className={classes.scriptureImage} src={scriptureImages[scriptureVerseIndex]} />
          <Typography className={classes.scriptureVerse}>{scriptureVerses[(languageIndex * numberOfBibleVersions + bibleVersionIndex) * numberOfScriptureVerses + scriptureVerseIndex]}</Typography>
        </Grid>
      </Grid>
      {
        renderSwitch()
      }
      <Grid className={classes.prayerRow}>
        <img className={classes.prayerImage} src={prayerImage} />
        <Typography className={classes.prayerText}>{prayers[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>{applicationHint[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>{noticificationText[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText}>samsoncsyuapple@gmail.com</Typography>
      </Grid>
    </Grid>
  );

}

export default withStyles(mathsLearningStyle)(MathsLearning);