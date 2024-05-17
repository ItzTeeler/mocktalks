'use client'

import React, { useState } from "react"
import { Button } from "flowbite-react"
import { useRouter } from "next/navigation";

export function PendingNotificationComponent(props: {open: boolean, close: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [name, setName] = useState<string>('John Fartgroom');
    const [experience, setExperience] = useState<string>('Beginner');

    const router = useRouter();

    const handleClose = () => {
        props.close(false);
    }
    
    const handleSubmit = () => {
        props.close(false);
        router.push(`/MessagingPage`);
    }

    return (
        <>
        {
            props.open == true &&
            <div className={`sm:absolute sm:right-12`}>
                <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                    <div className="grid grid-cols-2">
                        <div className="w-[192px]">
                            <p className="text-[14px] font-[DMSerifText]">{name} has requested an appointment</p>
                            <p className="text-[12px] font-[DMSerifText]">Interview experience: {experience}</p>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="grid grid-rows-2">
                                <Button className="bg-[#2B170C] text-white rounded-full w-[64px] h-[24px] text-[12px] font-[Source-Sans-Pro]" onClick={handleSubmit}>Accept</Button>
                                <div className="flex items-end">
                                    <Button className="bg-[#D9D9D9] text-black rounded-full w-[64px] h-[24px] text-[12px] font-[Source-Sans-Pro]" onClick={handleClose}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}