import React from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5";


export default function SuccessAlert({ message }) {
    return (

        <div className="bg-green-100 border border-green-600 text-green-700 px-4 py-3 rounded flex-start gap-4" role="alert">
            <strong className="font-bold text-3xl"><IoCheckmarkCircleOutline /></strong>
            <p className="block text-wrap">{message}</p>
        </div>

    )
}

