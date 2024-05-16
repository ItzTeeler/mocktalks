'use client'
import React, { useEffect, useState } from 'react';
import App from '../Components/VideoComponent';

const TestingVideo = () => {
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userName') : null;
    const [user, setUser] = useState<string | null>(userId);
    if (userId && !user) {
        setUser(userId);
    }
    return (
        <div>
            <App name={user || ''} />
        </div>
    );
};

export default TestingVideo;
