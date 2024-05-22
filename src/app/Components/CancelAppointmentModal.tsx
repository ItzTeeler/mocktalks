'use client'

import React, { useEffect, useState } from "react"
import { Modal, Button } from "flowbite-react"
import { IAppointments, ICancelAppointmentProps } from "@/Interfaces/Interfaces"
import { deleteAppointments, getAppointments, getAppointmentsById, updateAppointments } from "@/utils/Dataservices";



export function CancelAppointmentModal(props: { id: Number, submitBool: () => void }) {
    const [openModal, setOpenModal] = useState(false);
    const [appointments, setAppointments] = useState<IAppointments>();
    const [appById, setAppById] = useState<any>();
    const [userIdSession, setUserIdSession] = useState<string>();

    useEffect(() => {
        const getData = async () => {
            const userId = sessionStorage.getItem('userId');
            setUserIdSession(String(userId));
            const appointments = await getAppointments(Number(userId))
            const appointmentById = await getAppointmentsById(Number(props.id))
            setAppById(appointmentById);
        }

        getData();
    }, [])

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleCancel = async () => {
        let deleteAppointment: IAppointments = await getAppointmentsById(Number(props.id));
        deleteAppointment.isPartnered = false;
        deleteAppointment.partnerID = 0;
        await deleteAppointments(deleteAppointment);
        props.submitBool();
        handleClose();
    }

    return (
        <>
            <div className="block min-[1440px]:hidden">
                <Button className='bg-[#D9D9D9] rounded-full h-6 w-full' onClick={() => setOpenModal(true)}><span className="text-black 4xl font-[Source-Sans-Pro]">Cancel</span></Button>
            </div>
            <div className="hidden min-[1440px]:block">
                <Button className='bg-[#D9D9D9]' onClick={() => setOpenModal(true)}><span className='text-black text-4xl font-[Source-Sans-Pro]'>Cancel</span></Button>
            </div>

            <Modal size={'3xl'} show={openModal} onClose={() => setOpenModal(false)}>
                <div className="text-center text-[36px] sm:text-[60px] font-[DMSerifText] mb-12">
                    <p>CANCEL SESSION</p>
                </div>
                <div className="text-center text-[20px] sm:text-[36px] font-[Source-Sans-Pro] mb-12">
                    <p>Are you sure you want to cancel?</p>
                </div>
                <div className="flex justify-between pb-[15px] px-[12px] sm:px-[56px] pt-[10px]">
                    <Button onClick={handleClose} className="bg-[#D9D9D9] border rounded-[10px] px-[18px] py-[6px] w-24 min-[1440px]:w-32 h-10 min-[1440px]:h-16"><span className="text-[24px] min-[1440px]:text-[30px] font-[DMSerifText] text-black">No</span></Button>
                    <Button onClick={handleCancel} className="bg-[#2B170C] rounded-[10px] px-[35px] py-[6px] w-24 min-[1440px]:w-32 h-10 min-[1440px]:h-16"><span className="text-[24px] min-[1440px]:text-[30px] font-[DMSerifText] text-white">Yes</span></Button>
                </div>
            </Modal>
        </>
    );
}