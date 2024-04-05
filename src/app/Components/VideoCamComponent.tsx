import React from 'react'
import Image from 'next/image'
import Tyler from '@/Assets/VideoChatPP.png'
const VideoCamComponent = () => {
  return (
    <div className='bg-[#D9D9D9] rounded-[20px] px-[110px] pt-[65px] pb-[25px]'>
      <Image src={Tyler} alt="Tyler" />
      <p className='text-center pt-[34px] font-[DMSerifText] text-[58px]'>Tyler Nguyen</p>
    </div>
  )
}

export default VideoCamComponent
