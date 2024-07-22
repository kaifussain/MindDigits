import React, { useState, useEffect } from 'react';
import './Timer.css'
const Timer = ({ initialTime, setTimeUp, timeUp , solvedBeforeTime}) => {
  const [time, setTime] = useState(initialTime);
  const [resetKey, setresetKey] = useState(0);

  useEffect(() => {
    if(!timeUp){
        setTime(initialTime);
        setresetKey(x=>x+1)
    }
  }, [timeUp, initialTime]);

  useEffect(() => {
    if (time > 0 && !solvedBeforeTime) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
    else {
      setTimeUp(true);
    }
  }, [time, solvedBeforeTime]);
  const timerWidth = {
     width: (time / initialTime) * 100  + '%',
     backgroundColor: `rgb(${255 - (time / initialTime) * 255}, 0, ${(time / initialTime) * 255})`
  }
  return (
    <div className='Timer'>
      {time > 0 ? (
        <>
          <div className='timeLeft'>Time left : <span style={{fontSize:'20px',margin:'5px'}}>{time}</span> seconds</div>
          <div className='timerVisual' style={timerWidth} key={resetKey}></div>
        </>
      ) : (
        <div className='timeUp'>Time's up!</div>
      )}
    </div>
  );
};

export default Timer;
