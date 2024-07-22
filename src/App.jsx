import { useEffect, useState } from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAnsManual, setIsAnsManual] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [problemSet, setProblemSet] = useState(['+']);
  const [digitSet, setDigitSet] = useState([1]);
  const [numberType, setNumberType] = useState(0);
  const [termCount, setTermCount] = useState(2);
  const [precision, setPrecision] = useState(1);
  const [perfect, setPerfect] = useState(true);
  const [reset,setReset] = useState(false)
  const [timer,setTimer] = useState(2)

  function handleDigitChange(digit){
    setDigitSet((xDigitSet)=>{
      if(xDigitSet.includes(digit)){
        let x = xDigitSet.filter((a)=>a!=digit)
        if(x.length===0) return [1]
        else return x
      }
      else{
        return [...xDigitSet,digit]
      }
    })
    if(digitSet.length===0){
      setDigitSet[1]
    }
  }
  function handleProblemSetChange(op){
    setProblemSet((xProblemSet)=>{
      let newSet;
      if(xProblemSet.includes(op)){
        newSet = xProblemSet.filter((a)=>a!=op)
      }
      else{
        newSet = [...xProblemSet,op]
      }

      if(newSet.length===0){
        if(termCount==1) return ['²']
        else return ['+']
      }
      else if(termCount==1){
        newSet = newSet.filter(a=>a==='²'||a==='³'||a==='√'||a==='∛')
        return newSet
      }
      else{
        if(newSet.some(a=>a==='+'||a==='-'||a==='×'||a==='÷'||a==='% of')) return newSet
        else return [...newSet,'+']
      }

    })
  }
  useEffect(()=>{
    if(termCount==1){
      if(problemSet.some(a=>a==='+'||a==='-'||a==='×'||a==='÷'||a==='% of')){
        setProblemSet(x=>{
          let newSet;
          newSet = x.filter(a=>a==='²'||a==='³'||a==='√'||a==='∛')
          if(newSet.length == 0){
            return ['²']
          }
          else return newSet;
        })
      }
    }
    else{
      if(!problemSet.some(a=>a==='+'||a==='-'||a==='×'||a==='÷'||a==='% of')){
        setProblemSet(x=>([...x,'+']))
      }
    }
  },[termCount])

  useEffect(()=>{
    setReset(!reset)
  },[problemSet,digitSet,numberType,termCount,precision,perfect,isAnsManual,timer])

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
        numberType={numberType}
        setNumberType={(e)=>setNumberType(e.target.value)}
        timer={timer}
        setTimer={(e)=>setTimer(e.target.value)}
        />
      <Mainbar
        isAnsManual={isAnsManual}
        problemSet={problemSet}
        digitSet={digitSet}
        termCount={termCount}
        precision={precision}
        perfect={perfect}
        numberType={numberType}
        reset={reset}
        timer={timer}
      />
    </div>
  );
}

export default App;
