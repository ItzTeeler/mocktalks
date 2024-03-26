'use client';

import { IMockInterviewProps } from '@/Interfaces/Interfaces';
import { Button } from 'flowbite-react';
import React from 'react'

const ScheduleComponent = (props: IMockInterviewProps) => {
    return (
        <>
            <div className='flex flex-row p-3 space-x-12'>
                <div>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.date}</p>
                </div>
                <div>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.type}</p>
                </div>
                <div>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.questions}</p>
                </div>
                <div>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.language}</p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <Button className='bg-[#D9D9D9]'><span className='text-black text-4xl'>Cancel</span></Button>
                    <Button className='bg-[#2B170C]'><span className='text-white text-4xl'>Reschedule</span></Button>
                </div>
            </div>
        </>
    )
}

export default ScheduleComponent
