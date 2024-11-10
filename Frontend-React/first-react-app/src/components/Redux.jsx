import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Redux = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state)=>state.user);

    const changeUser = (newUser) => {
        dispatch({type: 'SET_USER', payload: newUser})
    }
    
  return (
    <div>
        <button onClick={()=>{changeUser('john doe')}}>change user</button>
        <ChildComponent/>
    </div>
  )
};


const ChildComponent = ()=>{
    const user = useSelector((state)=>state.user);
    return (
        <div>
            <h1>Child Component</h1>
            <h2>hello {user}</h2>
        </div>
    )
}
export default Redux