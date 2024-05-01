'use client'
import React, { useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import VideoFooterComponent from '../Components/VideoFooterComponent'
import VideoCamComponent from '../Components/VideoCamComponent'
import Image from 'next/image'
import XIcon from '@/Assets/XButton.png'
import MessagingTextInputComponent from '../Components/MessagingTextInputComponent'
import { useRouter } from 'next/navigation'

const VideoChatPage = () => {
  const [drawerModal, setDrawerModal] = useState<boolean>(true);
  const [toBeHiddenNotToBeHidden, setHidden] = useState<string>("hidden");

  const router = useRouter();

  const handleChat = () =>{
    if(drawerModal){
      setHidden("block")
      setDrawerModal(false)
    }else{
      setHidden("hidden")
      setDrawerModal(true)
    }
  }
  return (
    <div>
      <div className='h-screen overflow lg:overflow flex flex-col justify-between'>
        <div className={`absolute bg-[#D9D9D9] right-0 h-full w-full lg:w-[469px] border-l-2 border-black flex justify-between flex-col ${toBeHiddenNotToBeHidden}`}>
          <div className='bg-[#FFFFFF] flex justify-between px-[20px] py-[10px] text-[60px] items-center border-2 border-black'>
            <p>Messages</p>
            <Image src={XIcon} alt='X' className='min-h-[29px] min-w-[29px]' onClick={handleChat} />
          </div>
          <div>
            <MessagingTextInputComponent />
          </div>
        </div>
        <NavbarComponent />
        <div className='flex flex-col lg:flex-row gap-[20px] lg:gap-[150px] p-[40px] justify-evenly'>
          <VideoCamComponent />
          <VideoCamComponent />
        </div>
        <VideoFooterComponent chat={handleChat} />
      </div>
    </div>

  )
}

export default VideoChatPage