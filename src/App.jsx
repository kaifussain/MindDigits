import { useEffect, useState } from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isAnsManual, setIsAnsManual] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [problemSet, setProblemSet] = useState(['+']);
  const [digitSet, setDigitSet] = useState([1]);
  const [numberType, setNumberType] = useState(0);
  const [termCount, setTermCount] = useState(2);
  const [precision, setPrecision] = useState(1);
  const [perfect, setPerfect] = useState(true);

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
        // return x
      }
      else{
        newSet = [...xProblemSet,op]
      }

      if(newSet.length===0){
        if(termCount==1) return ['²']
        else return ['+']
      }
      else if(termCount==1){
        newSet = newSet.filter(a=>a==='²'||a==='³'||a==='√'||a==='³√')
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
          newSet = x.filter(a=>a==='²'||a==='³'||a==='√'||a==='³√')
          return newSet;
        })
      }
    }
    else{
      if(!problemSet.some(a=>a==='+'||a==='-'||a==='×'||a==='÷'||a==='% of')){
        setProblemSet(x=>([...x,'+']))
      }
    }
  },[termCount])

  function emptyProblemSet(p){
    let temp=[...problemSet]
    if(p=='o'){
      temp = temp.filter(a => a !== '+' && a !== '-' && a !== '×' && a !== '÷' && a !== '% of');
      if(termCount==1){
        if(temp.length>0) setProblemSet(temp)
        else setProblemSet(['²'])
      }
      else{
        setProblemSet(temp)
      }
    }
    else if(p=='s'){

      temp = temp.filter(a => a !== '²' && a !== '³' && a !== '√' && a !== '³√');
      setProblemSet(temp)
    }
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
        numberType={numberType}
        setNumberType={(e)=>setNumberType(e.target.value)}
        />
      <Mainbar
        isAnsManual={isAnsManual}
        problemSet={problemSet}
        digitSet={digitSet}
        termCount={termCount}
        precision={precision}
        perfect={perfect}
        numberType={numberType}
      />
    </div>
  );
}

export default App;
