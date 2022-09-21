import type { NextPage } from "next";
import PageLayout from "../components/layouts/PageLayout";
import Hero from "../components/presentational/Hero";

const Home: NextPage = () => {
	return (
		<PageLayout>
			<>
				<Hero />
				<div className="z-10 bg-white border border-5 border-white">
					home page
				</div>
			</>
		</PageLayout>
	);
};

export default Home;
