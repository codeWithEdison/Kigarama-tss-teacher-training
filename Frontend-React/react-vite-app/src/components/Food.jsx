import React from 'react'

const Food = ({image, text}) => {
  return (
    <div className='food'>
        <img src={image} alt={text} />
        <p>{text}</p>
    </div>
  )
}

export default Food