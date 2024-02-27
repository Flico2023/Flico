import React from 'react'
import { IoWarningOutline  } from "react-icons/io5"; // Bu ikonu uyarı ikonuyla değiştirebilirsiniz.

export default function WarningAlert({ message }) {
    return (
        <div className="bg-yellow-100 border border-yellow-500 text-yellow-600 px-4 py-3 rounded flex items-center gap-4" role="alert">
            <strong className="font-bold text-3xl"><IoWarningOutline  /></strong> {/* İkonu uyarı ikonuyla değiştirin */}
            <p className="block text-wrap text-lg">{message}</p>
        </div>
    )
}
