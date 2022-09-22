import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PortfolioImage({ imageSrc }: { imageSrc: string }) {
	const [imgSize, setImgSize] = useState({ h: 0, w: 0 });
	const [display, setDisplay] = useState<boolean>(false);
	useEffect(() => {
		let img = new (Image as any)();
		img.src = imageSrc;
		setImgSize({ h: img.height, w: img.width });
	}, [imageSrc]);
	const toggleDisplay = () => {
		setDisplay(!display);
	};
	return (
		<Col
			md={3}
			className="overflow-hidden m-1 h-[320px] bg-black flex flex-column justify-center p-0 rounded-xl"
		>
			<div
				className={`w-100 bg-black flex flex-column justify-center ${
					display
						? "fixed z-10 bg-black/20 top-0 left-0 bottom-0 right-0 md:px-36"
						: "relative "
				}`}
			>
				<NextImage
					src={imageSrc}
					height={imgSize.h}
					width={imgSize.w}
					layout={"responsive"}
					alt="Portfolio image"
				/>
				<div className="absolute md:bottom-5 bottom-10 right-5">
					<button
						onClick={toggleDisplay}
						className="rounded-full p-3 bg-black/10 hover:bg-black/20 active:bg-black/30 text-white"
					>
						{display ? (
							<FaEyeSlash color="#f00" />
						) : (
							<FaEye color="#fff" />
						)}
					</button>
				</div>
			</div>
		</Col>
	);
}

export default PortfolioImage;
