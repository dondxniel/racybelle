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
					<div className="flex flex-1 justify-center align-center">
						<div className="mx-10">
							<Link href="/">
								<span className="text-black hover:cursor-pointer">
									Home
								</span>
							</Link>
						</div>
					</div>
					{/* Login button */}
					<div>
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
