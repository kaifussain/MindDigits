import React, { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(true);
  const [sqPartDisable,setSqPartDisable] = useState(false)
  const [addPartDisable,setAddPartDisable] = useState(false)
  const [allOperation, setAllOperation] = useState([
    { symbol: "+", disabled: false },
    { symbol: "-", disabled: false },
    { symbol: "×", disabled: false },
    { symbol: "÷", disabled: false },
    { symbol: "% of", disabled: false },
    { symbol: "²", disabled: false },
    { symbol: "³", disabled: false },
    { symbol: "√", disabled: false },
    { symbol: "³√", disabled: false },
  ]);

  useEffect(()=>{
    let temp = [...allOperation];
    let i = 5;
    if(sqPartDisable){
      props.emptyProblemSet('s')
      while (i < 9) {
        temp[i].disabled = true;
        i++;
      }
    }
    else{
      while (i < 9) {
        temp[i].disabled = false;
        i++;
      }
    }
    setAllOperation(temp);
  },[sqPartDisable])

  useEffect(()=>{
    let temp = [...allOperation];
    let i = 0;
    if(addPartDisable){
      props.emptyProblemSet('o')
      while (i < 5) {
        temp[i].disabled = true;
        i++;
      }
    }
    else{
      while (i < 5) {
        temp[i].disabled = false;
        i++;
      }
    }
    setAllOperation(temp);
  },[addPartDisable])

  useEffect(() => {
    if(props.termCount==1){
      setAddPartDisable(true)
      setSqPartDisable(false)
    }
    else{
      setAddPartDisable(false)
      if(props.problemSet.length==0 || !props.problemSet.some(a=>a=='+'||a=='-'||a=='×'||a=='÷'||a=='% of')){
        setSqPartDisable(true)
      }
      else{
        setSqPartDisable(false)
      }
    }
  }, [props.termCount,props.problemSet]);

  const style4inner = {
    display: sideBarOpened ? "flex" : "none",
  };
  const tags = {
    backgroundColor: "transparent",
    fontSize: "13px",
    margin: "auto",
    textAlign: "center",
    width: "fit-content",
    padding: "0 5px",
  };
  return (
    <div id="Sidebar">
      <button id="sideBarBtn" onClick={() => setSideBarOpened(!sideBarOpened)}>
        {sideBarOpened ? "❌" : "⭕"}
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
          <span style={tags}>Precision</span>
          <select onChange={props.setPrecision}>
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
            Opt
          </button>
          <button
            className={props.isAnsManual ? "selected" : ""}
            onClick={props.setIsAnsManualTrue}
          >
            Man
          </button>
        </div>
        <div className="no-break-line flex innerBtns-40px-width">
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
