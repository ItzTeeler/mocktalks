'use client'

import React, { useState } from 'react'
import { Button } from 'flowbite-react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'

import profileImgPlaceholder from '@/Assets/Ellipse.png'
import listDashesImage from '@/Assets/ListDashes.png'
import ScheduleComponent from '../Components/ScheduleComponent'
import { EditProfileModal } from '../Components/EditProfileModal'

const Page = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <NavbarComponent /> {/* Top Navbar */}


      <div className='hidden sm:block'>
        <div className='px-20 py-14'>
          {/* Top Section */}
          <div className='bg-white w-full h-[330px] rounded-2xl p-[15px]'>
            <div className='grid grid-flow-col'>
              <div className='flex justify-center'>
                <Image src={profileImgPlaceholder} className='h-[300px] w-[300px]' alt='Profile Image' />
              </div>
              <div className='flex justify-center items-center'>
                <div>
                  <p className='text-[36px] font-[Source-Sans-Pro]'>NAME: Tyler Nguyen</p>
                  <p className='text-[36px] font-[Source-Sans-Pro]'>LOCATION: Stockton, CA</p>
                  <p className='text-[36px] font-[Source-Sans-Pro]'>EDUCATION: Student</p>
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <div>
                  <p className='text-[36px] font-[Source-Sans-Pro]'>YEARS OF EXPERIENCE: Less than 1 year</p>
                  <p className='text-[36px] font-[Source-Sans-Pro]'>CURRENT LEVEL: Beginner</p>
                  <p className='text-[36px] font-[Source-Sans-Pro] text-white cursor-default'>a</p>
                </div>
              </div>
              <div className='flex justify-end'>
                <Image onClick={() => setOpenModal(true)} src={listDashesImage} className='w-10 h-10 cursor-pointer' alt='test' />
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className='flex justify-center m-20'>
            <div className='grid grid-flow-col space-x-48'>
              <div>
                <h1 className='text-white text-4xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
                <p className='text-white text-xl font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with<br />MockTalks!</p>
              </div>
              <div>
                <Button className='bg-[#2B170C] h-full'><span className='text-white text-4xl font-[Source-Sans-Pro] px-32'>START A PRACTICE SESSION</span></Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='bg-white w-full rounded-2xl'>
            <h1 className='text-black text-4xl font-[DMSerifText] text-center p-5'>UPCOMING PRACTICE INTERVIEWS</h1>
            <div className='bg-[#D9D9D9]'>
              <hr style={{ border: '1px black solid' }} />
              <div className='grid grid-flow-col p-3'>
                <p className='text-4xl text-black font-[DMSerifText] w-80'>When</p>
                <p className='text-4xl text-black font-[DMSerifText] w-48'>Type</p>
                <p className='text-4xl text-black font-[DMSerifText] w-96'>Test Questions</p>
                <p className='text-4xl text-black font-[DMSerifText] w-60'>Language</p>
                <p className='text-4xl text-black font-[DMSerifText] w-[480px]'>Action</p>
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
      <div className='block sm:hidden'>
        <div className='px-2 py-3'>
          <div className='bg-white w-full h-auto rounded-2xl p-[15px]'>
            <div className='flex justify-end'>
              <Image onClick={() => setOpenModal(true)} src={listDashesImage} className='w-10 h-10 cursor-pointer' alt='test' />
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
          <div className='grid grid-flow-row space-y-12'>
            <div>
              <h1 className='text-white text-xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
              <p className='text-white text-lg font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
            </div>
          </div>
        </div>

        <div className='px-2 py-3'>
          <div className='bg-white w-full h-auto rounded-2xl'>
            <h1 className='text-black text-xl font-[DMSerifText] text-center py-3'>UPCOMING PRACTICE INTERVIEWS</h1>
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
