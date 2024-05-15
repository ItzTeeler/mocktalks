'use client'

import React, { useState } from 'react'
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
import { IMessages } from '@/Interfaces/Interfaces'

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
    const [usersname, setUsersname] = useState<string>();
    const [chatroom, setChatroom] = useState<string>();

    const joinChatRoom = async (usersname: string, chatroom: string) => {
        try {
            const conn: HubConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5150/chat")
                .configureLogging(LogLevel.Information)
                .build();
            // const conn = new HubConnectionBuilder()
            //   .withUrl("https://mocktalksapihosting.azurewebsites.net/chat")
            //   .configureLogging(LogLevel.Information)
            //   .build();

            // conn.on("JoinSpecificChatRoomMsg", (usersname: string, msg: string) => {
            //   sendMessage(msg);
            // })

            conn.on("RecieveSpecificMessage", (usersname: string, msg: string) => {
                setMessages(messages => [...messages, { usersname, msg }]);
            });

            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { usersname, chatroom })

            setConnection(conn);
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message: string) => {
        try {
            conn && await conn.invoke("SendMessage", message);
        } catch (e) {
            console.log(e)
        }
    }

    const submitFunc = () => {
        if (usersname !== undefined && chatroom !== undefined) {
            joinChatRoom(usersname, chatroom);
        }
    }

    const submitMessage = () => {
        sendMessage(message);
        setMessage("");
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







            <div>
                <p>Welcome to chat</p>

                {
                    !conn ?
                        <div>
                            <input className='border-black border-2' type='text' onChange={e => { setUsersname(e.target.value) }} />
                            <input className='border-black border-2' type='text' onChange={e => { setChatroom(e.target.value) }} />
                            <button className="text-red-500" onClick={() => submitFunc()}>submit</button>
                        </div>
                        :
                        <div className='grid'>
                            <p>Chatroom</p>

                            <div>
                                {
                                    messages && messages.map(
                                        (msg: { msg: string; usersname: string }, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <p>{msg.msg} - {msg.usersname}</p>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>

                            <div>
                                <input className='border-black border-2' type="text" onChange={e => setMessage(e.target.value)} value={message} placeholder='type a message' />
                                <button className=" text-red-500  " onClick={() => submitMessage()} disabled={!message}>submit</button>
                            </div>
                        </div>
                }
            </div>







        </div>
    )
}

export default MessagingPage
