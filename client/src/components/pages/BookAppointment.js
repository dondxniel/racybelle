import { Container, Row, Col } from 'react-bootstrap';
import BookAppointmentForm from '../presentational/BookAppointmentForm';

const BookAppointment = () => {
    return (
        <Container>
            <Row className = "justify-content-center">
                <Col md = {4}>
                    <h1 className="brand-font-sm text-center">Book Appointment.</h1>
                </Col>
            </Row>
            <Row className = "justify-content-center">
                <Col md = {6}>
                    <BookAppointmentForm />
                </Col>
            </Row>
        </Container>
    )
}

export default BookAppointment
