import React, { useState } from 'react'
import './Mainbar.css'
import AnsOption from './sub-components/AnsOption'
import AnsManual from './sub-components/AnsManual'
const Mainbar = (props) => {
  // const [problemSet,setProblemSet] = useState(['+','-']);
  // const [digitSet,setDigitSet] = useState([1]);
  // const [termCount,setTermCount] = useState(3);
  const [question,setQuestion] = useState([]);
  const [solution,setSolution] = useState();
  const [userSolution,setUserSolution] = useState();


  function generateNumber(){
    let d = Math.floor(Math.random()*props.digitSet.length)
    let wholeRange = Math.pow(10,props.digitSet[d])
    let excludeRange = Math.pow(10,props.digitSet[d]-1)
    return Math.floor(Math.random()*(wholeRange-excludeRange)+excludeRange)
  }

  function generateTerms(){

    let tempQuest=[],tempSol,tempOp
    Array.from({ length: props.termCount }).forEach((_,ind)=>{
      
      if(ind!==0) {
        let i=Math.floor(Math.random()*props.problemSet.length)
        tempOp=props.problemSet[i]
        tempQuest.push(tempOp)
      }

      let n=generateNumber()
      tempQuest.push(n)

      if(ind===0) tempSol=n
      else if(tempOp==='+') tempSol+=n
      else if(tempOp==='-') tempSol-=n
      
    });
    setSolution(tempSol)
    setQuestion(tempQuest)
  }
  
  return (
    <div id="Mainbar">
        <div id="Mainbar_head">
          {question} = {solution}
        </div>
        <div id="Mainbar_mid">
          <button onClick={()=>generateTerms()}>start</button>
          {props.isAnsManual?<AnsManual/>:<AnsOption/>}
        </div>
    </div>
  )
}

export default Mainbar