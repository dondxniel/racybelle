import { Container, Row, Col } from "react-bootstrap";
import HeroCurve from "../widgets/HeroCurve";

function Hero() {
	return (
		<div className="h-[80vh] bg-[url('/hero-bg.svg')] bg-center bg-cover bg-no-repeat flex flex-column">
			<Container className="flex-1 flex flex-column justify-center">
				<Row>
					<Col md={5} className="ml-auto">
						Whatever
					</Col>
				</Row>
			</Container>
			<HeroCurve />
		</div>
	);
}

export default Hero;
