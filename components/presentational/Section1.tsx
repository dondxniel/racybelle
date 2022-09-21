import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

function Section1() {
	return (
		<div className="min-h-[80vh] flex flex-column">
			<Container className="h-full my-20">
				<Row className="align-items-center">
					<Col md={6} className="my-5">
						<div className="text-7xl">Lorem Ipsum</div>
						<p className="text-base">
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Lorem ipsum dolor sit, amet.
						</p>
						<p className="text-base mt-5">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Molestias voluptate aliquam corporis voluptas
							nisi quos fuga quas animi eum alias velit
							consequatur in voluptates eligendi sapiente culpa,
							aliquid, facere asperiores.
						</p>
						<div className="mt-5">
							<Link href="/login">
								<button className="bg-black text-white px-5 py-1">
									Learn More
								</button>
							</Link>
						</div>
					</Col>
					<Col md={6} className="flex flex-column justify-center">
						<div className="md:h-[500px] h-[250px] ">
							<Container className="h-full w-full px-0">
								<Row className="h-full w-full mx-0">
									<Col className="bg-[url('/assets/images/makeup.jpeg')] bg-center bg-cover bg-no-repeat h-full w-full my-1 mr-1"></Col>
									<Col className="w-full px-0 flex flex-column">
										<Row className="bg-[url('/assets/images/makeup2.jpeg')] bg-center bg-cover bg-no-repeat flex-1 w-[100%] mx-0 m-1 mb-0"></Row>
										<Row className="flex-1 w-full  mx-0 m-1">
											<Col className="bg-[url('/assets/images/makeup3.jpeg')] bg-center bg-cover bg-no-repeat mr-1"></Col>
											<Col className="bg-[url('/assets/images/makeup4.jpeg')] bg-center bg-cover bg-no-repeat"></Col>
										</Row>
									</Col>
								</Row>
							</Container>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Section1;
