'use client'

import React from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import MessagingSearchInputComponent from '../Components/MessagingSearchInputComponent'
import MessagingPeopleCardComponent from '../Components/MessagingPeopleCardComponent'
import MessagingTextInputComponent from '../Components/MessagingTextInputComponent'
import VideoIcon from '@/Assets/MessagingWebCam.png'
import Image from 'next/image'
import MessagingBubblesComponent from '../Components/MessagingBubblesComponent'
import MessagingBubbleComponentSender from '../Components/MessagingBubbleComponentSender'
import MessageLeave from '@/Assets/MessagesBackArrow.png'

const MessagingPage = () => {
    return (
        <div className='bg-[#696969] h-full'>
      <NavbarComponent />
      <div className='grid grid-cols-6 p-[10px]'>
        <div className='col-span-6 lg:col-span-2 bg-[#ffffff] w-full border-r-[3px] h-screen border-black rounded-tl-[15px] rounded-bl-[15px] overflow-y-auto'>
          <MessagingSearchInputComponent/>
          <div className="flex flex-col flex-grow overflow-auto">
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
            <MessagingPeopleCardComponent/>
          </div>
        </div>
        <div className='col-span-6 lg:col-span-4 bg-[#ffffff] w-full h-screen rounded-tr-[15px] rounded-br-[15px] flex flex-col justify-between'>
          <div className='bg-[#D9D9D9] text-[58px] font-[DMSerifText] w-full rounded-tr-[15px] px-[50px] py-[32px] flex justify-between items-center z-10'>
            <div className='flex flex-row items-center'>
                <Image src={MessageLeave} alt='X' className='min-h-[32px] min-w-[32px] mr-[10px]'/>
                <p className='text-[20px] lg:text-[58px]'>Tyler Nguyen</p>
            </div>
            <Image src={VideoIcon} alt="Video Icon"/>
          </div>

          <div className='flex flex-col flex-grow overflow-auto'>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <MessagingBubblesComponent/>
            <div className=''>
              <MessagingBubbleComponentSender/>
            </div>
          </div>
          <MessagingTextInputComponent/>
        </div>
      </div>
    </div>
    )
}

export default MessagingPage
