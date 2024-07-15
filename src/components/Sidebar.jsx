import React, { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const style = {
    width: sideBarOpened ? "23vw" : "0",
    color: sideBarOpened ? "" : "transparent",
  };
  const style4inner = {
    display: sideBarOpened ? "flex" : "none",
  };

  return (
    <div id="Sidebar" style={style}>
      <button id="sideBarBtn" onClick={() => setSideBarOpened(!sideBarOpened)}>
        {sideBarOpened ? "⬅️" : "➡️"}
      </button>
      <div style={style4inner} id="sidebarInnerDiv">
        
        <div className="flex">
          <button>+</button>
          <button>-</button>
          <button>*</button>
          <button>/</button>
          <button>%</button>
          <button>x<sup>2</sup></button>
          <button>x<sup>3</sup></button>
          <button><sup>2</sup>√</button>
          <button><sup>3</sup>√</button>
        </div>
        <div className="flex">
          <button>E</button>
          <button>M</button>
          <button>H</button>
        </div>
        <div className="flex">
          <button className={props.isAnsManual?'':'selected'} onClick={props.setIsAnsManualFalse}>Option</button>
          <button className={props.isAnsManual?'selected':''} onClick={props.setIsAnsManualTrue}>Manual</button>
        </div>
        <div className="no-break-line flex">
          <button>Dark Mode</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
