import React from 'react'
import SingleProductCard from '../allProducts/SingleProductCard'

export default function MostBoughtWith({mostBoughtWith}) {
  return (
    <section className='mt-16'>
        <p className='text-black text-xl'>Most purchased with this product</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
            {mostBoughtWith.map((product, index) => (
                <div key={index} className=' border-gray-200 p-4'>
                    <SingleProductCard product={product}></SingleProductCard>
                </div>
            ))}
        </div>
    </section>
  )
}
