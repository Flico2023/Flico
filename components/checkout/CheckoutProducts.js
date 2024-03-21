import React from 'react'

export default function CheckoutProducts({carts}) {
  return (
    <div className='p-4 border border-gray-300'>
        <h2 className='font-semibold text-xl'>Products</h2>

       

    
        {carts && carts.map((cart, index) => (
    <div key={cart.cartID} className={`pb-1 flex justify-between items-center my-4 ${index === carts.length - 1 ? '' : 'border-b border-gray-200'}`}>
        <div className='flex gap-4'>
            <img src={cart.product.imagePath} alt={cart.product.productName} className='h-32 object-cover'/>
            <div>
                <h3 className='text-lg '>{cart.product.productName} </h3>
                <p className='text-md'>{cart.product.price} TL</p>
                <p className='text-md'>Size: {cart.size}</p>
                <p className='text-md'>Amount: {cart.amount}</p>
                <p className='text-md'>Brand: {cart.product.brand}</p>
            </div>
        </div>
    </div>
))}



    </div>
  )
}
