import React from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import MessagingSearchInputComponent from '../Components/MessagingSearchInputComponent'
import MessagingPeopleCardComponent from '../Components/MessagingPeopleCardComponent'
import MessagingTextInputComponent from '../Components/MessagingTextInputComponent'

const MessagingPage = () => {
    return (
        <div className='bg-[#696969] h-full'>
            <NavbarComponent />
            <div className='grid grid-cols-6 p-[10px]'>
                <div className='col-span-2 bg-[#ffffff] w-full border-r-4 h-[88vh] border-black rounded-tl-[15px] rounded-bl-[15px]'>
                    <MessagingSearchInputComponent />
                    <MessagingPeopleCardComponent />
                </div>
                <div className='col-span-4 bg-[#ffffff] w-full h-[88vh] rounded-tr-[15px] rounded-br-[15px] flex items-end'>
                    <MessagingTextInputComponent />
                </div>
            </div>
        </div>
    )
}

export default MessagingPage
