"use client";

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { DropDownComponent } from "./DropDownComponent";
import { DropZoneComponent } from "./DropZoneComponent";
import { IEditProfileProps, IProfileData } from "@/Interfaces/Interfaces";
import { createProfileItem, getProfileItemByUserId, updateProfileItem } from "@/utils/Dataservices";
import defaultImg from "@/Assets/blank-profile-picture-973460_960_720-1.png"
import AccountCreateComponent from "./AccountCreateComponent";

export function EditProfileModal(props: IEditProfileProps) {
  const [userData, setUserData] = useState<IProfileData>();

  const [fullName, setFullName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [YoE, setYoE] = useState<string>("");
  const [jobInterviewLevel, setJobInterviewLevel] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");

  const [alertBool, setAlertBool] = useState<string>("hidden");
  const [alertText, setAlertText] = useState<string>("");

  const submitCreateProfile = () => {
    let profileData: IProfileData = {
      id: 0,
      userID: Number(props.userInfoPass),
      fullName: fullName,
      occupation: education,
      experienceLevel: YoE,
      jobInterviewLevel: jobInterviewLevel,
      locationed: location,
      profileImg: profileImg
    }

    if (profileData.occupation === "") {
      profileData.occupation = "Empty";
    }
    if (profileData.experienceLevel === "") {
      profileData.experienceLevel = "Empty";
    }
    if (profileData.locationed === "") {
      profileData.locationed = "Empty";
    }
    if (profileData.profileImg === "") {
      profileData.profileImg = defaultImg.src
    }

    if (profileData.jobInterviewLevel === "" || profileData.fullName === "") {
      setAlertText("Please make sure to input your name and job interview level")
      setAlertBool("block");
      setTimeout(() => {
        setAlertBool("hidden");
      }, 4000);
    } else if (profileData.fullName.length > 40) {
      setAlertText("Full Name is too long (greater than 40 characters), please shorten.")
      setAlertBool("block");
      setTimeout(() => {
        setAlertBool("hidden");
      }, 4000);
    } else {
      props.setUserProfile(profileData);
      createProfileItem(profileData);
      props.close(false);
      props.setIsNotCreate(true);
    }
    sessionStorage.setItem("userName", String(profileData.fullName));
  }

  const submitUpdateProfile = () => {
    let profileData: IProfileData = {
      id: userData!.id,
      userID: Number(props.userInfoPass),
      fullName: fullName,
      occupation: education,
      experienceLevel: YoE,
      jobInterviewLevel: jobInterviewLevel,
      locationed: location,
      profileImg: profileImg
    }

    if (profileData.occupation === "") {
      profileData.occupation = "Empty";
    }
    if (profileData.experienceLevel === "") {
      profileData.experienceLevel = "Empty";
    }
    if (profileData.locationed === "") {
      profileData.locationed = "Empty";
    }
    if (profileData.profileImg === "") {
      profileData.profileImg = defaultImg.src
    }

    if (profileData.jobInterviewLevel === "" || profileData.fullName === "") {
      setAlertText("Please make sure to input your name and job interview level")
      setAlertBool("block");
      setTimeout(() => {
        setAlertBool("hidden");
      }, 4000);
    } else if (profileData.fullName.length > 40) {
      setAlertText("Full Name is too long (greater than 40 characters), please shorten.")
      setAlertBool("block");
      setTimeout(() => {
        setAlertBool("hidden");
      }, 4000);
    } else {
      props.setUserProfile(profileData);
      updateProfileItem(profileData);
      props.close(false);
    }
    sessionStorage.setItem("userName", String(profileData.fullName));
  }

  useEffect(() => {
    const outerCall = () => {
      const innerCall = async () => {
        try {
          const localData: IProfileData = await getProfileItemByUserId(Number(props.userInfoPass));
          setUserData(localData);
          setFullName(localData.fullName)
          setLocation(localData.locationed)
          setEducation(localData.occupation)
          setYoE(localData.experienceLevel)
          setJobInterviewLevel(localData.jobInterviewLevel)
          setProfileImg(localData.profileImg)
        } catch {
          let emptyProfileData: IProfileData = {
            id: 0,
            userID: 0,
            fullName: "",
            occupation: "",
            experienceLevel: "",
            jobInterviewLevel: "",
            locationed: "",
            profileImg: ""
          }
          setUserData(emptyProfileData)
        }
      }
      innerCall();
    }
    outerCall();
  }, [props.isNotCreate === true])

  return (
    <div className="font-[DMSerifText]">
      <Modal show={props.open} onClose={() => props.close(false)}>
        <AccountCreateComponent show={alertBool} text={alertText} />
        {
          props.isNotCreate ? <p className="font-[DMSerifText] text-[30px] px-[24px] pt-[15px]">Edit Profile</p> : <p className="font-[DMSerifText] text-[30px] px-[24px] pt-[15px]">Create Profile</p>
        }
        {(userData) ?
          <Modal.Body className="font-[DMSerifText] text-[30px] pt-0">
            <div>
              <div className="grid grid-cols-12">
                <div className="flex flex-col col-span-7 sm:col-span-8 justify-end">
                  <p className="mb-[10px]">Full Name</p>
                  <input defaultValue={userData.fullName} onChange={(e) => setFullName(e.target.value)} className="mr-[18px] mb-[10px] rounded-[10px]" type="text" />
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <DropZoneComponent profileImg={userData.profileImg} setProfileImg={setProfileImg} />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="mb-[10px]">What city do you live in?</p>
                <input defaultValue={userData.locationed} onChange={(e) => setLocation(e.target.value)} type="text" className="rounded-[10px] mb-[10px]" />
              </div>
              <div className="flex flex-col">
                <p className="mb-[10px]">Education</p>
                <input defaultValue={userData.occupation} onChange={(e) => setEducation(e.target.value)} type="text" className="rounded-[10px] mb-[10px]" />
              </div>
              <div className="flex flex-col">
                <p className="mb-[10px]">Years of Experience</p>
                <input defaultValue={userData.experienceLevel} onChange={(e) => setYoE(e.target.value)} type="text" className="rounded-[10px] mb-[10px]" />
              </div>
              <div className="flex flex-col">
                <p className="mb-[10px]">What is your current level at job interviews?</p>
                {
                  (props.isNotCreate === false || jobInterviewLevel) && <DropDownComponent passUse={jobInterviewLevel} passUseState={setJobInterviewLevel} />
                }
              </div>
            </div>
          </Modal.Body>
          :
          <Modal.Body>
            <div>
              <p>Loading...</p>
            </div>
          </Modal.Body>
        }
        {
          props.isNotCreate === true &&
          <div className="flex justify-between pb-[15px] px-[24px] pt-[10px]">
            <button onClick={() => props.close(false)} className="text-[30px] bg-[#D9D9D9] font-[DMSerifText] text-black border rounded-[10px] px-[18px] py-[6px] ">Cancel</button>
            <button onClick={() => submitUpdateProfile()} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Save</button>
          </div>
        }
        {
          props.isNotCreate === false &&
          <div className="flex justify-end pb-[15px] px-[24px] pt-[10px]">
            <button onClick={() => submitCreateProfile()} className="text-[30px] bg-[#2B170C] font-[DMSerifText] text-white rounded-[10px] px-[35px] py-[6px] ">Save</button>
          </div>
        }
      </Modal>
    </div >
  );
}