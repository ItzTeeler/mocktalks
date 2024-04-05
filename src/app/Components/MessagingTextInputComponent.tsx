import React from 'react'
import Image from 'next/image'
import FileAdd from '@/Assets/MessagingFileInput.png'
import SendIcon from '@/Assets/MessagingSend.png'

const MessagingTextInputComponent = () => {
    return (
        <div className='w-full relative'>
            <div className='flex items-center inset-y-0 mx-[43px] pt-[30px] pb-[40px]'>
                <div className='absolute p-2'>
                    <Image src={FileAdd} alt="Search Icon" />
                </div>
                <input type="text" className='rounded-[10px] w-full px-12 py-[12px] text-left text-[18px] text-black' placeholder='Enter Message' />
                <div className='absolute right-14'>
                    <Image src={SendIcon} alt="Send Message" className='' />
                </div>
            </div>
        </div>
    )
}

export default MessagingTextInputComponent

