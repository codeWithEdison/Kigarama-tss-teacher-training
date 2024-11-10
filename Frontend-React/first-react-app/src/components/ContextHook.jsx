import React, { useState } from 'react'

const ContextHook = () => {
    const [user, setUser] = useState('john doe')
  return (
    <>
    <h1>ContextHook</h1>
    <Component1 user={user}/>
    </>
  )
}

const Component1 =({user})=>{
    return (
      <div>
        <h1>Components 1</h1>
        <Component2 user= {user}/>
        
      </div>
    )
}
const Component2 =({user})=>{
    return (
      <div>
        <h1>Components 2</h1>
        <Component3 user={user}/>

      </div>
    )
}
const Component3 =({user})=>{
    return (
      <div>
        <h1>Components 3</h1>
        <Component4 user={user}/>

      </div>
    )
}
const Component4 =({user})=>{
    return (
      <div>
        <h1>Components 4</h1>
        <h2>hello {user}</h2>
      </div>
    )
}
export default ContextHook