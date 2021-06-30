import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import { FaTrash } from 'react-icons/fa';

const DeleteModal = ({children}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className = "image-options mx-2 text-danger" onClick = {handleShow}>
                <FaTrash />
            </button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    Are you sure you want to delete this photo from your portfolio?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No, cancel.
                    </Button>
                    <span onClick = {handleClose}>
                        {children}
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal
