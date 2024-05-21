'use client'

import React, { useEffect, useState } from "react"
import { Button } from "flowbite-react"
import { useRouter } from "next/navigation";
import { getAppointments, getAppointmentsById, getHardProfileItemByUserId } from "@/utils/Dataservices";

export function PendingNotificationComponent(props: { open: boolean, close: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [name, setName] = useState<string>('John Fartgroom');
    const [experience, setExperience] = useState<string>('Beginner');
    const [partneredAppointment, setPartneredAppointment] = useState<any | null>(null);
    const [fullname, setfullname] = useState<string>();


    const [apps, setApps] = useState<any>();
    const router = useRouter();

    const handleClose = () => {
        props.close(false);
    }

    const handleSubmit = () => {
        props.close(false);
        router.push(`/MessagingPage`);
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            const savedId = sessionStorage.getItem('userId');
            if (savedId) {
                try {
                    const appData = await getAppointments(Number(savedId));
                    console.log(appData)
                    const partneredApp = appData.find((app: { isPartnered: any; }) => app.isPartnered);
                    console.log(partneredApp);
                    if (partneredApp) {
                        setPartneredAppointment(partneredApp);
                        const partner = await getHardProfileItemByUserId(partneredApp?.partnerID);
                        setfullname(partner?.fullName);
                    }
                } catch (error) {
                    console.error("Failed to fetch appointments", error);
                }
            }

        };

        fetchAppointments();
    }, []);

    return (
        <>
            {props.open && partneredAppointment && (
                <div className={`sm:absolute sm:right-12`}>
                    <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                        <p>You've been paired with {fullname} on {partneredAppointment.selectedDate} {partneredAppointment.timezone} </p>
                    </div>
                </div>
            )}
            {props.open && !partneredAppointment && (
                <div className={`sm:absolute sm:right-12`}>
                    <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                
                    </div>
                </div>
            )}
        </>
    );
}