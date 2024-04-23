'use client'
import React from 'react'
import Image from 'next/image'
import Tyler from '@/Assets/VideoChatPP.png'
const VideoCamComponent = () => {
  return (
    <div className='bg-[#D9D9D9] flex flex-col items-center rounded-[20px] px-[38px] lg:px-[110px] pt-[22px] lg:pt-[65px] pb-[10px] lg:pb-[25px]'>
      <Image src={Tyler} alt="Tyler" className='w-auto h-auto rounded-full' />
      <p className='text-center pt-[10px] lg:pt-[34px] font-[DMSerifText] text-[20px] lg:text-[58px]'>Tyler Nguyen</p>
    </div>
  )
}

export default VideoCamComponent
