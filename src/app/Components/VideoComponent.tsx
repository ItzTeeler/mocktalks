'use client'
import React, { useEffect } from 'react';
import {
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
const callId = 'q5m5UaWBUayk';

const VideoCallComponent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
 
  const router = useRouter();

  const handleLeaveCall = () => {
    router.push('/MessagingPage'); 
  };
  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarComponent />
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls onLeave={handleLeaveCall}/>
      </StreamTheme>
    </div>
  );
};

const App = (props: {name: string}) => {
  const client = new StreamVideoClient({ apiKey, user: { id: userId, name: props.name, image: '' }, token });
  const call = client.call('default', callId);

  useEffect(() => {
    call.join({ create: true });

    
  }, []);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoCallComponent/>
      </StreamCall>
    </StreamVideo>
  );
};

export default App;

