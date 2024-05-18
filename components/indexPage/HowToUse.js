import React from 'react'
import WebShoppngSvg from '../other/WebShoppingSvg'
import AircraftSvg from '../other/Aircraft'
import TravelSvg from '../other/TravelSvg'

export default function HowToUse() {
    return (
        <section>
            <p className='text-primary text-4xl text-center mb-8'>How Flico Works</p>
            <div className='flex-between gap-4 sm:w-full lg:w-4/5 mx-auto'>
                <div className='column-center'>
                    <WebShoppngSvg h="200" w="200" />
                    <p className='text-center text-2xl'>Shop online via our website</p>
                </div>
                
                <div className='column-center border-t-2 border-sky-700 border-dotted w-20 flex-1' /> 
                

                <div className='column-center'>                     
                    <AircraftSvg h="200" w="200" />
                    <p className='text-center text-2xl'>Travel your airport</p></div>
                <div className='column-center'> </div>

                <div className='column-center border-t-2 border-sky-700 border-dotted w-20 flex-1' /> 

                <div className='column-center'>                     
                    <TravelSvg h="200" w="200" />
                    <p className='text-center text-2xl'>Take your clothes from <br></br> closets in airport</p></div>
                <div className='column-center'> </div>
            </div>
        </section>
    )
}
