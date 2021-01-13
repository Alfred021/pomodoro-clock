export const Session = (props) => {
    const {increment, decrement, length} = props
  
  return (
    <div class="col-sm-6">
      <p id="session-label">Session Length</p>
      <button class="btn btn-info btn-lg" id="session-decrement" onClick={decrement}>-</button>
      <span class="align-middle" id="session-length">{length / 60}</span>
      <button class="btn btn-danger btn-lg" 
      onClick={increment} id="session-increment">+</button>
    </div>
  )
}

export const Timer = (props) => {
    const {time, mode} = props
    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor((time / 1000) % 60)
    
  return (  
    <div id="timer">
      <p id="timer-label">{mode}</p>
      <p id="time-left">
        {min.toString().length === 1 ? "0" + min : min}:{sec.toString().length === 1 ? "0" + sec : sec}
      </p>
    </div>
  )
}

export const Break = (props) => {
    const {increment, decrement, length} = props
    
    return (
      <div class="col-sm-6">
        <p id="break-label">Break Length</p>
        <button id="break-decrement" class="btn btn-info btn-lg" onClick={decrement}>-</button>
        <span class="align-middle" id="break-length">{length / 60}</span>
        <button class="btn btn-danger btn-lg" 
        onClick={increment} id="break-increment">+</button>
      </div>
    )
  }


