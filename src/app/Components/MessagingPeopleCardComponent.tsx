import React from 'react'
import Image from 'next/image'
import ProfilePic from '@/Assets/MessagingPeopleProfile.png'
const MessagingPeopleCardComponent = () => {
  return (
    <div className='bg-[#696969] m-5 rounded-[15px]'>
      <div className='flex flex-row items-center'>
        <div className='p-[16px]'>
        <Image src={ProfilePic} alt='ProfilePic' className='w-[109px] h-[109px]'/>
        </div>
        <div className=''>
            <p className='text-[18px] text-[#ffffff]'>Tyler Nguyen</p>
            <p className='text-[18px] text-[#ffffff]'>From : Hey did you want to do som...</p>
        </div>
      </div>
    </div>
  )
}

export default MessagingPeopleCardComponent