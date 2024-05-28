'use client'
import React, { useEffect, useState } from 'react'
import { IAppointments, IPeopleCard, IProfileData } from '@/Interfaces/Interfaces'
import { getAppointments, getProfileItemByUserId } from '@/utils/Dataservices';

const MessagingPeopleCardComponent = (props: IPeopleCard) => {
  const [partnerData, setPartnerData] = useState<IProfileData>();
  const [isPartnerText, setIsPartnerText] = useState<string>();

  const savePartnerId = async (roomName: string) => {
    const roomSplit: string[] = roomName.split("_");

    if (roomSplit[0] === sessionStorage.getItem("userId")) {
      props.setGlobalPartnerId(roomSplit[1])
    } else {
      props.setGlobalPartnerId(roomSplit[0])
    }
  }

  const getPartnerPfP = async (roomName: string) => {
    const roomSplit: string[] = roomName.split("_");

    if (roomSplit[0] === sessionStorage.getItem("userId")) {
      setPartnerData(await getProfileItemByUserId(Number(roomSplit[1])));
    } else {
      setPartnerData(await getProfileItemByUserId(Number(roomSplit[0])));
    }

    const dataAppoint = await getAppointments(Number(sessionStorage.getItem('userId')));
    const filteredPartnerData = dataAppoint.filter((meeting: IAppointments) => meeting.isDeleted === false && meeting.isPartnered === true);
    let rooms: string[] = [];

    filteredPartnerData.map((appointment: IAppointments) => {
      let num1 = appointment.userID;
      let num2 = appointment.partnerID;
      let chatroomName: string;

      if (num1 > num2) {
        chatroomName = `${num1}_${num2}`;
      } else {
        chatroomName = `${num2}_${num1}`;
      }
      rooms.push(chatroomName)
    })

    if (rooms.includes(props.room)) {
      setIsPartnerText("Partner Chat")
    } else {
      setIsPartnerText("Temporary Chat")
    }
  }

  useEffect(() => {
    getPartnerPfP(props.room);
  }, [])

  return (
    <>
      <div className='bg-[#696969] m-5 rounded-[15px]' onClick={() => { if (props.isDisabled === false) { props.setIsDisabled(true); props.clickCheck(); props.joinUp(props.namePass, props.room); savePartnerId(props.room) } }}>
        {
          partnerData &&
          <div className='flex flex-row items-center'>
            <div className='p-[16px]'>
              <img src={partnerData.profileImg} alt='Profile Picture' className='rounded-full border-black border-2 w-[109px] h-[109px]' />
            </div>
            <div className='py-4'>
              <p className='text-[24px] mb-[12px] font-[DMSerifText] text-[#ffffff] w-[140px]'>{partnerData.fullName}</p>
              {
                isPartnerText ?
                  <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff] w-[140px]'>{isPartnerText}</p>
                  :
                  <p className='text-[18px] font-[Source-Sans-Pro] text-[#ffffff] w-[140px]'>Loading...</p>
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default MessagingPeopleCardComponent