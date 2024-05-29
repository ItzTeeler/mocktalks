'use client'

import React, { useEffect, useState } from "react"
import { getAppointments, getProfileItemByUserId } from "@/utils/Dataservices";
import { IAppointments, IProfileData } from "@/Interfaces/Interfaces";

export function PendingNotificationComponent(props: { open: boolean, close: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [partneredAppointment, setPartneredAppointment] = useState<IAppointments[]>();
    const [partneredProfile, setPartneredProfile] = useState<string[]>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            let profHolder: string[] = [];

            const savedId = sessionStorage.getItem('userId');
            if (savedId) {
                try {
                    const appData: IAppointments[] = await getAppointments(Number(savedId));

                    const filteredAppData: IAppointments[] = appData.filter(appoint => { return appoint.isPartnered === true })

                    if (filteredAppData.length > 0) {
                        setPartneredAppointment(filteredAppData);

                        filteredAppData.forEach(async (appoint) => {
                            const partnerProf: IProfileData = await getProfileItemByUserId(appoint.partnerID)
                            profHolder.push(partnerProf.fullName);
                        })
                    }
                } catch (error) {
                    console.error("Failed to fetch appointments", error);
                }
            }

            setPartneredProfile(profHolder)
        };

        fetchAppointments();
        setIsLoaded(true);
    }, [props.open === true]);

    return (
        <div className={`${props.open ? "block" : "hidden"} absolute max-sm:w-full max-h-[200px] overflow-auto sm:right-12 z-10`}>
            {
                isLoaded ?
                    <div>
                        {
                            partneredAppointment ?
                                partneredProfile ?
                                    partneredAppointment.map((appointment, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                                                    <p>You&apos;ve been paired with {partneredProfile[index]} on {appointment.selectedDate}, at {appointment.timezone} </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                                            <p>Loading...</p>
                                        </div>
                                    </div>
                                :
                                <div>
                                    <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                                        <p>You have no current partnered appointments</p>
                                    </div>
                                </div>
                        }
                    </div>
                    :
                    <div>
                        <div className="w-full sm:w-[360px] h-[84px] bg-white border-black border-2 px-5 py-2 shadow-xl">
                            <p>Loading...</p>
                        </div>
                    </div>
            }
        </div>
    );
}