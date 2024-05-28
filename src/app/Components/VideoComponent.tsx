'use client'
import React, { useEffect, useState } from 'react';
import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import NavbarComponent from '../Components/NavbarComponent';
import { useRouter } from 'next/navigation';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiU2hhYWtfVGkiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NoYWFrX1RpIiwiaWF0IjoxNzE2NTY4OTQyLCJleHAiOjE3MTcxNzM3NDd9.igx2FhRc52m84TJCI9qn45SJfLeRp036a29WfVAChtA';
const userId = 'Shaak_Ti';
// const callId = 'test';

const VideoCallComponent = (props: { call: Call }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const router = useRouter();

  const handleLeaveCall = async () => {
    router.push('/MessagingPage');
  };

  if (callingState !== CallingState.JOINED) {
    return <div className='text-center text-white pt-20 text-3xl font-[DMSerifText]'>Loading...</div>;
  }

  return (
    <div>
      <NavbarComponent />
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls onLeave={handleLeaveCall} />
      </StreamTheme>
    </div>
  );
};

const App = (props: { name: string }) => {
  const [clientState, setClientState] = useState<StreamVideoClient>();
  const [callState, setCallState] = useState<Call>();

  const joinCall = async () => {
    const client = new StreamVideoClient({ apiKey, user: { id: userId, name: props.name, image: '' }, token });
    setClientState(client);

    const room = sessionStorage.getItem("chatRoomName");
    if (room !== null) {
      const call = client.call('default', room);
      setCallState(call);

      await call.camera.disable();
      await call.microphone.disable();
      call.join({ create: true });
    }
  }

  useEffect(() => {
    joinCall()

  }, []);

  return (
    <div>
      {
        clientState && callState &&
        <StreamVideo client={clientState}>
          <StreamCall call={callState}>
            <VideoCallComponent call={callState} />
          </StreamCall>
        </StreamVideo>
      }
    </div>
  );
};

export default App;

