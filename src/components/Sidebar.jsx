import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);

  const style4inner = {
    display: sideBarOpened ? "flex" : "none",
  };

  return (
    <div id="Sidebar">
      <button id="sideBarBtn" onClick={() => setSideBarOpened(!sideBarOpened)}>
        {sideBarOpened ? "❌" : "⭕"}
      </button>
      <div style={style4inner} id="sidebarInnerDiv">
        <div className="flex innerBtns-40px-width">
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
          Digits
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
        <div className="flex innerBtns-40px-width">
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
