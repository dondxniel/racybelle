import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import Loading from './Loading';

const AddPhotoTab = ({ error, handleSelectImage, handleSubmit, imageUploaded, savingImage }) => {

    return (
        <Container className = "my-4">
            {
            imageUploaded?
            <Row className = "text-success text-center">
                <h1 className = "display-1"><FaCheckCircle /></h1>
                <p>Image uploaded successfully.</p>
            </Row>
            :
            <Row>
                <Col>
                    {(error !== '') && <Card className = "py-3 text-danger text-center">{error}</Card>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className = 'my-3 justify-content-center text-center'>
                            <Form.Label>
                                <b>Select Photo.</b>
                            </Form.Label>
                            <Form.File 
                                data-browse = "Select photo." 
                                onChange = {handleSelectImage}
                            />
                            
                        </Form.Group>
                        <Form.Group className = 'my-3 justify-content-center text-center'>
                            <button type = "submit" className = "custom-button-primary text-light p-3" disabled = {savingImage?true:false}>
                                {savingImage?
                                        <Loading variant = "small" />
                                    :
                                        "Add"
                                }
                            </button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            }
        </Container>
    )
}

export default AddPhotoTab
