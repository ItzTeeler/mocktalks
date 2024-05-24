'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import FileAdd from '@/Assets/MessagingFileInput.png'
import SendIcon from '@/Assets/MessagingSend.png'
import { IMessages, IPropMessage } from '@/Interfaces/Interfaces'
import { postMessage } from '@/utils/Dataservices'

const MessagingTextInputComponent = (props: IPropMessage) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const submitMessage = () => {
        if (props.message === "") {
            props.setAlertText("Message is empty")
            props.setAlertBool("block");
            setTimeout(() => {
                props.setAlertBool("hidden");
            }, 4000);
        } else if (props.message.length > 100) {
            props.setAlertText("Message is too long, character limit of 100")
            props.setAlertBool("block");
            setTimeout(() => {
                props.setAlertBool("hidden");
            }, 4000);
        } else {
            const messageHolder: IMessages = {
                id: 0,
                senderID: props.usersId,
                receiverID: Number(props.globalPartnerId),
                text: props.message,
                dateSent: "N/A",
                isDeleted: false
            }
            props.sendMessage(JSON.stringify(messageHolder));
            postMessage(messageHolder);
            props.setMessage("");

            setIsDisabled(true);
            setTimeout(() => {
                setIsDisabled(false);
            }, 1000);
        }
    }

    const pressedEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            submitMessage()
        }
    }

    return (
        <div className='w-full relative'>
            <div className='flex items-center inset-y-0 mx-5 pb-4 2xl:pb-[25px]'>
                <div className='absolute p-2'>
                    <Image src={FileAdd} alt="Search Icon" />
                </div>
                <input disabled={isDisabled} type="text" onKeyUp={(e) => pressedEnter(e)} className='font-[Source-Sans-Pro] rounded-[10px] w-full px-12 py-[12px] text-left text-[18px] text-black' onChange={e => props.setMessage(e.target.value)} value={props.message} placeholder='Enter Message' />
                <div className='absolute right-14'>
                    <Image src={SendIcon} onClick={() => submitMessage()} alt="Send Message" className='' />
                </div>
            </div>
        </div>
    )
}

export default MessagingTextInputComponent