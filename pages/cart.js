
import CartContainer from '@/components/carts/CartContainer'
import SecureRoute from '@/components/other/SecureRoute'
import React from 'react'

export default function Cart() {
  return (
    <SecureRoute>
      <div className='mx-auto w-full'>
        <CartContainer></CartContainer>
      </div>
      </SecureRoute>
  )
}


