'use client';

import { IAppointments, IMockInterviewProps, ScheduleComponentProps } from '@/Interfaces/Interfaces';
import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import ReScheduleComponent from './ReScheduleComponent';
import { CancelAppointmentModal } from './CancelAppointmentModal';

const ScheduleComponent = (props: ScheduleComponentProps & { submitBool: () => void }) => {
    return (
        <>
            <div className='hidden min-[1440px]:block'>
                <hr />
                <div className='flex flex-row p-3 items-center justify-between'>

                    <div className='w-80 min-[1440px]:w-40 2xl:w-80'>
                        <p className='text-4xl text-black font-[Source-Sans-Pro] min-[1440px]:text-2xl 2xl:text-4xl'>{props.selectedDate} {props.time}</p>
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

                    <div className=''>
                        <div className='flex flex-row space-x-4'>
                            <CancelAppointmentModal id={props.id} submitBool={props.submitBool}/>
                            <ReScheduleComponent id={props.id} submitBool={props.submitBool} />              
                        </div>
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
                            {props.selectedDate} {props.time}
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
                                <CancelAppointmentModal id={props.id} submitBool={props.submitBool}/>
                                <ReScheduleComponent id={props.id} submitBool={props.submitBool} />                               
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