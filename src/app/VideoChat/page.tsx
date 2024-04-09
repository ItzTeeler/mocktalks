import React from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import VideoFooterComponent from '../Components/VideoFooterComponent'
import VideoCamComponent from '../Components/VideoCamComponent'

const VideoChatPage = () => {
  return (
    <div className='h-screen'>
      <NavbarComponent/>
      <div className='flex flex-row gap-[150px] mt-[105px] justify-evenly mb-[150px]'>
        <VideoCamComponent/>
        <VideoCamComponent/>
      </div>
      <VideoFooterComponent/>
    </div>
  )
}

export default VideoChatPage
