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
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { IMessages, IProfileData } from '@/Interfaces/Interfaces'
import { GetAllMessages, getProfileItemByUserId } from '@/utils/Dataservices'

const MessagingPage = () => {
    const [hiddenOrBlock, setHiddenOrBlock] = useState<string>("hidden");
    const [messageBlock, setMessageBlock] = useState<string>("block");
    const [hideBoolean, setHideBoolean] = useState<boolean>(true)

    const router = useRouter();

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
        router.push('/VideoChat')
    }

    const [conn, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<IMessages[]>([]);
    const [message, setMessage] = useState<string>("")
    const [userProfileInfo, setUserProfileInfo] = useState<IProfileData>();

    const joinChatRoom = async (usersname: string, chatroom: string) => {
        try {
            // const conn = new HubConnectionBuilder()
            //     .withUrl("https://mocktalksapihosting.azurewebsites.net/chat")
            //     .configureLogging(LogLevel.Information)
            //     .build();
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5150/chat")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("RecieveSpecificMessage", (usersname: string, messageFromSR: string) => {
                console.log(messageFromSR);
                let message: IMessages = JSON.parse(messageFromSR);

                setMessages(messages => [...messages, message]);
            });

            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { usersname, chatroom })

            setConnection(conn);
        } catch (e) {
            console.log(e);
            alert("Connection failed")
        }
    }

    const sendMessage = async (messageContainer: string) => {
        try {
            console.log(messageContainer)
            conn && await conn.invoke("SendMessage", messageContainer);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const outerCall = () => {
            const innerCall = async () => {
                const userId = sessionStorage.getItem('userId');
                const grabName: IProfileData = await getProfileItemByUserId(Number(userId))
                setUserProfileInfo(grabName);
                joinChatRoom(grabName.fullName, "GeneralChat")
                // console.log(await GetAllMessages());
                setMessages(await GetAllMessages());
            }
            innerCall()
        }
        outerCall();
    }, [])


    return (
        <div className='bg-[#696969] h-full'>
            <NavbarComponent />
            <div className='grid grid-cols-6 p-0 lg:p-[10px]'>
                <div className={`${messageBlock} col-span-6 lg:col-span-2 bg-[#ffffff] w-full border-r-0 lg:border-r-[3px] h-screen border-black lg:rounded-tl-[15px] rounded-0 lg:rounded-bl-[15px] overflow-y-auto`}>
                    <MessagingSearchInputComponent />
                    <div className='flex flex-col flex-grow overflow-auto'>
                        <MessagingPeopleCardComponent click={handleMessagingPeopleCardClick} />
                    </div>
                </div>
                <div className={`${hiddenOrBlock} lg:block col-span-6 lg:col-span-4 bg-[#ffffff] w-full h-screen rounded-none lg:rounded-tr-[15px] lg:rounded-br-[15px] flex flex-col justify-between overflow-auto`}>
                    {
                        conn && userProfileInfo ?
                            <div>
                                <div className='bg-[#D9D9D9] text-[58px] font-[DMSerifText] w-full rounded-none lg:rounded-tr-[15px] px-[50px] py-[32px] flex justify-between items-center z-10'>
                                    <div className='flex flex-row items-center'>
                                        <Image src={MessageLeave} alt='X' className='block lg:hidden min-h-[32px] min-w-[32px] mr-[10px]' onClick={handleOpen} />
                                        <p className='text-[20px] lg:text-[58px]'>{userProfileInfo.fullName}</p>
                                    </div>
                                    <Image src={VideoIcon} alt='Video Icon' className='cursor-pointer' onClick={handleVideoClick} />
                                </div>

                                <div className='w-full h-full flex flex-col justify-between'>
                                    <div>
                                        {
                                            messages && messages.map(
                                                (msg, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                (msg.senderID === userProfileInfo.id) ?
                                                                    <div className='grid justify-end'>
                                                                        <MessagingBubbleComponentSender dataPass={msg} />
                                                                    </div>
                                                                    :
                                                                    <div className='grid justify-start'>
                                                                        <MessagingBubblesComponent dataPass={msg} />
                                                                    </div>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>

                                    <div>
                                        <MessagingTextInputComponent message={message} setMessage={setMessage} sendMessage={sendMessage} userId={userProfileInfo.id} />
                                    </div>
                                </div>
                            </div>
                            :
                            <p className='text-center text-6xl text-black mt-32 font-[DMSerifText]'>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagingPage
