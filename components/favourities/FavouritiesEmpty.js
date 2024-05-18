
import React from 'react'
import ShoppersSvg from '../other/ShoppersSvg'

export default function FavouritiesEmpty() {
  return (
    <div className='column-center'>
        <ShoppersSvg w={"500"} h={"500"} />
       
        <h1 className='text-4xl text-center mt-8'>Your do not have any favourities yet</h1>
    </div>
  )
}
