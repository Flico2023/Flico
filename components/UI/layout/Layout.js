import React, { Fragment } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div >
        <Navbar/>
        <main className='w-4/5 mx-auto min-h-[80vh]'>
            {children}
        </main>
        <Footer></Footer>
    </div>
  )
}
