'use client'

import React from 'react'
import { Button } from 'flowbite-react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'

import profileImgPlaceholder from '@/Assets/Ellipse.png'
import listDashesImage from '@/Assets/ListDashes.png'
import ScheduleComponent from '../Components/ScheduleComponent'

const page = () => {
  return (
    <>
      <NavbarComponent />
      <div className='bg-white max-w-full rounded-[15px] mt-14 mx-20 p-5'>
        <div className='flex justify-center'>
          <div className='grid grid-flow-col gap-48'>
            <Image src={profileImgPlaceholder} alt='test' className='w-auto' />
            <div>
              <p className='text-[36px] font-[Source-Sans-Pro]'>NAME: Tyler Nguyen</p>
              <p className='text-[36px] font-[Source-Sans-Pro]'>LOCATION: Stockton, CA</p>
              <p className='text-[36px] font-[Source-Sans-Pro]'>EDUCATION: Student</p>
            </div>
            <div>
              <p className='text-[36px] font-[Source-Sans-Pro]'>YEARS OF EXPERIENCE: Less than 1 year</p>
              <p className='text-[36px] font-[Source-Sans-Pro]'>CURRENT LEVEL: Beginner</p>
            </div>
            <div>
              <Image src={listDashesImage} className='w-auto cursor-pointer' alt='test' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center m-14'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h1 className='text-white text-4xl font-[DMSerifText]'>PRACTICE MAKES PERFECT</h1>
            <p className='text-white text-xl font-[Source-Sans-Pro]'>Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
          </div>
          <div>
            <Button className='bg-[#2B170C]'><span className='text-white text-4xl px-32'>START A PRACTICE SESSION</span></Button>
          </div>
        </div>
      </div>

      <div className='bg-white max-w-full rounded-[15px] mt-15 mx-20'>
        <h1 className='text-black text-4xl font-[DMSerifText] text-center p-5'>UPCOMING PRACTICE INTERVIEWS</h1>
        <div className='bg-[#D9D9D9]'>
          <hr style={{ border: '1px black solid' }} />
          <div className='flex flex-row space-x-48 p-3'>
            <p className='text-4xl text-black font-[DMSerifText]'>When</p>
            <p className='text-4xl text-black font-[DMSerifText]'>Type</p>
            <p className='text-4xl text-black font-[DMSerifText]'>Test Questions</p>
            <p className='text-4xl text-black font-[DMSerifText]'>Language</p>
            <p className='text-4xl text-black font-[DMSerifText]'>Action</p>
          </div>
          <hr style={{ border: '1px black solid' }} />
        </div>
        <div className='p-5'>
          <ScheduleComponent date='Fri, Feb 27, 2024, 8:00PM' type='Frontend' questions='Build a Calculator App' language='HTML/CSS/JS'/>
        </div>
      </div>
    </>
  )
}

export default page
