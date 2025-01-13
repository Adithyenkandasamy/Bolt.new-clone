import Lookup from '@/data/Lookup'
import { ArrowRight } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col items-center mt-36 xl:mt-56 gap-2'>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
      <div>
      <div className='flex gap-2'> 
        <textarea placeholder={Lookup.INPUT_PLACEHOLDER}/>
        <ArrowRight className='bg-blue-500 p-2 h-8 w-8 round-md cursor-pointer'/>
      </div>
      </div>
    </div>
  )
}

export default Hero