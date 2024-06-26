'use client'

import React, { useEffect, useRef, useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import MessagingSearchInputComponent from '../Components/MessagingSearchInputComponent'
import MessagingPeopleCardComponent from '../Components/MessagingPeopleCardComponent'
import MessagingTextInputComponent from '../Components/MessagingTextInputComponent'
import GlobalMessagingCardComponent from '../Components/GlobalMessagingCardComponent'
import VideoIcon from '@/Assets/MessagingWebCam.png'
import Image from 'next/image'
import MessagingBubblesComponent from '../Components/MessagingBubblesComponent'
import MessagingBubbleComponentSender from '../Components/MessagingBubbleComponentSender'
import MessageLeave from '@/Assets/MessagesBackArrow.png'
import { useRouter } from 'next/navigation'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { IAppointments, IMessages, IProfileData } from '@/Interfaces/Interfaces'
import { GetAllMessages, GetMessagesByUserIds, getAppointments, getProfileItemByUserId } from '@/utils/Dataservices'
import AccountCreateComponent from '../Components/AccountCreateComponent'

const MessagingPage = () => {
    const [hiddenOrBlock, setHiddenOrBlock] = useState<string>("hidden");
    const [messageBlock, setMessageBlock] = useState<string>("block");
    const [hideBoolean, setHideBoolean] = useState<boolean>(true);
    const [alertBool, setAlertBool] = useState<string>("hidden");
    const [alertText, setAlertText] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [conn, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<IMessages[]>([]);
    const [message, setMessage] = useState<string>("");
    const [globalPartnerId, setGlobalPartnerId] = useState<string>("");
    const [globalPartnerProfile, setGlobalPartnerProfile] = useState<IProfileData>();
    const [userProfileInfo, setUserProfileInfo] = useState<IProfileData>();
    const [allRooms, setAllRooms] = useState<string[]>();
    const messageScroll = useRef<HTMLDivElement>(null);

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
            setMessageBlock("hidden");
            setHideBoolean(!hideBoolean);

        } else {
            setHiddenOrBlock("hidden");
            setMessageBlock("block");
            setHideBoolean(!hideBoolean);
        }
    }

    const handleMessagingPeopleCardClick = () => {
        if (window.innerWidth < 1024) {
            handleOpen();
        }
    };

    const joinOneOnOne = async (name: string, roomName: string) => {
        setAlertText("Please Wait")
        setAlertBool("block");
        setTimeout(() => {
            setAlertBool("hidden");
        }, 2000);

        setMessage("");
        await joinChatRoom(name, roomName);

        sessionStorage.setItem("chatRoomName", roomName);
        const numberSplit: string[] = roomName.split("_");
        setMessages(await GetMessagesByUserIds(numberSplit[0], numberSplit[1]));

        if (numberSplit[0] === sessionStorage.getItem("userId")) {
            setGlobalPartnerProfile(await getProfileItemByUserId(Number(numberSplit[1])));
        } else {
            setGlobalPartnerProfile(await getProfileItemByUserId(Number(numberSplit[0])));
        }

        setIsDisabled(false);
    };

    const joinGlobal = async (name: string, roomName: string) => {
        setAlertText("Please Wait")
        setAlertBool("block");
        setTimeout(() => {
            setAlertBool("hidden");
        }, 2000);

        setMessage("");
        await joinChatRoom(name, roomName);

        sessionStorage.setItem("chatRoomName", roomName);
        const allMessages = await GetAllMessages();
        setMessages(allMessages.filter((message: IMessages) => String(message.receiverID) === "0"));

        const emptyProfile: IProfileData = {
            id: 0,
            userID: 0,
            fullName: "Global Chat",
            occupation: "",
            experienceLevel: "",
            jobInterviewLevel: "",
            locationed: "",
            profileImg: ""
        }

        setGlobalPartnerProfile(emptyProfile);

        setIsDisabled(false);
    };

    const handleVideoClick = () => {
        setAlertText("Please Wait")
        setAlertBool("block");
        setTimeout(() => {
            setAlertBool("hidden");
        }, 4000);

        if (sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'false');
        }
        router.push('/TestingVideo');
    }

    const joinChatRoom = async (usersname: string, chatroom: string) => {
        conn && await conn.stop();

        try {
            const newConn = new HubConnectionBuilder()
                .withUrl("https://mocktalksapihosting.azurewebsites.net/chat")
                .configureLogging(LogLevel.Information)
                .build();

            newConn.on("RecieveSpecificMessage", (usersname: string, messageFromSR: string) => {
                let message: IMessages = JSON.parse(messageFromSR);

                setMessages(messages => [...messages, message]);
            });

            await newConn.start();
            await newConn.invoke("JoinSpecificChatRoom", { usersname, chatroom })

            setConnection(newConn);
        } catch (e) {
            setAlertText("Connection failed")
            setAlertBool("block");
            setTimeout(() => {
                setAlertBool("hidden");
            }, 4000);
        }
    }

    const sendMessage = async (messageContainer: string) => {
        try {
            conn && await conn.invoke("SendMessage", messageContainer);
        } catch (e) {
            setAlertText("Message failed to send")
            setAlertBool("block");
            setTimeout(() => {
                setAlertBool("hidden");
            }, 4000);
        }
    }

    const checkUserPair = async () => {
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

            if (!rooms.includes(chatroomName)) {
                rooms.push(chatroomName)
            }
        })

        setAllRooms(rooms);
    }

    useEffect(() => {
        const outerCall = () => {
            const innerCall = async () => {
                const userIdFromStorage = sessionStorage.getItem('userId');
                const grabName: IProfileData = await getProfileItemByUserId(Number(userIdFromStorage))

                setUserProfileInfo(grabName);
                checkUserPair();
            }
            innerCall()
        }
        outerCall();
    }, [])

    useEffect(() => {
        if (messageScroll && messageScroll.current) {
            const { scrollHeight, clientHeight } = messageScroll.current;
            messageScroll.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className='bg-[#696969] h-full'>
            <NavbarComponent />

            <AccountCreateComponent show={alertBool} text={alertText} />

            <div className='grid grid-cols-6 p-0 lg:p-[10px]'>
                <div className={`${messageBlock} col-span-6 lg:col-span-2 bg-[#ffffff] w-full border-r-0 lg:border-r-[3px] h-[90vh] border-black lg:rounded-tl-[15px] rounded-0 lg:rounded-bl-[15px] overflow-y-auto`}>
                    {
                        (allRooms && userProfileInfo) ?
                            <div>
                                <MessagingSearchInputComponent allRooms={allRooms} setAllRooms={setAllRooms} setGlobalPartnerId={setGlobalPartnerId} room={""} clickCheck={handleMessagingPeopleCardClick} joinUp={joinOneOnOne} namePass={userProfileInfo.fullName} />

                                <div className='flex flex-col flex-grow overflow-auto'>
                                    <GlobalMessagingCardComponent isDisabled={isDisabled} setIsDisabled={setIsDisabled} setGlobalPartnerId={setGlobalPartnerId} room={"generalChat"} clickCheck={handleMessagingPeopleCardClick} joinUp={joinGlobal} namePass={userProfileInfo.fullName} />
                                </div>

                                {
                                    allRooms.map(
                                        (room, index) => {
                                            return (
                                                <div key={index} className='flex flex-col flex-grow overflow-auto'>
                                                    <MessagingPeopleCardComponent isDisabled={isDisabled} setIsDisabled={setIsDisabled} setGlobalPartnerId={setGlobalPartnerId} room={room} clickCheck={handleMessagingPeopleCardClick} joinUp={joinOneOnOne} namePass={userProfileInfo.fullName} />
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            :
                            <div className='flex flex-col flex-grow overflow-auto'>
                                <p className='text-black text-center text-5xl py-4 font-[DMSerifText]'>Loading Rooms...</p>
                            </div>
                    }
                </div>

                <div className={`${hiddenOrBlock} lg:block col-span-6 lg:col-span-4 bg-[#ffffff] w-full h-[90vh] rounded-none lg:rounded-tr-[15px] lg:rounded-br-[15px] flex flex-col justify-between`}>
                    {
                        conn && userProfileInfo && globalPartnerId && globalPartnerProfile ?
                            <div className='w-full h-[90vh] grid grid-rows-12 z-0'>
                                <div className='row-span-1 lg:row-span-2 bg-[#D9D9D9] text-[58px] font-[DMSerifText] w-full rounded-none lg:rounded-tr-[15px] px-[50px] flex justify-between items-center'>
                                    <div className='flex flex-row items-center'>
                                        <Image src={MessageLeave} alt='close' className='block lg:hidden min-h-[32px] min-w-[32px] mr-[10px]' onClick={handleOpen} />
                                        <p className='text-[20px] lg:text-[58px]'>{globalPartnerProfile.fullName}</p>
                                    </div>
                                    <Image src={VideoIcon} alt='Video Icon' className='cursor-pointer' onClick={handleVideoClick} />
                                </div>

                                <div ref={messageScroll} className='row-span-9 w-full overflow-auto flex flex-col justify-between'>
                                    <div>
                                        {
                                            messages && messages.map(
                                                (msg, index) => {
                                                    return (
                                                        <div className='grid grid-cols-1' key={index}>
                                                            {
                                                                (msg.senderID === userProfileInfo.userID) ?
                                                                    <div className='flex col-span-1 justify-end'>
                                                                        <MessagingBubbleComponentSender dataPass={msg} />
                                                                    </div>
                                                                    :
                                                                    <div className='flex col-span-1 justify-start'>
                                                                        <MessagingBubblesComponent dataPass={msg} />
                                                                    </div>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>

                                </div>
                                <div className='row-span-2 lg:row-span-1 inline-block self-end'>
                                    <MessagingTextInputComponent setAlertBool={setAlertBool} setAlertText={setAlertText} globalPartnerId={globalPartnerId} message={message} setMessage={setMessage} sendMessage={sendMessage} usersId={userProfileInfo.userID} />
                                </div>
                            </div>
                            :
                            <div>
                                <p className='text-center text-6xl text-black mt-32 font-[DMSerifText] hidden lg:block'>Click On a Chat To Start</p>
                                <p className='text-center text-6xl text-black mt-32 font-[DMSerifText] block lg:hidden'>Loading...</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagingPage
