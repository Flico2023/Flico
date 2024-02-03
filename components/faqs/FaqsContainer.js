import React from 'react'
import Faqs from './Faqs'

export default function FaqsContainer({faqs}) {
  return (
    <div className='w-4/5 m-auto'>
        {Object.entries(faqs).map(faqPair => {
            return (
                <Faqs key={faqPair[0]} category={faqPair[0]} faqs={faqPair[1]} />
            )
        })}
    </div>
  )
}
