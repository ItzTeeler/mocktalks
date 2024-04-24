'use client'

import React, { useState } from "react"
import { Modal, Button } from "flowbite-react"
import { ICancelAppointmentProps } from "@/Interfaces/Interfaces"

export function CancelAppointmentModal(props: ICancelAppointmentProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button className='bg-[#D9D9D9] w-48' onClick={() => setOpenModal(true)}><span className='text-black text-4xl font-[Source-Sans-Pro]'>Cancel</span></Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>CANCEL SESSION</Modal.Header>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}