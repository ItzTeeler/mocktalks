
"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";

import Image from "next/image";

import icon from '@/Assets/MockTalkIcon.png'
import bellIcon from '@/Assets/BellIcon.png'
import chatDots from '@/Assets/ChatCenteredDots.png'

export default function NavbarComponent() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/Profile">
        <Image src={icon} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-[36px] dark:text-white font-[DMSerifText]">MockTalks</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#">
            <Image src={bellIcon} alt="Bell Icon"/>
        </Navbar.Link>
        <Navbar.Link href="#">
            <Image src={chatDots} alt="Centered Chat Dots"/>
        </Navbar.Link>
        <Navbar.Link href="#">
        <span className="self-center whitespace-nowrap text-[36px] dark:text-white font-[DMSerifText]">Logout</span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
