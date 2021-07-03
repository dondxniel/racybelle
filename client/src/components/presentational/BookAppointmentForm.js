import { useState, useEffect, forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import Datepicker from 'react-datepicker';
import { FaCalendar, FaClock } from 'react-icons/fa';
import axios from 'axios';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import subDays from 'date-fns/subDays'
import getHours from 'date-fns/getHours';
import getTime from 'date-fns/getTime';
import Loading from './Loading';
import { useCookies } from 'react-cookie';

const BookAppointmentForm = () => {
    const [ cookies ] = useCookies(['userToken'])
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    
    // const [ dateRestrictions, setDateRestrictions ] = useState([]);
    const [ timeRestrictions, setTimeRestrictions ] = useState([]);
    const [ error, setError ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ submitting, setSubmitting ] = useState(false);


    const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
        <>
            <div className="shadow-none p-3 bg-light border border-default border-50" onClick = {onClick}>
                <span className="text-primary text-lg"><FaCalendar /></span>
                <span className="px-2 ">{value || "Select a date."}</span>
            </div>
        </>
    ));

    const CustomTimeInput = forwardRef(({ value, onClick }, ref) => (
        <>
            <div className="shadow-none p-3 bg-light border border-default border-50" onClick = { onClick }>
                <span className="text-primary text-lg"><FaClock /></span>
                <span className="px-2 ">{value || "Select the time you will be coming."}</span>
            </div>
        </>
    ));
    

    const fetchDateRestrictions = () => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_BACKEND_HOST}/api/fetch-booked-dates`,
            headers : {
                "content-type": "application/json",
            }
        })
        .then(({data}) => {
            if(data.success){
                // let dates = data.data.map(date => (new Date(date.appointmentDate).getTime()))
                let times = data.data.map(date => {
                    let [h, min] = date.appointmentTime.split(":");
                    h = parseInt(h); min = parseInt(min);
                    return getTime(setHours(setMinutes(new Date(date.appointmentDate), min), h));
                })
                // setDateRestrictions(dates);
                setTimeRestrictions(times);
            }else{
                setError(data.message)
            }
        })
        .catch(err => {
            setError(`Sorry, you are unable to make bookings as we have encountered a server error. ${err}`);
        })
    }

    const resetForm = () =>{
        setName('');
        setEmail('');
        setPhoneNumber('');
        setDate(null);
        setTime(null);
    }

    // date and time helpers
    // remove the error displaying in console after unfocusing calendar portal
    const handleCalendarOpen = () => {
        document.addEventListener('touchstart', (event) => {
            event.stopPropagation();
        }, true);
    };

    // date filter
    // const dateFilter = (date) => {
    //     const day = getDay(date);
    //     const tempDates = dateRestrictions.map(date => parseInt(date))
    //     return day !== 0 && day !== 6 && !tempDates.includes(getTime(date));
    // };
        
    const timeFilter = (time) => {
        // time filter    

        const selectedHour = parseInt(getHours(time));

        const timeNDate = getTime(setHours(setMinutes(date, 0), selectedHour));

        return !timeRestrictions.includes(timeNDate);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');
        if(name !== "" && email !== "" && phoneNumber !== "" && date !== null && time !== null){
            const finalDate = `${date.getMonth()+1}/${date.getDate('D-M-Y')}/${date.getFullYear()}`;
            const finalTime = `${time.getHours()}:00`;
            
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_BACKEND_HOST}/api/book-appointment`,
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    name: name, 
                    email: email,
                    phoneNumber: phoneNumber,
                    appointmentDate: finalDate,
                    appointmentTime: finalTime
                }
            })
            .then(({data}) => {
                resetForm();
                setSubmitting(false);
                setSuccessMessage(`Your appointment has been successfully booked for ${data.data.appointmentTime} on ${data.data.appointmentDate}.`);
            })
            .catch(err => {
                resetForm();
                setSubmitting(false);
                setError(`An error occured. ${err}.`)
            })
        }else{
            setSubmitting(false);
            setError("Please finish filling the form before submitting")
        }
    }
    
    useEffect(() => {
        fetchDateRestrictions();
    }, [])
    
    return (
        <Form onSubmit = {handleSubmit} >
            <span>
                {(successMessage !== '') && <p className = "m-3 p-3 text-center text-success">{successMessage}</p>}
            </span>
            <span>
                {(error !== '') && <p className = "m-3 p-3 text-center text-danger">{error}</p>}
            </span>
            <Form.Group className = "my-4" controlId="fullName">
                <Form.Label><b>Full Name.</b></Form.Label>
                <Form.Control value = {name} onChange = {e => setName(e.target.value)} type="text" placeholder="Enter full name." className = "custom-form-control" />
            </Form.Group>
            <Form.Group className = "my-4" controlId="email">
                <Form.Label><b>Email.</b></Form.Label>
                <Form.Control value = {email} onChange = {e => setEmail(e.target.value)} type="email" placeholder="Enter email address." className = "custom-form-control"  />
                <small className="text-success">
                    We'll never share your email with anyone.
                </small>
            </Form.Group>
            <Form.Group className = "my-4" controlId="phoneNumber">
                <Form.Label><b>Phone Number.</b></Form.Label>
                <Form.Control value = {phoneNumber} onChange = {e => setPhoneNumber(e.target.value)} type="tel" placeholder="Enter phone number." className = "custom-form-control"  />
                <small className="text-success">
                    Please enter your WhatsApp phone number as we might need to contact you through it at some point.
                </small>
            </Form.Group>
            <Form.Group className = "my-4" controlId="apDate">
                <Form.Label><b>Appointment Date.</b></Form.Label>
                <div className = "datepicker-container">
                    <Datepicker 
                        selected = {date}
                        disabled = {false}
                        onChange = {d => setDate(d)}
                        className = "custom-date-form-control"
                        onCalendarOpen = {handleCalendarOpen}
                        // filterDate={dateFilter}
                        minDate={subDays(new Date(), -1)}
                        customInput = {<CustomDateInput value = {date} onClick = {d => setDate(d)} />}
                        withPortal
                        isClearable = {true}
                    />
                    
                    <small className="text-success">
                        What day will you be coming?
                    </small>
                    {/* <span>{`${date.getMonth()+1}/${date.getDate('D-M-Y')}/${date.getFullYear()}`}</span> */}
                </div>
            </Form.Group>
            <Form.Group className = "my-4" controlId="apTime">
                <Form.Label><b>Appointment Time.</b></Form.Label>
                <div className = "datepicker-container">
                    <Datepicker 
                        selected = {time}
                        disabled = {date ? false : true}
                        onChange = {t => setTime(t)}
                        className = "custom-date-form-control"
                        filterTime = {timeFilter}
                        showTimeSelect
                        showTimeSelectOnly
                        dateFormat = "H:00"
                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 15)}
                        timeIntervals = {60}
                        onCalendarOpen = {handleCalendarOpen}
                        customInput = {<CustomTimeInput value = {time} onClick = {t => setTime(t)} />}
                        withPortal
                        isClearable = {true}
                    />
                    <small className="text-danger">
                        Please select a date before selecting time.
                    </small>
                    
                    {/* <span>{`${date.getMonth()+1}/${date.getDate('D-M-Y')}/${date.getFullYear()}`}</span> */}
                </div>
            </Form.Group>
            <Form.Group className = 'my-3 justify-content-center text-center'>
                <button 
                    className = "custom-button-primary text-light p-3"
                    disabled = {(error !== '') ? true : (submitting?true:false)}
                >
                    {submitting?
                        <Loading variant = "small" />
                    :
                        "Book Appointment"
                    }
                </button>
            </Form.Group>
        </Form>

    )
}

export default BookAppointmentForm
