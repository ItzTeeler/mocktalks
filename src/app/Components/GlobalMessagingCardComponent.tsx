'use client'
import React from 'react'
import { IPeopleCard } from '@/Interfaces/Interfaces'
import ProfilePic from "@/Assets/globalPfp.png"

const GlobalMessagingCardComponent = (props: IPeopleCard) => {
  const savePartnerId = () => {
    props.setGlobalPartnerId("9999")
  }

  return (
    <>
      <div className='bg-[#696969] m-5 rounded-[15px]' onClick={() => { props.clickCheck(); props.joinUp(props.namePass, props.room); savePartnerId() }}>
        <div className='flex flex-row items-center'>
          <div className='p-[16px]'>
            <img src={ProfilePic.src} alt='ProfilePic' className='rounded-full w-[109px] h-[109px]'/>
          </div>
          <div className='py-4'>
            <p className='text-[18px] mb-[12px] font-[DMSerifText] text-[#ffffff]'>Global Chat</p>
            <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff]'>Open Chat - Arrange Meetings</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalMessagingCardComponent