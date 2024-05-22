'use client'
import React from 'react'
import { IPeopleCard } from '@/Interfaces/Interfaces'

const GlobalMessagingCardComponent = (props: IPeopleCard) => {
  const savePartnerId = () => {
    props.setGlobalPartnerId("9999")
  }

  return (
    <>
      <div className='bg-[#696969] m-5 rounded-[15px]' onClick={() => { props.clickCheck(); props.joinUp(props.namePass, props.room); savePartnerId() }}>
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

export default GlobalMessagingCardComponent