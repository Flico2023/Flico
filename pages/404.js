import React from 'react'
import ErrorSvg from '@/components/other/ErrorSvg'
import Button from '@/components/UI/elements/Button'
import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className='column-center gap-8'>
         <ErrorSvg/> 
          <h1 className='text-primary text-5xl text-center'> We cannot fulfill your request at the moment </h1>
          <p className='text-2xl text-gray-700'> You can continue browsing our website</p>
          <Link href="/products/man"><Button styles="w-48">Continue</Button></Link>
          
    </div>
  )
}
