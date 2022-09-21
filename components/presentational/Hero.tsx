import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

import HeroCurve from "../widgets/HeroCurve";
import arrowImage from "/public/assets/images/arrow.svg";

function Hero() {
	return (
		<div className="h-[90vh] bg-[url('/assets/images/hero-bg.svg')] bg-center bg-cover bg-no-repeat flex flex-column">
			<Container className="flex-1 flex flex-column justify-center">
				<Row>
					<Col md={5} className="ml-auto">
						<div className="flex flex-row align-center">
							<div className="text-xl mr-3">Lorem Ipsum</div>
							<div className="flex flex-row align-center flex-1">
								<Image
									className="flex-1 w-full"
									src={arrowImage}
									alt="Arrow Image"
								/>
							</div>
						</div>
						<div className="flex flex-column mt-4">
							<div className="text-5xl">John Michael</div>
							<div className="text-7xl">Doe</div>
							<p className="mt-5">
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Tempora ratione qui veniam ab
								adipisicing elit. Tempora ratione qui veniam ab
								fugiat odit nesciunt inventore numquam vel iste?
							</p>
							<div className="mt-5">
								<Link href="/login">
									<button className="bg-black text-white px-5 py-1">
										Learn More
									</button>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
			<HeroCurve />
		</div>
	);
}

export default Hero;
