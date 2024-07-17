import { useState } from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAnsManual, setIsAnsManual] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [problemSet, setProblemSet] = useState(["+", "-",'*','/']);
  const [digitSet, setDigitSet] = useState([1]);
  const [termCount, setTermCount] = useState(3);

  function handleDigitChange(digit){
    console.log(typeof(digit))
    setDigitSet((xDigitSet)=>{
      if(xDigitSet.includes(digit)){
        return xDigitSet.filter((a)=>a!=digit)
      }
      else{
        return [...xDigitSet,digit]
      }
    })
  }
  function handleProblemSetChange(op){
    console.log(typeof(op))
    setProblemSet((xProblemSet)=>{
      if(xProblemSet.includes(op)){
        return xProblemSet.filter((a)=>a!=op)
      }
      else{
        return [...xProblemSet,op]
      }
    })
  }

  return (
    <div id="app" className={darkMode ? "darkMode" : "lightMode"}>
      <Sidebar
        isAnsManual={isAnsManual}
        setIsAnsManualFalse={() => setIsAnsManual(false)}
        setIsAnsManualTrue={() => setIsAnsManual(true)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}

        problemSet={problemSet}
        handleProblemSetChange={(e)=>handleProblemSetChange(e.target.innerText)}
        digitSet={digitSet}
        handleDigitChange={(e)=>handleDigitChange(Number(e.target.innerText))}
        termCount={termCount}
        setTermCount={(e)=>setTermCount(e.target.value)}
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
