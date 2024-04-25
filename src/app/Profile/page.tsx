'use client'

import React, { useState } from 'react'
import { Button } from 'flowbite-react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'

import profileImgPlaceholder from '@/Assets/Ellipse.png'
import listDashesImage from '@/Assets/ListDashes.svg'
import ScheduleComponent from '../Components/ScheduleComponent'

import { AddAppointmentModal } from '../Components/AddAppointmentModal'
import { EditProfileModal } from '../Components/EditProfileModal'
import { ScheduleInterviewComponent } from '../Components/ScheduleInterviewComponent'
import { PendingNotificationComponent } from '../Components/PendingNotificationComponent'

const Page = () => {
  const [openAppointmentModal, setOpenAppointmentModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  return (
    <>
      <NavbarComponent /> {/* Top Navbar */}
      <PendingNotificationComponent/> {/* Notification Component */}
      
      <div className='hidden min-[1440px]:block'> {/* Desktop Design */}
        <div className='px-20 py-14'>
          {/* Top Section */}
          <div className='bg-white w-full h-auto rounded-2xl p-[15px]'>
            <div className='grid grid-flow-col'>
              <div className='flex justify-center'>
                <Image src={profileImgPlaceholder} className='h-[300px] w-[300px] min-[1440px]:w-[200px] min-[1440px]:h-[200px] 2xl:h-[300px] 2xl:w-[300px]' alt='Profile Image' />
              </div>
              <div className='flex justify-center items-center'>
                <div>
                  <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>NAME: Tyler Nguyen</p>
                  <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>LOCATION: Stockton, CA</p>
                  <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>EDUCATION: Student</p>
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <div>
                  <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>YEARS OF EXPERIENCE: Less than 1 year</p>
                  <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>CURRENT LEVEL: Beginner</p>
                  <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px] text-white cursor-default' style={{ userSelect: "none" }}>a</p>
                </div>
              </div>
              <div className='flex justify-end'>
                <EditProfileModal open={false} close={function (value: React.SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.')
                }} />
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className='flex justify-center m-20 min-[1440px]:m-10 2xl:m-20'>
            <div className='grid grid-flow-col space-x-48'>
              <div>
                <h1 className='text-white text-4xl min-[1440px]:text-2xl 2xl:text-4xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
                <p className='text-white text-xl min-[1440px]:text-lg 2xl:text-xl font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
              </div>
              <div>
                <ScheduleInterviewComponent />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='bg-white w-full rounded-2xl'>
            <h1 className='text-black text-4xl font-[DMSerifText] text-center p-5'>UPCOMING PRACTICE INTERVIEWS</h1>
            <div className='bg-[#D9D9D9]'>
              <hr style={{ border: '1px black solid' }} />
              <div className='grid grid-flow-col p-3'>
                <p className='text-4xl text-black font-[DMSerifText] w-80 min-[1440px]:text-2xl min-[1440px]:w-40 2xl:text-4xl 2xl:w-80'>When</p>
                <p className='text-4xl text-black font-[DMSerifText] w-48 min-[1440px]:text-2xl min-[1440px]:w-40 2xl:text-4xl 2xl:w-48'>Type</p>
                <p className='text-4xl text-black font-[DMSerifText] w-96 min-[1440px]:text-2xl min-[1440px]:w-40 2xl:text-4xl 2xl:w-96'>Test Questions</p>
                <p className='text-4xl text-black font-[DMSerifText] w-60 min-[1440px]:text-2xl min-[1440px]:w-40 2xl:text-4xl 2xl:w-60'>Language</p>
                <p className='text-4xl text-black font-[DMSerifText] w-[480px] min-[1440px]:w-[320px] min-[1440px]:text-2xl 2xl:text-4xl 2xl:w-[480px]'>Action</p>
              </div>
              <hr style={{ border: '1px black solid' }} />
            </div>
            <div className='p-3'>
              <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
              <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
              <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
              <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
              <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
              <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            </div>
          </div>
        </div>
      </div>
      <div className='block min-[1440px]:hidden'> {/* Mobile Design */}
        <div className='px-2 py-3'>
          <div className='bg-white w-full h-auto rounded-2xl p-[15px]'>
            <div className='flex justify-end'>
              <EditProfileModal open={false} close={function (value: React.SetStateAction<boolean>): void {
                throw new Error('Function not implemented.')
              }} />
            </div>
            <div className='flex justify-center'>
              <Image src={profileImgPlaceholder} className='h-[150px] w-[150px]' alt='Profile Image' />
            </div>
            <div className='flex flex-col space-y-4 mt-5'>
              <p className='text-[16px] font-[Source-Sans-Pro] text-center'>NAME: Tyler Nguyen</p>
              <p className='text-[16px] font-[Source-Sans-Pro] text-center'>LOCATION: Stockton, CA</p>
              <p className='text-[16px] font-[Source-Sans-Pro] text-center'>EDUCATION: Student</p>
              <p className='text-[16px] font-[Source-Sans-Pro] text-center'>YEARS OF EXPERIENCE: Less than 1 year</p>
              <p className='text-[16px] font-[Source-Sans-Pro] text-center'>CURRENT LEVEL: Beginner</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center m-3'>
          <div className='grid grid-flow-row space-y-12 w-full'>
            <div className='flex flex-col sm:flex-row'>
              <div>
                <h1 className='text-white text-xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
                <p className='text-white max-[300px]:text-sm text-lg font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
              </div>
              <div className='mt-3'>
                <ScheduleInterviewComponent />
              </div>
            </div>
          </div>
        </div>

        <div className='px-2 py-3'>
          <div className='bg-white w-full h-auto rounded-2xl pb-4'>
            <h1 className='text-black text-xl font-[DMSerifText] text-center py-3'>UPCOMING PRACTICE INTERVIEWS</h1>
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
