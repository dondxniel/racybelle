import { Jumbotron, Container } from 'react-bootstrap';

const HomeJumbotron = ({image, title, text, position}) => {
    return (
        <Jumbotron style = {{backgroundImage : `url('${image}')`}} className = "jumbotron d-flex align-items-start flex-column" fluid>
            <Container className = {position === 'head' ? ` mt-auto text-light px-5 ` : 'my-auto text-light pt-3 px-5 '}>
                <h1>{title}</h1>
                <p className = "jumbotron-text">
                    {text}
                </p>
            </Container>
        </Jumbotron>
    )
}

HomeJumbotron.defaultProps = {
    image: "",
    title: "",
    text: "",
    position: "body"
}

export default HomeJumbotron;
