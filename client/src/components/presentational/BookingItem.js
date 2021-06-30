import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';

const BookingItem = ({details}) => {
    const [ modalShow, setModalShow ] = useState(false);
    
    const handleShow = () => setModalShow(true);

    const handleHide = () => setModalShow(false);

    return (
        <>
            <div className="cursor-pointer shadow-none p-3 mb-5 bg-light border border-default border-50 " onClick = {handleShow}>
                <span className="text-success text-large display-7"><FaBook /></span>
                <span className="px-2 ">{details.name}</span>
            </div>
            <Modal
                size = "lg"
                show = {modalShow}
                onHide = {handleHide}
                centered
                scrollable
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Booking Details.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable>
                <div className="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                    <span className="text-success text-large display-7">Full name: </span>
                    <span className="px-2 ">{details.name}</span>
                </div>
                <div class="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                    <span className="text-success text-large display-7">Email Address: </span>
                    <span className="px-2 ">{details.email}</span>
                </div>
                <div class="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                    <span className="text-success text-large display-7">Phone Number: </span>
                    <span className="px-2 ">{details.phoneNumber}</span>
                </div>
                <div class="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                    <span className="text-success text-large display-7">Appointment Date: </span>
                    <span className="px-2 ">{details.appointmentDate}</span>
                </div>
                <div class="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                    <span className="text-success text-large display-7">Appointment Time: </span>
                    <span className="px-2 ">{details.appointmentTime}</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookingItem
