'use client'

import React, { useEffect, useState } from 'react'
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

    const joinOneOnOne = async (name: string, roomName: string) => {
        setMessage("");
        conn && await conn.stop();
        joinChatRoom(name, roomName);

        const numberSplit: string[] = roomName.split("-");
        setMessages(await GetMessagesByUserIds(numberSplit[0], numberSplit[1]));

        if (numberSplit[0] === sessionStorage.getItem("userId")) {
            setGlobalPartnerProfile(await getProfileItemByUserId(Number(numberSplit[1])));
        } else {
            setGlobalPartnerProfile(await getProfileItemByUserId(Number(numberSplit[0])));
        }
    };

    const joinGlobal = async (name: string, roomName: string) => {
        setMessage("");
        conn && await conn.stop();
        joinChatRoom(name, roomName);
        const allMessages = await GetAllMessages();
        setMessages(allMessages.filter((message: IMessages) => String(message.receiverID) === "9999"));

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
    };

    const handleVideoClick = () => {
        if (sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'false');
        }
        router.push('/TestingVideo');
    }

    /* ===================== */

    const [conn, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<IMessages[]>([]);
    const [message, setMessage] = useState<string>("")
    const [globalPartnerId, setGlobalPartnerId] = useState<string>("")
    const [globalPartnerProfile, setGlobalPartnerProfile] = useState<IProfileData>()
    const [userProfileInfo, setUserProfileInfo] = useState<IProfileData>();

    const joinChatRoom = async (usersname: string, chatroom: string) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://mocktalksapihosting.azurewebsites.net/chat")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("RecieveSpecificMessage", (usersname: string, messageFromSR: string) => {
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
            conn && await conn.invoke("SendMessage", messageContainer);
        } catch (e) {
            console.log(e)
        }
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

    /* ===================== */

    // check user to see if they have any paired meetings.
    // if so, join a chatroom that uses the user ids of each person (2-4) (1-2)
    // calls any saved messages by checking the senderId and recieverId to the chat name (is receiverId === 2 || 4, is senderId === 2 || 4)
    // loads up saved messages

    // search box
    // when user inputs a name, calls on all users
    // when user selects name, creates chatroom

    /* ===================== */

    const [allRooms, setAllRooms] = useState<string[]>();

    const checkUserPair = async () => {
        const dataAppoint = await getAppointments(Number(sessionStorage.getItem('userId')));
        const filteredPartnerData = dataAppoint.filter((meeting: IAppointments) => meeting.isDeleted === false && meeting.isPartnered === true);
        let rooms: string[] = [];

        filteredPartnerData.map((appointment: IAppointments) => {
            let num1 = appointment.userID;
            let num2 = appointment.partnerID;
            let chatroomName: string;

            if (num1 > num2) {
                chatroomName = `${num1}-${num2}`;
            } else {
                chatroomName = `${num2}-${num1}`;
            }
            rooms.push(chatroomName)
        })

        setAllRooms(rooms);
    }

    return (
        <div className='bg-[#696969] h-full'>
            <NavbarComponent />
            <div className='grid grid-cols-6 p-0 lg:p-[10px]'>
                <div className={`${messageBlock} col-span-6 lg:col-span-2 bg-[#ffffff] w-full border-r-0 lg:border-r-[3px] h-[90vh] border-black lg:rounded-tl-[15px] rounded-0 lg:rounded-bl-[15px] overflow-y-auto`}>
                    <MessagingSearchInputComponent />
                    {
                        userProfileInfo ?
                            <div className='flex flex-col flex-grow overflow-auto'>
                                <GlobalMessagingCardComponent setGlobalPartnerId={setGlobalPartnerId} room={"generalChat"} clickCheck={handleMessagingPeopleCardClick} joinUp={joinGlobal} namePass={userProfileInfo.fullName} />
                            </div>
                            :
                            <div className='flex flex-col flex-grow overflow-auto'>
                                <p className='text-black text-center text-5xl py-4 font-[DMSerifText]'>Loading Rooms...</p>
                            </div>
                    }
                    {
                        (allRooms && userProfileInfo) && allRooms.map(
                            (room, index) => {
                                return (
                                    <div key={index} className='flex flex-col flex-grow overflow-auto'>
                                        <MessagingPeopleCardComponent setGlobalPartnerId={setGlobalPartnerId} room={room} clickCheck={handleMessagingPeopleCardClick} joinUp={joinOneOnOne} namePass={userProfileInfo.fullName} />
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className={`${hiddenOrBlock} lg:block col-span-6 lg:col-span-4 bg-[#ffffff] w-full h-[90vh] rounded-none lg:rounded-tr-[15px] lg:rounded-br-[15px] flex flex-col justify-between`}>
                    {
                        conn && userProfileInfo && globalPartnerId && globalPartnerProfile ?
                            <div className='w-full h-[90vh] grid grid-rows-12 z-10'>
                                <div className='row-span-1 lg:row-span-2 bg-[#D9D9D9] text-[58px] font-[DMSerifText] w-full rounded-none lg:rounded-tr-[15px] px-[50px] flex justify-between items-center'>
                                    <div className='flex flex-row items-center'>
                                        <Image src={MessageLeave} alt='close' className='block lg:hidden min-h-[32px] min-w-[32px] mr-[10px]' onClick={handleOpen} />
                                        <p className='text-[20px] lg:text-[58px]'>{globalPartnerProfile.fullName}</p>
                                    </div>
                                    <Image src={VideoIcon} alt='Video Icon h-[46px] w-[46px]' className='cursor-pointer' onClick={handleVideoClick} />
                                </div>

                                <div className='row-span-9 w-full overflow-auto flex flex-col justify-between'>
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
                                    <MessagingTextInputComponent globalPartnerId={globalPartnerId} message={message} setMessage={setMessage} sendMessage={sendMessage} usersId={userProfileInfo.userID} />
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
