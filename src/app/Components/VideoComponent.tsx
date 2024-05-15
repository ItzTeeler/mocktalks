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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGFydGhfTmloaWx1cyIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvRGFydGhfTmloaWx1cyIsImlhdCI6MTcxNTcyNDcyMSwiZXhwIjoxNzE2MzI5NTI2fQ.06W0ybNhjH1oTLobNeMXKhKbJ60WUNYG4VyexRcJK9E';
const userId = 'Darth_Nihilus';
const callId = 'ChJ21rgaDUfE';

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

    // Clean up logic when component unmounts
    return () => {
      // Leave the call or perform other cleanup actions here
      // For example:
      // call.leave();
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoCallComponent/>
      </StreamCall>
    </StreamVideo>
  );
};

export default App;

