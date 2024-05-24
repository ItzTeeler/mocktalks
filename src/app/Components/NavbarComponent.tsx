
"use client";

import Link from "next/link";
import { Button, CustomFlowbiteTheme, FlowbiteNavbarCollapseTheme, Navbar } from "flowbite-react";

import Image from "next/image";

import icon from '@/Assets/MockTalkIcon.png'
import bellIcon from '@/Assets/BellIcon.png'
import chatDots from '@/Assets/ChatCenteredDots.png'
import { PendingNotificationComponent } from "./PendingNotificationComponent";
import { useState } from "react";

export default function NavbarComponent() {
  const [notifyVisible, setNotifyVisible] = useState<boolean>(false);

  const customTheme: FlowbiteNavbarCollapseTheme = {
    base: 'w-full md:block md:w-auto',
    list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
    hidden: {
      on: 'hidden',
      off: ''
    }
  };

  const handleVisibleToggle = () => {
    setNotifyVisible(!notifyVisible);
  }

  return (
    <>
      <Navbar fluid>
        <Navbar.Brand as={Link} href="/Profile">
          <Image src={icon} className="mr-1 sm:mr-3 h-5 w-auto sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-2xl sm:text-4xl dark:text-white font-[DMSerifText]">MockTalks</span>
        </Navbar.Brand>
        <div className="flex items-center space-x-0 sm:space-x-4">
          <Navbar.Link style={{ cursor: 'pointer' }} className="hidden min-[1440px]:block">
            <Image src={bellIcon} alt="Bell Icon" onClick={handleVisibleToggle} />
          </Navbar.Link>
          <Navbar.Link href="/MessagingPage">
            <Image src={chatDots} alt="Centered Chat Dots" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Navbar.Link>
          <Navbar.Link href="/">
            <span className="self-center whitespace-nowrap text-2xl sm:text-4xl dark:text-white text-black font-[DMSerifText]">Logout</span>
          </Navbar.Link>
        </div>
      </Navbar>
      <PendingNotificationComponent open={notifyVisible} close={setNotifyVisible} />
    </>
  );
}