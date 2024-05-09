
"use client";

import Link from "next/link";
import { Button, CustomFlowbiteTheme, FlowbiteNavbarCollapseTheme, Navbar } from "flowbite-react";

import Image from "next/image";

import icon from '@/Assets/MockTalkIcon.png'
import bellIcon from '@/Assets/BellIcon.png'
import chatDots from '@/Assets/ChatCenteredDots.png'
import { PendingNotificationComponent } from "./PendingNotificationComponent";

export default function NavbarComponent() {
  const customTheme: FlowbiteNavbarCollapseTheme = {
    base: 'w-full md:block md:w-auto',
    list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
    hidden: {
      on: 'hidden',
      off: ''
    }
  };

  return (
    <>
      <Navbar fluid>
        <Navbar.Brand as={Link} href="/Profile">
          <Image src={icon} className="mr-1 sm:mr-3 h-3 w-auto sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap sm:text-4xl dark:text-white font-[DMSerifText]">MockTalks</span>
        </Navbar.Brand>
        <Navbar.Collapse theme={customTheme}>
          <Navbar.Link href="#">
            <Image src={bellIcon} alt="Bell Icon" />
          </Navbar.Link>
          <Navbar.Link href="/MessagingPage">
            <Image src={chatDots} alt="Centered Chat Dots" />
          </Navbar.Link>
          <Navbar.Link href="/">
            <span className="self-center whitespace-nowrap text-[36px] dark:text-white font-[DMSerifText]">Logout</span>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <PendingNotificationComponent/>
    </>
  );
}