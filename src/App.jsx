import { useState } from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAnsManual, setIsAnsManual] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [problemSet, setProblemSet] = useState(["+", "-"]);
  const [digitSet, setDigitSet] = useState([1]);
  const [termCount, setTermCount] = useState(3);

  return (
    <div id="app" className={darkMode ? "darkMode" : "lightMode"}>
      <Sidebar
        isAnsManual={isAnsManual}
        setIsAnsManualFalse={() => setIsAnsManual(false)}
        setIsAnsManualTrue={() => setIsAnsManual(true)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}

        problemSet={problemSet}
        digitSet={digitSet}
        termCount={termCount}
      />
      <Mainbar
        isAnsManual={isAnsManual}
        problemSet={problemSet}
        digitSet={digitSet}
        termCount={termCount}
      />
    </div>
  );
}

export default App;
