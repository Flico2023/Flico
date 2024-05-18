import Image from 'next/image'
import { Inter } from 'next/font/google'
import FlicoOnPhoto from '@/components/indexPage/FlicoOnPhoto'
import HowToUse from '@/components/indexPage/HowToUse'
import Testimonials from '@/components/indexPage/Testimonials'
import StartShopping from '@/components/indexPage/StartShopping'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <FlicoOnPhoto></FlicoOnPhoto>

      <p className=' text-center text-3xl my-16 w-4/5 mx-auto'>Flico is an innovative e-commerce platform that facilitates baggage-free travel for travelers. By offering clothing rental services tailored to the needs of travelers, it enables them to easily obtain garments from lockers at airports.</p>

      <HowToUse></HowToUse>

      <Testimonials></Testimonials>

      <StartShopping></StartShopping>
    </main>
  )
}
