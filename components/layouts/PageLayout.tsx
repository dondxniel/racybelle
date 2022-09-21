import Head from "next/head";
import { defaultDescContent, defaultTitle } from "../../constants";
import { pageLayoutProps } from "../../interfaces";
import Navbar from "../presentational/Navbar";

function PageLayout({
	children,
	title = defaultTitle,
	descContent = defaultDescContent,
}: pageLayoutProps) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={descContent} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			{children}
		</div>
	);
}

export default PageLayout;
