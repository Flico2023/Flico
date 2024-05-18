import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 w-full p-8 text-gray-600 text-lg mt-20">
      <div className="flex justify-center items-center gap-16">
        <Link href="/">
          <p className='text-4xl'>FLICO</p>
        </Link>
        <div>
          <Link href="/products/woman">
            <p className='mb-4'>Woman</p>
          </Link>
          <Link href="/products/man">
            <p>Man</p>
          </Link>
        </div>
        <div>
          <Link href="/FAQ">
            <p className='mb-4'>FAQ</p>
          </Link>
          <Link href="/contactUs">
            <p>Contact Us</p>
          </Link>
        </div>

      </div>
      <div className="text-center mt-12">
        <p>© 2024 FLICO. All rights reserved</p>
      </div>
      
    </footer>
  )
}
