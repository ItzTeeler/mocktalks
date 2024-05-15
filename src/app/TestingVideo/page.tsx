'use client'
import React, { useEffect, useState } from 'react'
import App from '../Components/VideoComponent';
import { IProfileData } from '@/Interfaces/Interfaces';
import { getProfileItemByUserId } from '@/utils/Dataservices';

const TestingVideo = () => {
    const [user, setUser] = useState<string>();
    const userId = sessionStorage.getItem('userName');
if (userId) {
    setUser(userId)
}
    return (
        <div>
            <App name={String(user)} />
        </div>
    )
}

export default TestingVideo;
