'use client'

import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import MessagingSearchInputComponent from '../Components/MessagingSearchInputComponent'
import MessagingPeopleCardComponent from '../Components/MessagingPeopleCardComponent'
import MessagingTextInputComponent from '../Components/MessagingTextInputComponent'
import VideoIcon from '@/Assets/MessagingWebCam.png'
import Image from 'next/image'
import MessagingBubblesComponent from '../Components/MessagingBubblesComponent'
import MessagingBubbleComponentSender from '../Components/MessagingBubbleComponentSender'
import MessageLeave from '@/Assets/MessagesBackArrow.png'
import { useRouter } from 'next/navigation'

const MessagingPage = () => {
    const [hiddenOrBlock, setHiddenOrBlock] = useState<string>("hidden");
    const [messageBlock, setMessageBlock] = useState<string>("block");
    const [hideBoolean, setHideBoolean] = useState<boolean>(true)

    const router = useRouter();
    useEffect(() => {
        if (sessionStorage.getItem('reloaded') !== 'true') {
          sessionStorage.setItem('reloaded', 'true');
          window.location.reload();
        }
      }, []);
    const handleOpen = () => {
        if (hideBoolean) {
            setHiddenOrBlock("block");
            setMessageBlock("hidden")
            setHideBoolean(!hideBoolean);

        } else {
            setHiddenOrBlock("hidden");
            setMessageBlock("block")
            setHideBoolean(!hideBoolean);

        }

    }

    const handleMessagingPeopleCardClick = () => {
        if (window.innerWidth <= 1024) { 
            handleOpen();
        }
    };

    const handleVideoClick = () => {
        if (sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'false');
          }
        router.push('/TestingVideo')
    }
    return (
        <div className='bg-[#696969] h-full'>
            <NavbarComponent />
            <div className='grid grid-cols-6 p-0 lg:p-[10px]'>
                <div className={`${messageBlock} col-span-6 lg:col-span-2 bg-[#ffffff] w-full border-r-0 lg:border-r-[3px] h-screen border-black lg:rounded-tl-[15px] rounded-0 lg:rounded-bl-[15px] overflow-y-auto`}>
                    <MessagingSearchInputComponent />
                    <div className='flex flex-col flex-grow overflow-auto'>
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                    </div>
                </div>
                <div className={`${hiddenOrBlock} lg:block col-span-6 lg:col-span-4 bg-[#ffffff] w-full h-screen rounded-none lg:rounded-tr-[15px] lg:rounded-br-[15px] flex flex-col justify-between overflow-auto`}>
                    <div className='bg-[#D9D9D9] text-[58px] font-[DMSerifText] w-full rounded-none lg:rounded-tr-[15px] px-[50px] py-[32px] flex justify-between items-center z-10'>
                        <div className='flex flex-row items-center'>
                            <Image src={MessageLeave} alt='X' className='block lg:hidden min-h-[32px] min-w-[32px] mr-[10px]' onClick={handleOpen} />
                            <p className='text-[20px] lg:text-[58px]'>Tyler Nguyen</p>
                        </div>
                        <Image src={VideoIcon} alt='Video Icon' className='cursor-pointer' onClick={handleVideoClick} />
                    </div>

                    <div className='flex flex-col flex-grow overflow-auto'>
                        <div>
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                            <MessagingBubblesComponent />
                        </div>
                        <div>
                            <MessagingBubbleComponentSender />
                        </div>
                        <MessagingTextInputComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagingPage
