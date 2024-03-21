import React from 'react'
import Button from '../UI/elements/Button';

export default function CheckoutInfo({carts}) {
    const cartSubtotalsDefault = {
        cartItemsCount: 0,
        cartTotalPrice: 0,
      }
    
      const cartSubTotals = carts?.reduce((acc, cart) => {
        acc.cartItemsCount += cart.amount;
        acc.cartTotalPrice += cart.product.price * cart.amount;
        return acc;
      }, cartSubtotalsDefault);
    
      function handleCompleteShopping(){
        console.log('Shopping completed')
      }
    
      return (
        <div className='p-4 border border-gray-300'>
          <h2 className='font-semibold text-3xl'>Total</h2>
          <p className='text-2xl my-4'>{cartSubTotals?.cartItemsCount} products</p>
          <p className='text-2xl my-4 font-semibold'>{cartSubTotals?.cartTotalPrice} TL</p>
          
            <Button styles="text-2xl p-2 font-normal w-full" onClick={handleCompleteShopping}>Complete Shopping</Button>
        </div>
      )
}
