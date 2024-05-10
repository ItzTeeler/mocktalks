"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LeftButton from "@/Assets/LeftButton.png";
import RightButton from "@/Assets/RightButton.png";
import { createAppointment } from "@/utils/Dataservices";
import { IAppointments } from "@/Interfaces/Interfaces";
import AccountCreateComponent from "./AccountCreateComponent";

export function ScheduleInterviewComponent(props: { submitBool: () => void, userId: number }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [openModal3, setOpenModal3] = useState<boolean>(false);
  const [openModal4, setOpenModal4] = useState<boolean>(false);
  const [openModal5, setOpenModal5] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const [pracInterview, setPracInterview] = useState("");
  const [typeOfInterview, setTypeOfInterview] = useState("");
  const [typeOfExperience, setTypeOfExperience] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [alertBool, setAlertBool] = useState<string>("hidden");
  const [alertText, setAlertText] = useState<string>("");

  const [interviewObject, setInterviewObject] = useState<IAppointments>();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current && openModal) {
      modalRef.current.focus();
    }
  }, [modalRef, openModal]);

  const handleSubmit = async () => {
    const newAppointment: IAppointments = {
      id: 0,
      userId: props.userId,
      partnerId: 0,
      interviewPractice: pracInterview,
      typePractice: typeOfInterview,
      typeExperience: typeOfExperience,
      selectedDate: selectedDate,
      timezone: selectedTime,
      testQuestions: "Build a Calculator App",
      language: "HTML/CSS/JS",
      isPartnered: false,
      isDeleted: false
    };
    setInterviewObject(newAppointment);
    await createAppointment(newAppointment);
    console.log(newAppointment);
    props.submitBool();
  }


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
              className="border-black border py-[10px] px-[3px] w-[100px] rounded-[10px] focus:bg-[#757575] hover:bg-[#757575]"
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

  const ifClicked = () => {
    setAlertText("Expert is currently unavailable")
    setAlertBool("block");
    setTimeout(() => {
      setAlertBool("hidden");
    }, 3000);
  }

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

  return (
    <div>
      <div className="block min-[1440px]:hidden">
        <Button className='bg-[#2B170C] focus:bg-[#2b170c] w-full' onClick={() => setOpenModal(true)}><span className='text-white text-xl font-[Source-Sans-Pro]'>START A PRACTICE SESSION</span></Button>
      </div>
      <div className="hidden min-[1440px]:block">
        <Button className='bg-[#2B170C] h-full' onClick={() => setOpenModal(true)}><span className='text-white text-4xl font-[Source-Sans-Pro] px-32 min-[1440px]:px-16 2xl:px-32'>START A PRACTICE SESSION</span></Button>
      </div>
      <Modal initialFocus={-1} autoFocus={false} ref={modalRef} size={"3xl"} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[50px] font-[DMSerifText]">
            <p>Schedule your first practice interview</p>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col gap-5">

              <button onClick={() => setPracInterview("Data Structure and Algorithms")} className=" py-[30px] border rounded-[10px] text-[20px] font-[Source-Sans-Pro] border-black hover:bg-[#757575] focus:bg-[#757575]">
                Data Structure and Algorithms
              </button>
              <button onClick={() => setPracInterview("Applied Data Science")} className=" py-[30px] border rounded-[10px] text-[20px] font-[Source-Sans-Pro] border-black focus:bg-[#757575] hover:bg-[#757575]">
                Applied Data Science
              </button>
              <button onClick={() => setPracInterview("Behavioral")} className=" py-[30px] border rounded-[10px] text-[20px] font-[Source-Sans-Pro] border-black focus:bg-[#757575] hover:bg-[#757575]">
                Behavioral
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <button onClick={() => setPracInterview("Frontend")} className="px-[10px] py-[30px] border rounded-[10px] text-[20px] font-[Source-Sans-Pro] border-black focus:bg-[#757575] hover:bg-[#757575]">
                Frontend
              </button>
              <button onClick={() => setPracInterview("System Design")} className="px-[10px] py-[30px] border rounded-[10px] text-[20px] font-[Source-Sans-Pro] border-black focus:bg-[#757575] hover:bg-[#757575]">
                System Design
              </button>
              <button onClick={() => setPracInterview("Practice with a Friend")} className="px-[10px] py-[30px] border rounded-[10px] text-[20px] font-[Source-Sans-Pro] border-black focus:bg-[#757575] hover:bg-[#757575]">
                Practice with a Friend
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button
            color="gray"
            onClick={() => setOpenModal(false)}
            className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] focus:bg-[#757575]"
          >
            Back
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
              setOpenModal2(true);
            }}
            className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] focus:bg-[#757575]"
          >
            Next
          </button>
        </Modal.Footer>
      </Modal>

      <Modal initialFocus={-1} autoFocus={false} ref={modalRef} size={"3xl"} show={openModal2} onClose={() => setOpenModal2(false)}>
        <AccountCreateComponent show={alertBool} text={alertText} />
        <Modal.Body className="p-[20px]">
          <div className="text-center text-[50px] font-[DMSerifText]">
            <p>Choose type of practice</p>
          </div>
          <div className="">
            <div className="flex flex-col gap-5 pt-[50px]">
              <button onClick={() => { setTypeOfInterview("Practice with Peers") }} className=" py-[35px] border rounded-[10px] text-left border-black p-10 focus:bg-[#757575]">
                <p className=" text-[20px] font-[DMSerifText]">
                  Practice with Peers
                </p>
                <p className="text-[16px] font-[Source-Sans-Pro]">
                  Free mock interviews with other MockTalk users where you take
                  turns asking each other questions
                </p>
              </button>
              <button onClick={() => { setTypeOfInterview("Practice with Peers"); ifClicked() }} className=" py-[35px] border rounded-[10px] text-left border-black p-10 focus:bg-[#757575]">
                <p className=" text-[20px] font-[DMSerifText]">
                  Expert mock interview
                </p>
                <p className=" font-[Source-Sans-Pro] text-[16px]">
                  Get interviewed 1 - 1 by an expert coach.
                </p>
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button
            color="gray"
            onClick={() => {
              setOpenModal(true);
              setOpenModal2(false);
            }}
            className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] "
          >
            Back
          </button>
          <button
            onClick={() => {
              setOpenModal2(false);
              setOpenModal3(true);
            }}
            className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] "
          >
            Next
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        initialFocus={-1}
        autoFocus={false}
        ref={modalRef}
        size={"3xl"}
        show={openModal3}
        onClose={() => setOpenModal3(false)}
      >
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[50px] font-[DMSerifText]">
            <p>Choose type of experience</p>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col gap-5">
              <button onClick={() => { setTypeOfExperience("Clueless") }} className=" py-[30px] border rounded-[10px] border-black focus:bg-[#757575]">
                <p className="text-[20px] font-[DMSerifText]">Clueless</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">
                  Know nothing about job interviews
                </p>
              </button>
              <button onClick={() => { setTypeOfExperience("Intermediate") }} className=" py-[30px] border rounded-[10px] border-black focus:bg-[#757575]">
                <p className="text-[20px] font-[DMSerifText]">Intermediate</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">
                  Had a few job interviews, but need more practice
                </p>
              </button>
              <button onClick={() => { setTypeOfExperience("Champ") }} className=" py-[30px] border rounded-[10px] border-black focus:bg-[#757575]">
                <p className="text-[20px] font-[DMSerifText]">Champ</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">
                  Eat job interview questions for breakfast!
                </p>
              </button>
            </div>
            <div onClick={() => { setTypeOfExperience("Beginner") }} className="flex flex-col gap-5">
              <button className="px-[10px] py-[30px] border rounded-[10px] border-black focus:bg-[#757575]">
                <p className="text-[20px] font-[DMSerifText]">Beginner</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">
                  Know a little about job interviews
                </p>
              </button>
              <button onClick={() => { setTypeOfExperience("Advanced") }} className="px-[10px] py-[30px] border rounded-[10px] border-black focus:bg-[#757575]">
                <p className="text-[20px] font-[DMSerifText]">Advanced</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">
                  Pretty good at job interviews
                </p>
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button
            color="gray"
            onClick={() => {
              setOpenModal2(true);
              setOpenModal3(false);
            }}
            className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] "
          >
            Back
          </button>
          <button
            onClick={() => {
              setOpenModal3(false);
              setOpenModal4(true);
            }}
            className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] "
          >
            Next
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        initialFocus={-1}
        autoFocus={false}
        ref={modalRef}
        size={"3xl"}
        show={openModal4}
        onClose={() => setOpenModal4(false)}
      >
        <Modal.Body className="p-[0px]">
          <div className="text-center text-[30px] font-[DMSerifText]">
            <p>Availability</p>
            <p>Please select a slot</p>
          </div>

          <div>{renderCalendarDays()}</div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between border-0">
          <button
            color="gray"
            onClick={() => {
              setOpenModal3(true);
              setOpenModal4(false);
            }}
            className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] "
          >
            Back
          </button>
          <button
            onClick={() => {
              setOpenModal4(false);
              setOpenModal5(true);
            }}
            className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] "
          >
            Next
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        autoFocus={false}
        ref={modalRef}
        size={"3xl"}
        show={openModal5}
        onClose={() => setOpenModal5(false)}
      >
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[30px] font-[DMSerifText]">
            <p>{`You’ve been scheduled!`}</p>
          </div>
          <div>
            <p>{`An awesome peer will be waiting to meet you for a live ${pracInterview} interview session`}</p>
            <p>{`You have been scheduled for ${selectedDate} at ${selectedTime}`}</p>
          </div>

        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button
            color="gray"
            onClick={() => {
              setOpenModal4(true);
              setOpenModal5(false);
            }}
            className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] "
          >
            Back
          </button>
          <button
            onClick={() => {
              setOpenModal4(false);
              setOpenModal5(false);
              handleSubmit();
            }}
            className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] "
          >
            Next
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}