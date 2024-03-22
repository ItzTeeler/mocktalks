'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import backArrow from '../Assets/BackArrow.png'

export default function LoginPage() {
  const [registerBool, setRegisterBool] = useState<boolean>(true);
  const [color, setColor] = useState<string>('text-[#1973E7]');
  const [forgotBool, setForgotBool] = useState<boolean>(true);
  const handleRegister = () =>{
    setRegisterBool(!registerBool);
  }
  const handleForgotPassword = () => {
    setForgotBool(!forgotBool)
  }
  
  useEffect(()=>{
    if(registerBool){
      setColor('text-[#1973E7]');
    }else if (!registerBool){
      setColor('text-[#FF0000]');
    }
  },[registerBool])
  const handleBools = () => {
    if(registerBool){

    }
  }
  return (
    <div className="loginBgImage">
      <div className="grid grid-flow-row justify-center pt-20 pl-[8px] pr-[8px]">
        <div className="bg-white max-w-[31.625rem] rounded-[20px] px-[36px] md:px-[44px]">
            
          <div className="pt-[20px] mb-[11px] md:mb-[50px] text-center">
          {registerBool ? "" : <div className="flex justify-end"><Image src={backArrow} alt="hi" onClick={handleRegister}/></div>}
            <p className="text-[48px] font-[DMSerifText]">MockTalks</p>
            <p className="text-[20px] font-[Source-Sans-Pro]">Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
          </div>
          <div className="">
            <p className="text-[20px] font-[DMSerifText] mb-[2px] md:mb-[10px]">Username</p>
            <input className="h-[29px] md:h-[39px] mb-[17px] md:mb-[20px] w-full border-[1px] border-black rounded-[10px] text-[18px] font-[Source-Sans-Pro] pl-[16px]" placeholder="Enter UserID" required/>
            <p className="text-[20px] font-[DMSerifText] mb-[2px] md:mb-[10px]">Password</p>
            <input className="h-[29px] md:h-[39px] mb-[17px] md:mb-[20px] w-full border-[1px] border-black rounded-[10px] text-[18px] font-[Source-Sans-Pro] pl-[16px]" placeholder="Enter Password" required/>
          </div>
          <div className="">
          {registerBool ?  <p onClick={handleForgotPassword} className={`cursor-pointer ${color} text-[20px] mb-[19px] md:mb-[30px] font-[DMSerifText]`}>Forgot Password?</p> :  <p className={`${color} text-[20px] mb-[19px] md:mb-[30px] font-[DMSerifText]`}>Please choose a stronger password. Try a mix of letters, numbers, and symbols.</p>}
          </div>
          <button className="text-[20px] font-[DMSerifText] bg-[#2B170C] text-white max-w-[419px] w-full text-center rounded-[10px]">{forgotBool ? "Change Password" : (registerBool ? "Login" : "Create Account")}</button>
          <div className="mt-[24px] md:mt-[30px] mb-[75px] cursor-pointer">
            <p onClick={handleRegister} className="font-[DMSerifText] text-[20px]">{registerBool ? "Not a member?" : "Already a member!"} <span className="font-[DMSerifText] text-[20px] text-[#1973E7]">{registerBool ? "Register?" : ""}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
