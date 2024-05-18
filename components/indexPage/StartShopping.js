import React from 'react'
import Link from 'next/link'

export default function StartShopping() {
  return (
    <section className='my-16'>
    <p className='text-4xl text-center text-primary mb-8'>Start Shopping</p>

    <div className='center gap-4 sm:w-full lg:w-4/5 mx-auto'>
    <ImageArticle to={"/products/man"} imageUrl="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Man" />
      <ImageArticle to={"/products/woman"} imageUrl="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Woman" />


    </div>

</section>
  )
}

function ImageArticle({ imageUrl, label,to }) {
    return (
      <Link href={to}>
        <div className="relative  w-[250px] h-[380px]">
          <img src={imageUrl} alt="Your Image" className="h-[380px]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black">
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-3xl">{label}</p>
          </div>
        </div>
      </Link>
    );
  }