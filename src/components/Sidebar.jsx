import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);

  const style4inner = {
    display: sideBarOpened ? "flex" : "none",
  };
  const tags = {
    backgroundColor:'transparent',fontSize:'13px',margin:'auto',textAlign:'center',width:'fit-content',padding:'0 5px'
  }
  return (
    <div id="Sidebar">
      <button id="sideBarBtn" onClick={() => setSideBarOpened(!sideBarOpened)}>
        {sideBarOpened ? "❌" : "⭕"}
      </button>
      <div style={style4inner} id="sidebarInnerDiv">
        <div className="flex innerBtns-40px-width">
        <span style={tags}>Problems</span>
          <button>+</button>
          <button>-</button>
          <button>*</button>
          <button>/</button>
          <button>%</button>
          <button>
            x<sup>2</sup>
          </button>
          <button>
            x<sup>3</sup>
          </button>
          <button>
            <sup>2</sup>√
          </button>
          <button>
            <sup>3</sup>√
          </button>
        </div>
        <div className="flex innerBtns-40px-width">
        <span style={tags}>Terms</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="flex innerBtns-40px-width">
        <span style={tags}>Digits</span>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
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
          <button onClick={()=>props.toggleDarkMode()} className={props.darkMode?"selected" : ""}>DM</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
