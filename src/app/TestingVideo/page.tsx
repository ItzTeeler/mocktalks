'use client'
import React, { useEffect, useState } from 'react'
import App from '../Components/VideoComponent';
import { IProfileData } from '@/Interfaces/Interfaces';
import { getProfileItemByUserId } from '@/utils/Dataservices';

const TestingVideo = () => {
    return (
        <div>
            <App name={String(sessionStorage.getItem('userName'))} />
        </div>
    )
}

export default TestingVideo;
