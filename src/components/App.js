import React, { useEffect, useState, useRef } from 'react';
import { Timer, Session, Break } from './pomodoro.js';
import '../css/App.css';

const App = () => {
  const audioRef = useRef();
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [mode, setMode] = useState("session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 1000);
  const [isActive, setIsActive] = useState(false);
  const [timeSpend, setTimeSpend] = useState(0);
  const [AudioPlaying, setAudioPlaying] = useState(false);

    const decrementBreakLength = () => {
  const decreasedBreakLength = breakLength - 60 > 60 ? breakLength - 60 : 60;
 setBreakLength(decreasedBreakLength)
}

const incrementBreakLength = () => {
  const incrementedBreakLength = 
        breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60;
  setBreakLength(incrementedBreakLength)
}

  const decrementSessionLength = () => {
  const decreasedSessionLength = sessionLength - 60 > 60 ? sessionLength - 60 : 60;
 setSessionLength(decreasedSessionLength)
}

const incrementSessionLength = () => {
  const incrementedSessionLength = 
        sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60 * 60;
  setSessionLength(incrementedSessionLength)
}

const reset = () => {
  setBreakLength(5 * 60)
  setSessionLength(25 * 60)
  setMode("session")
  setTimeLeft(sessionLength * 1000);
  
 if (isActive) {
   setIsActive(false)
   setTimeSpend(0)
 }
  
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    if (AudioPlaying) {
      setAudioPlaying(false)
    }   
}

const toggleActive = () => {
  setIsActive(!isActive);
}

useEffect(() => {
  setTimeLeft(mode === "session" ? sessionLength * 1000 : breakLength * 1000)
}, [sessionLength, breakLength])

useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 1) {
      setTimeLeft(mode === "session" 
      ? sessionLength * 1000 - timeSpend
      : breakLength * 1000 - timeSpend)
    
    interval = setInterval(() => {
      setTimeSpend((timeSpend) => timeSpend + 1000)
    }, 1000)
  } else {
    clearInterval(interval)
  }
  
  if (timeLeft === 0) {
    audioRef.current.play();
    setAudioPlaying(true);
    setTimeSpend(0);
    setMode((mode) => (mode === "session" ? "break" : "session"))
    setTimeLeft(mode === "session" ? sessionLength * 1000 : breakLength * 1000);
  }
  return () => clearInterval(interval);
}, [isActive, timeSpend]);

useEffect(() => {
  let currentRef = audioRef.current
  audioRef.current.addEventListener("ended", () => setAudioPlaying(false));
  return () => {
    currentRef.addEventListener("ended", () => setAudioPlaying(false));
  }
}, [audioRef]);

return (
  <> 
  <div class="container-fluid text-center">
    <h1>Pomodoro Clock</h1>
    <div class="row">
      <Break
        decrement={decrementBreakLength}
        increment={incrementBreakLength}
        length={breakLength}
       />
      <Session
        decrement={decrementSessionLength}
        increment={incrementSessionLength}
        length={sessionLength}
      />
    </div>
  </div>
  <div class="container-fluid text-center">
    <Timer time={timeLeft} mode={mode}/>   
     <div class="btn-group">
      <button class="btn btn-success btn-lg" onClick={toggleActive} id="start_stop">{isActive ? "Pause" : "Start"}</button>
      <button class="btn btn-warning btn-lg" onClick={reset} id="reset">Reset</button>
    </div>
  </div>
    <audio id="beep" src="https://freesound.org/data/previews/523/523960_350703-lq.mp3" ref={audioRef}/>    
  </>
)
}

export default App;
