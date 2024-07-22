import React, { useEffect, useState } from "react";
import "./Result.css";

const Result = ({
  showResult,
  setShowResult,
  showResultEachTime,
  setShowResultEachTime,
  isCorrect,
  userSolution,
  question,
  solution,
  generateQuestion,
  correctSolutions,
  wrongSolutions,
  isClose,
  timerIsOn,
  timeUp,
  solvedBeforeTime,
  type,
}) => {
  const correctStyle = {
    color: isCorrect ? "rgb(27, 168, 123)" : "red",
  };
  function handleNext() {
    setShowResult(false);
    generateQuestion();
  }
  return type === "full" ? (
    <div id="ResultFull" className={showResult ? " resultShow" : " resultHide"}>
      <div id="result_title" style={correctStyle}>
        {timeUp && !solvedBeforeTime? "" : isCorrect ? (isClose ? "Correct *" : "Correct") : "Wrong"}
      </div>
      {showResultEachTime ? "" : question}
      
     
      <div id="result_equation">

      {timeUp && !solvedBeforeTime? (
          <table style={{ textAlign: "center"}}>
          <thead>
            <tr>
              <td>Correct Solution</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: "24px" }}>
              <td style={{ color: "rgb(27, 168, 123)"}}>{solution}</td>
            </tr>
          </tbody>
        </table>
      )
      :
      (
        <table style={{ textAlign: "center"}}>
          <thead>
            <tr>
              <td>Correct Solution</td>
              <td style={{ padding: "0 2vw" }}></td>
              <td>Your Solution</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: "24px" }}>
              <td style={{ color: "rgb(27, 168, 123)"}}>{solution}</td>
              <td>{isCorrect ? (isClose ? "≈" : "=") : "≠"}</td>
              <td style={correctStyle}>{userSolution}</td>
            </tr>
          </tbody>
        </table>
      )}
      </div>

      <div id="result_history">
        {correctSolutions > 0 && <div>Correct: {correctSolutions}</div>}
        {wrongSolutions > 0 && <div>Wrong: {wrongSolutions}</div>}
      </div>
      <button id="nextBtn" onClick={handleNext}>
        Next Question
      </button>
      {
        !timerIsOn && <div id="dont_show_this">
        Don't show results after submission
        <input
          type="checkbox"
          checked={!showResultEachTime}
          onChange={setShowResultEachTime}
        ></input>
      </div>
      }
      
    </div>
  ) : (
    <div id="ResultShort">
      <div id="result_title_short" style={correctStyle}>
        {timeUp? "Time's Up" : isCorrect ? (isClose ? "Correct *" : "Correct") : "Wrong"}
      </div>
      Previous Question<div id="prevQuestion">{question.join(" ")}</div>
      <div id="result_equation_short">
        
          <table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <td>Correct Solution</td>
              <td style={{ padding: "0 40px" }}></td>
              <td>Your Solution</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: "24px" }}>
              <td style={{ color: "rgb(27, 168, 123)"}}>{solution}</td>
              <td>{isCorrect ? (isClose ? "≈" : "=") : "≠"}</td>
              <td style={correctStyle}>{userSolution}</td>
            </tr>
          </tbody>
        </table>
       
      </div>
      <div id="result_history_short">
      {correctSolutions > 0 && <div>Correct: {correctSolutions}</div>}
      {wrongSolutions > 0 && <div>Wrong: {wrongSolutions}</div>}
      </div>
      {
        !timerIsOn && <div id="dont_show_this">
        Don't show results after submission
        <input
          type="checkbox"
          checked={!showResultEachTime}
          onChange={setShowResultEachTime}
        ></input>
      </div>
      }
      
    </div>
  );
};

export default Result;
