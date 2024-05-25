'use client'
import React from 'react'
import { IGChatCard } from '@/Interfaces/Interfaces'
import ProfilePic from "@/Assets/globalPfp.png"

const GlobalMessagingCardComponent = (props: IGChatCard) => {
  const savePartnerId = () => {
    props.setGlobalPartnerId("0")
  }

  return (
    <>
      <div className='bg-[#696969] m-5 rounded-[15px]' onClick={() => { props.clickCheck(); props.joinUp(props.namePass, props.room); savePartnerId() }}>
        <div className='flex flex-row items-center'>
          <div className='p-[16px]'>
            <img src={ProfilePic.src} alt='ProfilePic' className='border-black border-2 rounded-full w-[109px] h-[109px]'/>
          </div>
          <div className='py-4'>
            <p className='text-[24px] mb-[12px] font-[DMSerifText] text-[#ffffff] w-[140px]'>Global Chat</p>
            <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff] w-[140px]'>Open Chat - Arrange Meetings </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalMessagingCardComponent