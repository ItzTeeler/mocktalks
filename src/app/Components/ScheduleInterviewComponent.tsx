"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export function ScheduleInterviewComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);

  return (
    <>
      <Button className='bg-[#2B170C] h-full min-[1440px]:h-32 2xl:h-full' onClick={() => setOpenModal(true)}><span className='text-white text-4xl font-[Source-Sans-Pro] px-32'>START A PRACTICE SESSION</span></Button>
      <Modal size={"3xl"} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[50px] font-[DMSerifText]">
            <p>Schedule your first practice interview</p>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col gap-5">
              <button className=" py-[30px] border rounded-[10px] text-[20px] font-[DMSerifText] border-black">Data Structure and Algorithms</button>
              <button className=" py-[30px] border rounded-[10px] text-[20px] font-[DMSerifText] border-black">Applied Data Science</button>
              <button className=" py-[30px] border rounded-[10px] text-[20px] font-[DMSerifText] border-black">Behavioral</button>
            </div>
            <div className="flex flex-col gap-5">
            <button className="px-[10px] py-[30px] border rounded-[10px] text-[20px] font-[DMSerifText] border-black">Frontend</button>
              <button className="px-[10px] py-[30px] border rounded-[10px] text-[20px] font-[DMSerifText] border-black">System Design</button>
              <button className="px-[10px] py-[30px] border rounded-[10px] text-[20px] font-[DMSerifText] border-black">Practice with a Friend</button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button color="gray" onClick={() => setOpenModal(false)} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">
            Back
          </button>
          <button onClick={() => { setOpenModal(false); setOpenModal2(true); }} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Next</button>
        </Modal.Footer>
      </Modal>


      <Modal size={"3xl"} show={openModal2} onClose={() => setOpenModal2(false) }>
        <Modal.Body className="p-[20px]">
          <div className="text-center text-[50px] font-[DMSerifText]">
            <p>Choose type of practice</p>
          </div>
          <div className="">
            <div className="flex flex-col gap-5 pt-[50px]">
              <button className=" py-[35px] border rounded-[10px] text-left border-black p-10">
                <p className=" text-[20px] font-[DMSerifText]">Practice with Peers</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">Free mock interviews with other MockTalk users where you take turns asking each other questions</p>
              </button>
              <button className=" py-[35px] border rounded-[10px] text-left border-black p-10">
              <p className=" text-[20px] font-[DMSerifText]">Expert mock interview</p>
                <p className=" font-[Source-Sans-Pro] text-[16px]">Get interviewed 1 - 1 by an expert coach. </p>
                </button>
            </div>
           
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button color="gray" onClick={() => { setOpenModal(true); setOpenModal2(false); }} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">
            Back
          </button>
          <button onClick={() => {setOpenModal2(false); setOpenModal3(true);}} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Next</button>
        </Modal.Footer>
      </Modal>


      <Modal size={"3xl"} show={openModal3} onClose={() => setOpenModal3(false)}>
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[50px] font-[DMSerifText]">
            <p>Choose type of experience</p>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="flex flex-col gap-5">
              <button className=" py-[30px] border rounded-[10px] border-black">
                <p className="text-[20px] font-[DMSerifText]">Clueless</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">Know nothing about job interviews</p>
              </button>
              <button className=" py-[30px] border rounded-[10px] border-black">
                <p className="text-[20px] font-[DMSerifText]">Intermediate</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">Had a few job interviews, but need more practice</p>
              </button>
              <button className=" py-[30px] border rounded-[10px] border-black">
                <p className="text-[20px] font-[DMSerifText]">Champ</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">Eat job interview questions for breakfast!</p>
              </button>
            </div>
            <div className="flex flex-col gap-5">
            <button className="px-[10px] py-[30px] border rounded-[10px] border-black">
              <p className="text-[20px] font-[DMSerifText]">Beginner</p>
              <p className="text-[16px] font-[Source-Sans-Pro]">Know a little about job interviews</p>
            </button>
              <button className="px-[10px] py-[30px] border rounded-[10px] border-black">
                <p className="text-[20px] font-[DMSerifText]">Advanced</p>
                <p className="text-[16px] font-[Source-Sans-Pro]">Pretty good at job interviews</p>
                </button>            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button color="gray" onClick={() => { setOpenModal2(true); setOpenModal3(false); }} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">
            Back
          </button>
          <button onClick={() => { setOpenModal3(false); setOpenModal4(true); }} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Next</button>
        </Modal.Footer>
      </Modal>

      <Modal size={"3xl"} show={openModal4} onClose={() => setOpenModal4(false)}>
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[30px] font-[DMSerifText]">
            <p>Availability</p>
            <p>Please select a slot</p>
          </div>

          <div className="bg-[#D9D9D9]">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
          
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button color="gray" onClick={() => { setOpenModal3(true); setOpenModal4(false); }} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">
            Back
          </button>
          <button onClick={() => { setOpenModal4(false); setOpenModal5(true); }} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Next</button>
        </Modal.Footer>
      </Modal>

      <Modal size={"3xl"} show={openModal5} onClose={() => setOpenModal5(false)}>
        <Modal.Body className="p-[30px]">
          <div className="text-center text-[30px] font-[DMSerifText]">
            <p>{`You’ve been scheduled!`}</p>
          </div>
          <div>
            <p>{`An awesome peer will be waiting to meet you for a live {Type (Frontend)} interview session on {Date Chosen}`}</p>
            <p>{`An awesome peer will be waiting to meet you for a live {Type (Frontend)} interview session on {Date Chosen}`}</p>
          </div>
          
        </Modal.Body>
        <Modal.Footer className=" flex justify-between">
          <button color="gray" onClick={() => { setOpenModal4(true); setOpenModal5(false); }} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">
            Back
          </button>
          <button onClick={() => { setOpenModal4(false); setOpenModal5(false); }} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Next</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
