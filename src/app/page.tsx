import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="loginBgImage">
      <div className="grid grid-flow-row justify-center pt-36">
        <div className="bg-white max-w-[31.625rem] rounded-lg">
          <div className="pt-[20px] px-[43px] pb-[50px] text-center">
            <p className="text-[48px] font-[DMSerifText]">MockTalks</p>
            <p className="text-[20px] font-[Source-Sans-Pro]">Empower Your Success, One Mock Interview at a Time with MockTalks!</p>
          </div>
          <div>
            <p>Username</p>
            <input/>
            <p>Password</p>
            <input/>
          </div>
        </div>
      </div>
    </div>
  );
}
