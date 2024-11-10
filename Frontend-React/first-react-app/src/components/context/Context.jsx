import React from 'react'
import { useContext, createContext,  useState } from 'react'


const userContext = createContext();

const Context = () => {
    const [user, setUser] = useState('IRANZI ') 
  return (
    <userContext.Provider value={user}>
    <h1>Context</h1>
    <Component1 />
    </userContext.Provider> 
  )
}

const Component1 =()=>{
    return (
      <div>
        <h1>Components 1</h1>
        <Component2 />
        
      </div>
    )
}
const Component2 =()=>{
    return (
      <div>
        <h1>Components 2</h1>
        <Component3 />

      </div>
    )
}
const Component3 =()=>{
    return (
      <div>
        <h1>Components 3</h1>
        <Component4 />

      </div>
    )
}
const Component4 =()=>{
    const user = useContext(userContext)
    return (
      <div>
        <h1>Components 4</h1>
        <h2>hello {user}</h2>
      </div>
    )
}
export default Context;