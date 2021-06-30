import { Container, Row } from 'react-bootstrap';
import BookingItem from './BookingItem';
import Loading from './Loading';

const ViewBookingsTab = ({ children, fetching, fetchingError, bookings }) => {
    
    return (
        <Container className = "my-4">
            {
            fetching?
                <Row className = "my-4">
                    <Loading variant = "large" />
                </Row>
            :
                <Row>
                    {
                    (fetchingError === '')?
                        bookings.map(booking => <BookingItem key = {booking._id} details = {booking} />)
                    :
                        <Row>
                            <p className = 'text-center text-danger my-5'>{fetchingError}</p>
                        </Row>
                    }
                    <div className="pagination text-center justify-content-center">
                        {children}
                    </div>
                </Row>
            }
        </Container>
    )
}

export default ViewBookingsTab
