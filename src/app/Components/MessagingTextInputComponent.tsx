'use client'
import React from 'react'
import Image from 'next/image'
import FileAdd from '@/Assets/MessagingFileInput.png'
import SendIcon from '@/Assets/MessagingSend.png'
import { IMessages, IPropMessage } from '@/Interfaces/Interfaces'
import { postMessage } from '@/utils/Dataservices'

const MessagingTextInputComponent = (props: IPropMessage) => {
    const submitMessage = () => {
        if (props.message === "") {
            alert("Message is empty")
        } else if(props.message.length > 100){
            alert("Message is too long, character limit of 100")
        }else{
            const messageHolder: IMessages = {
                id: 0,
                senderID: props.userId,
                receiverID: 0,
                text: props.message,
                dateSent: "N/A",
                isDeleted: false
            }
            props.sendMessage(JSON.stringify(messageHolder));
            postMessage(messageHolder);
            props.setMessage("");
        }
    }


    return (
        <div className='w-full relative'>
            <div className='flex items-center inset-y-0 mx-5 pt-[30px] pb-[40px]'>
                <div className='absolute p-2'>
                    <Image src={FileAdd} alt="Search Icon" />
                </div>
                <input type="text" className='font-[Source-Sans-Pro] rounded-[10px] w-full px-12 py-[12px] text-left text-[18px] text-black' onChange={e => props.setMessage(e.target.value)} value={props.message} placeholder='Enter Message' />
                <div className='absolute right-14'>
                    <Image src={SendIcon} onClick={() => submitMessage()} alt="Send Message" className='' />
                </div>
            </div>
        </div>
    )
}

export default MessagingTextInputComponent