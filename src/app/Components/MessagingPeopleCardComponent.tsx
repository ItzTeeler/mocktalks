'use client'
import React from 'react'
import { IPeopleCard } from '@/Interfaces/Interfaces'

const MessagingPeopleCardComponent = (props: IPeopleCard) => {
  const savePartnerId = (roomName: string) => {
    const roomSplit: string[] = roomName.split("-");

    if(roomSplit[0] === sessionStorage.getItem("userId")){
      props.setGlobalPartnerId(roomSplit[1])
    }else{
      props.setGlobalPartnerId(roomSplit[0])
    }
  }

  return (
    <>
      <div className='bg-[#696969] m-5 rounded-[15px]' onClick={() => { props.clickCheck(); props.joinUp(props.namePass, props.room); savePartnerId(props.room) }}>
        <div className='flex flex-row items-center'>
          <div className='p-[16px]'>
            {/* <Image src={ProfilePic} alt='ProfilePic' className='w-[109px] h-[109px]'/> */}
          </div>
          <div className='py-4'>
            <p className='text-[18px] mb-[12px] font-[DMSerifText] text-[#ffffff]'>{props.room}</p>
            <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff]'>Temporary Chat</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessagingPeopleCardComponent