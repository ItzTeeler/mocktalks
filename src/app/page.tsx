'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import backArrow from '../Assets/BackArrow.png'
import { changePassword, createAccount, getUserData, loggedInData, login } from "@/utils/Dataservices";
import { IMessages, IToken } from "@/Interfaces/Interfaces";
import { useRouter } from "next/navigation";
import AccountCreateComponent from "./Components/AccountCreateComponent";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import MessageContainer from "./Components/MessageContainer";


export default function LoginPage() {
  const [registerBool, setRegisterBool] = useState<boolean>(true);
  const [color, setColor] = useState<string>('text-[#1973E7]');
  const [forgotBool, setForgotBool] = useState<boolean>(false);
  const [alertBool, setAlertBool] = useState<string>("hidden");
  const [alertText, setAlertText] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let router = useRouter();

  const handleRegister = () => {
    setRegisterBool(!registerBool);
    setForgotBool(false)
  }
  const handleForgotPassword = () => {
    setForgotBool(!forgotBool)
  }
  const handleSubmit = async () => {
    let userData = {
      username: username,
      password: password
    };

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
        } catch (error) {
          setAlertText("Failed to change password. Please try again.")
          setAlertBool("block");
          setTimeout(() => {
            setAlertBool("hidden");
          }, 4000);
        }
      } else {
        // Normal login
        let token: IToken = await login(userData);
        if (token.token != null) {
          sessionStorage.setItem("Token", token.token);
          await getUserData(username);
          let userId = loggedInData()
          sessionStorage.setItem("userId", String(userId?.id))
          setAlertText("Logging In")
          setAlertBool("block");
          setTimeout(() => {
            setAlertBool("hidden");
          }, 2000);
          router.push('/Profile');
        } else {
          setAlertText("Login Failed")
          setAlertBool("block");
          setTimeout(() => {
            setAlertBool("hidden");
          }, 4000);
        }
      }
    } else {
      // Logic for Create Account
      createAccount(userData);
      setAlertText("Account Created")
      setAlertBool("block");
      setTimeout(() => {
        setAlertBool("hidden");
      }, 4000);

    }
  };

  useEffect(() => {
    if (registerBool) {
      setColor('text-[#1973E7]');
    } else if (!registerBool) {
      setColor('text-[#FF0000]');
    }
  }, [registerBool]);



  const [conn, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [message, setMessage] = useState<string>("")
  const [usersname, setUsersname] = useState<string>();
  const [chatroom, setChatroom] = useState<string>();

  const joinChatRoom = async (usersname: string, chatroom: string) => {
    try {
      const conn: HubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5150/chat")
        .configureLogging(LogLevel.Information)
        .build();
      // const conn = new HubConnectionBuilder()
      //   .withUrl("https://mocktalksapihosting.azurewebsites.net/chat")
      //   .configureLogging(LogLevel.Information)
      //   .build();

      conn.on("JoinSpecificChatRoom", (usersname: string, msg: string) => {
        sendMessage(msg);
      })

      conn.on("RecieveSpecificMessage", (usersname: string, msg: string) => {
        setMessages(messages => [...messages, { usersname, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { usersname, chatroom })

      setConnection(conn);
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message: string) => {
    try {
      conn && await conn.invoke("SendMessage", message);
    } catch (e) {
      console.log(e)
    }
  }

  const submitFunc = () => {
    if (usersname !== undefined && chatroom !== undefined) {
      joinChatRoom(usersname, chatroom);
    }
  }

  const submitMessage = () => {
    sendMessage(message);
    setMessage("");
  }








  return (
    <div className="loginBgImage">
      <AccountCreateComponent show={alertBool} text={alertText} />
      <div className="grid grid-flow-row justify-center pt-20 pl-[8px] pr-[8px] pb-20">
        <div className="bg-white max-w-[31.625rem] rounded-[20px] px-[36px] md:px-[44px]">

          <div className="pt-[20px] mb-[11px] md:mb-[50px] text-center">
            {registerBool ? "" : <div className="flex justify-end"><Image src={backArrow} alt="hi" onClick={handleRegister} /></div>}
            {forgotBool ? <div className="flex justify-end"><Image src={backArrow} alt="hi" onClick={handleForgotPassword} /></div> : ""}
            <p className="text-[48px] font-[DMSerifText]">MockTalks</p>
            <p className="text-[20px] font-[Source-Sans-Pro]">Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
          </div>
          <div className="">
            <p className="text-[20px] font-[DMSerifText] mb-[2px] md:mb-[10px]">Username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} className="h-[29px] md:h-[39px] mb-[17px] md:mb-[20px] w-full border-[1px] border-black rounded-[10px] text-[18px] font-[Source-Sans-Pro] pl-[16px]" placeholder="Enter UserID" required />
            <p className="text-[20px] font-[DMSerifText] mb-[2px] md:mb-[10px]">Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="h-[29px] md:h-[39px] mb-[17px] md:mb-[20px] w-full border-[1px] border-black rounded-[10px] text-[18px] font-[Source-Sans-Pro] pl-[16px]" placeholder="Enter Password" required />
          </div>
          <div className="">
            {registerBool ? <p onClick={handleForgotPassword} className={`cursor-pointer ${color} text-[20px] mb-[19px] md:mb-[30px] font-[DMSerifText]`}>{!forgotBool ? "Forgot Password?" : "Enter new password"}</p> : <p className={` text-[20px] mb-[19px] md:mb-[30px] font-[DMSerifText]`}>Please choose a strong password.</p>}
          </div>
          <button onClick={handleSubmit} className="text-[20px] font-[DMSerifText] bg-[#2B170C] text-white max-w-[419px] w-full text-center rounded-[10px]">{forgotBool ? "Change Password" : (registerBool ? "Login" : "Create Account")}</button>
          <div className="mt-[24px] md:mt-[30px] mb-[75px] cursor-pointer">
            <p onClick={handleRegister} className="font-[DMSerifText] text-[20px]">{forgotBool ? "" : (registerBool ? "Not a member?" : "Already a member!")} <span className="font-[DMSerifText] text-[20px] text-[#1973E7]">{forgotBool ? "" : (registerBool ? "Register?" : "Login")}</span></p>
          </div>
        </div>
      </div>

      <div>
        <p>Welcome to chat</p>

        {
          !conn ?
            <div>
              <input className='border-black border-2' type='text' onChange={e => { setUsersname(e.target.value) }} />
              <input className='border-black border-2' type='text' onChange={e => { setChatroom(e.target.value) }} />
              <button className="text-red-500" onClick={() => submitFunc()}>submit</button>
            </div>
            :
            <div className='grid'>
              <p>Chatroom</p>

              <div>
                {
                  messages && messages.map(
                    (msg: { msg: string; usersname: string }, index: number) => {
                      return (
                        <div key={index}>
                          <p>{msg.msg} - {msg.usersname}</p>
                        </div>
                      )
                    }
                  )
                }
              </div>

              {/* <MessageContainer messagePass={messages} /> */}

              <div>
                <input className='border-black border-2' type="text" onChange={e => setMessage(e.target.value)} value={message} placeholder='type a message' />
                <button className=" text-red-500  " onClick={() => submitMessage()} disabled={!message}>submit</button>
              </div>
            </div>
        }
      </div>




    </div>
  );
}