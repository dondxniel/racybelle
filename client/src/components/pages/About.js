import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
    return (
        <Container>
            <Row className = "justify-content-center">
                <Col md = {4}>
                    <h1 className="brand-font-sm text-center">About Us</h1>
                </Col>
            </Row>
            <Row className = "justify-content-center">
                <Col md = {6}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi autem vitae ut provident amet alias, exercitationem esse omnis iusto aspernatur nihil consequatur quasi deserunt pariatur a. Incidunt accusamus animi quibusdam fugiat saepe ab, labore architecto. Reprehenderit, minus soluta, perferendis repellendus harum delectus repudiandae nobis tenetur optio dignissimos quos inventore officiis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque at quia animi et, dicta voluptatem, nemo ex enim, maiores laboriosam aliquid! Dolorum facilis aspernatur vero aliquam numquam earum officiis ipsum omnis quod dolor necessitatibus neque voluptas temporibus accusantium exercitationem quasi, consequuntur quas? Dicta vel velit, a repellendus error quod voluptatem.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi autem vitae ut provident amet alias, exercitationem esse omnis iusto aspernatur nihil consequatur quasi deserunt pariatur a. Incidunt accusamus animi quibusdam fugiat saepe ab, labore architecto. Reprehenderit, minus soluta, perferendis repellendus harum delectus repudiandae nobis tenetur optio dignissimos.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default About
