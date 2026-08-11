import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Img from "@/components/Img";
import CitationChart, { type CitationYear } from "@/components/CitationChart";
import { useCountUp } from "@/hooks/useCountUp";

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

/**
 * One cell of the instrument readout.
 *
 * `count` animates from zero when the row scrolls into view; `value` is for
 * anything that is not a number to count. The counted value always exists in the
 * DOM regardless of whether the animation runs — see useCountUp.
 */
function StatCell({
	label,
	count,
	value,
	sub,
	format,
}: {
	label: string;
	count?: number | null;
	value?: string;
	sub?: string;
	format?: (n: number) => string;
}) {
	const { ref, display } = useCountUp(count ?? null);
	const shown =
		count !== undefined
			? display === null
				? "—"
				: (format ?? ((n: number) => n.toLocaleString("en-IN")))(display)
			: (value ?? "—");

	return (
		<div className="flex flex-col gap-1 px-[var(--space-gutter)] py-4 first:pl-0">
			<span className="ds-label">{label}</span>
			<span
				ref={ref as React.Ref<HTMLSpanElement>}
				className="ds-countup ds-data text-2xl leading-none text-ink-1 sm:text-3xl"
				style={{ fontWeight: 500 }}
			>
				{shown}
			</span>
			{sub && <span className="text-[11px] text-ink-3">{sub}</span>}
		</div>
	);
}

export default function Hero() {
	const [metrics, setMetrics] = useState<ScholarMetrics | null>(null);
	const [loading, setLoading] = useState(true);

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

	return (
		<section id="home" className="pt-24">
			<div className="container">
				{/* ── Masthead ─────────────────────────────────────────────────────
				    Motion comes from the shared system in styles/motion.css, driven by
				    data-motion. `ds-enter-group` cascades its direct children on load;
				    `ds-reveal` plays on scroll. Both are written so the settled state
				    is what plain CSS produces, which is why no wrapper here sets an
				    initial hidden state of its own. */}
				<div className="ds-enter-group grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
					<div>
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
					</div>

					{/* Portrait. A photograph, not a floating circle bouncing on an
					    infinite loop. `ds-parallax` gives it a slow drift against the
					    scroll at the higher motion levels and nothing at the lower ones,
					    since --m-parallax is 0 there. */}
					<div className="order-first lg:order-none">
						<Img
							src="profile_image.jpg"
							alt="Dr. Imon Mukherjee"
							priority
							sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
							wrapperClassName="w-40 sm:w-56 lg:w-full overflow-hidden"
							className="ds-parallax w-full object-cover ds-plane"
							style={{ aspectRatio: "4 / 5" }}
						/>
					</div>
				</div>

				{/* ── Instrument readout ───────────────────────────────────────────
				    Hero numbers before any chart: these four are what a collaborator
				    or funding body scans for first. Each counts up from zero when the
				    row first scrolls into view. */}
				<div className="ds-reveal mt-[var(--space-block)] grid grid-cols-2 border-y border-rule sm:grid-cols-4 [&>*+*]:border-l [&>*+*]:border-rule [&>:nth-child(3)]:border-l-0 sm:[&>:nth-child(3)]:border-l">
					<StatCell label="Citations" count={metrics?.citations.total ?? null} sub="Google Scholar" />
					<StatCell label="h-index" count={metrics?.hIndex.total ?? null} />
					<StatCell label="i10-index" count={metrics?.i10Index.total ?? null} />
					<StatCell label="PhD awarded" count={5} sub="7 in progress" />
				</div>

				{/* ── Citations over time ──────────────────────────────────────── */}
				<div className="ds-reveal mt-[var(--space-block)] grid gap-[var(--space-block)] lg:grid-cols-[minmax(0,1fr)_20rem]">
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
				</div>

				{/* ── Research areas ──────────────────────────────────────────── */}
				<div id="research" className="scroll-mt-24 pt-[var(--space-section)]">
					<h2 className="ds-label">Research</h2>
					{/* ds-reveal-group staggers the four tiles by shifting each one's
					    scroll range rather than by delay, which is meaningless on a
					    scroll timeline. Where scroll-driven animation is unsupported the
					    whole rule drops out and the tiles are simply already in place —
					    an earlier version faded these in from opacity 0 through an
					    observer, which made them vanish entirely when it did not fire. */}
					<div className="ds-reveal-group mt-4 grid gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
						{researchAreas.map((area) => (
							// figure/figcaption rather than a div: the text genuinely is a
							// caption for the image it sits on.
							<figure
								key={area.title}
								className="group relative ds-plane overflow-hidden"
							>
								<Img
									src={area.src}
									alt={area.alt}
									sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
									// Portrait from sm up, landscape on a single-column phone.
									// At four across a tile is ~300px wide, so 16:10 would be
									// 187px tall and the caption would eat over half of it; 4:5
									// gives the photograph room. On mobile the tile is full
									// width, so landscape is the right shape there.
									className="aspect-[16/10] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05] sm:aspect-[4/5]"
								/>

								{/*
									The caption returns to the image, which is what gave the old
									hero its weight.

									This scrim and its text stay dark-and-light in BOTH themes,
									and that is deliberate rather than an oversight: the ground
									here is a photograph, not a themed surface, so taking these
									colours from the theme tokens would put dark text on a dark
									photo in light mode. It is the one place in this design where
									a colour correctly ignores the palette.

									The gradient covers only the lower part of the frame so the
									photograph is not flattened, and the title carries a text
									shadow because these are documentary photos with
									unpredictable bright areas near the bottom edge.
								*/}
								<figcaption
									className="ds-on-media pointer-events-none absolute inset-x-0 bottom-0 p-4 pt-10"
									style={{
										background:
											"linear-gradient(to top, rgba(8,8,10,.88) 0%, rgba(8,8,10,.62) 45%, rgba(8,8,10,0) 100%)",
									}}
								>
									<h3
										className="ds-display text-lg"
										style={{ letterSpacing: "-0.01em", textShadow: "0 1px 3px rgba(0,0,0,.5)" }}
									>
										{area.title}
									</h3>
									<p
										className="ds-on-media-muted mt-1 text-[13px] leading-snug"
										style={{ textShadow: "0 1px 2px rgba(0,0,0,.5)" }}
									>
										{area.note}
									</p>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
