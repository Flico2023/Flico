import React from 'react'
import { IoStar } from "react-icons/io5";


export default function Testimonials() {
    return (

        <section className='my-16'>
            <p className='text-4xl text-center text-primary mb-8'>Testimonials</p>

            <div className='flex-between gap-4 sm:w-full lg:w-4/5 mx-auto'>
                <Testimonial user='Michael Smith' testimonial='I highly recommend this product. It has greatly improved my productivity and efficiency.' />
                <Testimonial user='Emily Johnson' testimonial='The quality of this product is outstanding. It has exceeded my expectations in every way.' />
                <Testimonial user='David Brown' testimonial='I have been using this product for a while now and I am extremely satisfied with its performance.' />
            </div>

        </section>

    )
}

function Testimonial({ user, testimonial }) {
    return (
        <article className='p-4 border border-gray-300 rounded'>

            <p>{testimonial}</p>

            <p className='my-2 font-semibold'>{user}</p>

            <div className='flex items-center gap-2 text-yellow-500 text-center'>
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
            </div>

        </article>
    )
}
