import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import fb from "/public/assets/images/facebook.png";
import ig from "/public/assets/images/instagram.png";
import wa from "/public/assets/images/whatsapp.png";

function Contact() {
	return (
		<div className="min-h-[60vh] bg-gradient-to-r from-[#ae8625] via-[#f7ef8a] to-[#d2ac47] flex flex-column justify-center">
			<Container className="h-inherit">
				<Row className="justify-content-center align-items-center">
					<Col md={4} className="md:mt-0 mt-5">
						<div className="text-5xl ">Get in touch</div>
						<p className="text-base">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Labore, quae.
						</p>
						<div className="flex flex-row mt-5">
							<div className="mr-2">
								<Link href="facebook.com">
									<Image src={fb} alt="Facebook logo" />
								</Link>
							</div>
							<div className="mx-2">
								<Link href="instagram.com">
									<Image src={ig} alt="Instagram logo" />
								</Link>
							</div>
							<div className="mx-2">
								<Link href="instagram.com">
									<Image src={wa} alt="Whatsapp logo" />
								</Link>
							</div>
						</div>
					</Col>
					<Col md={1} />
					<Col
						md={4}
						className="h-[500px] my-5 bg-[url('/assets/images/puttingmakeup.jpeg')] bg-cover bg-center bg-no-repeat shadow-2xl rounded-xl "
					></Col>
				</Row>
			</Container>
		</div>
	);
}

export default Contact;
