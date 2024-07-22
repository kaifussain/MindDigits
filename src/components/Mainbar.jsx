import React, { useEffect, useState } from "react";
import "./Mainbar.css";
import AnsOption from "./sub-components/AnsOption";
import AnsManual from "./sub-components/AnsManual";
import Result from "./sub-components/Result";
import Timer from "./sub-components/Timer";
const Mainbar = (props) => {
  const [question, setQuestion] = useState([]);
  const [solution, setSolution] = useState(null);
  const [userSolution, setUserSolution] = useState(null);
  const [correctSolutions, setCorrectSolutions] = useState(0);
  const [wrongSolutions, setWrongSolutions] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const perfectSqSet = [1, 4, 10, 32, 100, 317];
  const perfectCbSet = [1, 3, 5, 10, 22, 47];
  const [showResult, setShowResult] = useState(false);
  const [showResultEachTime, setShowResultEachTime] = useState(true);
  const [showShortResult, setShowShortResult] = useState(false);

  const [prevQuestion, setPrevQuestion] = useState([]);
  const [prevSolution, setPrevSolution] = useState(null);
  const [prevUserSolution, setPrevUserSolution] = useState(null);
  const [timeUp,setTimeUp] = useState(false)
  const [solvedBeforeTime,setsolvedBeforeTime] = useState(false)

  function generateNumber() {
    let d = Math.floor(Math.random() * props.digitSet.length);
    let wholeRange = Math.pow(10, props.digitSet[d]);
    let excludeRange = Math.pow(10, props.digitSet[d] - 1);
    let rand = Math.random() * (wholeRange - excludeRange) + excludeRange;
    if (props.numberType == 0) {
      return Math.floor(rand);
    } else if (props.numberType == 1) {
      return Number(rand.toFixed(props.precision));
      // return rand
    } else {
      if (Math.random() < 0.5) {
        return Number(rand.toFixed(props.precision));
      } else {
        return Math.floor(rand);
      }
    }
  }
  function generatePerfect(isSq) {
    let randI = Math.floor(Math.random() * props.digitSet.length);
    if (isSq) {
      let wholeRange = perfectSqSet[props.digitSet[randI]];
      let excludeRange = perfectSqSet[props.digitSet[randI] - 1];
      let n = Math.floor(
        Math.random() * (wholeRange - excludeRange) + excludeRange
      );
      return n * n;
    } else {
      let wholeRange = perfectCbSet[props.digitSet[randI]];
      let excludeRange = perfectCbSet[props.digitSet[randI] - 1];
      let n = Math.floor(
        Math.random() * (wholeRange - excludeRange) + excludeRange
      );
      return n * n * n;
    }
  }
  function generateOp(op) {
    let i = Math.floor(Math.random() * props.problemSet.length);

    if (op == "o") {
      let filteredSet = props.problemSet.filter(
        (a) => a == "+" || a == "-" || a == "×" || a == "÷" || a == "% of"
      );
      return filteredSet[i % filteredSet.length];
    } else if (op == "r") {
      let filteredSet = props.problemSet.filter((a) => a == "√" || a == "∛");
      return filteredSet[i % filteredSet.length];
    } else if (op == "s") {
      let filteredSet = props.problemSet.filter((a) => a == "²" || a == "³");
      return filteredSet[i % filteredSet.length];
    } else {
      let filteredSet = props.problemSet.filter((a) => a !== op);
      return filteredSet[i % filteredSet.length];
    }
  }
  function generateQuestion() {
    if(props.timer>0){
      setTimeUp(false)
      setsolvedBeforeTime(false)
    }
    setUserSolution(null);

    setShowShortResult(!showResultEachTime);
    if (props.isAnsManual && question.length > 0) {
      setPrevQuestion(question);
      setPrevUserSolution(userSolution);
    }

    let tempQuest = [],
      pushed;
    Array.from({ length: props.termCount }).forEach((_, ind) => {
      //adds o
      if (ind !== 0) {
        tempQuest.push(generateOp("o"));
        pushed = "o";
      }

      //adds r
      if (props.problemSet.some((r) => r == "√" || r == "∛")) {
        if (props.termCount == 1) {
          if (props.problemSet.some((r) => r == "²" || r == "³")) {
            if (Math.random() < 0.5) {
              tempQuest.push(generateOp("r"));
              pushed = "r";
            }
          } else {
            tempQuest.push(generateOp("r"));
            pushed = "r";
          }
        } else if (Math.random() < 0.5) {
          tempQuest.push(generateOp("r"));
          pushed = "r";
        }
      }

      //adds n
      if (props.perfect && pushed === "r") {
        if (tempQuest[tempQuest.length - 1] === "√") {
          let n = generatePerfect(true);
          tempQuest.push(n);
        } else {
          let n = generatePerfect(false);
          tempQuest.push(n);
        }
      } else {
        let n = generateNumber();
        tempQuest.push(n);
      }

      //adds sq
      if (props.problemSet.some((s) => s == "²" || s == "³")) {
        if (props.termCount == 1) {
          if (pushed == "r") {
            if (Math.random() < 0.5) {
              tempQuest.push(generateOp("s"));
            }
          } else {
            tempQuest.push(generateOp("s"));
          }
        } else if (Math.random() < 0.5) {
          tempQuest.push(generateOp("s"));
        }
        pushed = "s";
      }
    });
    setQuestion(tempQuest);
    if (props.isAnsManual && prevQuestion.length === 0) {
      setPrevQuestion(tempQuest);
    }
  }
  function calculateSolution() {
    if (props.isAnsManual && showShortResult && solution.length > 0) {
      setPrevSolution(solution);
    }
    let tempAns = [...question],
      tempAnsLen = tempAns.length,
      i = 0,
      precedence = 0;
    while (tempAnsLen > 1 && precedence < 4) {
      if (precedence === 0) {
        if (tempAns[i] == "²") {
          tempAns[i - 1] = Math.pow(tempAns[i - 1], 2);
          tempAns.splice(i, 1);
          i = 0;
        } else if (tempAns[i] == "³") {
          tempAns[i - 1] = Math.pow(tempAns[i - 1], 3);
          tempAns.splice(i, 1);
          i = 0;
        } else if (tempAns[i] == "√") {
          tempAns[i] = Math.sqrt(tempAns[i + 1]);
          tempAns.splice(i + 1, 1);
          i = 0;
        } else if (tempAns[i] == "∛") {
          tempAns[i] = Math.cbrt(tempAns[i + 1]);
          tempAns.splice(i + 1, 1);
          i = 0;
        } else if (i > tempAnsLen - 1) {
          i = 1;
          precedence = 1;
        } else {
          i += 1;
        }
      } else if (precedence === 1) {
        if (tempAns[i] == "% of") {
          tempAns[i - 1] = (tempAns[i - 1] / 100) * tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (i > tempAnsLen - 2) {
          i = 1;
          precedence = 2;
        } else {
          i += 2;
        }
      } else if (precedence === 2) {
        if (tempAns[i] == "÷") {
          tempAns[i - 1] = tempAns[i - 1] / tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (tempAns[i] == "×") {
          tempAns[i - 1] = tempAns[i - 1] * tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (i > tempAnsLen - 2) {
          i = 1;
          precedence = 3;
        } else {
          i += 2;
        }
      } else if (precedence === 3) {
        if (tempAns[i] == "+") {
          tempAns[i - 1] = tempAns[i - 1] + tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (tempAns[i] == "-") {
          tempAns[i - 1] = tempAns[i - 1] - tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (i > tempAnsLen - 2) {
          i = 0;
          precedence = 4;
        } else {
          i += 2;
        }
      }
      tempAnsLen = tempAns.length;
    }
    if (tempAns[0] % 1 === 0) {
      setSolution(tempAns[0]);
      if (props.isAnsManual && prevSolution === null) {
        setPrevSolution(tempAns[0]);
      }
    } else {
      let n = parseFloat(tempAns[0].toFixed(props.precision));
      setSolution(n);
      if (props.isAnsManual && prevSolution === null) {
        setPrevSolution(n);
      }
    }
  }
  useEffect(() => {
    
    if (props.isAnsManual && userSolution !== null) {
      if(props.timer>0){
        setsolvedBeforeTime(true)
      }
      setIsClose(false);
      let tf = userSolution == solution;
      if (tf) {
        setIsCorrect(true);
        setCorrectSolutions((x) => x + 1);
      } else {
        if (Math.abs(userSolution - solution) < 0.09) {
          setIsCorrect(true);
          setIsClose(true);
          setCorrectSolutions((x) => x + 1);
        } else {
          setIsCorrect(false);
          setWrongSolutions((x) => x + 1);
        }
      }
      if (props.isAnsManual) {
        if (showResultEachTime && !showShortResult) {
          setShowResult(true);
        } else if (showResultEachTime) {
          setShowShortResult(false);
          setShowResult(true);
        } else {
          generateQuestion();
        }
      }
    }
  }, [userSolution]);

  useEffect(() => {
    setQuestion([]);
    setCorrectSolutions(0);
    setWrongSolutions(0);
    setShowResult(false);
    setShowShortResult(false);
    setShowResultEachTime(true)
  }, [props.reset]);

  useEffect(()=>{
    if(timeUp && props.isAnsManual && !showShortResult){
      calculateSolution()
      setShowResult(true)
    }
  },[timeUp])

  return (
    <div id="Mainbar">
      {props.timer>0 && question.length>0 && <Timer initialTime={props.timer} setTimeUp={setTimeUp} timeUp={timeUp} solvedBeforeTime={solvedBeforeTime} setsolvedBeforeTime={setsolvedBeforeTime}/>}
      <div id="result_home">
     
        <div
          onClick={() => setShowResult(!showResult)}
          id="homeResult_btn"
          key={userSolution}
          className={`${showShortResult ? "pop" : "hide"}`}
        >
          {showResult ? "↶📖" : isCorrect ? (isClose ? "⁕📗" : "✓📗") : "✕📕"}
        </div>
        {showShortResult && showResult && (
          <Result
            showResultEachTime={showResultEachTime}
            showShortResult={showShortResult}
            setShowResultEachTime={() =>
              setShowResultEachTime(!showResultEachTime)
            }
            userSolution={prevUserSolution}
            question={prevQuestion}
            solution={solution}
            correctSolutions={correctSolutions}
            wrongSolutions={wrongSolutions}
            isCorrect={isCorrect}
            isClose={isClose}
            timeUp={timeUp}
            type="short"
          />
        )}
        <div className={props.isAnsManual ? "hide" : "optionModeResult"}>
          {correctSolutions > 0 && (
            <div>
              Correct: <span>{correctSolutions}</span>
            </div>
          )}
          {wrongSolutions > 0 && (
            <div>
              Wrong: &nbsp;&nbsp;<span>{wrongSolutions}</span>
            </div>
          )}
        </div>
        
      </div>
      <div id="Mainbar_head">{question.join(" ")}</div>
      <div id="Mainbar_mid">
        {question.length === 0 ? (
          <button
            onClick={() => generateQuestion()}
            id="generateBtn"
            className="btnEffect"
          >
            Ask
          </button>
        ) : showResult && !showShortResult ? (
          <Result
            showResult={showResult}
            setShowResult={setShowResult}
            isCorrect={isCorrect}
            userSolution={userSolution}
            solution={solution}
            showResultEachTime={showResultEachTime}
            showShortResult={showShortResult}
            setShowResultEachTime={() =>
              setShowResultEachTime(!showResultEachTime)
            }
            generateQuestion={generateQuestion}
            correctSolutions={correctSolutions}
            wrongSolutions={wrongSolutions}
            isClose={isClose}
            timerIsOn={props.timer>0}
            timeUp={timeUp}
            setTimeUp={setTimeUp}
            solvedBeforeTime={solvedBeforeTime}
            type="full"
          />
        ) : props.isAnsManual ? (
          <AnsManual
            setUserSolution={setUserSolution}
            userSolution={userSolution}
            calculateSolution={calculateSolution}
            generateQuestion={generateQuestion}
            showShortResult={showShortResult}
            
          />
        ) : (
          <AnsOption
            userSolution={userSolution}
            solution={solution}
            question={question}
            generateQuestion={generateQuestion}
            calculateSolution={calculateSolution}
            setCorrectSolutions={setCorrectSolutions}
            setWrongSolutions={setWrongSolutions}
            precision={props.precision}
            timeUp={timeUp}
            setTimeUp={setTimeUp}
            timerIsOn={props.timer>0}
            setsolvedBeforeTime={setsolvedBeforeTime}
            solvedBeforeTime={solvedBeforeTime}
          />
        )}
      </div>
    </div>
  );
};

export default Mainbar;
