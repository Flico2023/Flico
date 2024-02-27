import React from 'react'
import { IoInformationCircleOutline } from "react-icons/io5"; 


export default function InfoAlert({ message }) {
    return (

        <div className="bg-blue-100 border border-sky-500 text-sky-600 px-4 py-3 rounded flex-start gap-4" role="alert">
            <strong className="font-bold text-3xl"><IoInformationCircleOutline /></strong>
            <p className="block text-wrap text-lg">{message}</p>
        </div>

    )
}