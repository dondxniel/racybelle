import {useState} from 'react';
import { Modal, Nav, Button, Form } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Loading from './Loading';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../store/actions';

const LoginForm = () => {

    const dispatch = useDispatch();

    const [ cookies, setCookie ] = useCookies(['userToken'])
    
    const [ modalShow, setModalShow ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    
    const handleShow = () => setModalShow(true);

    const handleHide = () => setModalShow(false);

    const handleClickLink = e => {
        e.preventDefault();
        handleShow()
    }

    const clearState = () => {
        setEmail("");
        setPassword("");
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        if(email !== "" && password !== ""){
            
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_BACKEND_HOST}/auth/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    password: password
                }
            })
            .then(res => {
                setLoading(false);
                clearState()
                if(res.data.success){
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate()+1);//Expires in one day
                    setCookie('userToken', `Bearer ${res.data.data.token}`, {path: '/', expires: tomorrow})
                    dispatch(setLoggedIn());
                }else{
                    setErrorMessage(res.data.message);
                }
            })
            .catch(err => {
                setLoading(false);
                clearState();
                setErrorMessage(`Error caught on the client: ${err}`)
            })
            
        }else{
            setLoading(false);
            setErrorMessage("Finish filling the form before submitting.")
        }
        
    }

    return(
        <div>
            <Nav.Link href = "/" onClick = {handleClickLink} className = "nav-collapse-link text-default">Login</Nav.Link>

            <Modal
                show = {modalShow}
                onHide = {handleHide}
                centered
                >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                    <Button variant = "danger" onClick={handleHide}> <FaTimes /> </Button>
                </Modal.Header>
                <Modal.Body className = "px-5">
                    {
                        (errorMessage !== "")&&
                        <p className = "text-center p-4 text-danger">{errorMessage}</p>
                    }
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className = "my-4" controlId="email">
                            <Form.Label><b>Email.</b></Form.Label>
                            <Form.Control onChange = {e => setEmail(e.target.value)} type="email" placeholder="Enter email address." className = "custom-form-control" value = {email} />
                        </Form.Group>
                        <Form.Group className = "my-4" controlId="phoneNumber">
                            <Form.Label><b>Password.</b></Form.Label>
                            <Form.Control onChange = {e => setPassword(e.target.value)} type="password" placeholder="Enter login password." className = "custom-form-control" value = {password} />
                        </Form.Group>
                        <Form.Group className = 'my-3 justify-content-center text-center'>
                            <button className = "custom-button-primary text-light p-3" disabled = {loading?true:false}>
                                {
                                    loading?
                                        <Loading variant = "small"/>
                                    :   
                                        "Login"
                                }
                            </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoginForm;
