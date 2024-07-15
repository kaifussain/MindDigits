import React from 'react'
import './Mainbar.css'
import AnsOption from './sub-components/AnsOption'
import AnsManual from './sub-components/AnsManual'
const Mainbar = (props) => {
  return (
    <div id="Mainbar">
        <div id="Mainbar_head">
          50 + 20 + 10
        </div>
        <div id="Mainbar_mid">
          {props.isAnsManual?<AnsManual/>:<AnsOption/>}
        </div>
    </div>
  )
}

export default Mainbar