'use client'
import React, { useEffect, useState } from 'react'
import App from '../Components/VideoComponent';
import { IProfileData } from '@/Interfaces/Interfaces';
import { getProfileItemByUserId } from '@/utils/Dataservices';

const TestingVideo = () => {
    const [userProfileInfo, setUserProfileInfo] = useState<IProfileData>();
    useEffect(() => {
        const innerCall = async () => {
            const userId = sessionStorage.getItem('userId');
            setUserProfileInfo(await getProfileItemByUserId(Number(userId)));
        }
        innerCall();
    }, [userProfileInfo]);
    return (
        <div>
            <App name={String(userProfileInfo?.fullName)} />
        </div>
    )
}

export default TestingVideo;
