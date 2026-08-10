import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Img from "@/components/Img";

interface ScholarMetrics {
	citations: {
		total: number;
		since2020: number;
	};
	hIndex: {
		total: number;
		since2020: number;
	};
	i10Index: {
		total: number;
		since2020: number;
	};
	citationsByYear: Array<{
		year: number;
		count: number;
	}>;
	profileUrl: string;
}

const carouselImages = [
	{
		url: "images/quantum-computer.webp",
		alt: "Abstract rendering of a quantum computing circuit",
		title: "Quantum Computing Research",
	},
	{
		url: "images/cryptography.jpg",
		alt: "Abstract digital network representing encrypted communication",
		title: "Advanced Cryptography",
	},
	{
		url: "images/QML.jpg",
		alt: "Source code representing a machine learning model",
		title: "Quantum Machine Learning",
	},
	{
		url: "images/steganography.jpg",
		alt: "Computer hardware representing data hiding techniques",
		title: "Steganography and Steganalysis",
	},
];

// Hoisted out of the component: this array was previously rebuilt on every
// render and listed in the typing effect's dependency array, so the effect tore
// down and re-ran continuously instead of once per keystroke.
const titles = [
	"Assistant Professor (Grade I) | Computer Science and Engineering",
	"IIIT Kalyani | An Institute of National Importance under Govt. of India",
	"Researcher | Steganography, Steganalysis & Quantum Computing",
];

/** Round an axis maximum up to a clean tick so bars never clip the top. */
function axisMax(peak: number): number {
	if (peak <= 0) return 100;
	const step = peak > 500 ? 200 : peak > 200 ? 100 : 50;
	return Math.ceil(peak / step) * step;
}

export default function Hero() {
	const [currentText, setCurrentText] = useState(0);
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [scholarMetrics, setScholarMetrics] = useState<ScholarMetrics | null>(null);
	const [loading, setLoading] = useState(true);

	const chartMax = useMemo(() => {
		if (!scholarMetrics?.citationsByYear?.length) return 100;
		return axisMax(Math.max(...scholarMetrics.citationsByYear.map((item) => item.count)));
	}, [scholarMetrics]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("/api/scholar");
				const data = await response.json();
				setScholarMetrics(data);
			} catch (error) {
				console.error("Error fetching scholar data:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	// Auto-play carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const currentTitle = titles[currentText];
		const typingSpeed = 100;
		const deletingSpeed = 50;

		if (!isDeleting && displayText === currentTitle) {
			const pause = setTimeout(() => setIsDeleting(true), 2000);
			return () => clearTimeout(pause);
		}

		if (isDeleting && displayText === "") {
			setIsDeleting(false);
			setCurrentText((prev) => (prev + 1) % titles.length);
			return;
		}

		const timer = setTimeout(
			() => {
				setDisplayText(
					isDeleting
						? currentTitle.slice(0, displayText.length - 1)
						: currentTitle.slice(0, displayText.length + 1)
				);
			},
			isDeleting ? deletingSpeed : typingSpeed
		);

		return () => clearTimeout(timer);
	}, [displayText, isDeleting, currentText]);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		element?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section id="home" className="pt-24 pb-12 sm:pb-16">
			<div className="container">
				{/*
					Was a flex row with the scholar card absolutely positioned at
					lg:-right-20 — 80px outside a centred container, which forced
					horizontal page scroll at ~1024px, and `hidden lg:block`, which
					removed the metrics entirely on phones and tablets. A grid keeps
					the card in flow: stacked at base, spanning both columns at lg,
					and a third column at xl.
				*/}
				<div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[auto_minmax(0,1fr)_20rem]">
					<motion.div
						className="justify-self-center lg:justify-self-start"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
						transition={{
							duration: 0.6,
							y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
						}}
					>
						<Img
							src="profile_image.jpg"
							alt="Dr. Imon Mukherjee"
							priority
							sizes="(min-width: 1024px) 18rem, 12rem"
							className="w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full object-cover shadow-xl"
						/>
					</motion.div>

					<div className="text-center lg:text-left">
						<h1 className="text-display-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
							Dr. Imon Mukherjee
						</h1>
						{/* min-h rather than a fixed h-8: these strings wrap to two or
						    three lines on a phone and were being clipped. */}
						<div className="text-base sm:text-lg lg:text-xl mb-6 min-h-[3.5rem] sm:min-h-[3rem] flex items-start justify-center lg:justify-start">
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
								{displayText}
							</span>
							<span className="animate-pulse text-purple-600 font-bold" aria-hidden="true">
								|
							</span>
						</div>
						<p className="text-base sm:text-lg text-slate-700 mb-8 max-w-2xl mx-auto lg:mx-0">
							Honesty, Eternity and Love.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
							<Button
								onClick={() => scrollToSection("research")}
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg min-h-[44px]"
							>
								Explore Research
							</Button>
							<Button
								asChild
								variant="outline"
								className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 text-base sm:text-lg min-h-[44px]"
							>
								<Link to="/publications">View Publications</Link>
							</Button>
						</div>
					</div>

					<div className="w-full max-w-sm justify-self-center lg:col-span-2 xl:col-span-1 xl:max-w-none xl:justify-self-end">
						{loading ? (
							<div className="p-4 bg-white/90 border border-slate-200 rounded-2xl shadow-lg h-[17rem] flex items-center justify-center">
								<div className="text-slate-500">Loading scholar data…</div>
							</div>
						) : scholarMetrics ? (
							<div className="p-4 bg-white/90 border border-slate-200 rounded-2xl shadow-lg">
								<div className="flex items-center gap-3 mb-4">
									<img
										src="https://scholar.google.com/favicon.ico"
										alt=""
										width={20}
										height={20}
										className="w-5 h-5"
										loading="lazy"
									/>
									<div className="flex-1 min-w-0">
										<div className="text-sm font-medium text-slate-700">Google Scholar</div>
										<a
											href={scholarMetrics.profileUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-blue-600 hover:underline"
										>
											View profile
										</a>
									</div>
									<div className="text-right">
										<div className="text-sm text-slate-500">Citations</div>
										<div className="text-lg font-semibold text-slate-800">
											{scholarMetrics.citations.total}
										</div>
									</div>
								</div>

								<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-4">
									<span className="text-slate-600">
										h-index:{" "}
										<span className="font-semibold text-slate-800">
											{scholarMetrics.hIndex.total}
										</span>
									</span>
									<span className="text-slate-600">
										i10-index:{" "}
										<span className="font-semibold text-slate-800">
											{scholarMetrics.i10Index.total}
										</span>
									</span>
								</div>

								<div className="relative h-36 w-full flex">
									{/* Ticks derive from the data. The axis was hard-coded to
									    0/100/200/300 while bars scaled by /300, so 2025's 294
									    citations sat a hair from clipping and any future year
									    above 300 would silently flatten against the top. */}
									<div className="w-10 flex flex-col-reverse justify-between text-xs text-slate-500 pr-2 pb-5">
										{[0, 0.25, 0.5, 0.75, 1].map((f) => (
											<span key={f}>{Math.round(chartMax * f)}</span>
										))}
									</div>
									<div className="flex-1 flex items-end gap-1">
										{scholarMetrics.citationsByYear.map((item, index) => {
											const blueShades = [
												"bg-blue-200 hover:bg-blue-300",
												"bg-blue-300 hover:bg-blue-400",
												"bg-blue-400 hover:bg-blue-500",
												"bg-blue-500 hover:bg-blue-600",
												"bg-blue-600 hover:bg-blue-700",
												"bg-blue-700 hover:bg-blue-800",
												"bg-blue-800 hover:bg-blue-900",
												"bg-blue-900 hover:bg-blue-950",
											];
											return (
												<div
													key={item.year}
													className="flex-1 h-full flex flex-col justify-end items-center gap-1"
												>
													<div
														className={`w-full ${blueShades[index % blueShades.length]} transition-colors rounded-t cursor-default relative group`}
														style={{ height: `${(item.count / chartMax) * 100}%` }}
														title={`${item.year}: ${item.count} citations`}
													>
														<div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
															{item.count}
														</div>
													</div>
													<div className="text-[10px] leading-none text-slate-600">
														{String(item.year).slice(2)}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>

				<div className="mt-12 sm:mt-16">
					<div className="w-full max-w-6xl mx-auto">
						<div className="relative">
							{/*
								This image was rendered at opacity-10 — 90% transparent — which
								is what made the hero read as washed out and low quality.
							*/}
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<Img
									src={carouselImages[currentSlide].url}
									alt={carouselImages[currentSlide].alt}
									priority={currentSlide === 0}
									sizes="(min-width: 1280px) 72rem, 100vw"
									className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
								/>
							</motion.div>

							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 pb-14 sm:pb-16 rounded-b-2xl sm:rounded-b-3xl">
								<h2 className="text-white font-semibold text-base sm:text-lg">
									{carouselImages[currentSlide].title}
								</h2>
							</div>

							{/* Dots were 12px squares — well under a usable tap target. The
							    button is now 44px with a smaller visual dot inside it. */}
							<div
								className="absolute bottom-1 left-1/2 -translate-x-1/2 flex"
								role="tablist"
								aria-label="Research area slides"
							>
								{carouselImages.map((image, index) => (
									<button
										key={image.url}
										type="button"
										role="tab"
										aria-selected={index === currentSlide}
										aria-label={image.title}
										onClick={() => setCurrentSlide(index)}
										className="h-11 w-11 flex items-center justify-center"
									>
										<span
											className={`block w-2.5 h-2.5 rounded-full transition-colors ${
												index === currentSlide ? "bg-white" : "bg-white/50"
											}`}
										/>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
