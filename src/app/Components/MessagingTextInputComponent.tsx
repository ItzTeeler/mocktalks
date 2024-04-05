import React from 'react'
import Image from 'next/image'
import FileAdd from '@/Assets/MessagingFileInput.png'
const MessagingTextInputComponent = () => {
    return (

        <div className='relative flex items-center w-full inset-y-0 mx-[43px] pt-[30px] pb-[40px]'>
            <div className='absolute p-2'>
                <Image src={FileAdd} alt="Search Icon" />
            </div>
            <input type="text" className='rounded-[10px] w-full px-12 py-[12px] text-left text-[18px] text-black' placeholder='Enter Message' />
        </div>

    )
}

export default MessagingTextInputComponent
