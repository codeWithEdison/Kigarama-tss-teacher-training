import React from 'react'
import Button from './Button'

const Menu = ({image, title, price, description}) => {
  return (
    <div>
        <img src={image} alt="" width={100} />
        <div>
            <h3>{title}</h3>
            <h4>{price} $ </h4>
            <p>{description}</p>
            <Button name='order now'/> 
        </div>
    </div>
  )
}

export default Menu