import React, { useState } from 'react'
import './AnsManual.css'
const AnsManual = ({setUserSolution,calculateSolution}) => {
  const [userInput,setUserInput] = useState('')
  const handleInput = (i) => {
    setUserInput(x => {
      if(x==='') return i
      else{
          if(i==='-') return x
          else if(i==='.' && x.includes('.')) return x
          else return x.toString()+i

      }
    })
  }
  const handleBack = () => {
    setUserInput(x => (x.length>1 ? x.slice(0,-1):''))
  }
  const clearInput = () => {
    setUserInput('')
  }
  const submitInput = () => {
    calculateSolution()
    setUserSolution(userInput)
  }
  return (
    <div id="AnsManual">
      <div id="AnsManual_screen">
        <div id='userInput_sc'>
          {userInput}
        </div>
        <div id='backBtn' onClick={handleBack} >
        ↩
        </div>
        <div id='xBtn' onClick={clearInput} >
          ✗
        </div>
      </div>
      <div id="AnsManual_buttons_body">
        {
          [1,2,3,4,5,6,7,8,9,'-',0,'.'].map(i=>(
            <div key={i+'b'} onClick={()=>handleInput(i)}>{i}</div>
          ))
        }
        <div id='submitBtn' onClick={submitInput}>✔</div>
      </div>
    </div>
  )
}

export default AnsManual