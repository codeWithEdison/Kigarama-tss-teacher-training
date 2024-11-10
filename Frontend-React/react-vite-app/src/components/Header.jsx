import React from 'react';
import logo from '../assets/img/logo.png';


const Header = () => {
  return (
    <div className='header'>
      <img src={logo}  alt="kigarama restourent logo" srcset="" />
      <nav>
        <ul className='nav-links'>
          <li>Home</li>
          <li>Category</li>
          <li>Food</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default Header