import { useState } from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAnsManual, setIsAnsManual] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [problemSet, setProblemSet] = useState([]);
  const [digitSet, setDigitSet] = useState([1]);
  const [termCount, setTermCount] = useState(1);
  const [precision, setPrecision] = useState(1);
  const [perfect, setPerfect] = useState(true);

  function handleDigitChange(digit){
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
    setProblemSet((xProblemSet)=>{
      if(xProblemSet.includes(op)){
        return xProblemSet.filter((a)=>a!=op)
      }
      else{
        return [...xProblemSet,op]
      }
    })
  }
  function emptyProblemSet(p){
    if(p=='o'){
      let temp=[...problemSet]
      temp = temp.filter(a => a !== '+' && a !== '-' && a !== '×' && a !== '÷' && a !== '% of');
      setProblemSet(temp)
    }
    else if(p=='s'){
      let temp=[...problemSet]
      temp = temp.filter(a => a !== '²' && a !== '³' && a !== '√' && a !== '³√');
      setProblemSet(temp)
    }
    // setProblemSet([])
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
        precision={precision}
        setPrecision={(e)=>setPrecision(e.target.value)}
        perfect={perfect}
        togglePerfect={() => setPerfect(!perfect)}
        emptyProblemSet={emptyProblemSet}
        />
      <Mainbar
        isAnsManual={isAnsManual}
        problemSet={problemSet}
        digitSet={digitSet}
        termCount={termCount}
        precision={precision}
        perfect={perfect}
      />
    </div>
  );
}

export default App;
