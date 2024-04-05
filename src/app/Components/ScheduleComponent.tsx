'use client';

import { IMockInterviewProps } from '@/Interfaces/Interfaces';
import { Button } from 'flowbite-react';
import React from 'react'

const ScheduleComponent = (props: IMockInterviewProps) => {
    return (
        <>
            <div className='grid grid-flow-col p-3'>
                <div className='w-80'>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.date}</p>
                </div>
                <div className='w-48'>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.type}</p>
                </div>
                <div className='w-96'>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.questions}</p>
                </div>
                <div className='w-60'>
                    <p className='text-4xl text-black font-[Source-Sans-Pro]'>{props.language}</p>
                </div>
                <div className='w-[480px]'>
                    <div className='flex flex-row space-x-4'>
                        <Button className='bg-[#D9D9D9] w-48'><span className='text-black text-4xl font-[Source-Sans-Pro]'>Cancel</span></Button>
                        <Button className='bg-[#2B170C] w-full'><span className='text-white text-4xl font-[Source-Sans-Pro]'>Reschedule</span></Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleComponent
