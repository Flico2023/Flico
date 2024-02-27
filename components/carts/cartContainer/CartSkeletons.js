import Skeleton from '@/components/UI/elements/Skeleton'
import React from 'react'

export default function CartSkeletons() {
  return (
    <div className='flex lg:justify-between lg:items-start lg:flex-row gap-4 flex-col items-center justify-center'>
        
        <div className='w-full lg:w-3/4 order-2 lg:order1'>
            <CartItemSkeleton />
            <CartItemSkeleton />
            <CartItemSkeleton />

        </div>
        <div className='w-full lg:w-1/4 order-1 lg:order-2'><CartTotalSkeleton/></div>
    </div>
  )
}

export function CartItemSkeleton(){
    return (
        <div className='my-4'>
            <div className='flex justify-between gap-4'>
                <Skeleton style='w-48 h-48' />
                <div className='flex-1'>
                    <Skeleton style='h-8' />
                    <Skeleton style='w-40 h-4 my-4' />
                    <Skeleton style='w-40 h-8' />
                </div>
            </div>
        </div>
    )
}

function CartTotalSkeleton(){
    return (
        <Skeleton style='h-72 w-full' />
    )
}
