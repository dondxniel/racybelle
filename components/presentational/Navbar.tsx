import { Container } from "react-bootstrap";
import Link from "next/link";

function Navbar() {
	return (
		<div>
			<Container className="my-4">
				<div className="flex flex-row align-center">
					{/* Logo */}
					<div>Racybelle</div>
					{/* Nav Links */}
					<div className="hidden md:flex flex-1 justify-center align-center">
						<div className="mx-10 flex flex-row flex-1 justify-end align-center">
							<div className="px-3 flex flex-column justify-center">
								<Link href="/">
									<span className="text-black hover:cursor-pointer">
										Home
									</span>
								</Link>
							</div>
							<div className="px-3 flex flex-column justify-center">
								<Link href="/portfolio">
									<span className="text-black hover:cursor-pointer">
										Portfolio
									</span>
								</Link>
							</div>
						</div>
					</div>
					{/* Login button */}
					<div className="ml-auto">
						<Link href="/login">
							<button className="bg-black text-white px-5 py-1">
								Login
							</button>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Navbar;
