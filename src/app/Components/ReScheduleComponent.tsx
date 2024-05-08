'use client'
import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import LeftButton from "@/Assets/LeftButton.png";
import RightButton from "@/Assets/RightButton.png";
import Image from 'next/image';
import { getAppointments, getAppointmentsById, updateAppointments } from '@/utils/Dataservices'; // Import the updateAppointment function
import { IAppointments } from '@/Interfaces/Interfaces';

const ReScheduleComponent = (props: { id: Number, submitBool: () => void }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [appointments, setAppointments] = useState<IAppointments>();
    const [appById, setAppById] = useState<any>();
    const [userIdSession, setUserIdSession] = useState<string>();

    useEffect(() => {
        const getData = async () => {
            const userId = sessionStorage.getItem('userId');
            setUserIdSession(String(userId));
            const appointments = await getAppointments(Number(userId))
            const appointmentById = await getAppointmentsById(Number(props.id))
            setAppById(appointmentById);
        }

        getData();
    }, [])

    const handleSave = async () => {
        let updateAppointment = {
            id: appById.id,
            userId: Number(userIdSession),
            partnerId: 0,
            interviewPractice: appById.interviewPractice,
            typePractice: appById.typePractice,
            typeExperience: appById.typeExperience,
            selectedDate: selectedDate,
            timezone: selectedTime,
            testQuestions: "Build a Calculator App",
            language: "HTML/CSS/JS",
            isPartnered: false,
            isDeleted: false
        }
        setAppointments(updateAppointment);
        await updateAppointments(updateAppointment)
        props.submitBool();
        setOpenModal(false);
    };

    const renderCalendarDays = () => {
        const days = [];
        let currentDate = new Date(startDate);

        const handleButtonClick = (selectedDate: string, selectedTime: string) => {
            return () => {
                setSelectedDate(selectedDate);
                setSelectedTime(selectedTime);
            };
        };

        for (let i = 0; i < 5; i++) {
            const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "short" });
            const dateOfMonth = currentDate.getDate();
            const month = currentDate.toLocaleDateString("en-US", { month: "short" });
            const suffix = getSuffix(dateOfMonth);

            const timeSlots = [];
            for (let hour = 8; hour <= 20; hour += 2) {
                const hour12hr = hour % 12 === 0 ? 12 : hour % 12;
                const ampm = hour >= 12 ? "PM" : "AM";
                const startTime = `${hour12hr}:00 ${ampm}`;
                timeSlots.push(
                    <div key={hour} className="text-center mb-[5px] pt-[5px]">
                        <button
                            className="border-black border py-[10px] px-[3px] w-[100px] rounded-[10px]"
                            onClick={handleButtonClick(currentDate.toDateString(), startTime)}
                        >
                            {startTime}
                        </button>
                    </div>
                );
            }

            let leftButton = null;
            let rightButton = null;

            if (i === 0) {
                leftButton = <button onClick={prevTwoWeeks}><Image src={LeftButton} alt="Left Button" /></button>;
            } else if (i === 4) {
                rightButton = <button onClick={nextTwoWeeks}><Image src={RightButton} alt="Right Button" /></button>;
            }

            const dayContent = (
                <div key={i}>
                    <div className="flex flex-row bg-[#D9D9D9] w-[148px] justify-center">
                        {leftButton}
                        <div key={i} className="flex flex-row justify-center">
                            <div className="flex flex-col w-[100%]">
                                <div className="text-[20px] text-center font-[DMSerifText]">{dayOfWeek}</div>
                                <div className="text-[20px] text-center font-[DMSerifText]">{month} {dateOfMonth}{suffix}</div>
                            </div>
                        </div>
                        {rightButton}
                    </div>
                    <div className="mt-2">
                        {timeSlots}
                    </div>
                </div>
            );

            days.push(dayContent);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return (
            <div className="flex flex-row justify-evenly w-full">
                {days}
            </div>
        );
    };


    const getSuffix = (date: number) => {
        if (date >= 11 && date <= 13) {
            return "th";
        }
        const lastDigit = date % 10;
        switch (lastDigit) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    const nextTwoWeeks = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 5);
        const today = new Date();
        const twoWeeksFromNow = new Date(today.setDate(today.getDate() + 14));
        if (newStartDate <= twoWeeksFromNow) {
            setStartDate(newStartDate);
        }
    };

    const prevTwoWeeks = () => {
        const newStartDate = new Date(startDate);
        const today = new Date();
        if (newStartDate > today) {
            newStartDate.setDate(newStartDate.getDate() - 5);
            setStartDate(newStartDate);
        }
    };

    // get appointment by user id
    // assign reschedule button to appointment ID
    //

    return (
        <div>
            <div className="block min-[1440px]:hidden">
                <Button className='bg-[#2B170C] rounded-full h-6 w-full' onClick={() => setOpenModal(true)}><span className="text-white 4xl font-[Source-Sans-Pro]">Reschedule</span></Button>
            </div>
            <div className="hidden min-[1440px]:block">
                <Button className='bg-[#2B170C] w-full' onClick={() => setOpenModal(true)}><span className='text-white text-4xl font-[Source-Sans-Pro]'>Reschedule</span></Button>
            </div>
            {/*<Button className="bg-[#2B170C] w-full" onClick={() => setOpenModal(true)}><span className='text-white text-4xl font-[Source-Sans-Pro]'>Reschedule</span></Button>*/}

            <Modal size={"3xl"} show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Body className="p-[0px]">
                    <div className="text-center text-[30px] font-[DMSerifText]">
                        <p>Reschedule</p>
                        <p>Please select a slot</p>
                    </div>

                    <div>{renderCalendarDays()}</div>
                </Modal.Body>
                <Modal.Footer className=" flex justify-between">
                    <button
                        color="gray"
                        onClick={() => setOpenModal(false)}
                        className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] "
                    >
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReScheduleComponent;
