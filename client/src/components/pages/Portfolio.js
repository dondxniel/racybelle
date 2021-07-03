import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ImageModal from '../presentational/ImageModal';
import Loading from '../presentational/Loading';
import DeleteModal from '../presentational/DeleteModal';
import { useCookies } from 'react-cookie';

const Portfolio = () => {
    const [ cookies ] = useCookies(['userToken'])
   
    const userLoggedIn = useSelector(state => state.userLoggedIn)

    const [ page, setPage ] = useState(0);
    const [ amountToFetch ] = useState(20);
    const [ fetching, setFetching ] = useState(false);
    const [ fetchingError, setFetchingError ] = useState("");
    const [ photos, setPhotos ] = useState([]);

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

    // function to fetch photos
    const fetchPhotos = (pageNum, amountToFetch) => {
        setFetching(true);

        axios({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_HOST}/api/fetch-photos/${pageNum}/${amountToFetch}`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            setFetching(false);
            if(res.data.success && (res.data.data.length > 0)){
                setFetchingError('');
                setPhotos(res.data.data);
            }else{
                setFetchingError((res.data.data.length <= 0) ? `End of the list.` :res.data.message);
            }
        })
        .catch(err => {
            setFetching(false);
            setFetchingError(`Client side error: ${err}`)
        })
    }

    // function to handle delete
    const handleDelete = (id) => {
        setFetching(true);
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_BACKEND_HOST}/api/delete-photo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${cookies['userToken']}`
            }
        })
        .then(res => {
            setFetching(false);
            if(res.data.success){
                console.log(res.data.data);
                setPhotos(prev => prev.filter(photo => photo._id !== res.data.data._id ))
            }else{
                setFetchingError((res.data.data.length <= 0) ? `End of the list.` :res.data.message);
            }
        })
        .catch(err => {
            setFetching(false);
            setFetchingError(`Client side error: ${err}`)
        })
    }

    useEffect(()=>{
        fetchPhotos(page, amountToFetch);
    }, [page, amountToFetch])
    
    
    return (
        <Container>
            {fetching?
                <Row>
                    <Loading variant = "large"/>
                </Row>
            :
                <Row>
                    {
                    fetchingError === "" ?
                        photos.map(item => (
                            <Col md = {3} key = {item._id}>
                                <ImageModal image = {item.url}>
                                    {userLoggedIn &&
                                    <DeleteModal>
                                        <Button variant = "danger" onClick = {() => handleDelete(item._id)}>Yes, delete.</Button>
                                    </DeleteModal>
                                    }
                                </ImageModal>
                            </Col>
                        ))
                    :
                        <p className = "text-center text-danger my-5">
                            {fetchingError}
                        </p>
                    }
                    <div className="pagination text-center justify-content-center">
                        <Pagination>
                            <Pagination.Item disabled = {page===0 ? true:false} activeLabel = '' onClick = {() => handlePaginate(-1)} >
                                <FaAngleLeft   />
                            </Pagination.Item>
                            <Pagination.Item disabled > ... </Pagination.Item>
                            <Pagination.Item activeLabel = '' onClick = {() => handlePaginate(1)} >
                                <FaAngleRight  />
                            </Pagination.Item>
                        </Pagination>
                    </div>
                </Row>
            }
        </Container>
    )
}

export default Portfolio
