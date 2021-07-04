import { Nav, Navbar } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { logout } from '../../store/actions'

const NavigationBar = () => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['userToken'])

    const userLoggedIn = useSelector(state => state.userLoggedIn);
    const dispatch = useDispatch();
    
    const handleLogout = e => {
        e.preventDefault()
        removeCookie('userToken');
        dispatch(logout());
    }
    
    return (
        <>
            <Navbar className = "justify-content-center py-3">
                <Navbar.Brand href = "/" className = "text-center brand-font">Racybelle</Navbar.Brand>
            </Navbar>
            <Navbar className = "text-center justify-content-center m-auto py-3" expand = "lg">
                <Navbar.Toggle aria-controls="navbar-links" />
                <Navbar.Collapse className = "text-center justify-content-center m-auto" id = "navbar-links">
                    <Nav.Link href = "/" className = "nav-collapse-link text-default">Home</Nav.Link>
                    <Nav.Link href = "/portfolio" className = "nav-collapse-link text-default">Portfolio</Nav.Link>
                    <Nav.Link href = "/contact" className = "nav-collapse-link text-default">Contact</Nav.Link>
                    <Nav.Link href = "/about" className = "nav-collapse-link text-default">About</Nav.Link>
                    {userLoggedIn && <Nav.Link href = "/dashboard" className = "nav-collapse-link text-default">Dashboard</Nav.Link>}
                    {userLoggedIn?
                        <Nav.Link href = "/" onClick = {handleLogout} className = "nav-collapse-link text-default">Logout</Nav.Link>
                    :
                        <LoginForm />
                    }
                </Navbar.Collapse>
            </Navbar>
            {!userLoggedIn && 
            <Navbar className = "text-center justify-content-center mb-4 py-3" expand = "lg">
                <Nav.Link href = "/book-appointment" className = "navcollapse-link text-default custom-button-primary text-light">Book Appointment</Nav.Link>
            </Navbar>
            }
        </>
    )
}

export default NavigationBar
