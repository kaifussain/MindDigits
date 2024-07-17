import React, { useState } from 'react'
import './Mainbar.css'
import AnsOption from './sub-components/AnsOption'
import AnsManual from './sub-components/AnsManual'
const Mainbar = (props) => {
  const [question,setQuestion] = useState([]);
  const [solution,setSolution] = useState();
  const [userSolution,setUserSolution] = useState();


  function generateNumber(){
    let d = Math.floor(Math.random()*props.digitSet.length)
    let wholeRange = Math.pow(10,props.digitSet[d])
    let excludeRange = Math.pow(10,props.digitSet[d]-1)
    return Math.floor(Math.random()*(wholeRange-excludeRange)+excludeRange)
  }

  function generateQuestion(){
    setSolution(null)
    let tempQuest=[],tempOp
    Array.from({ length: props.termCount }).forEach((_,ind)=>{
      
      if(ind!==0) {
        let i=Math.floor(Math.random()*props.problemSet.length)
        tempOp=props.problemSet[i]
        tempQuest.push(tempOp)
      }

      let n=generateNumber()
      tempQuest.push(n)

    });
    setQuestion(tempQuest)
  }
  function calculateSolution(){
    let tempAns = question,i=1,precedence=0
    while(tempAns.length>1 && precedence<2){
      if(precedence===0){
        if(tempAns[i]=='/'){
          tempAns[i-1]=tempAns[i-1]/tempAns[i+1]
          tempAns.splice(i,2)
          i=1
        }
        else if(tempAns[i]=='*'){
          tempAns[i-1]=tempAns[i-1]*tempAns[i+1]
          tempAns.splice(i,2)
          i=1
        }
        else if(i>tempAns.length-2){
          i=1;
          precedence = 1;
        }
        else{
          i+=2
        }
      }
      else if( precedence === 1){

        if(tempAns[i]=='+'){
          tempAns[i-1]=tempAns[i-1]+tempAns[i+1]
          tempAns.splice(i,2)
          i=1

        }
        else if(tempAns[i]=='-'){
          tempAns[i-1]=tempAns[i-1]-tempAns[i+1]
          tempAns.splice(i,2)
          i=1
        }
        else if(i>tempAns.length-2){
          i=0;
          precedence = 2;
        }
        else{
          i+=2
        }
      }
    }
    if(tempAns[0]%1===0){
      setSolution(tempAns[0])
    }
    else setSolution(tempAns[0].toFixed(2))
  }
  
  return (
    <div id="Mainbar">
        <div id="Mainbar_head">
          {question} = {solution}
        </div>
        <div id="Mainbar_mid">
          <button onClick={()=>generateQuestion()}>question</button>
          <button onClick={()=>calculateSolution()}>answer</button>
          {props.isAnsManual?<AnsManual/>:<AnsOption/>}
        </div>
    </div>
  )
}

export default Mainbar