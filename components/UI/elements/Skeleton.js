import { mycn } from '@/utils/mycn'
import React from 'react'

export default function Skeleton({style}) {
  return (
    <div className='animate-pulse'>
        <div className={mycn("bg-gray-200",style)}></div>
    </div>
  )
}
