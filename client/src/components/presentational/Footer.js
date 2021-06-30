import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Container >
            <Row className = "my-5" >
                <Col md = {6} >
                    <h3>Pages</h3>
                    <ListGroup>
                        <ListGroupItem className = "my-2">
                            <Link to = "/" className = "nav-collapse-link" >Home</Link>
                        </ListGroupItem>
                        <ListGroupItem className = "my-2">
                            <Link to = "/portfolio" className = "nav-collapse-link" >Portfolio</Link>
                        </ListGroupItem>
                        <ListGroupItem className = "my-2">
                            <Link to = "/contact" className = "nav-collapse-link" >Contact</Link>
                        </ListGroupItem>
                        <ListGroupItem className = "my-2">
                            <Link to = "/about" className = "nav-collapse-link" >About</Link>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md = {6} >
                    <h3>Training</h3>
                    <p>
                        We offer training services to people living in Kaduna state. Our training is practical and we make an effort into making sure our students acquire world class make-up skills. Students are free to be creatively explorative in their ideas and try-outs. Visit our contact page to learn how to contact us.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
