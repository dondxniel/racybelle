import { Container, Row, Col } from "react-bootstrap";
import Section2TopCurve from "../widgets/Section2TopCurve";

function Section2() {
	return (
		<div className="min-h-[80vh] bg-black text-white">
			<Section2TopCurve />
			<div className="py-10 pt-20">
				<Container className="text-center">
					<div className="text-6xl">Lorem Ipsum?</div>
					<p className="text-base">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Ab, reiciendis!
					</p>
				</Container>
				<Container className="mb-32">
					<Row>
						<Col className="h-[350px] mt-5" md={3}>
							<div className="rounded-3xl overflow-hidden h-full bg-[url('/assets/images/row1.jpeg')] bg-cover bg-center bg-no-repeat"></div>
						</Col>
						<Col className="h-[350px] mt-5" md={3}>
							<div className="rounded-3xl overflow-hidden h-full bg-[url('/assets/images/row2.jpeg')] bg-cover bg-center bg-no-repeat"></div>
						</Col>
						<Col className="h-[350px] mt-5" md={3}>
							<div className="rounded-3xl overflow-hidden h-full bg-[url('/assets/images/row3.jpeg')] bg-cover bg-center bg-no-repeat"></div>
						</Col>
						<Col className="h-[350px] mt-5" md={3}>
							<div className="rounded-3xl overflow-hidden h-full bg-[url('/assets/images/row4.jpeg')] bg-cover bg-center bg-no-repeat"></div>
						</Col>
					</Row>
				</Container>
			</div>
			{/* <HeroCurve /> */}
		</div>
	);
}

export default Section2;
