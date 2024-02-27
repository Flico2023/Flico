import React from 'react'

export default function TotalCartInfo({carts}) {

  const cartTotalsDefault = {
    cartItemsCount: 0,
    cartTotalPrice: 0,
  }

    const cartTotals = carts.reduce((acc, cart) => {
        acc.cartItemsCount += cart.amount;
        acc.cartTotalPrice += cart.product.price * cart.amount;
        return acc;
    }, cartTotalsDefault);

  return (
    <h2 className='text-2xl '>{cartTotals.cartItemsCount} products, Total Price: {cartTotals.cartTotalPrice} TL</h2>
  )
}
