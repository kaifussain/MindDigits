import React, { useEffect, useState } from "react";
import "./AnsOption.css";

const AnsOption = ({
  question,
  solution,
  generateQuestion,
  calculateSolution,
  setCorrectSolutions,
  setWrongSolutions,
  precision,
  timeUp,
  setsolvedBeforeTime,
  solvedBeforeTime
}) => {
  const [options, setOptions] = useState([]);
  const [isOptSelected, setIsOptSelected] = useState(false);
  const [wrongOpt, setWrongOpt] = useState(null);

  function generationN() {
    let solutionLen = solution.toString().length;
    if (solutionLen <= 3) {
      let s = solution.toString();
      if (s.includes(".")) {
        let n = (Math.random() * 20).toFixed(precision);
        return Number(n);
      } else {
        let n =
          Math.floor(Math.random() * 20) - Math.floor(Math.random() * 20) + 1;
        return n;
      }
    } else if (solutionLen <= 14) {
      let s = solution.toString();
      let randI = Math.floor(Math.random() * (solutionLen - 4)) + 1;
      let randN = Math.floor(Math.random() * 10).toString();
      const newS = s.slice(0, randI) + randN + s.slice(randI + 1);
      const randNum = Number(newS);
      if (isNaN(randNum)) {
        return (solution / 2).toFixed(1) - solution;
      }
      return Number(newS) - solution;
    } else {
      let s = solution.toString();
      let randI = Math.floor(Math.random() * (solutionLen - 5)) + 3;
      let randN = Math.floor(Math.random() * 10).toString();
      const newS = s.slice(0, randI) + randN + s.slice(randI + 1);
      const randNum = Number(newS);
      if (isNaN(randNum)) {
        return (solution / 2).toFixed(1) - solution;
      }
      return Number(newS) - solution;
    }
  }
  function makeOptions() {
    let temp = new Array(4).fill(null);
    let usedNumbers = new Set();
    let hasDot = solution.toString().includes(".");
    let i = Math.floor(Math.random() * 4);
    temp[i] = solution;
    usedNumbers.add(solution);

    for (let j = 0; j < 3; j++) {
      let n;
      do {
        n = solution + generationN();
      } while (usedNumbers.has(n));

      usedNumbers.add(n);
      i = (i + 1) % 4;
      while (temp[i] !== null) {
        i = (i + 1) % 4;
      }
      if (hasDot) {
        temp[i] = n.toFixed(precision);
      } else {
        temp[i] = n;
      }
    }

    setOptions(temp);
  }

  function handleOptionSubmit(o) {
    if (!isOptSelected) {
      setsolvedBeforeTime(true);
      setIsOptSelected(true);
      if (o == solution) {
        setCorrectSolutions((x) => x + 1);
      } else {
        setWrongOpt(o);
        setWrongSolutions((x) => x + 1);
      }
    }
  }

  function handleNextQuest() {
    setIsOptSelected(false);
    setWrongOpt(null);
    generateQuestion();
  }

  useEffect(() => {
    calculateSolution();
  }, [question]);

  useEffect(() => {
    if (solution !== null) {
      makeOptions();
    }
  }, [solution]);

  useEffect(() => {
    if (timeUp) {
      setIsOptSelected(true);
    }
  }, [timeUp]);

  return (
    <div id="AnsOption">
      {options.map((o, i) => (
        <div
          key={o + i.toString()}
          className={`options ${
            isOptSelected && o == solution ? (!solvedBeforeTime? 'correctTimeup' : "correctOpt") : ""
          } ${o == wrongOpt ? "wrongOpt" : ""}`}
          onClick={() => handleOptionSubmit(o)}
        >
          {o}
        </div>
      ))}
      <div className="nextBtn_optMode_div">
        <button
          className={isOptSelected ? "nextBtn_optMode" : "hide"}
          onClick={handleNextQuest}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnsOption;
