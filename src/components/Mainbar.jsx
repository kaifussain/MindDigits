import React, { useState } from "react";
import "./Mainbar.css";
import AnsOption from "./sub-components/AnsOption";
import AnsManual from "./sub-components/AnsManual";
const Mainbar = (props) => {
  const [question, setQuestion] = useState([]);
  const [solution, setSolution] = useState();
  const [userSolution, setUserSolution] = useState();

  function generateNumber() {
    let d = Math.floor(Math.random() * props.digitSet.length);
    let wholeRange = Math.pow(10, props.digitSet[d]);
    let excludeRange = Math.pow(10, props.digitSet[d] - 1);
    return Math.floor(
      Math.random() * (wholeRange - excludeRange) + excludeRange
    );
  }

  // function generateQuestion() {
  //   setSolution(null);
  //   let tempQuest = [],
  //     tempOp;
  //   Array.from({ length: props.termCount }).forEach((_, ind) => {
  //     if (ind !== 0) {
  //       let i = Math.floor(Math.random() * props.problemSet.length);
  //       tempOp = props.problemSet[i];
  //       tempQuest.push(tempOp);
  //     }
  //     let n = generateNumber();
  //     tempQuest.push(n);
  //   });
  //   setQuestion(tempQuest);
  // }
  function generateOp(singleTerm = false, op) {
    let i = Math.floor(Math.random() * props.problemSet.length);

    if (!singleTerm) {
      return props.problemSet[i];
    } else {
      if(op=='√'){
        let filteredSet = props.problemSet.filter((a) => a !== '√' && a!== '³√');
        return filteredSet[i % filteredSet.length];
      }
      else{
        let filteredSet = props.problemSet.filter((a) => a !== op);
        return filteredSet[i % filteredSet.length];
      }
    }
  }
  function generateQuestion() {
    setSolution(null);
    let tempQuest = [], pushed; //r-root  o-basic operation  n-number
    Array.from({ length: props.termCount }).forEach((_, ind) => {
      //adds o
      if (ind !== 0 && pushed !== "r") {
        tempQuest.push(generateOp(true,'√'));

        if (tempQuest[tempQuest.length - 1] === "²") {
          tempQuest.push(generateOp(true, "²"));
        } else if (tempQuest[tempQuest.length - 1] === "³") {
          tempQuest.push(generateOp(true, "³"));
        }
        pushed = "o";
      }
      //adds r
      let root = generateOp();
      if ((root == "√" || root =='³√') && pushed !== "n") {
        tempQuest.push(root);
        pushed = "r";
      }
      //adds n
      let n = generateNumber();
      tempQuest.push(n);
      pushed = "n";
    });
    setQuestion(tempQuest);
  }

  function calculateSolution() {
    let tempAns = [...question],
      i = 0,
      precedence = 0;
    while (tempAns.length > 1 && precedence < 4) {
      if (precedence === 0) {
        if (tempAns[i] == "²") {
          tempAns[i - 1] = Math.pow(tempAns[i - 1], 2);
          tempAns.splice(i, 1);
          i = 0;
        } else if (tempAns[i] == "³") {
          tempAns[i - 1] = Math.pow(tempAns[i - 1], 3);
          tempAns.splice(i, 1);
          i = 0;
        }
         else if (tempAns[i] == "√") {
          tempAns[i] = Math.sqrt(tempAns[i+1])
          tempAns.splice(i+1, 1);
          i = 0;
        }
         else if (tempAns[i] == "³√") {
          tempAns[i] = Math.cbrt(tempAns[i+1]);
          tempAns.splice(i+1, 1);
          i = 0;
        }
        else if (i > tempAns.length - 1) {
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
        } else if (i > tempAns.length - 2) {
          i = 1;
          precedence = 2;
        } else {
          i += 2;
        }
      } else if (precedence === 2) {
        if (tempAns[i] == "/") {
          tempAns[i - 1] = tempAns[i - 1] / tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (tempAns[i] == "*") {
          tempAns[i - 1] = tempAns[i - 1] * tempAns[i + 1];
          tempAns.splice(i, 2);
          i = 1;
        } else if (i > tempAns.length - 2) {
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
        } else if (i > tempAns.length - 2) {
          i = 0;
          precedence = 4;
        } else {
          i += 2;
        }
      }
    }
    if (tempAns[0] % 1 === 0) {
      setSolution(tempAns[0]);
    } else setSolution(tempAns[0].toFixed(props.precision));
  }

  return (
    <div id="Mainbar">
      <div id="Mainbar_head">
        {question.join(" ")} = {solution}
      </div>
      <div id="Mainbar_mid">
        <button onClick={() => generateQuestion()}>question</button>
        <button onClick={() => calculateSolution()}>answer</button>
        {props.isAnsManual ? <AnsManual /> : <AnsOption />}
      </div>
    </div>
  );
};

export default Mainbar;
