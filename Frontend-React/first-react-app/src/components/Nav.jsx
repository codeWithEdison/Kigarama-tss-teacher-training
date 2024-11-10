import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
 let  [isLoggedIn, setIsLoggedIn ]= useState(false);  
  return (
    <nav className='nav'>
  <ul className='nav-lists'>
    <li> <Link to='/'>Home</Link></li>
    {/* <a href="/">HOme</a> */}

    <li> <Link to='/about'>About</Link></li>
    <li> <Link to='/contact'>contact</Link></li>  
    <li> <Link to='/hook'>Hooks</Link></li>  
    { isLoggedIn ?
     <button onClick={()=>setIsLoggedIn(false)}>logout </button>: 
     <div>
    {/* <Button name='login'/>  */}
    <button onClick={()=>setIsLoggedIn(true)}>Login</button>
    <Button  name='register'/>  
    </div>
    }

  </ul>
</nav> 
  )
}

export default Nav