import { useEffect, useState } from 'react'
import './App.css'
import Mainbar from './components/Mainbar'
import Sidebar from './components/Sidebar'

function App() {
  const [smallScreenMode,setSmallScreenMode] = useState(window.innerWidth<600)
  useEffect(()=>{
    function handleResize(){
      if(window.innerWidth<600){
        setSmallScreenMode(true)
      }
      else{
        setSmallScreenMode(false)
      }
    }
    window.addEventListener('resize',handleResize)
    return () => window.removeEventListener('resize',handleResize)
  },[])
  return (
    <div id='app'>
      <Sidebar smallScreenMode={smallScreenMode}/>
      <Mainbar />
    </div>
  )
}

export default App
