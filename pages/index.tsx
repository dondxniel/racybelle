import type { NextPage } from "next";
import PageLayout from "../components/layouts/PageLayout";
import Hero from "../components/presentational/Hero";
import Section1 from "../components/presentational/Section1";
import Section2 from "../components/presentational/Section2";
import Partners from "../components/presentational/Partners";
import Contact from "../components/presentational/Contact";

const Home: NextPage = () => {
	return (
		<PageLayout>
			<>
				<Hero />
				<Section1 />
				<Section2 />
				<Partners />
				<Contact />
			</>
		</PageLayout>
	);
};

export default Home;
