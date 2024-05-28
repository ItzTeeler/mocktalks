'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import backArrow from '../Assets/BackArrow.png'
import { changePassword, createAccount, getUserData, loggedInData, login } from "@/utils/Dataservices";
import { IToken } from "@/Interfaces/Interfaces";
import { useRouter } from "next/navigation";
import AccountCreateComponent from "./Components/AccountCreateComponent";


export default function LoginPage() {
  const [registerBool, setRegisterBool] = useState<boolean>(true);
  const [color, setColor] = useState<string>('text-[#1973E7]');
  const [forgotBool, setForgotBool] = useState<boolean>(false);
  const [alertBool, setAlertBool] = useState<string>("hidden");
  const [alertText, setAlertText] = useState<string>("");

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('reloaded') !== 'true') {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);
  const handleRegister = () => {
    setRegisterBool(!registerBool);
    setForgotBool(false);
  }
  const handleForgotPassword = () => {
    setForgotBool(!forgotBool)
  }
  const handleSubmit = async () => {
    setIsDisabled(true);

    let userData = {
      username: username,
      password: password
    };

    if (userData.password === "" || userData.username === "") {
      setAlertText("Username or Password is Empty")
      setAlertBool("block");
      setTimeout(() => {
        setAlertBool("hidden");
      }, 4000);
      setIsDisabled(false);
    } else {
      if (registerBool) {
        // Logic for Sign In
        if (forgotBool) {
          // If forgot password, change password
          try {
            await changePassword(username, password);
            setAlertText("Password changed successfully!")
            setAlertBool("block");
            setTimeout(() => {
              setAlertBool("hidden");
            }, 4000);
            setIsDisabled(false);
          } catch (error) {
            setAlertText("Failed to change password. Please try again.")
            setAlertBool("block");
            setTimeout(() => {
              setAlertBool("hidden");
            }, 4000);
            setIsDisabled(false);
          }
        } else {
          // Normal login
          setAlertText("Logging In")
          setAlertBool("block");
          setTimeout(() => {
            setAlertBool("hidden");
          }, 4000);

          try {
            let token: IToken = await login(userData);
            if (token.token != null) {
              sessionStorage.setItem("Token", token.token);
              await getUserData(username);
              let userId = loggedInData()
              sessionStorage.setItem("userId", String(userId?.id))
              router.push('/Profile');
            } else {
              setAlertText("Login Failed")
              setAlertBool("block");
              setTimeout(() => {
                setAlertBool("hidden");
              }, 4000);
              setIsDisabled(false);
            }
          } catch (e) {
            setAlertText("Login Failed - Username or Password is Incorrect")
            setAlertBool("block");
            setTimeout(() => {
              setAlertBool("hidden");
            }, 4000);
            setIsDisabled(false);
          }
        }
      } else {
        // Logic for Create Account
        setAlertText("Creating Account, Please Wait")
        setAlertBool("block");
        setTimeout(() => {
          setAlertBool("hidden");
        }, 4000);

        try {
          const verifyBool = await createAccount(userData);
          if (verifyBool) {
            setAlertText("Account Created")
            setAlertBool("block");
            setTimeout(() => {
              setAlertBool("hidden");
            }, 4000);
            setIsDisabled(false);

            setUsername("");
            setPassword("");
            setRegisterBool(true);
            setForgotBool(false);
          } else {
            setAlertText("Account Creation Failed - Username Taken")
            setAlertBool("block");
            setTimeout(() => {
              setAlertBool("hidden");
            }, 4000);
            setIsDisabled(false);
          }

        } catch {
          setAlertText("Account Creation Failed")
          setAlertBool("block");
          setTimeout(() => {
            setAlertBool("hidden");
          }, 4000);
          setIsDisabled(false);
        }
      }
    }
  };

  useEffect(() => {
    if (registerBool) {
      setColor('text-[#1973E7]');
    } else if (!registerBool) {
      setColor('text-[#FF0000]');
    }
  }, [registerBool]);


  return (
    <div className="loginBgImage">
      <AccountCreateComponent show={alertBool} text={alertText} />
      <div className="grid grid-flow-row justify-center pt-20 pl-[8px] pr-[8px] pb-20">
        <div className="bg-white max-w-[31.625rem] rounded-[20px] px-[36px] md:px-[44px]">

          <div className="pt-[20px] mb-[11px] md:mb-[50px] text-center">
            {registerBool ? "" : <div className="flex justify-end"><Image src={backArrow} alt="Go Back" onClick={handleRegister} /></div>}
            {forgotBool ? <div className="flex justify-end"><Image src={backArrow} alt="Go Back" onClick={handleForgotPassword} /></div> : ""}
            <p className="text-[48px] font-[DMSerifText]">MockTalks</p>
            <p className="text-[20px] font-[Source-Sans-Pro]">Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
          </div>
          <div className="">
            <p className="text-[20px] font-[DMSerifText] mb-[2px] md:mb-[10px]">Username</p>
            <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} className="h-[29px] md:h-[39px] mb-[17px] md:mb-[20px] w-full border-[1px] border-black rounded-[10px] text-[18px] font-[Source-Sans-Pro] pl-[16px]" placeholder="Enter Username" required />
            <p className="text-[20px] font-[DMSerifText] mb-[2px] md:mb-[10px]">Password</p>
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="h-[29px] md:h-[39px] mb-[17px] md:mb-[20px] w-full border-[1px] border-black rounded-[10px] text-[18px] font-[Source-Sans-Pro] pl-[16px]" placeholder="Enter Password" required />
          </div>
          <div>
            {registerBool ? <p onClick={handleForgotPassword} className={`cursor-pointer ${color} text-[20px] mb-[19px] md:mb-[30px] font-[DMSerifText] ${forgotBool ? 'w-48' : 'w-40'}`}>{!forgotBool ? "Forgot Password?" : "Go Back To Login"}</p> : <p className={` text-[20px] mb-[19px] md:mb-[30px] font-[DMSerifText]`}>Please choose a strong password.</p>}
          </div>
          <button disabled={isDisabled} onClick={handleSubmit} className="text-[20px] font-[DMSerifText] bg-[#2B170C] text-white max-w-[419px] w-full text-center rounded-[10px]">{forgotBool ? "Change Password" : (registerBool ? "Login" : "Create Account")}</button>
          <div className="mt-[24px] md:mt-[30px] mb-[75px]">
            <p className="font-[DMSerifText] text-[20px]">{forgotBool ? "" : (registerBool ? "Not a member?" : "Already a member?")} <span className="font-[DMSerifText] text-[20px] text-[#1973E7] cursor-pointer" onClick={handleRegister}>{forgotBool ? "" : (registerBool ? "Register" : "Login")}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}