import { useState, useEffect } from 'react';
import { FaAngleLeft,FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import { Container, Row, Tabs, Tab, Pagination } from 'react-bootstrap';
import AddPhotoTab from '../presentational/AddPhotoTab';
import ViewBookingsTab from '../presentational/ViewBookingsTab';
import { useCookies } from 'react-cookie';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const history = useHistory();
    const userLoggedIn = useSelector(state => state.userLoggedIn);
    
    const [ cookies ] = useCookies(['userToken'])

    const [ key, setKey ] = useState('addPhoto');
    
    // AddPhotoTab states
    const [ error, setError ] = useState('');
    const [ file, setFile ] = useState({});
    const [ imageSelected, setImageSelected ] = useState(false);
    const [ preview, setPreview ] = useState('default.png');
    const [ imageUploaded, setImageUploaded ] = useState(false);
    const [ savingImage, setSavingImage ] = useState(false);

    // ViewBookingsTab states
    const [ page, setPage ] = useState(0);
    const [ amountToFetch ] = useState(15);
    const [ fetching, setFetching ] = useState(false);
    const [ fetchingError, setFetchingError ] = useState("");
    const [ bookings, setBookings ] = useState([]);
    
    // ===================AddPhotoTab functions========================
    // function that runs after image selection 
    const handleSelectImage = e => {
        setImageSelected(true);

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/add-photo-to-temp`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `${cookies['userToken']}`
            }
        })
        .then(res => {
            setImageSelected(false);
            if(res.data.success){
                setPreview(res.data.data.fileName);
                setFile(res.data.data.fileName);
                console.log(res.data.data.dest)
            }else{
                setError(res.data.message);
            }
        })
        .catch(err => setError(`Error caught on the client: ${err}`))
    }
    // Function that runs after form has been submitted
    const handleSubmit = e => {
        e.preventDefault();
        setSavingImage(true)
        
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_HOST}/api/add-photo`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${cookies['userToken']}`
            },
            data: {
                url : file
            }
        })
        .then(res => {
            if(res.data.success){
                setImageUploaded(true);
            }else{
                setError(`${res.data.message}`);
            }
        })
        .catch(err => setError(`Error caught on the client: ${err}`))
        
    }
    
    // ================ViewBookingsTab functions====================
    // function to handle pagination
    const handlePaginate = n => {
        if(n>0){
            console.log(page)
            setPage(page+1)
        }else if(n<0){
            setPage(page-1)
        }else{
            setFetchingError('Unknown page value.')
        }
    }
    // funtion to handle fetching of bookings
    const fetchBookings = (pageNum, amountToFetch) => {
        setFetching(true);

        axios({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_HOST}/api/fetch-bookings/${pageNum}/${amountToFetch}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${cookies['userToken']}`
            }
        })
        .then(res => {
            setFetching(false);
            if(res.data.success && (res.data.data.length > 0)){
                setBookings(res.data.data);
                setFetchingError('');
            }else{
                setFetchingError((res.data.data.length <= 0) ? `End of the list.` :res.data.message);
            }
        })
        .catch(err => {
            setFetching(false);
            setFetchingError(`Error caught on the client: ${err}`)
        })
    }
    
    // ================UseEffect===========================
    useEffect(()=>{
        if(!userLoggedIn){
            history.push("/");
        }
        fetchBookings(page, amountToFetch);
    }, [page, amountToFetch, userLoggedIn])
    
    return (
        <Container>
            <Row>
                <Tabs
                    id = "controlled-tab-example"
                    activeKey = {key}
                    onSelect = {(k) => setKey(k)}
                >
                    <Tab eventKey = "addPhoto" title = "Add photo to portfolio.">
                        <AddPhotoTab
                            error = {error}
                            imageSelected = {imageSelected}
                            preview = {preview}
                            handleSelectImage = {handleSelectImage}
                            handleSubmit = {handleSubmit}
                            imageUploaded = {imageUploaded}
                            savingImage = {savingImage}
                        />
                    </Tab>
                    <Tab eventKey = "viewBookings" title = "View Bookings.">
                        <ViewBookingsTab
                            fetching = {fetching}
                            fetchingError = {fetchingError}
                            bookings = {bookings}
                        >
                            <Pagination>
                                <Pagination.Item disabled = {page===0 ? true:false} activeLabel = '' onClick = {() => handlePaginate(-1)} >
                                    <FaAngleLeft   />
                                </Pagination.Item>
                                <Pagination.Item disabled > ... </Pagination.Item>
                                <Pagination.Item activeLabel = '' onClick = {() => handlePaginate(1)} >
                                    <FaAngleRight  />
                                </Pagination.Item>
                            </Pagination>
                        </ViewBookingsTab>
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    )
}
export default Dashboard
