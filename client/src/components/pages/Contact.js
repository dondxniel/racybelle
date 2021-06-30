import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaPhone } from 'react-icons/fa';

const Contact = () => {
    return (
        <Container>
            <Row className="text-center justify-content-center">
                <p>You can contact us through the following medium.</p>
            </Row>
            <Row className = "justify-content-center">
                <Col md = {6}>
                    <div className="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                        <span className="text-default text-large display-7"><FaPhone /></span>
                        <span className="px-2 ">+234 80 234 2345 645</span>
                    </div>
                    <div className="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                        <span className="text-success text-large display-7"><FaWhatsapp /></span>
                        <span className="px-2 ">+234 80 234 2345 645</span>
                    </div>
                    <div className="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                        <span className="text-danger text-large display-7"><FaInstagram /></span>
                        <span className="px-2 ">@racybelle_makeover</span>
                    </div>
                    <div className="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                        <span className="text-primary text-large display-7"><FaFacebook /></span>
                        <span className="px-2 ">facebook.com/Racybelle</span>
                    </div>
                    <div className="shadow-none p-3 mb-5 bg-light border border-default border-50 ">
                        <span className="text-primary text-large display-7"><FaTwitter /></span>
                        <span className="px-2 ">@racybelle_makeover</span>
                    </div>
                </Col>
            </Row>
            <Row className="text-center justify-content-center">
                <p>Please click the "Book Appointment" button above if you want to book an appointment.</p>
            </Row>
        </Container>
    )
}

export default Contact
