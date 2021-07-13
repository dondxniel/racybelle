import {useState} from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({children, image}) => {
    const Image = styled.div`
        border: none;
        background-image: url('https://drive.google.com/uc?id=${image}&export=download);
        background-size: cover;
        background-position: center;
        height: 250px;
        width: 100%;
        border-radius: 5px
    `;
    
    const [ modalShow, setModalShow ] = useState(false);
    
    const handleShow = () => setModalShow(true);

    const handleHide = () => setModalShow(false);

    return (
        <div>
            
            <Image className = "d-flex align-items-end flex-column image my-2">
                <div className="clickable-part" onClick={handleShow}>
                    <div className = "text-light p-3">
                        <p className="small text-light text-end">Click to view.</p>
                    </div>

                </div>
                <div className = "mt-auto text-light p-3">
                    {children}
                </div>
            </Image>

            <Modal
                show = {modalShow}
                onHide = {handleHide}
                centered = {true}
            >
                <img src={`https://drive.google.com/uc?id=${image}&export=download`} alt="" />
                <div className="close-container text-center">
                    <button className = "image-close-button text-light" onClick = {handleHide} ><FaTimes /></button>
                </div>
            </Modal>
        </div>
    )
}

export default ImageModal
