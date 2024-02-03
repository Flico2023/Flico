import React, { useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

export default function Faq({faq}) {

    const [isOpen, setIsOpen] = useState(false)

    const onClickHandler = () => {
        setIsOpen(isOpen => !isOpen)
    }

    
  return (
    <div className='py-4 border-b-2'>
    <div className='flex justify-between items-center text-2xl hover:cursor-pointer' onClick={onClickHandler}>
        <h1>{faq.question}</h1>
        <button 
            className={`text-xl py-2 focus:outline-none duration-300 transition-all ${isOpen ? 'transform rotate-180' : ''}`}
        >
            <TiArrowSortedDown/>
        </button>
    </div>
    <div className={`overflow-hidden transition-max-h ${isOpen ? 'max-h-40' : 'max-h-0'} transition-all duration-300`}>
        <p className='text-xl py-2'>{faq.answer}</p>
    </div>
</div>
  )
}
