import { NextPage } from "next";
import PageLayout from "../components/layouts/PageLayout";
import { Container, Row } from "react-bootstrap";
import PortfolioImage from "../components/presentational/PortfolioImage";

const portfolio: NextPage = () => {
	return (
		<PageLayout
			header="Portfolio"
			subHeader="Check out our awesome portfolio"
		>
			<Container className="my-5">
				<Row className="justify-content-center">
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/250.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
					<PortfolioImage imageSrc="https://via.placeholder.com/150.png" />
				</Row>
			</Container>
		</PageLayout>
	);
};

export default portfolio;
