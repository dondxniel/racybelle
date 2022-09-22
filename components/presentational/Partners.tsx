import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import businessDay from "/public/assets/images/BusinessDayLogo.svg";
import coolFM from "/public/assets/images/CoolFMLogo.svg";
import firstBank from "/public/assets/images/FirstBankLogo.svg";
import mastercard from "/public/assets/images/MastercardLogo.svg";

function Partners() {
	return (
		<div className="min-h-[30vh]">
			<Container className="my-10">
				<Row className="justify-content-center">
					<Col md={5}>
						<div className="text-5xl text-center border-bottom border-3 pb-4 border-dark">
							Partners
						</div>
					</Col>
				</Row>
				<Row className="justify-content-center align-items-center">
					<Col md={3} className="text-center">
						<Image src={businessDay} alt="Business day logo" />
					</Col>
					<Col md={3} className="text-center">
						<Image src={coolFM} alt="Cool FM logo" />
					</Col>
					<Col md={3} className="text-center">
						<Image src={firstBank} alt="First Bank logo" />
					</Col>
					<Col md={3} className="text-center">
						<Image src={mastercard} alt="Master Card logo" />
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md={5}>
						<div className="text-5xl text-center border-bottom border-3 pb-3 border-dark"></div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Partners;
