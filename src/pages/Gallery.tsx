import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Img from "@/components/Img";

const galleryImages = [
	{
		url: "images/image1.jpg",
		alt: "Quantum Computing Research",
		title: "Quantum Computing Lab",
		category: "Research"
	},
	{
		url: "images/image2.jpg",
		alt: "Cryptography Workshop",
		title: "Cryptography Workshop",
		category: "Workshop"
	},
	{
		url: "images/image3.jpg",
		alt: "Machine Learning Conference",
		title: "ML Conference",
		category: "Conference"
	},
	{
		url: "images/image4.jpg",
		alt: "Information Security Seminar",
		title: "Security Seminar",
		category: "Seminar"
	},
	{
		url: "images/image5.webp",
		alt: "Academic Presentation",
		title: "Academic Presentation",
		category: "Presentation"
	},
	{
		url: "images/image6.jpg",
		alt: "Research Team",
		title: "Research Team",
		category: "Team"
	},
	{
		url: "images/5G.jpg",
		alt: "Research Publication",
		title: "Research Publication",
		category: "Publication"
	},
	{
		url: "images/BCCL.jpg",
		alt: "Outreach",
		title: "Outreach Activity",
		category: "Outreach"
	}
];

const Gallery = () => {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<div className="bg-surface-0 border-b border-rule">
				<div className="container py-3 sm:py-4">
					<div className="flex justify-between items-center gap-4">
						<Button asChild variant="ghost" className="flex items-center gap-2 min-h-[44px] shrink-0">
							<Link to="/">
								<ArrowLeft size={16} />
								<span className="hidden sm:inline">Back to Home</span>
								<span className="sm:hidden">Back</span>
							</Link>
						</Button>
						<span className="text-base sm:text-xl lg:text-2xl font-bold ds-display truncate">
							Dr. Imon Mukherjee
						</span>
					</div>
				</div>
			</div>

			{/* Gallery Content */}
			<div className="container py-10 sm:py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-10 sm:mb-12"
				>
					<h1 className="text-display-lg font-bold ds-display mb-4">
						Research Gallery
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-ink-2 max-w-3xl mx-auto">
						Explore the visual journey of our research activities, academic presentations, and collaborative endeavors in quantum computing, cryptography, and information security.
					</p>
				</motion.div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
					{galleryImages.map((image, index) => (
						<motion.figure
							key={image.url}
							className="group relative overflow-hidden transition-colors"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.08 }}
						>
							<Img
								src={image.url}
								alt={image.alt}
								priority={index < 2}
								sizes="(min-width: 1280px) 20rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
								className="w-full aspect-[4/3] object-cover transition-transform duration-300 md:group-hover:scale-110"
							/>
							{/*
								The caption was opacity-0 until :hover, so on any touch device
								— where hover does not exist — the category and title were
								never shown at all. It is now always visible up to md, and
								reveals on hover only where a pointer is available.
							*/}
							<figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity duration-300">
								<span className="bg-surface-2 rounded-lg px-2 py-1 mb-2 inline-block self-start text-white text-xs font-medium">
									{image.category}
								</span>
								<h2 className="text-white font-semibold text-base sm:text-lg">{image.title}</h2>
							</figcaption>
						</motion.figure>
					))}
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-12 sm:mt-16"
				>
					<p className="text-ink-2 mb-4">
						Capturing moments from our research journey in quantum computing and information security
					</p>
					<Button asChild className="bg-signal text-signal-ink hover:opacity-90 min-h-[44px]">
						<Link to="/">Return to Homepage</Link>
					</Button>
				</motion.div>
			</div>
		</div>
	);
};

export default Gallery;
