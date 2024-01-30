import React from 'react'
import Skeleton from '../UI/elements/Skeleton'

export default function ProductsSkeleton() {
  return (
    <div>
        <div className='grid grid-cols-3 gap-4'>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
        </div>
    </div>
  )
}

function SingleProductSkeleton() {
  return (
    <div >
        <Skeleton style={"h-[60vh]"}/>
        <div className="p-4">
          <Skeleton style={"w-full h-3 mb-4"} />
          <Skeleton style={"w-1/2 h-3"} />
        </div>
    </div>
  )
}
