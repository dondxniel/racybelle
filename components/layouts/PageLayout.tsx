import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import { defaultDescContent, defaultTitle } from "../../constants";
import { pageLayoutProps } from "../../interfaces";
import Navbar from "../presentational/Navbar";

function PageLayout({
	children,
	title = defaultTitle,
	descContent = defaultDescContent,
	header = "",
	subHeader = "",
}: pageLayoutProps) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={descContent} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			{header !== "" && subHeader !== "" && (
				<Container>
					<Row className="justify-content-center">
						<Col lg={3}>
							<div className="text-3xl text-center border-bottom border-3 pb-2 border-dark">
								Protfolio
								<p className="pt-2 text-base text-center">
									Check out our awesome portfolio
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			)}
			{children}
		</div>
	);
}

export default PageLayout;
