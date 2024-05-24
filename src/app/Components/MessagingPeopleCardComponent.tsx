'use client'
import React, { useEffect, useState } from 'react'
import { IPeopleCard, IProfileData } from '@/Interfaces/Interfaces'
import { getProfileItemByUserId } from '@/utils/Dataservices';

const MessagingPeopleCardComponent = (props: IPeopleCard) => {
  const [partnerData, setPartnerData] = useState<IProfileData>();

  const savePartnerId = async (roomName: string) => {
    const roomSplit: string[] = roomName.split("-");

    if (roomSplit[0] === sessionStorage.getItem("userId")) {
      props.setGlobalPartnerId(roomSplit[1])
    } else {
      props.setGlobalPartnerId(roomSplit[0])
    }
  }

  const getPartnerPfP = async (roomName: string) => {
    const roomSplit: string[] = roomName.split("-");

    if (roomSplit[0] === sessionStorage.getItem("userId")) {
      setPartnerData(await getProfileItemByUserId(Number(roomSplit[1])));
    } else {
      setPartnerData(await getProfileItemByUserId(Number(roomSplit[0])));
    }
  }

  useEffect(() => {
    getPartnerPfP(props.room);
  }, [])

  return (
    <>
      <div className='bg-[#696969] m-5 rounded-[15px]' onClick={() => { props.clickCheck(); props.joinUp(props.namePass, props.room); savePartnerId(props.room) }}>
        {
          partnerData &&
          <div className='flex flex-row items-center'>
            <div className='p-[16px]'>
              <img src={partnerData.profileImg} alt='Profile Picture' className='rounded-full border-black border-2 w-[109px] h-[109px]' />
            </div>
            <div className='py-4'>
              <p className='text-[24px] mb-[12px] font-[DMSerifText] text-[#ffffff] w-[140px]'>{partnerData.fullName}</p>
              <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff] w-[140px]'>Partner Chat</p>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default MessagingPeopleCardComponent