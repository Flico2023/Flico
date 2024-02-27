import ShoppersSvg from '@/components/other/ShoppersSvg'
import React from 'react'

export default function CartEmpty() {
  return (
    <div className='column-center'>
        <ShoppersSvg w={"500"} h={"500"} />
       
        <h1 className='text-4xl text-center mt-8'>Your cart is empty</h1>
    </div>
  )
}
