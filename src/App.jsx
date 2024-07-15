import { useEffect, useState } from 'react'
import './App.css'
import Mainbar from './components/Mainbar'
import Sidebar from './components/Sidebar'

function App() {
  const [isAnsManual, setIsAnsManual] = useState(true);
  
  return (
    <div id='app'>
      <Sidebar isAnsManual={isAnsManual} setIsAnsManualFalse={()=>setIsAnsManual(false)} setIsAnsManualTrue={()=>setIsAnsManual(true)}/>
      <Mainbar isAnsManual={isAnsManual}/>
    </div>
  )
}

export default App
