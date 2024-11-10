import React from 'react';
import { useState } from 'react';

function Hooks() {

   const [value, setValue] = useState(0);
   const increment =()=>{
    setValue(value + 1); 
   }
  return (
   <div>
    <h1>{value}</h1>
    <button onClick={increment}>+</button> 
   </div>
  )
}

export default Hooks