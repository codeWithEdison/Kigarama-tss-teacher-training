import React from 'react';
import { useEffect, useState } from 'react'; 

const Autocount = () => {
  let [count, setCount] = useState(0); 

 
useEffect( ()=>{
    const timer = setInterval(() => {
        setCount(count =>count + 1);
    }, 1000);
    return ()=>clearInterval(timer);
});

  return (
    <div>
        <h1>{count}</h1>
    </div>
  )
}

export default Autocount