import React from 'react'
import SearchIcon from '@/Assets/MessagingSearchIcon.png'
import Image from 'next/image'
const MessagingSearchInputComponent = () => {
  return (
    <div className='relative flex items-center inset-y-0 mx-[25px] pt-[30px]'>
        <div className='absolute p-2'>
            <Image src={SearchIcon} alt="Search Icon"/>
        </div>
        <input type="text" className='rounded-[10px] w-full px-10 py-1.5 text-left text-[36px] text-black' placeholder='Search UserID' />
    </div>
    
  )
}

export default MessagingSearchInputComponent