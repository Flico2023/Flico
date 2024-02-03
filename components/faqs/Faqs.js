import React from 'react'
import Faq from './Faq'

export default function Faqs({category, faqs}) {
  return (
    <div className='py-8'>
        <div>
            <h1 className='font-semibold text-2xl py-4 border-b-2'>{category}</h1>
        </div>
        <div>
          {faqs.map(faq => <Faq key={faq.faqID} faq={faq} />)}
          </div>
    </div>
  )
}
