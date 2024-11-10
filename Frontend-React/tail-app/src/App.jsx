import { useState } from "react";

export default function App() {
  const [isActive, setIsActive] = useState(true); 
  return (
    <div className=" w-full h-screen  flex justify-center items-center gap-4 flex-col">  
    <span className="text-blue-600 font-bold ">name :</span> 
    <input type="text"  className="border-2 border-blue-500 rounded-md py-1 px-4  text-blue-500  outline-blue-700"/> 
     
     <button
     onClick={()=>setIsActive(!isActive)}
     className= {` shadow-xl  ${ isActive? 'bg-blue-500': 'bg-gray-500'}  py-1 px-2 rounded-full   text-white hover:px-4 hover:font-bold hover:bg-blue-700 `}>
      {isActive? 'active': 'inactive'}
       </button>

     <div className=" w-20 h-20  hover:w-40 hover:h-40  hover:bg-violet-600  bg-green-500  rounded-full  transition duration-1000  ease-in-out ">

     </div>

     <div className=" flex  gap-4 ">
      <div className=" bg-blue-200 p-10"> flex  Item 1</div>
      <div className=" bg-blue-200 p-10"> flex  Item 2 </div>
      <div className=" bg-blue-200 p-10"> flex  Item 3</div>
      <div className=" bg-blue-200 p-10"> flex  Item 4</div>
     </div>
     <div className=" grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-4  ">   
      <div className=" bg-blue-200 p-10"> Grid  Item 1</div>
      <div className=" bg-blue-200 p-10"> Grid  Item 2 </div>
      <div className=" bg-blue-200 p-10"> Grid  Item 3</div>
      <div className=" bg-blue p-10"> Grid  Item 4</div>
     </div>
    </div> 
  )
}