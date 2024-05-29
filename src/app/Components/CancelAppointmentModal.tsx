'use client'

import React, { useEffect, useState } from "react"
import { Modal, Button } from "flowbite-react"
import { IAppointments, ICancelAppointmentProps } from "@/Interfaces/Interfaces"
import { deleteAppointments, getAppointments, getAppointmentsById, updateAppointments } from "@/utils/Dataservices";


export function CancelAppointmentModal(props: { id: number, submitBool: () => void }) {
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleCancel = async () => {
        let deleteAppointment: IAppointments = await getAppointmentsById(props.id);

        if (deleteAppointment.partnerID != 0) {/* If partner */}
        {
            let otherAppointment: IAppointments[] = await getAppointments(deleteAppointment.partnerID);

            if (otherAppointment.length != 0) {
                let filteredData: IAppointments[] = otherAppointment.filter((meeting: IAppointments) => 
                    meeting.selectedDate === deleteAppointment.selectedDate &&
                    meeting.timezone === deleteAppointment.timezone &&
                    meeting.interviewPractice === deleteAppointment.interviewPractice &&
                    meeting.typePractice === deleteAppointment.typePractice &&
                    meeting.isPartnered === true &&
                    meeting.isDeleted === false &&
                    meeting.userID === deleteAppointment.partnerID
                );

                filteredData[0].partnerID = 0;
                filteredData[0].isPartnered = false;

                await updateAppointments(filteredData[0]);
            }          
        }

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