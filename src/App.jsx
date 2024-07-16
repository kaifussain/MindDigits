import { useEffect, useState } from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAnsManual, setIsAnsManual] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div id="app" className={darkMode ? "darkMode" : "lightMode"}>
      <Sidebar
        isAnsManual={isAnsManual}
        setIsAnsManualFalse={() => setIsAnsManual(false)}
        setIsAnsManualTrue={() => setIsAnsManual(true)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Mainbar isAnsManual={isAnsManual} />
    </div>
  );
}

export default App;
