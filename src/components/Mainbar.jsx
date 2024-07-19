import React, { useState } from "react";
import "./Mainbar.css";
import AnsOption from "./sub-components/AnsOption";
import AnsManual from "./sub-components/AnsManual";
const Mainbar = (props) => {
  const [question, setQuestion] = useState([]);
  const [solution, setSolution] = useState();
  const [userSolution, setUserSolution] = useState();
  // const [perfectSqSet,_] = useState([3,9,31,99,316])
  // const [perfectCbSet,__] = useState([2,4,9,21,46])
  const [perfectSqSet,_] = useState([1,4,10,32,100,317])
  const [perfectCbSet,__] = useState([1,3,5,10,22,47])

  function generateNumber() {
    let d = Math.floor(Math.random() * props.digitSet.length);
    let wholeRange = Math.pow(10, props.digitSet[d]);
    let excludeRange = Math.pow(10, props.digitSet[d] - 1);
    return Math.floor(
      Math.random() * (wholeRange - excludeRange) + excludeRange
    );
  }
  function generatePerfect(isSq){
    let randI = Math.floor(Math.random() * props.digitSet.length)
    if(isSq){
      let wholeRange = perfectSqSet[props.digitSet[randI]]
      let excludeRange = perfectSqSet[props.digitSet[randI]-1]
      let n = Math.floor(Math.random() * (wholeRange-excludeRange) + excludeRange);
      return n*n
    }
    else{
      let wholeRange = perfectCbSet[props.digitSet[randI]]
      let excludeRange = perfectCbSet[props.digitSet[randI]-1]
      let n = Math.floor(Math.random() * (wholeRange-excludeRange) + excludeRange);
      return n*n*n
    }
  }

  function generateOp(op) {
    let i = Math.floor(Math.random() * props.problemSet.length);
   
      if(op=='o'){
        let filteredSet = props.problemSet.filter((a) => a == '+' || a== '-' || a =='×' || a == '÷' || a == '% of');
        return filteredSet[i % filteredSet.length];
      }
      else if(op=='r'){
        let filteredSet = props.problemSet.filter((a) => a == '√' || a== '³√');
        return filteredSet[i % filteredSet.length];
      }
      else if(op=='s'){
        let filteredSet = props.problemSet.filter((a) => a == '²' || a== '³');
        return filteredSet[i % filteredSet.length];
      }
      else{
        let filteredSet = props.problemSet.filter((a) => a !== op);
        return filteredSet[i % filteredSet.length];
      }
  }
  function generateQuestion() {
    setSolution(null);
    let tempQuest = [], pushed;
    Array.from({ length: props.termCount }).forEach((_, ind) => {
      //adds o
      if (ind !== 0) {
        tempQuest.push(generateOp('o'));
        pushed='o'
      }

      //adds r
      if(props.problemSet.some(r=>r=='√'||r=='³√')){
        if(props.termCount==1) {
          if(props.problemSet.some(r=>r=='²'||r=='³')){
            if(Math.random() < 0.5){
              tempQuest.push(generateOp('r'));
              pushed = "r";
            }
          }
          else {
            tempQuest.push(generateOp('r'));
            pushed = "r";
          }
        }
        else if(Math.random() < 0.5){
          tempQuest.push(generateOp('r'));
          pushed = "r";
        }
      }

      //adds n
      if(props.perfect && pushed==='r'){
        if(tempQuest[tempQuest.length-1]==='√'){
          let n=generatePerfect(true)
          tempQuest.push(n);
        }
        else{
          let n=generatePerfect(false)
          tempQuest.push(n);
        }
      }
      else{
        let n = generateNumber();
        tempQuest.push(n);
      }

      //adds sq
      if(props.problemSet.some(s=>s=='²'||s=='³')){
        if(props.termCount==1) {
          if(pushed=='r'){
            if(Math.random()<0.5){
              tempQuest.push(generateOp('s'))
            }
          }
          else{
            tempQuest.push(generateOp('s'))
          }
        }
        else if(Math.random() < 0.5){
          tempQuest.push(generateOp('s'))
        }
        pushed='s'
      }

    });
    setQuestion(tempQuest);
  }

  function calculateSolution() {
    let tempAns = [...question],
      tempAnsLen=tempAns.length,
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
        else if (i > tempAnsLen - 1) {
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
      tempAnsLen=tempAns.length
    }
    if (tempAns[0] % 1 === 0) {
      setSolution(tempAns[0]);
    } else setSolution(parseFloat(tempAns[0].toFixed(props.precision)));
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
