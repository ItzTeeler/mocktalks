'use client'
import React, { useEffect, useState } from 'react';
import {
  Call,
  CallingState,
  CancelCallButton,
  ScreenShareButton,
  SpeakerLayout,
  SpeakingWhileMutedNotification,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import NavbarComponent from '../Components/NavbarComponent';
import { useRouter } from 'next/navigation';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUmFobV9Lb3RhIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9SYWhtX0tvdGEiLCJpYXQiOjE3MTY4ODU3NTMsImV4cCI6MTcxNzQ5MDU1OH0.evnhljogzZbFi5__gvcv36lWFBXx6Qqyo91g2FT8iM4';
const userId = 'Rahm_Kota';

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
        <div className="str-video__call-controls mb-6">
          <ScreenShareButton />
          <SpeakingWhileMutedNotification>
            <ToggleAudioPublishingButton />
          </SpeakingWhileMutedNotification>
          <ToggleVideoPublishingButton />
          <CancelCallButton onLeave={handleLeaveCall} />
        </div>
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

