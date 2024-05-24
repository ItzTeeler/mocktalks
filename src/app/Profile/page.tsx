'use client'

import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'

import defaultPFP from '@/Assets/blank-profile-picture-973460_960_720-1.png'
import listDashesImage from '@/Assets/ListDashes.svg'
import ScheduleComponent from '../Components/ScheduleComponent'

import { AddAppointmentModal } from '../Components/AddAppointmentModal'
import { ScheduleInterviewComponent } from '../Components/ScheduleInterviewComponent'
import { PendingNotificationComponent } from '../Components/PendingNotificationComponent'
import { getAllAppointments, getAppointments, getHardProfileItemByUserId, loggedInData, updateAppointments } from '@/utils/Dataservices'
import { IAppointments, IProfileData, IUserData } from '@/Interfaces/Interfaces'
import { EditProfileModal } from '../Components/EditProfileModal'

const Page = () => {
  const [openAppointmentModal, setOpenAppointmentModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [userProfileInfo, setUserProfileInfo] = useState<IProfileData>();
  const [isNotCreateProfile, setIsNotCreateProfile] = useState<boolean>(true);
  const [userGlobalInfo, setUserGlobalInfo] = useState<string | null>();

  const [allOfTheAppointments, setAllOfTheAppointments] = useState<any>();

  useEffect(() => {
    if (sessionStorage.getItem('reloaded') !== 'true') {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const outerCall = () => {
      const innerCall = async () => {
        const userId = sessionStorage.getItem('userId');
        setUserGlobalInfo(userId);
        try {
          setUserProfileInfo(await getHardProfileItemByUserId(Number(userId)));
        } catch {
          setOpenModal(true);
          setIsNotCreateProfile(false);
        }
      }
      innerCall()
    }
    outerCall();
  }, [])

  const [appointmentData, setAppointmentData] = useState<IAppointments[]>([]);
  const [submitBool, setSubmitBool] = useState<boolean>(true);
  const [userIdInfo, setUserIdInfo] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const userId = sessionStorage.getItem('userId');
      setUserIdInfo(userId);
      const dataAppoint = await getAppointments(Number(userId));
      const filteredData = dataAppoint.filter((meeting: IAppointments) => meeting.isDeleted === false);
      setAppointmentData(filteredData);

      const allAppointments = await getAllAppointments();
      setAllOfTheAppointments(allAppointments);
    };
    getData();
  }, [submitBool]);

  useEffect(() => {
    if (allOfTheAppointments) {
      findPairs(allOfTheAppointments);
    }
  }, [allOfTheAppointments]);
  
  const handleSubmitBool = () => {
    setSubmitBool(!submitBool)
  }



  const findPairs = async (appointments: any) => {
    if (!Array.isArray(appointments)) return;
    for (let index1 = 0; index1 < appointments.length; index1++) {
      const appointment1 = appointments[index1];
      for (let index2 = index1 + 1; index2 < appointments.length; index2++) {
        const appointment2 = appointments[index2];

        if (
          appointment1.selectedDate === appointment2.selectedDate &&
          appointment1.timezone === appointment2.timezone &&
          appointment1.interviewPractice === appointment2.interviewPractice &&
          appointment1.typePractice === appointment2.typePractice &&
          appointment1.isPartnered === false &&
          appointment2.isPartnered === false &&
          appointment1.isDeleted === false &&
          appointment2.isDeleted === false &&
          appointment1.userID !== appointment2.userID
        ) {
          const update = {
            id: appointment1.id,
            userID: Number(appointment1.userID),
            partnerID: appointment2.userID,
            interviewPractice: appointment1.interviewPractice,
            typePractice: appointment1.typePractice,
            typeExperience: appointment1.typeExperience,
            selectedDate: appointment1.selectedDate,
            timezone: appointment1.timezone,
            testQuestions: "Build a Calculator App",
            language: "HTML/CSS/JS",
            isPartnered: true,
            isDeleted: false
          };
          const updateData = await updateAppointments(update);

          const update2 = {
            id: appointment2.id,
            userID: Number(appointment2.userID),
            partnerID: appointment1.userID,
            interviewPractice: appointment2.interviewPractice,
            typePractice: appointment2.typePractice,
            typeExperience: appointment2.typeExperience,
            selectedDate: appointment2.selectedDate,
            timezone: appointment2.timezone,
            testQuestions: "Build a Calculator App",
            language: "HTML/CSS/JS",
            isPartnered: true,
            isDeleted: false
          };
          const updateData2 = await updateAppointments(update2);
        }
      }
    }
  };



  return (
    <>
      <NavbarComponent /> {/* Top Navbar */}

      {
        openModal && userGlobalInfo && <EditProfileModal userInfoPass={userGlobalInfo} setUserProfile={setUserProfileInfo} setIsNotCreate={setIsNotCreateProfile} isNotCreate={isNotCreateProfile} open={openModal} close={setOpenModal} />
      }

      {
        isNotCreateProfile && userProfileInfo ?
          <div>
            <div className='hidden min-[1440px]:block'>
              <div className='px-10 py-14'>
                {/* Top Section */}
                <div className='bg-white w-full h-auto rounded-2xl p-[15px]'>
                  <div className='grid grid-flow-col'>
                    <div className='flex justify-center'>
                      <img src={userProfileInfo.profileImg} className='rounded-full h-[300px] w-[300px] min-[1440px]:w-[200px] min-[1440px]:h-[200px] 2xl:h-[300px] 2xl:w-[300px] object-cover' alt='Profile Image' />
                    </div>
                    <div className='flex justify-center items-center'>
                      <div>
                        <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>NAME: {userProfileInfo.fullName}</p>
                        <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>LOCATION: {userProfileInfo.locationed}</p>
                        <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>EDUCATION: {userProfileInfo.occupation}</p>
                      </div>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div>
                        <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>YEARS OF EXPERIENCE: {userProfileInfo.experienceLevel}</p>
                        <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px]'>CURRENT LEVEL: {userProfileInfo.jobInterviewLevel}</p>
                        <p className='text-[36px] font-[Source-Sans-Pro] min-[1440px]:text-[28px] 2xl:text-[36px] text-white cursor-default' style={{ userSelect: "none" }}>a</p>
                      </div>
                    </div>
                    <div className='flex justify-end items-start'>
                      <Image onClick={() => setOpenModal(true)} src={listDashesImage} className='cursor-pointer' alt='User Profile Image' />
                    </div>
                  </div>
                </div>

                {/* Middle Section */}
                <div className='flex justify-center m-20 min-[1440px]:m-10 2xl:m-20'>
                  <div className='grid grid-flow-col space-x-48'>
                    <div>
                      <h1 className='text-white text-4xl min-[1440px]:text-2xl 2xl:text-4xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
                      <p className='text-white text-xl min-[1440px]:text-lg 2xl:text-xl font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
                    </div>
                    <div>
                      <ScheduleInterviewComponent submitBool={handleSubmitBool} userId={userIdInfo} />
                    </div>
                  </div>
                </div>
                {/* Bottom Section */}
                <div className='bg-white w-full rounded-2xl'>
                  <h1 className='text-black text-4xl font-[DMSerifText] text-center p-5'>UPCOMING PRACTICE INTERVIEWS</h1>
                  <div className='bg-[#D9D9D9]'>
                    <hr style={{ border: '1px black solid' }} />
                    <div className='grid grid-flow-col p-3'>
                      <p className='text-4xl text-black font-[DMSerifText] '>When</p>
                      <p className='text-4xl text-black font-[DMSerifText] '>Type</p>
                      <p className='text-4xl text-black font-[DMSerifText]'>Test Questions</p>
                      <p className='text-4xl text-black font-[DMSerifText] '>Language</p>
                      <p className='text-4xl text-black font-[DMSerifText] '>Action</p>
                    </div>
                    <hr style={{ border: '1px black solid' }} />
                  </div>
                  <div className='p-3'>
                    {Array.isArray(appointmentData) && appointmentData.length > 0 ? (
                      appointmentData.map((appointment: any, index: any) => (
                        <ScheduleComponent
                          key={index}
                          id={appointment.id}
                          selectedDate={appointment.selectedDate}
                          typePractice={appointment.typePractice}
                          testQuestions={appointment.testQuestions}
                          language={appointment.language}
                          time={appointment.timezone}
                          submitBool={handleSubmitBool}
                        />
                      ))
                    ) : (
                      <p>No appointments available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Not Desktop */}
            <div className='block min-[1440px]:hidden'>
              <div className='px-2 py-3'>
                <div className='bg-white w-full h-auto rounded-2xl p-[15px]'>
                  <div className='flex justify-end'>
                    <Image onClick={() => setOpenModal(true)} src={listDashesImage} className='w-auto cursor-pointer' alt='test' />
                  </div>
                  <div className='flex justify-center'>
                    <img src={userProfileInfo.profileImg} className='rounded-full h-[150px] w-[150px]' alt='Profile Image' />
                  </div>
                  <div className='flex flex-col space-y-4 mt-5'>
                    <p className='text-[16px] font-[Source-Sans-Pro] text-center'>NAME: {userProfileInfo.fullName}</p>
                    <p className='text-[16px] font-[Source-Sans-Pro] text-center'>LOCATION: {userProfileInfo.locationed}</p>
                    <p className='text-[16px] font-[Source-Sans-Pro] text-center'>EDUCATION: {userProfileInfo.occupation}</p>
                    <p className='text-[16px] font-[Source-Sans-Pro] text-center'>YEARS OF EXPERIENCE: {userProfileInfo.experienceLevel}</p>
                    <p className='text-[16px] font-[Source-Sans-Pro] text-center'>CURRENT LEVEL: {userProfileInfo.jobInterviewLevel}</p>
                  </div>
                </div>
              </div>

              <div className='flex justify-center m-3'>
                <div className='grid grid-flow-row space-y-12 w-full'>
                  <div className='flex flex-col gap-y-5 sm:flex-row justify-evenly'>
                    <div>
                      <h1 className='text-white text-xl font-[DMSerifText] font-normal'>PRACTICE MAKES PERFECT</h1>
                      <p className='text-white max-[300px]:text-sm text-lg font-[Source-Sans-Pro] font-extralight'>Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
                    </div>
                    <ScheduleInterviewComponent submitBool={handleSubmitBool} userId={userIdInfo} />
                  </div>
                </div>
              </div>

              <div className='p-3'>
                <div className='bg-white w-full rounded-2xl pb-5'>
                  <h1 className='text-black text-[20px] font-[DMSerifText] text-center p-5'>UPCOMING PRACTICE INTERVIEWS</h1>
                  <hr style={{ border: '1px black solid' }} />
                  {Array.isArray(appointmentData) && appointmentData.length > 0 ? (
                    appointmentData.map((appointment: any, index: any) => (
                      <ScheduleComponent
                        key={index}
                        id={appointment.id}
                        selectedDate={appointment.selectedDate}
                        typePractice={appointment.typePractice}
                        testQuestions={appointment.testQuestions}
                        language={appointment.language}
                        time={appointment.timezone}
                        submitBool={handleSubmitBool}
                      />
                    ))
                  ) : (
                    <p>No appointments available</p>
                  )}
                  <hr style={{ border: '1px black solid' }} />
                </div>
              </div>
            </div>
          </div>
          :
          <p className='text-center text-6xl text-white mt-32 font-[DMSerifText]'>Loading...</p>
      }
    </>
  )
}


export default Page