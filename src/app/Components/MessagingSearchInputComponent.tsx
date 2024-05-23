'use client'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@/Assets/MessagingSearchIcon.png'
import Image from 'next/image'
import { GetAllProfiles } from '@/utils/Dataservices'
import { IProfileData } from '@/Interfaces/Interfaces'
const MessagingSearchInputComponent = () => {
  const [allNames, setAllNames] = useState<string[]>();
  const [displayNames, setDisplayNames] = useState<string[]>();

  const [filteredNames, setFilteredNames] = useState<string[]>();
  const [filteredDisNames, setFilteredDisNames] = useState<string[]>();

  const getAllNames = async () => {
    const dataHolder: IProfileData[] = await GetAllProfiles();

    if (dataHolder.length !== 0) {
      let nameArr: string[] = [];
      let displayArr: string[] = [];

      dataHolder.forEach(profile => {
        nameArr.push(profile.fullName.toLowerCase())
        displayArr.push(profile.fullName)
      })

      setAllNames(nameArr);
      setDisplayNames(displayArr);
    }
  };

  const checkUserInput = async (input: string) => {
    let filteredHolder: string[] = [];
    let filteredDisHolder: string[] = [];

    allNames && allNames.map(name => {
      if (name.includes(input.toLowerCase())) {
        filteredHolder.push(name);

        displayNames && displayNames.map(disName => {
          if (disName.toLowerCase() === name) {
            filteredDisHolder.push(disName);
          };
        });
      };
    });

    setFilteredNames(filteredHolder);
    setFilteredDisNames(filteredDisHolder);
  };

  useEffect(() => {
    getAllNames();
  }, [])

  // Save user ids so that when name is clicked, user ID is passed.
    // change saving names to saving profiles. clean up the code.
  // create chatroom with passed user ID
  // same chatroom to sidebar

  return (
    <div className='relative flex items-center inset-y-0 mx-[25px] pt-[30px]'>
      <div className='absolute p-2'>
        <Image src={SearchIcon} alt="Search Icon" />
      </div>

      <input onChange={(e) => checkUserInput(e.target.value)} type="text" className='rounded-[10px] font-[Source-Sans-Pro] w-full px-10 py-1.5 text-left text-[36px] text-black' placeholder='Search UserID' />

      <div>
        {
          filteredNames && filteredDisNames && filteredNames.map((names: string, index: number) => {
            return (
              <div className='bg-black' key={index}>
                <p className='text-white'>{filteredDisNames[index]}</p>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}

export default MessagingSearchInputComponent