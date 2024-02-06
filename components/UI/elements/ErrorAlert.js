import React from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";


export default function ErrorAlert({ message }) {
  return (
    <div className="bg-red-100 border border-red-600 text-red-700 px-4 py-3 rounded flex-start  gap-4" role="alert">
        <strong className="font-bold text-3xl"><IoCloseCircleOutline /></strong>
      <p className="block text-wrap">{message}</p>
    </div>
  )
}
