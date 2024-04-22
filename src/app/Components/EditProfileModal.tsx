"use client";

import { Button, FileInput, Modal } from "flowbite-react";
import { useState } from "react";
import { DropDownComponent } from "./DropDownComponent";
import { DropZoneComponent } from "./DropZoneComponent";

import Image from "next/image";

import EditProfileIcon from '@/Assets/ListDashes.svg'
import { IEditProfileProps } from "@/Interfaces/Interfaces";


export function EditProfileModal(props: IEditProfileProps) {
  const [openModal, setOpenModal] = useState(false);
  const [profileImg, setProfileImg] = useState<string>("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const file = e.target.files?.[0];

    if (file) {
      reader.onload = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImg("");
    }
  };


  return (
    <div className="font-[DMSerifText]">
      <button onClick={() => setOpenModal(true)}><Image src={EditProfileIcon} alt="Edit" /></button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <p className="font-[DMSerifText] text-[30px] px-[24px] pt-[15px]">Edit Profile</p>
        <Modal.Body className="font-[DMSerifText] text-[30px] pt-0">
          <div>
            <div className="grid grid-cols-3">
              <div className="flex flex-col col-span-2 justify-end">
                <p className="mb-[10px]">Full Name</p>
                <input className="mr-[18px] mb-[10px] rounded-[10px]" type="text" />
              </div>
              <div className="flex flex-col justify-end">
                <p className="mb-[10px]">Last Name</p>
                <input type="text" className="mr-[54px] mb-[10px] rounded-[10px]" />
              </div>
              <div>
                <DropZoneComponent />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="mb-[10px]">What city do you live in?</p>
              <input type="text" className="rounded-[10px] mb-[10px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">Education</p>
              <input type="text" className="rounded-[10px] mb-[10px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">Years of Experience</p>
              <input type="text" className="rounded-[10px] mb-[10px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">What is your current level at job interviews?</p>
              <DropDownComponent />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">What city do you live in?</p>
              <input type="text" className="rounded-[10px] mb-[10px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">Education</p>
              <input type="text" className="rounded-[10px] mb-[10px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">Years of Experience</p>
              <input type="text" className="rounded-[10px] mb-[10px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-[10px]">What is your current level at job interviews?</p>
              <DropDownComponent />
            </div>
          </div>
        </Modal.Body>

        <div className="flex justify-between pb-[15px] px-[24px] pt-[10px]">
          <button onClick={() => setOpenModal(false)} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">Cancel</button>
          <button onClick={() => setOpenModal(false)} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Save</button>
        </div>
      </Modal>
    </div >
  );
}