import { mycn } from '@/utils/mycn'
import React from 'react'

export default function Button({ disabled = false, styles, variant = "contained", children, ...rest }) {

  const variants = {
    contained: 'bg-sky-700 text-white hover:bg-sky-600 active:bg-sky-800',
    outlined: 'border border-sky-700 text-sky-700 hover:bg-sky-50 active:bg-sky-100',
    text: 'text-sky-700 hover:text-sky-600 active:text-sky-800 hover:bg-gray-100',
  }

  return (
    
    <button {...rest}
      className={mycn("py-1.5 px-3 rounded font-medium",
        variants[variant],
        { 'bg-gray-300 text-gray-600 hover:bg-gray-300': disabled },
        styles)}
      disabled={disabled}>
      {children}
    </button>
  )
}
