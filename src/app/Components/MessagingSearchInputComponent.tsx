'use client'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@/Assets/MessagingSearchIcon.png'
import Image from 'next/image'
import { GetAllProfiles } from '@/utils/Dataservices'
import { ISearchCard, IProfileData } from '@/Interfaces/Interfaces'

const MessagingSearchInputComponent = (props: ISearchCard) => {
  const [allProfiles, setAllProfiles] = useState<IProfileData[]>();
  const [filteredProfiles, setFilteredProfiles] = useState<IProfileData[]>();
  const [inputStr, setInputStr] = useState<string>();

  const getAllNames = async () => {
    const dataHolder: IProfileData[] = await GetAllProfiles();

    if (dataHolder.length !== 0) {
      let profileArr: IProfileData[] = [];

      dataHolder.forEach(profile => {
        if (profile.fullName !== sessionStorage.getItem("userName")) {
          profileArr.push(profile)
        }
      })

      setAllProfiles(profileArr);
    }
  };

  const checkUserInput = async (input: string) => {
    let filteredHolder: IProfileData[] = [];

    if (input !== "") {
      allProfiles && allProfiles.map(prof => {
        if (prof.fullName.toLowerCase().includes(input.toLowerCase())) {
          filteredHolder.push(prof);
        };
      });
    };

    setFilteredProfiles(filteredHolder);
  };

  const openChat = (id: number) => {
    const usersId = Number(sessionStorage.getItem("userId"));
    setFilteredProfiles([]);

    if (id > usersId) {
      addTempRoom(`${id}-${usersId}`)

      return `${id}-${usersId}`;
    } else {
      addTempRoom(`${usersId}-${id}`)

      return `${usersId}-${id}`;
    }
  }

  const savePartnerId = async (userId: number) => {
    props.setGlobalPartnerId(String(userId));
  }

  const addTempRoom = (addRoom: string) => {
    let newRoom: string[] = props.allRooms;

    if (!newRoom.includes(addRoom)) {
      newRoom.push(addRoom);
      props.setAllRooms(newRoom);
    }
  }

  useEffect(() => {
    getAllNames();
  }, [])

  return (
    <div className='relative items-center inset-y-0 mx-[25px] pt-[30px]'>
      <div className='absolute p-2'>
        <Image src={SearchIcon} alt="Search Icon" />
      </div>

      <input value={inputStr} onChange={(e) => { setInputStr(e.target.value); checkUserInput(e.target.value) }} type="text" className='rounded-[10px] font-[Source-Sans-Pro] w-full px-10 py-1.5 text-left text-[36px] text-black' placeholder='Search UserID' />

      {
        filteredProfiles && filteredProfiles.length !== 0 &&
        <div className='absolute w-full bg-white border border-black rounded-[10px]'>
          {
            filteredProfiles.map((prof: IProfileData, index: number) => {
              return (
                <div onClick={() => { props.clickCheck(); props.joinUp(props.namePass, openChat(prof.userID)); savePartnerId(prof.userID); setInputStr(""); }} className='pl-3 p-1 text-[20px]' key={index}>
                  <p className='text-black font-[Source-Sans-Pro]'>{prof.fullName}</p>
                </div>
              )
            })
          }
        </div>
      }
    </div>

  )
}

export default MessagingSearchInputComponent