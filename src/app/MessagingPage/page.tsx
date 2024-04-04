import React from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import MessagingSearchInputComponent from '../Components/MessagingSearchInputComponent'
import MessagingPeopleCardComponent from '../Components/MessagingPeopleCardComponent'
import MessagingTextInputComponent from '../Components/MessagingTextInputComponent'

const MessagingPage = () => {
  return (
    <div className='bg-[#696969] h-full'>
      <NavbarComponent/>
      <div className='flex p-[10px] h-screen'>
        <div className='bg-[#ffffff] border-r-4 w-[541px] border-black rounded-tl-[15px] rounded-bl-[15px]'>
            <MessagingSearchInputComponent/>
            <MessagingPeopleCardComponent/>
        </div>
        <div className='bg-[#ffffff] w-full rounded-tr-[15px] rounded-br-[15px]'>
        <MessagingTextInputComponent/>
        </div>
      </div>
    </div>
  )
}

export default MessagingPage
