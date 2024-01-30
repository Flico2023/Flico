import React, { Fragment } from 'react'
import Navbar from './Navbar'

export default function Layout({children}) {
  return (
    <Fragment>
        <Navbar/>
        <main className='w-4/5 mx-auto'>
            {children}
        </main>
    </Fragment>
  )
}
