'use client'

import React from 'react'
import { Button } from 'flowbite-react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'

import profileImgPlaceholder from '@/Assets/Ellipse.png'
import listDashesImage from '@/Assets/ListDashes.png'
import ScheduleComponent from '../Components/ScheduleComponent'

const Page = () => {
  return (
    <>
      <NavbarComponent /> {/* Top Navbar */}

      <main className='px-20 py-14'>
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
                <p className='text-[36px] font-[Source-Sans-Pro] text-white'>a</p>
              </div>
            </div>
            <div className='flex justify-end'>
              <Image src={listDashesImage} className='w-10 h-10 cursor-pointer' alt='test' />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className='flex justify-center m-20'>
          <div className='grid grid-flow-col space-x-48'>
            <div>
              <h1 className='text-white text-4xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
              <p className='text-white text-xl font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with<br/>MockTalks!</p>
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
          </div>
        </div>
      </main>
      {/* 
        <div className='bg-white max-w-full rounded-[15px] mt-15 mx-20'>
          <div className='p-5'>
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
            <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS' />
          </div>
        </div>
      </div>
      */}
    </>
  )
}

export default Page
