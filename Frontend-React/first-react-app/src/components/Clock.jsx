import React from 'react'
import { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date())
  useEffect(
    ()=>{
      const timer = setInterval(
        ()=>{setTime(new Date)}, 1000
      );
      // clear the timer
      return ()=>{ clearInterval(timer) };
    }
  );
  return (
    <h1>{time.getHours()}: {time.getMinutes()}: {time.getSeconds()} </h1>
   )
}

export default Clock