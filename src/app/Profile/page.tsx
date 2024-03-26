'use client'

import React from 'react'
import {} from 'flowbite-react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'

import profileImgPlaceholder from '@/Assets/Ellipse.png'

const page = () => {
  return (
    <>
      <NavbarComponent/>

      <div className='flex justify-center p-12'>
        <div className='bg-[#FFFFFF] w-full h-80 rounded-2xl'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex justify-center align-middle'>
            <Image src={profileImgPlaceholder} className='w-[300px]' alt='profileImg'/>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default page
