'use client'
import React from 'react'
import Image from 'next/image'
import VideoIcon from '@/Assets/TurnOffVideo.png'
import MicIcon from '@/Assets/MuteMic.png'
import MessageIcon from '@/Assets/OpenMessages.png'
import ShareScreenIcon from '@/Assets/ShareScreen.png'
import { useRouter } from 'next/navigation'

const VideoFooterComponent = (props: {chat: () => void}) => {

  const router = useRouter();

  const handleLeave = () =>{
    router.push("/MessagingPage");
  }
  return (
    <div className='bg-[#D9D9D9] w-full flex justify-center p-[10px]'>
      <div className='flex flex-row gap-5'>
        <Image src={VideoIcon} alt="Video Icon" />
        <Image src={MicIcon} alt="Mic Icon" />
        <Image src={MessageIcon} alt="Message Icon" onClick={props.chat} />
        <Image src={ShareScreenIcon} alt="Share Screen" />
        <button onClick={handleLeave} className='bg-[#FF0000] text-white text-[30px] font-[Source-Sans-Pro] px-[13px] py-[6px] rounded-[10px]'>Leave</button>
      </div>
    </div>
  )
}

export default VideoFooterComponent
