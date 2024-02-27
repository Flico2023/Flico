import Button from '@/components/UI/elements/Button';
import Link from 'next/link';
import React from 'react'

export default function CheckoutTotal({ carts }) {

  const cartSubtotalsDefault = {
    cartItemsCount: 0,
    cartTotalPrice: 0,
  }

  const cartSubTotals = carts.filter(cart => cart.status === "Checkout").reduce((acc, cart) => {
    acc.cartItemsCount += cart.amount;
    acc.cartTotalPrice += cart.product.price * cart.amount;
    return acc;
  }, cartSubtotalsDefault);


  return (
    <div className='p-4 border border-gray-300'>
      <h2 className='font-semibold text-3xl'>Subtotal</h2>
      <p className='text-2xl my-4'>{cartSubTotals.cartItemsCount} products</p>
      <p className='text-2xl my-4 font-semibold'>{cartSubTotals.cartTotalPrice} TL</p>
      <Link href={"/checkout"}>
        <Button styles="text-2xl p-2 font-normal w-full">Complete Shopping</Button></Link>
    </div>
  )
}
