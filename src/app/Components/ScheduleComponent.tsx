'use client';

import { IAppointments, IMockInterviewProps, ScheduleComponentProps } from '@/Interfaces/Interfaces';
import { Button } from 'flowbite-react';
import React from 'react'
import { CancelAppointmentModal } from './CancelAppointmentModal';

const ScheduleComponent = (props: ScheduleComponentProps) => {
    return (
        <>
            <div className='hidden min-[1440px]:block'>
                <hr />
                <div className='grid grid-flow-col p-3'>

                    <div className='w-80 min-[1440px]:w-40 2xl:w-80'>
                        <p className='text-4xl text-black font-[Source-Sans-Pro] min-[1440px]:text-2xl 2xl:text-4xl'>{props.selectedDate}</p>
                    </div>

                    <div className='w-48 min-[1440px]:w-40 2xl:w-48'>
                        <p className='text-4xl text-black font-[Source-Sans-Pro] min-[1440px]:text-2xl 2xl:text-4xl'>{props.typePractice}</p>
                    </div>

                    <div className='w-96 min-[1440px]:w-40 2xl:w-96'>
                        <p className='text-4xl text-black font-[Source-Sans-Pro] min-[1440px]:text-2xl 2xl:text-4xl'>{props.testQuestions}</p>
                    </div>

                    <div className='w-60 min-[1440px]:w-40 2xl:w-60'>
                        <p className='text-4xl text-black font-[Source-Sans-Pro] min-[1440px]:text-2xl 2xl:text-4xl'>{props.language}</p>
                    </div>

                    <div className='w-[480px] min-[1440px]:w-[320px] 2xl:w-[480px]'>
                        <div className='flex flex-row space-x-4'>
                            <CancelAppointmentModal open={false} close={function (value: React.SetStateAction<boolean>): void {
                                throw new Error('Function not implemented.')
                            }} />
                            <Button className='bg-[#2B170C] w-full'><span className='text-white text-4xl font-[Source-Sans-Pro]'>Reschedule</span></Button>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>

            <div className='block min-[1440px]:hidden'>
                <hr />
                <div className='grid grid-cols-2 h-auto'>
                    <div className='grid grid-row-5 bg-[#D9D9D9]'>
                        <div className='flex items-center pl-5 font-[DMSerifText] text-xl h-16'>
                            When
                        </div>
                        <div className='flex items-center pl-5 font-[DMSerifText] text-xl h-16'>
                            Type
                        </div>
                        <div className='flex items-center pl-5 font-[DMSerifText] text-xl h-16'>
                            Test Questions
                        </div>
                        <div className='flex items-center pl-5 font-[DMSerifText] text-xl h-16'>
                            Language
                        </div>
                        <div className='flex items-center pl-5 font-[DMSerifText] text-xl h-16'>
                            Action
                        </div>
                    </div>
                    <div className='grid grid-row-5 bg-white'>
                        <div className='flex items-center pl-5 max-[300px]:pl-1 font-[Source-Sans-Pro] text-xl h-16'>
                            {props.selectedDate}
                        </div>
                        <div className='flex items-center pl-5 max-[300px]:pl-1 font-[Source-Sans-Pro] text-xl h-16'>
                            {props.typePractice}
                        </div>
                        <div className='flex items-center pl-5 max-[300px]:pl-1 font-[Source-Sans-Pro] text-xl h-16'>
                            {props.testQuestions}
                        </div>
                        <div className='flex items-center pl-5 max-[300px]:pl-1 font-[Source-Sans-Pro] text-xl h-16'>
                            {props.language}
                        </div>
                        <div className='flex items-center max-[300px]:pl-1 px-2 font-[Source-Sans-Pro] text-xl h-16'>
                            <div className='w-full flex flex-col space-y-1'>
                                <CancelAppointmentModal open={false} close={function (value: React.SetStateAction<boolean>): void {
                                    throw new Error('Function not implemented.')
                                }} />
                                <Button className='bg-[#2B170C] text-white font-[Source-Sans-Pro] rounded-full h-6'>Reschedule</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}

export default ScheduleComponent
