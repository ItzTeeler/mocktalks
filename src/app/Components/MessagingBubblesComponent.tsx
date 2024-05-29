'use client'
import React, { useEffect, useState } from 'react'
import { IProfileData, IPropMessageSplitter } from '@/Interfaces/Interfaces'
import { getProfileItemByUserId } from '@/utils/Dataservices'

const MessagingBubblesComponent = (props: IPropMessageSplitter) => {
  const [userData, setUserData] = useState<IProfileData>()

  useEffect(() => {
    const outerCall = () => {
      const innerCall = async () => {
        const messageUserData: IProfileData = await getProfileItemByUserId(Number(props.dataPass.senderID))
        setUserData(messageUserData)
      }
      innerCall()
    }
    outerCall();
  }, [])

  return (
    <div className='bg-[#696969] m-5 rounded-[15px] max-w-[80%] lg:max-w-[50%] p-[15px]'>
      {
        userData ?
          <div className='flex flex-row items-center gap-2'>
            <div className=''>
              <img src={userData.profileImg} alt='ProfilePic' className='rounded-full min-w-[80px] w-[80px] h-[80px] min-h-[80px]' />
            </div>
            <div className=''>
              <p className='text-[12px] font-[Source-Sans-Pro] overflowW text-[#ffffff]'>{userData.fullName}</p>
              <p className='text-[18px] font-[Source-Sans-Pro] overflowW text-[#ffffff]'>{props.dataPass.text}</p>
            </div>
          </div>
          :
          <div>
            <p className='text-[18px] text-white font-[Source-Sans-Pro] mb-5'>Loading Name...</p>
            <p className='text-[18px] text-white font-[Source-Sans-Pro] mb-5'>Loading Text...</p>
          </div>
      }
    </div>
  )
}

export default MessagingBubblesComponent