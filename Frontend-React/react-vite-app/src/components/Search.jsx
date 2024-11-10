import React from 'react'
import Button from './Button'

const Search = () => {
  return (
    <div className='search'>
        <form action="">
            <input type="text" placeholder='search .....' />
            <Button name='search'/>
        </form>
    </div>
  )
}

export default Search