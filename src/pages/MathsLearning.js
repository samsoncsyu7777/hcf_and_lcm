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
  const languages = ["繁體中文", "简体中文", "English", "Française"];
  const bibleVersions = ["天主教", "基督教", "天主教", "基督教", "Catholic", "Christian", "Catholique", "Chrétienne"];
  const bibleVersionsQuestion = ["經文版本", "经文版本", "Scripture version", "Version biblique"];
  const topics = [
    "H.C.F./G.C.F.(最大公因數)", "L.C.M.(最小公倍數)",
    "H.C.F./G.C.F.(最大公因数)", "L.C.M.(最小公倍数)",
    "H.C.F./G.C.F.(Highest/Greatest Common Factor)", "L.C.M.(Least Common Multiple)",
    "H.C.F./G.C.F.(Facteur commun le plus élevé / le plus grand)", "L.C.M.(Multiple moins commun)"
  ];
  const topicsQuestion = ["主題", "主题", "Topic", "Sujet"];
  const learningTools = [
    "列舉法", "質因數分解法", "短除法",//H.C.F.
    "列舉法", "質因數分解法", "短除法",//L.C.M.
    "列举法", "质因数分解法", "短除法",
    "列举法", "质因数分解法", "短除法",
    "Factorization Method", "Prime Factorization Method", "Division Method",
    "Multiplication Method", "Prime Factorization Method", "Division Method",
    "Méthode de factorisation", "Méthode de factorisation principale", "Méthode de division",
    "Méthode de multiplication", "Méthode de factorisation principale", "Méthode de division"
  ];
  const learningToolsQuestion = [
    "計算方法", "计算方法", "Calculation Method", "Méthode de calcul"
  ];
  const scriptureVerses = [
    //traditional chinese
    "「有的落在好地裡，就長大成熟，結了果實，有的結三十倍，有的六十倍，有的一百倍。」谷4:8",
    "「那撒在好地裡的，是指人聽了這「話」，就接受了，並結了果實，有的三十倍，有的六十倍，有的一百倍。」谷4:20",
    "匝凱站起來對主說：「主，你看，我把我財物的一半施捨給窮人；我如果欺騙過誰，我就以四倍賠償。」路19:8",
    "「又有的落在好土裏，就發芽長大，結出果實，有三十倍的，有六十倍的，有一百倍的。」可4:8",
    "「那撒在好土裏的，就是人聽了道，領受了，並且結了果實，有三十倍的，有六十倍的，有一百倍的。」可4:20",
    "撒該站著對主說：「主啊，我把所有的一半給窮人；我若勒索了誰，就還他四倍。」路19:8",
    //simplified chinese
    "「有的落在好地里，就长大成熟，结了果实，有的结三十倍，有的六十倍，有的一百倍。」谷4:8",
    "「那撒在好地里的，是指人听了这「话」，就接受了，并结了果实，有的三十倍，有的六十倍，有的一百倍。 」谷4:20",
    "匝凯站起来对主说：「主，你看，我把我财物的一半施舍给穷人；我如果欺骗过谁，我就以四倍赔偿。」路19:8",
    "「又有的落在好土里，就发芽长大，结出果实，有三十倍的，有六十倍的，有一百倍的。」可4:8",
    "「那撒在好土里的，就是人听了道，领受了，并且结了果实，有三十倍的，有六十倍的，有一百倍的。」可4:20",
    "撒该站着对主说：「主啊，我把所有的一半给穷人；我若勒索了谁，就还他四倍。」路19:8",
    //english
    "'And some seeds fell into rich soil, grew tall and strong, and produced a good crop; the yield was thirty, sixty, even a hundredfold.'Mark4:8",
    "'And there are those who have been sown in rich soil; they hear the word and accept it and yield a harvest, thirty and sixty and a hundredfold.'Mark4:20",
    "But Zacchaeus stood his ground and said to the Lord, 'Look, sir, I am going to give half my property to the poor, and if I have cheated anybody I will pay him back four times the amount.'Luke19:8",
    "'And some, falling on good earth, gave fruit, coming up and increasing, and giving thirty, sixty, and a hundred times as much.'Mark4:8",
    "'And these are they who were planted on the good earth; such as give ear to the word, and take it into their hearts, and give fruit, thirty and sixty and a hundred times as much.'Mark4:20",
    "And Zacchaeus, waiting before him, said to the Lord, See, Lord, half of my goods I give to the poor, and if I have taken anything from anyone wrongly, I give him back four times as much.Luke19:8",
    //french
    "'Et d'autres tombèrent dans la bonne terre, montèrent et crûrent, donnèrent du fruit et rapportèrent l'un trente, un autre soixante, un autre cent.'Marc4:8",
    "'Et d'autres sont ceux qui ont été semés dans la bonne terre : ils entendent la parole et la reçoivent, et ils portent du fruit, trente, soixante, cent (pour un).'Marc4:20",
    "Or Zachée, s'étant arrêté, dit au Seigneur: ' Voici, Seigneur, je donne aux pauvres la moitié de mes biens; et si j'ai fait du tort à quelqu'un, je rends le quadruple.'Luc19:8",
    "« Une autre partie tomba dans la bonne terre ; elle donna du fruit qui montait et se développait, avec un rapport de 30, 60 ou 100 pour 1 »'Marc4:8",
    "« D'autres enfin reçoivent la semence dans la bonne terre : ce sont ceux qui entendent la parole, l’accueillent et portent du fruit, avec un rapport de 30, 60 ou 100 pour 1. »Marc4:20",
    "Mais Zachée, se tenant devant le Seigneur, lui dit : « Seigneur, je donne aux pauvres la moitié de mes biens et, si j'ai causé du tort à quelqu'un, je lui rends le quadruple. »Luc19:8"
  ];
  const prayers = [
    "主耶穌，感謝祢賜我恩竉，幫助我在生命中結出永遠的果實﹗",
    "主耶稣，感谢祢赐我恩竉，帮助我在生命中结出永远的果实﹗",
    "Lord Jesus, thank you for giving me grace and helping me bear eternal fruit in my life!",
    "Seigneur Jésus, merci de me donner la grâce et de m'aider à porter le fruit éternel dans ma vie!"
  ];
  const noticificationText = [
    "開啟通知，計算過程會顯示提示。",
    "开启通知，计算过程会显示提示。",
    "Turn on the notification, prompts will be displayed during the calculation.",
    "Activez la notification, des invites seront affichées pendant le calcul."
  ];

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
        <Typography className={classes.commonText}>{noticificationText[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText}>samsoncsyuapple@gmail.com</Typography>
      </Grid>
    </Grid>
  );

}

export default withStyles(mathsLearningStyle)(MathsLearning);