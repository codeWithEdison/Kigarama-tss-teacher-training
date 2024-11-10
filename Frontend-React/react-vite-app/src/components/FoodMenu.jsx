import React from 'react'
import Menu from './Menu'
import pizaa from '../assets/img/pizza.jpg';
import momo from '../assets/img/momo.jpg';
import burger from '../assets/img/burger.jpg'; 

const FoodMenu = () => {
  return (
    <div className='foodMenu'>
        <h2>FOOD MENU </h2>
        <div className='menu-items'>
            <Menu image={pizaa} title='pizza'  price={30} description=' this is better pizza in city '/>
            <Menu image={burger} title='burger'  price={30} description=' this is better pizza in city '/>
            <Menu image={momo} title='momo'  price={30} description=' this is better pizza in city '/>
            <Menu image={pizaa} title='pizza'  price={30} description=' this is better pizza in city '/>
            <Menu image={pizaa} title='pizza'  price={30} description=' this is better pizza in city '/>
            <Menu image={pizaa} title='pizza'  price={30} description=' this is better pizza in city '/>
        </div>
    </div>
  )
}

export default FoodMenu