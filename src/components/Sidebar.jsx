import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import numpadPng from "../assets/numpad.png";
import option4 from "../assets/option4.png";

const Sidebar = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [allOperation, setAllOperation] = useState([
    { symbol: "+", disabled: false },
    { symbol: "-", disabled: false },
    { symbol: "×", disabled: false },
    { symbol: "÷", disabled: false },
    { symbol: "% of", disabled: false },
    { symbol: "²", disabled: false },
    { symbol: "³", disabled: false },
    { symbol: "√", disabled: false },
    { symbol: "∛", disabled: false },
  ]);

  const sideBarRef = useRef(null)
  useEffect(()=>{
    const handleClickOutside = (e) => {
      if(window.innerWidth < 600 && sideBarRef.current && !sideBarRef.current.contains(e.target)){
        setSideBarOpened(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () => {
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[])
  
  useEffect(() => {
    let temp = [...allOperation];

    if (props.termCount == 1) {
      let i = 0;
      while (i < 5) {
        temp[i].disabled = true;
        i++;
      }
    } else {
      let i = 0;
      while (i < 5) {
        temp[i].disabled = false;
        i++;
      }
    }
    setAllOperation(temp);
  }, [props.termCount]);

  const style4inner = {
    display: sideBarOpened ? "flex" : "none",
    marginLeft: "58px",
  };
  const tags = {
    backgroundColor: "transparent",
    fontSize: "13px",
    textAlign: "center",
    position: "absolute",
    left: "14px",
    marginRight: "20px",
  };
  return (
    <div id="Sidebar" ref={sideBarRef}>
      <button id="sideBarBtn" onClick={() => setSideBarOpened(!sideBarOpened)}>
        {sideBarOpened ? "✖" : "☰"}
      </button>
      <div style={style4inner} id="sidebarInnerDiv">
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Problems</span>
          {allOperation.map((a, i) => (
            <button
              key={a.symbol}
              className={
                props.problemSet.includes(a.symbol) && !a.disabled
                  ? "selected"
                  : ""
              }
              onClick={props.handleProblemSetChange}
              disabled={a.disabled}
            >
              {a.symbol}
            </button>
          ))}
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Terms</span>
          <select onChange={props.setTermCount} value={props.termCount}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Digits</span>
          {Array.from({ length: 5 }).map((_, ind) => (
            <button
              key={ind}
              className={props.digitSet.includes(ind + 1) ? "selected" : ""}
              onClick={props.handleDigitChange}
            >
              {ind + 1}
            </button>
          ))}
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Number</span>
          <select value={props.numberType} onChange={props.setNumberType}>
            <option value={0}>Integer</option>
            <option value={1}>Decimal</option>
            <option value={2}>Both</option>
          </select>
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Precision</span>
          <select onChange={props.setPrecision} value={props.precision}>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>√Perfect</span>
          <input
            type="checkbox"
            checked={props.perfect}
            onChange={props.togglePerfect}
          ></input>
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Solve</span>
          <button
            className={props.isAnsManual ? "" : "selected"}
            onClick={props.setIsAnsManualFalse}
          >
            <img src={option4} className="optImg"></img>
          </button>
          <button
            className={props.isAnsManual ? "selected" : ""}
            onClick={props.setIsAnsManualTrue}
          >
            <img src={numpadPng} className="optImg"></img>
          </button>
        </div>
        <div className="flex innerBtns-40px-width">
          <span style={tags}>Timer</span>
          <select onChange={props.setTimer} value={props.timer}>
            <option value={0}>off</option>
            <option value={2}>2 s</option>
            <option value={5}>5 s</option>
            <option value={10}>10 s</option>
            <option value={15}>15 s</option>
            <option value={30}>30 s</option>
            <option value={45}>45 s</option>
            <option value={60}>60 s</option>
            <option value={90}>90 s</option>
            <option value={120}>120 s</option>
            <option value={150}>150 s</option>
            <option value={180}>180 s</option>
          </select>
        </div>
        <div className="no-break-line innerBtns-40px-width flex">
          <span style={tags}>Dark Mode</span>
          <input
            type="checkbox"
            checked={props.darkMode}
            onChange={props.toggleDarkMode}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
