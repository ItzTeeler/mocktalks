import React from 'react'
import ProfilePic from '@/Assets/MessagingPeopleProfile.png'
import Image from 'next/image'
const MessagingBubbleComponentSender = () => {
  return (
    <div className='bg-[#1973E7] m-5 rounded-[15px] flex-end max-w-[100%] lg:max-w-[45%] p-[15px]'>
      <div className='flex flex-row items-center gap-2'>
        <div className=''>
          <Image src={ProfilePic} alt='ProfilePic' className='min-w-[80px] w-[80px] h-[80px] min-h-[80px]' />
        </div>
        <div className=''>
          <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff] '>Hey did you want to do some practice before the mock interview?</p>
        </div>
      </div>
    </div>
  )
}

export default MessagingBubbleComponentSender
