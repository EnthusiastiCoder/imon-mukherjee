import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Img from "@/components/Img";
import CitationChart, { type CitationYear } from "@/components/CitationChart";

interface ScholarMetrics {
	citations: { total: number; since2020: number };
	hIndex: { total: number; since2020: number };
	i10Index: { total: number; since2020: number };
	citationsByYear: CitationYear[];
	profileUrl: string;
}

/**
 * Research areas.
 *
 * Previously a 4-second auto-rotating carousel showing one at a time. Now all
 * four are visible at once: a visitor deciding whether to email him about a PhD
 * should not have to wait 12 seconds to learn what he works on, and a slideshow
 * hides three quarters of the answer at any moment.
 */
const researchAreas = [
	{
		src: "images/steganography.jpg",
		alt: "An illuminated circuit board schematic",
		title: "Steganography",
		note: "Embedding data where no data appears to be",
	},
	{
		src: "images/cryptography.jpg",
		alt: "A padlock resting on a backlit keyboard",
		title: "Steganalysis",
		note: "Detecting what embedding leaves behind",
	},
	{
		src: "images/quantum-computer.jpg",
		alt: "Handwritten physics and mathematics equations on a blackboard",
		title: "Quantum Computing",
		note: "Post-quantum ciphers and quantum attacks",
	},
	{
		src: "images/QML.jpg",
		alt: "Syntax-highlighted source code on a display",
		title: "Quantum Machine Learning",
		note: "Learning on quantum representations",
	},
];

/** Metadata lines. Replaces a character-by-character typing animation — a
 *  gimmick that made the same three facts take nine seconds to read and left a
 *  fixed-height box that clipped when the strings wrapped on a phone. */
const affiliation = [
	"Assistant Professor (Grade I), Computer Science & Engineering",
	"Indian Institute of Information Technology, Kalyani",
	"An Institute of National Importance under the Govt. of India",
];

function StatCell({
	label,
	value,
	sub,
}: {
	label: string;
	value: string;
	sub?: string;
}) {
	return (
		<div className="flex flex-col gap-1 px-[var(--space-gutter)] py-4 first:pl-0">
			<span className="ds-label">{label}</span>
			<span
				className="ds-data text-2xl leading-none text-ink-1 sm:text-3xl"
				style={{ fontWeight: 500 }}
			>
				{value}
			</span>
			{sub && <span className="text-[11px] text-ink-3">{sub}</span>}
		</div>
	);
}

export default function Hero() {
	const [metrics, setMetrics] = useState<ScholarMetrics | null>(null);
	const [loading, setLoading] = useState(true);
	const reduce = useReducedMotion();

	useEffect(() => {
		let live = true;
		(async () => {
			try {
				const res = await fetch("/api/scholar");
				const data = await res.json();
				if (live) setMetrics(data);
			} catch (err) {
				console.error("Error fetching scholar data:", err);
			} finally {
				if (live) setLoading(false);
			}
		})();
		return () => {
			live = false;
		};
	}, []);

	// One orchestrated load sequence rather than a dozen independent animations.
	// Scattered effects are what make a page feel generated; a single cascade
	// reads as deliberate.
	const rise = reduce
		? {}
		: {
				initial: { opacity: 0, y: 12 },
				animate: { opacity: 1, y: 0 },
				transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
			};

	return (
		<section id="home" className="pt-24">
			<div className="container">
				{/* ── Masthead ─────────────────────────────────────────────────── */}
				<div className="grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
					<motion.div {...rise}>
						<p className="ds-label">
							IIIT Kalyani &middot; Dept. of Computer Science &amp; Engineering
						</p>

						<h1 className="ds-display mt-3 text-[clamp(2.5rem,1.6rem+4.2vw,4.5rem)]">
							Imon Mukherjee
						</h1>

						{/* Affiliation as structured metadata, hairline-delimited. */}
						<div className="mt-5 max-w-[52ch] border-l-2 border-signal pl-4">
							{affiliation.map((line) => (
								<p key={line} className="text-sm leading-relaxed text-ink-2 sm:text-[0.9375rem]">
									{line}
								</p>
							))}
						</div>

						<p className="ds-prose mt-6 text-base sm:text-lg">
							Twenty years of research on hiding information inside ordinary files
							&mdash; and on finding it again. Lately, on what quantum machines do
							to both problems.
						</p>

						<div className="mt-7 flex flex-wrap items-center gap-3">
							<Link
								to="/publications"
								className="inline-flex min-h-[44px] items-center bg-signal px-5 text-sm font-medium text-signal-ink transition-opacity hover:opacity-90"
								style={{ borderRadius: "var(--ds-radius)" }}
							>
								Publications
							</Link>
							<a
								href="#research"
								className="inline-flex min-h-[44px] items-center border border-rule-strong px-5 text-sm font-medium text-ink-1 transition-colors hover:bg-surface-2"
								style={{ borderRadius: "var(--ds-radius)" }}
							>
								Research
							</a>
							<Link
								to="/academic-supervision"
								className="inline-flex min-h-[44px] items-center px-1 text-sm font-medium text-signal underline-offset-4 hover:underline"
							>
								Supervision &rarr;
							</Link>
						</div>
					</motion.div>

					{/* Portrait. A photograph, not a floating circle with a bounce
					    animation on an infinite loop. */}
					<motion.div
						{...rise}
						transition={{ ...(rise.transition ?? {}), delay: reduce ? 0 : 0.08 }}
						className="order-first lg:order-none"
					>
						<Img
							src="profile_image.jpg"
							alt="Dr. Imon Mukherjee"
							priority
							sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
							wrapperClassName="w-40 sm:w-56 lg:w-full"
							className="w-full object-cover ds-plane"
							style={{ aspectRatio: "4 / 5" }}
						/>
					</motion.div>
				</div>

				{/* ── Instrument readout ───────────────────────────────────────────
				    Hero numbers before any chart: these four are what a collaborator
				    or funding body scans for first. */}
				<motion.div
					{...rise}
					transition={{ ...(rise.transition ?? {}), delay: reduce ? 0 : 0.16 }}
					className="mt-[var(--space-block)] grid grid-cols-2 border-y border-rule sm:grid-cols-4 [&>*+*]:border-l [&>*+*]:border-rule [&>:nth-child(3)]:border-l-0 sm:[&>:nth-child(3)]:border-l"
				>
					<StatCell
						label="Citations"
						value={metrics ? metrics.citations.total.toLocaleString("en-IN") : "—"}
						sub="Google Scholar"
					/>
					<StatCell label="h-index" value={metrics ? String(metrics.hIndex.total) : "—"} />
					<StatCell label="i10-index" value={metrics ? String(metrics.i10Index.total) : "—"} />
					<StatCell label="PhD awarded" value="5" sub="7 in progress" />
				</motion.div>

				{/* ── Citations over time ──────────────────────────────────────── */}
				<motion.div
					{...rise}
					transition={{ ...(rise.transition ?? {}), delay: reduce ? 0 : 0.24 }}
					className="mt-[var(--space-block)] grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_20rem]"
				>
					<div className="ds-plane p-5">
						<div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
							<h2 className="ds-label">Citations by year</h2>
							{metrics && (
								<a
									href={metrics.profileUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xs text-signal underline-offset-4 hover:underline"
								>
									Google Scholar profile &rarr;
								</a>
							)}
						</div>
						{loading ? (
							<div className="flex h-36 items-center text-sm text-ink-3">Loading&hellip;</div>
						) : metrics?.citationsByYear?.length ? (
							<CitationChart data={metrics.citationsByYear} />
						) : (
							<div className="flex h-36 items-center text-sm text-ink-3">
								Citation data unavailable.
							</div>
						)}
					</div>

					<div className="ds-plane flex flex-col justify-center gap-3 p-5">
						<p className="ds-label">Currently</p>
						<p className="text-sm leading-relaxed text-ink-2">
							Supervising seven doctoral candidates across steganography, quantum
							machine learning and post-quantum cryptography.
						</p>
						<p className="ds-data text-sm text-ink-1">
							&#8377;87.86L <span className="text-ink-3">in funded projects</span>
						</p>
						<p className="text-[11px] text-ink-3">DRDO &middot; SERB &middot; MeitY</p>
					</div>
				</motion.div>

				{/* ── Research areas ──────────────────────────────────────────── */}
				<div id="research" className="scroll-mt-24 pt-[var(--space-section)]">
					<h2 className="ds-label">Research</h2>
					<div className="mt-4 grid gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
						{researchAreas.map((area) => (
							// Deliberately not a whileInView opacity reveal. Fading content
							// in from opacity 0 makes it invisible whenever the
							// IntersectionObserver does not fire — printing, an unusual
							// scroll restoration, a crawler — and these four tiles are the
							// answer to "what does he actually work on". A hover transform
							// is the only motion here, so the worst failure is no animation
							// rather than no content.
							<article
								key={area.title}
								className="group ds-plane overflow-hidden"
							>
								<Img
									src={area.src}
									alt={area.alt}
									sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
									className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
									style={{ aspectRatio: "4 / 3" }}
								/>
								<div className="border-t border-rule p-4">
									<h3
										className="ds-display text-lg"
										style={{ letterSpacing: "-0.01em" }}
									>
										{area.title}
									</h3>
									<p className="mt-1 text-[13px] leading-snug text-ink-3">{area.note}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
