"use client";

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { DropDownComponent } from "./DropDownComponent";
import { DropZoneComponent } from "./DropZoneComponent";
import { IEditProfileProps, IProfileData } from "@/Interfaces/Interfaces";
import { createProfileItem, getProfileItemByUserId, updateProfileItem } from "@/utils/Dataservices";
import defaultImg from "@/Assets/blank-profile-picture-973460_960_720-1.png"

export function EditProfileModal(props: IEditProfileProps) {
  const [userData, setUserData] = useState<IProfileData>();

  const [fullName, setFullName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [YoE, setYoE] = useState<string>("");
  const [jobInterviewLevel, setJobInterviewLevel] = useState<string>("");

  const [profileImg, setProfileImg] = useState<string>("");

  const submitCreateProfile = () => {
    let profileData: IProfileData = {
      id: 0,
      userId: Number(props.userInfoPass),
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

    console.log(profileData);

    if (profileData.jobInterviewLevel === "" || profileData.fullName === "") {
      alert("Please make sure to input your name and job interview level");
    } else {
      props.setUserProfile(profileData);
      createProfileItem(profileData);
      props.close(false);
      props.setIsNotCreate(true);
    }
  }

  const submitUpdateProfile = () => {
    let profileData: IProfileData = {
      id: userData!.id,
      userId: Number(props.userInfoPass),
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

    console.log(profileData);

    if (profileData.jobInterviewLevel === "" || profileData.fullName === "") {
      alert("Please make sure to input your name and job interview level");
    } else {
      props.setUserProfile(profileData);
      updateProfileItem(profileData);
      props.close(false);
    }
  }

  useEffect(() => {
    const outerCall = () => {
      const innerCall = async () => {
        try {
          setUserData(await getProfileItemByUserId(Number(props.userInfoPass)));
          const localData = await getProfileItemByUserId(Number(props.userInfoPass));
          setFullName(await localData.fullName)
          setLocation(await localData.locationed)
          setEducation(await localData.occupation)
          setYoE(await localData.experienceLevel)
          setJobInterviewLevel(await localData.jobInterviewLevel)
          setProfileImg(await localData.profileImg)
        } catch {
          let emptyProfileData: IProfileData = {
            id: 0,
            userId: 0,
            fullName: "",
            occupation: "",
            experienceLevel: "",
            jobInterviewLevel: "",
            locationed: "",
            profileImg: ""
          }
          setUserData(emptyProfileData)
          console.log("isCreate");
        }
      }
      innerCall();
    }
    outerCall();
  }, [props.isNotCreate === true])

  return (
    <div className="font-[DMSerifText]">
      <Modal show={props.open} onClose={() => props.close(false)}>
        {
          props.isNotCreate ? <p className="font-[DMSerifText] text-[30px] px-[24px] pt-[15px]">Edit Profile</p> : <p className="font-[DMSerifText] text-[30px] px-[24px] pt-[15px]">Create Profile</p>
        }
        { (userData) ?
          <Modal.Body className="font-[DMSerifText] text-[30px] pt-0">
            <div>
              <div className="grid grid-cols-3">
                <div className="flex flex-col col-span-2 justify-end">
                  <p className="mb-[10px]">Full Name</p>
                  <input defaultValue={userData.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} className="mr-[18px] mb-[10px] rounded-[10px]" type="text" />
                </div>
                <div className="col-span-1">
                  <DropZoneComponent setProfileImg={setProfileImg} />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="mb-[10px]">What city do you live in?</p>
                <input defaultValue={userData.locationed} value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="rounded-[10px] mb-[10px]" />
              </div>
              <div className="flex flex-col">
                <p className="mb-[10px]">Education</p>
                <input defaultValue={userData.occupation} value={education} onChange={(e) => setEducation(e.target.value)} type="text" className="rounded-[10px] mb-[10px]" />
              </div>
              <div className="flex flex-col">
                <p className="mb-[10px]">Years of Experience</p>
                <input defaultValue={userData.experienceLevel} value={YoE} onChange={(e) => setYoE(e.target.value)} type="text" className="rounded-[10px] mb-[10px]" />
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