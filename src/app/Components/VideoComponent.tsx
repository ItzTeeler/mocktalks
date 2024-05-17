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

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGxvX0tvb24iLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1Bsb19Lb29uIiwiaWF0IjoxNzE1ODA2MzE0LCJleHAiOjE3MTY0MTExMTl9.PdirV18FhzoiMQV3eDig3_Nc7Yj-L11KV1SlCl8HVnc';
const userId = 'Plo_Koon';
const callId = 'oUlHwaPJthPb';

const VideoCallComponent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarComponent />
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls />
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

