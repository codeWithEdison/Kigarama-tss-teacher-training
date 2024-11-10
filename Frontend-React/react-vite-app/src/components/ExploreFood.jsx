import React from 'react'
import Food from './Food'
import pizaa from '../assets/img/pizza.jpg';
import momo from '../assets/img/momo.jpg';
import burger from '../assets/img/burger.jpg';

const ExploreFood = () => {
  return (
    <div className='explore'>
      <h1>ExploreFood</h1>
      <div className='explore-food'>
        <Food image={pizaa} text='get one quick'/>
        <Food image={burger} text='buy one get more'/>
        <Food image={momo} text='get your momo'/>
      </div>

      </div>
  )
}

export default ExploreFood