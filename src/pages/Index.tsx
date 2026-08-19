
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// removed: import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Mail, MapPin, ExternalLink, Calendar, DollarSign, User, BookOpen, Award, MessageSquare, Cpu, Lock, Brain, Atom, GraduationCap, Users, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import SiteNav from "@/components/SiteNav";
import SectionHeader from "@/components/SectionHeader";
import Img from "@/components/Img";
import { featuredJournals, journalPublications } from "@/data/publications";
import {
	fundedProjects,
	parseLakhs,
	totalFundingLakhs,
	maxFundingLakhs,
} from "@/data/funding";
import { motion } from "framer-motion";


const Index = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	/**
	 * Research interests.
	 *
	 * The `logo` field previously hotlinked two Wikimedia PNGs. Both returned
	 * ERR_BLOCKED_BY_ORB in the browser, so all three cards rendered a broken
	 * image — Wikimedia blocks cross-origin hotlinking of thumbnails. They are
	 * gone; the lucide icons already bundled with the app carry the same job with
	 * no network request and no third-party dependency.
	 *
	 * The icons were also all `Lock`, including on "Data Analytics", so the mark
	 * said nothing about the content. Each now matches what it labels.
	 */
	const researchInterests = [
		{
			name: "Steganography & Steganalysis",
			description: "Advanced data hiding, secure communication, and image sterilization",
			icon: Lock,
		},
		{
			name: "Quantum Cryptography",
			description: "Quantum cryptographic protocols and network security",
			icon: Atom,
		},
		{
			name: "Data Analytics & Natural Language Processing",
			description: "AI applications in agriculture, computer vision",
			icon: Brain,
		}
	];



	// Derived from the array rather than written into the copy, for the same
	// reason the funding total is — a number typed into a heading drifts from
	// the list beneath it the moment a paper is added.
	/**
	 * Featured publications.
	 *
	 * Journals come from src/data/publications.ts rather than being restated
	 * here. This page used to carry its own copy, and it drifted: it described
	 * the IEEE Transactions on Consumer Electronics paper as "Accepted" long
	 * after it had been published as volume 71, issue 4. Taking the leading
	 * entries from the shared list means featuring a new paper is just adding it
	 * there.
	 *
	 * The conference entries stay local — a hand-picked sample in a different
	 * shape, not part of the journal list.
	 */
	/**
	 * One shape covering both kinds of featured entry. Without it TypeScript
	 * infers a union of the journal and conference literals, and every field that
	 * only one of them carries — impactFactor, award — fails to resolve.
	 */
	type FeaturedPublication = {
		title: string;
		journal: string;
		year: string;
		type: "journal" | "conference";
		authors?: string;
		doi?: string;
		impactFactor?: string;
		indexed?: string;
		venue?: string;
		publisher?: string;
		note?: string;
		award?: string;
		volume?: string;
		issue?: string;
		pages?: string;
		articleNo?: string;
		month?: string;
	};

	const featuredConferences: FeaturedPublication[] = [
		{
			title: "K-Span Select and Multi-Dimensional Judging for Reliable Scholarly Question Answering",
			journal: "ACM/IEEE Joint Conference on Digital Libraries (JCDL 2025)",
			year: "Accepted",
			type: "conference",
			indexed: "IEEE",
		},
		{
			title: "Few-TK: A Dataset for Few-shot Scientific Typed Keyphrase Recognition",
			journal: "Findings of the Association for Computational Linguistics: NAACL 2024",
			venue: "Mexico",
			type: "conference",
			year: "2024",
			publisher: "ACL",
			doi: "10.18653/v1/2024.findings-naacl.253",
		},
		{
			title: "AgriNER: An NER Dataset of Agricultural Entities for the Semantic Web",
			journal: "ESWC 2023",
			type: "conference",
			venue: "Hersonissos, Greece",
			year: "2023",
			note: "Scopus Indexed, Tier-I Conference",
		},
		{
			title: "CitePrompt: Using Prompts to Identify Citation Intent in Scientific Papers",
			journal: "JCDL 2023",
			type: "conference",
			venue: "Santa Fe, New Mexico, USA",
			year: "2023",
		},
		{
			title: "Disjunctive Edge Map based Image Sterilization for Destruction of Steganograms in Spatial Domain",
			journal: "2023 IEEE Silchar Subsection Conference (SILCON 2023)",
			venue: "National Institute of Technology Silchar",
			type: "conference",
			year: "2023",
			publisher: "IEEE",
			award: "Best Paper Award",
		}
	];

	const publications: FeaturedPublication[] = [
		...featuredJournals.map((p) => ({ ...p, type: "journal" as const })),
		...featuredConferences,
	];

	// Counted over the whole journal list, not the seven featured below. A
	// heading that said "7 journal" would describe this section's contents rather
	// than his output, and understate it by a factor of four.
	const journalCount = journalPublications.length;
	const peakImpactFactor = Math.max(
		...journalPublications.map((p) => Number.parseFloat(p.impactFactor ?? "") || 0)
	).toFixed(1);

	const phdSupervision = {
		awarded: [
			{
				name: "Dr. Pratap Chandra Mandal",
				thesis: "Unseen within Seen : A Steganographic Paradigm and Analysis",
				year: "Oct., 2021",
				position: "Asst. Professor, B.P. Poddar Institute of Management and Technology"
			},
			{
				name: "Dr. Abhishek Mukhopadhyay",
				thesis: "Object Detection in the Wild: Novel Techniques and Practical Applications",
				year: "Sept., 2023",
				position: "Post Doctoral Research Fellow, IISc Bangalore"
			},
			{
				name: "Dr. Nayan Ranjan Das",
				thesis: "Intelligent Decisions Lead to Success: An Unbiased Recommendation System in the Sport of Cricket for Quantifying Precedence of Players",
				year: "Nov., 2023",
				position: "Assistant Professor, Academy of Technology"
			},
			{
				name: "Dr. Ranjan Jana",
				thesis: "Epileptic Seizure Prediction with Channel Optimization",
				year: "Dec., 2024",
				position: "Assistant Professor, RCC Institute of Information Technology"
			},
			{
				name: "Dr. Chiranjit Pal",
				thesis: "Design of Lightweight Deep Learning Models for Crop Stress Detection",
				startYear: "Sept., 2025",
				position: "Post-Doctoral Research Fellow, IIT BHU"
			},
		],
		ongoing: [
			{
				name: "Sreeparna Ganguly",
				thesis: "SRF, UGC-NET Fellow",
				startYear: "2021",
				status: "Ongoing"
			},
			{
				name: "Koushik Deb",
				thesis: "Institute Research Fellow",
				startYear: "2021",
				status: "Ongoing"
			},
    		{
      			name: "Soumen Bajpayee",
      			thesis: "Institute Research Fellow",
				startYear: 2022,
      			status: "Ongoing"
    		},
   			{
     			name: "Abhisek Banerjee",
      			thesis: "Institute Research Fellow",
				startYear: 2021,
      			status: "Ongoing"
    		},
    		{
      			name: "Sayan De",
      			thesis: "JRF, SERB-CRG, Govt. of India",
				startYear: 2023,
      			status: "Ongoing"
   			},
		    {
		      	name: "Sarbani Sen",
		      	thesis: "JRF, DRDO, Govt. of India",
				startYear: 2023,
		      	status: "Ongoing"
		    },
		    {
		      	name: "Sugam Bhuina",
		      	thesis: "Co-supervisor: Dr. Sambit Bakshi, NIT Rourkela",
				startYear: 2019,
		      	status: "Ongoing"
		    }
			]
	};

	const talks = [
		{
			title: "Quantum AI",
			venue: "Faculty Development Program, Electronics & ICT Academy, IIT Roorkee",
			date: "September 29, 2024"
		},
		{
			title: "Quantum Computing in the Era of Industry 4.0/5.0",
			venue: "Pailan College of Management & Technology",
			date: "September 28, 2024"
		},
		{
			title: "Quantum Computing & Quantum Machine Learning",
			venue: "Haldia Institute of Technology",
			date: "May 15, 2024"
		},
		{
			title: "Pushing the Limit: Quantum Technology Revamps Computing",
			venue: "Techno College of Engineering Agartala",
			date: "March 6, 2024"
		},
		{
			title: "ATAL FDP: Cybersecurity in the Age of Industry 4.0/5.0",
			venue: "Supreme Knowledge Foundation, West Bengal (Sponsored by AICTE-ATAL Academy)",
			date: "February 8, 2024"
		},
		{
			title: "Unlock the Black Box in a Dark Night",
			venue: "Gargi Memorial Institute of Technology, West Bengal",
			date: "January 31, 2024"
		},
		{
			title: "Seen within Unseen or Unseen within Seen?",
			venue: "IISc Bangalore",
			date: "January 18, 2024"
		},
		{
			title: "See the Seen within Unseen",
			venue: "10 Days FDP on Applications of Machine Learning and IoT in Smart Cities (Electronics & ICT Academy, NIT Warangal)",
			date: "June 21, 2023"
		},
		{
			title: "Keynote: Unseen within Seen: A Steganographic Paradigm",
			venue: "Crypto-Innovation Series (CIS-23), National Centre of Excellence, DSCI",
			date: "October 17, 2022"
		},
		{
			title: "Invited Expert: Object Oriented Programming using C++ (Weekly Lectures)",
			venue: "Indian Association for the Cultivation of Science",
			date: "2022"
		},
		{
			title: "Use of Computer Games in Education",
			venue: "Inter-disciplinary Refreshers Course, Jadavpur University",
			date: "December 11, 2017"
		}
	];

	// removed carouselImages and old hero section
	// const carouselImages = [ ... ];

	const filteredPublications = activeFilter === "all" 
		? publications 
		: publications.filter(pub => pub.type === activeFilter);

	return (
		// ds-grain moved here from the hero: the field now runs the whole page,
		// so its texture should too.
		<div className="ds-grain min-h-screen">
			<SiteNav />

			<Hero
				doctoratesAwarded={phdSupervision.awarded.length}
				doctoratesOngoing={phdSupervision.ongoing.length}
			/>

			{/* About Section */}
			<section id="about" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<h2 className="ds-reveal ds-display text-display-md mb-[var(--space-block)]">About</h2>
					<div className="ds-reveal-group grid md:grid-cols-2 gap-8 md:gap-12">
						<div>
							<h3 className="text-display-sm font-semibold text-ink-1 mb-4">Academic Background</h3>
							<div className="space-y-4">
								<div className="ds-inset p-4">
									<h4 className="font-semibold text-ink-1">Current Position</h4>
									<p className="text-ink-2">Assistant Professor (Grade I), Department of Computer Science & Engineering</p>
									<p className="text-ink-2">Indian Institute of Information Technology (IIIT) Kalyani</p>
								</div>
								<div className="ds-inset p-4">
									<h4 className="font-semibold text-ink-1">Education</h4>
									<p className="text-ink-2">Ph.D. in Computer Science and Engineering from Jadavpur University (JU)</p>
									<p className="text-ink-2">Specialization: Steganography</p>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-display-sm font-semibold text-ink-1 mb-4">Contact Information</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3 ds-inset p-3">
									<Mail size={20} className="text-signal" />
									<span className="text-ink-2">imon@iiitkalyani.ac.in</span>
								</div>
								<div className="flex items-center gap-3 ds-inset p-3">
									<MapPin size={20} className="text-signal" />
									<span className="text-ink-2">IIIT Kalyani, West Bengal, India</span>
								</div>
								<div className="flex items-center gap-3 ds-inset p-3">
									<img
										src="https://scholar.google.com/favicon.ico"
										alt=""
										width={20}
										height={20}
										loading="lazy"
										decoding="async"
										className="w-5 h-5 shrink-0"
									/>
									<a href="https://scholar.google.com/citations?user=3xcXNz0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-ink-2 hover:text-status-good">
										Google Scholar Profile
									</a>
								</div>
								<div className="flex items-center gap-3 ds-inset p-3">
									<img
										src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
										alt=""
										width={20}
										height={20}
										loading="lazy"
										decoding="async"
										className="w-5 h-5 shrink-0"
									/>
									<a href="https://orcid.org/0000-0002-8598-148X" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-ink-2 hover:text-signal">
										ORCID Profile
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Research Interests */}

			{/* Research Interests */}
			<section id="research" className="py-[var(--space-section)] border-t border-rule">
			  <div className="container">
			    <h2 className="ds-reveal ds-display text-display-md mb-[var(--space-block)]">
			      Research Interests
			    </h2>
			
			    {/* A flush grid rather than centred floating cards with a coloured
			        left rail — that rail on a translucent rounded card is the exact
			        template look this redesign is replacing. The 2px gap lets the
			        page ground read as a hairline between planes. */}
			    <div className="ds-reveal-group grid gap-[2px] sm:grid-cols-3">
				  {researchInterests.map((interest) => {
				    const IconComponent = interest.icon;
				    return (
				      <article key={interest.name} className="ds-plane p-6">
				        <IconComponent size={20} className="text-signal" aria-hidden="true" />
				        <h3 className="ds-display mt-4 text-lg">{interest.name}</h3>
				        <p className="mt-2 text-sm leading-relaxed text-ink-2">
				          {interest.description}
				        </p>
				      </article>
				    );
				  })}
				</div>
			  </div>
			</section>


			{/* Funded Projects
			    Was four identical cards, each repeating an agency badge, a calendar
			    icon and a dollar icon. But these four grants are directly comparable
			    quantities spanning ₹1.85L to ₹45.61L — a 25x range that four equal
			    cards actively hid. Magnitude over a set of items is a bar chart, so
			    it is one now, and the bar doubles as the row's structure. */}
			<section id="projects" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<SectionHeader
						eyebrow="Grants"
						title="Funded Projects"
						summary={`₹${totalFundingLakhs.toFixed(2)}L as Principal Investigator across ${fundedProjects.length} projects`}
						to="/funded-projects"
						actionLabel="All projects"
					/>

					<ol className="ds-reveal-group">
						{fundedProjects.map((project) => {
							const lakhs = parseLakhs(project.amount);
							const pct = Math.max(2, (lakhs / maxFundingLakhs) * 100);
							return (
								<li
									key={project.title}
									className="ds-reveal group grid gap-x-6 gap-y-2 border-t border-rule py-5 last:border-b sm:grid-cols-[minmax(0,1fr)_auto]"
								>
									<div className="min-w-0">
										<h3 className="text-base font-semibold leading-snug text-ink-1">
											{project.title}
										</h3>
										<p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-3">
											<span>{project.funding}</span>
											<span aria-hidden="true">·</span>
											<span className="ds-data">{project.duration}</span>
											<span aria-hidden="true">·</span>
											<span>{project.role}</span>
										</p>
									</div>

									{/* Amount and its bar. Right-aligned and tabular so the figures
									    form a scannable column rather than floating in prose. */}
									<div className="sm:w-56 sm:text-right">
										<span className="ds-data text-lg text-ink-1">{project.amount}</span>
										<div
											className="mt-2 h-[6px] w-full overflow-hidden bg-surface-2"
											style={{ borderRadius: 'var(--ds-radius-sm)' }}
											role="img"
											aria-label={`${project.amount}, ${Math.round(pct)} percent of the largest grant`}
										>
											<div
												className="h-full bg-signal transition-[width] duration-500"
												style={{ width: `${pct}%`, borderRadius: 'var(--ds-radius-sm)' }}
											/>
										</div>
									</div>
								</li>
							);
						})}
					</ol>
				</div>
			</section>

			{/* Publications */}
			<section id="publications" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<SectionHeader
						eyebrow="Selected work"
						title="Publications"
						summary={`${journalCount} journal papers · peak impact factor ${peakImpactFactor} · ${featuredJournals.length} selected here`}
						to="/publications"
						actionLabel="All publications"
					/>

					{/* Filter. Left-aligned with the content rather than centred: a
					    centred control row under a left-aligned heading reads as a
					    separate widget. */}
					<div className="mb-2 flex flex-wrap gap-3">
						<Button 
							onClick={() => setActiveFilter("all")}
							variant={activeFilter === "all" ? "default" : "outline"}
							className={activeFilter === "all" ? "min-h-[44px] bg-signal text-signal-ink" : "min-h-[44px]"}
						>
							All
						</Button>
						<Button 
							onClick={() => setActiveFilter("journal")}
							variant={activeFilter === "journal" ? "default" : "outline"}
							className={activeFilter === "journal" ? "min-h-[44px] bg-signal text-signal-ink" : "min-h-[44px]"}
						>
							Journals
						</Button>
						<Button 
							onClick={() => setActiveFilter("conference")}
							variant={activeFilter === "conference" ? "default" : "outline"}
							className={activeFilter === "conference" ? "min-h-[44px] bg-signal text-signal-ink" : "min-h-[44px]"}
						>
							Conferences
						</Button>
					</div>

				{/* The impact factor is the strongest single credential on each row —
					    10.9 in IEEE TCE is the headline, not a footnote — so it is set
					    at display size on the left and everything else reads against it.
					    Previously it was a small pill indistinguishable from the year. */}
					<ol className="ds-reveal-group">
						{/* All seven of the curated selection, not a further slice of it —
						    truncating a list someone deliberately curated to seven would
						    hide three of their choices. The Conferences tab is a sample, so
						    it keeps a cap. */}
						{(activeFilter === "conference"
							? filteredPublications.slice(0, 4)
							: filteredPublications
						).map((pub) => {
							const isJournal = pub.type === "journal";
							const hasIF = pub.impactFactor && pub.impactFactor !== "N/A";
							return (
								<li
									key={pub.title}
									className="ds-reveal group relative grid gap-x-6 gap-y-3 border-t border-rule py-6 last:border-b sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
								>
									{/* Impact factor, or the type when there is none to show. */}
									<div className="sm:pt-1">
										{hasIF ? (
											<>
												<span className="ds-data block text-[2.25rem] leading-none text-signal">
													{pub.impactFactor}
												</span>
												<span className="ds-label mt-1 block">Impact factor</span>
											</>
										) : (
											<span className="ds-label block sm:pt-2">
												{isJournal ? "Journal" : "Conference"}
											</span>
										)}
									</div>

									<div className="min-w-0">
										<h3 className="text-base font-semibold leading-snug text-ink-1 sm:text-lg">
											{pub.title}
										</h3>
										<p className="ds-display mt-1.5 text-[15px] text-ink-2">{pub.journal}</p>
										<p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-3">
											{/* A 2px rule in the categorical colour instead of a filled
											    pill: type is a category and keeps its hue, but it no
											    longer shouts over the title beside it. */}
											<span className="inline-flex items-center gap-2">
												<span
													className="inline-block h-[2px] w-5"
													style={{ backgroundColor: isJournal ? "var(--cat-1)" : "var(--cat-3)" }}
													aria-hidden="true"
												/>
												{isJournal ? "Journal" : "Conference"}
											</span>
											<span aria-hidden="true">·</span>
											<span className="ds-data">{pub.year}</span>
											{pub.indexed && (
												<>
													<span aria-hidden="true">·</span>
													<span>{pub.indexed}</span>
												</>
											)}
											{pub.award && (
												<>
													<span aria-hidden="true">·</span>
													<span className="text-status-warn">{pub.award}</span>
												</>
											)}
										</p>
									</div>

									{/* Was a <Button> with no onClick, no href and no accessible
									    name: a control that looked interactive, did nothing when
									    clicked, and announced itself as an unlabelled button. The
									    data already carries `doi`, so it links there when one exists
									    and renders nothing when it does not. */}
									{pub.doi ? (
										<a
											href={pub.doi.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Open "${pub.title}" at the publisher`}
											className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-start text-ink-3 transition-colors hover:bg-surface-2 hover:text-signal"
										>
											<ExternalLink size={16} aria-hidden="true" />
										</a>
									) : (
										<span aria-hidden="true" />
									)}
								</li>
							);
						})}
					</ol>
				</div>
			</section>

			{/* Ph.D. Supervision
			    Was two columns showing 2 of 5 awarded and 2 of 7 ongoing behind a
			    "View All" button — hiding the record it exists to present. All of
			    them are here now.

			    The important change is what is emphasised. Where his doctorates
			    ended up (IISc, IIT BHU, assistant professorships) was set in small
			    grey text at the bottom of a card; for anyone weighing whether to do
			    a PhD with him, that placement record IS the credential, so it now
			    sits directly under the name. */}
			<section id="supervision" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<SectionHeader
						eyebrow="Doctoral supervision"
						title="Ph.D. Supervision"
						to="/academic-supervision"
						actionLabel="All supervision"
					>
						<span className="ds-data text-sm text-ink-2">
							<span className="text-[1.75rem] leading-none text-signal">
								{phdSupervision.awarded.length}
							</span>{' '}
							awarded
						</span>
						<span className="ds-data text-sm text-ink-2">
							<span className="text-[1.75rem] leading-none text-ink-1">
								{phdSupervision.ongoing.length}
							</span>{' '}
							in progress
						</span>
					</SectionHeader>

					<div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
						<div className="ds-reveal-group">
							<h3 className="ds-label mb-3 border-b border-rule pb-3">Awarded</h3>
							<ol>
								{phdSupervision.awarded.map((student) => (
									<li
										key={student.name}
										className="ds-reveal flex gap-4 border-b border-rule py-4"
									>
										{/* Status encoded in form as well as colour: awarded is a
										    filled node, in-progress an outline one. */}
										<span
											className="mt-[7px] h-[9px] w-[9px] shrink-0 bg-signal"
											style={{ borderRadius: 'var(--ds-radius-sm)' }}
											aria-hidden="true"
										/>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-baseline justify-between gap-x-4">
												<h4 className="font-semibold text-ink-1">{student.name}</h4>
												<time className="ds-data shrink-0 text-xs text-ink-3">
													{student.year ?? student.startYear}
												</time>
											</div>
											{student.position && (
												<p className="mt-0.5 text-[13px] text-signal">{student.position}</p>
											)}
											<p className="mt-1 text-[13px] leading-snug text-ink-3">
												{student.thesis}
											</p>
										</div>
									</li>
								))}
							</ol>
						</div>

						<div className="ds-reveal-group">
							<h3 className="ds-label mb-3 border-b border-rule pb-3">In progress</h3>
							<ol>
								{phdSupervision.ongoing.map((student) => (
									<li
										key={student.name}
										className="ds-reveal flex gap-4 border-b border-rule py-4"
									>
										<span
											className="mt-[7px] h-[9px] w-[9px] shrink-0 border-2 border-rule-strong"
											style={{ borderRadius: 'var(--ds-radius-sm)' }}
											aria-hidden="true"
										/>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-baseline justify-between gap-x-4">
												<h4 className="font-semibold text-ink-1">{student.name}</h4>
												<time className="ds-data shrink-0 text-xs text-ink-3">
													from {student.startYear}
												</time>
											</div>
											<p className="mt-1 text-[13px] leading-snug text-ink-3">
												{student.thesis}
											</p>
										</div>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</section>

			{/* Talks & Outreach
			    Eleven identical bordered cards stacked vertically was the most
			    monotonous block on the page, and it threw away the one thing the
			    data has: order. These are a chronology, so this is a timeline —
			    a spine with the date in the margin and a node per talk. The
			    numbering here is honest in a way section numbering would not be:
			    these genuinely are a sequence. */}
			<section id="talks" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<SectionHeader
						eyebrow="Speaking"
						title="Recent Invited Talks"
						summary={`${talks.length} invited lectures and keynotes`}
					/>

					<ol className="ds-reveal-group relative mx-auto max-w-4xl">
						{/* The spine. Sits behind the nodes and stops at the last one
						    rather than running past it into whitespace. */}
						<span
							className="absolute bottom-4 left-[7px] top-3 w-px bg-rule sm:left-[calc(9rem+1.5rem+7px)]"
							aria-hidden="true"
						/>

						{talks.map((talk) => (
							<li
								key={talk.title}
								className="ds-reveal group relative flex gap-4 pb-8 last:pb-0 sm:gap-6"
							>
								{/* Date in the margin at sm+, above the title on a phone.
								    w-36 plus nowrap: "September 29, 2024" needs ~130px in the
								    mono face, so at w-28 and even w-32 it broke after the
								    comma and read as two separate entries. */}
								<time className="ds-data hidden w-36 shrink-0 whitespace-nowrap pt-2 text-right text-xs text-ink-3 sm:block">
									{talk.date}
								</time>

								<span
									className="relative z-[1] mt-3 h-[15px] w-[15px] shrink-0 border-2 border-rule-strong bg-surface-0 transition-colors group-hover:border-signal group-hover:bg-signal"
									style={{ borderRadius: 'var(--ds-radius-sm)' }}
									aria-hidden="true"
								/>

								<div className="min-w-0 pt-1">
									<time className="ds-data mb-1 block text-xs text-ink-3 sm:hidden">
										{talk.date}
									</time>
									<h3 className="text-base font-semibold leading-snug text-ink-1">
										{talk.title}
									</h3>
									<p className="mt-1 text-sm text-ink-2">{talk.venue}</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<div className="ds-reveal flex flex-col items-start gap-4 mb-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="ds-display text-display-md">Gallery</h2>
						<Button asChild variant="outline" className="border-signal text-signal hover:bg-surface-2 min-h-[44px]">
							<Link to="/gallery">
								View All Images
								<ExternalLink size={16} className="ml-2" />
							</Link>
						</Button>
					</div>
					<div className="ds-reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
						{[
							{
								// url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
								url: "images/image4.jpg",
								alt: "Quantum Computing Research",
								title: "Quantum Computing Lab"
							},
							{
								// url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
								url: "images/image2.jpg",
								alt: "Cryptography Workshop",
								title: "Cryptography Workshop"
							},
							{
								// url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
								url: "images/image3.jpg",
								alt: "Machine Learning Conference",
								title: "ML Conference"
							},
							{
								// url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
								url: "images/image5.webp",
								alt: "Information Security Seminar",
								title: "Security Seminar"
							}
						].map((image, index) => (
							<motion.div
								key={index}
								className="group relative overflow-hidden transition-colors"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Img
									src={image.url}
									alt={image.alt}
									sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 92vw"
									className="w-full aspect-[4/3] object-cover transition-transform duration-300 md:group-hover:scale-110"
								/>
								<div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
									<h3 className="text-white font-semibold text-sm">{image.title}</h3>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-[var(--space-section)] border-t border-rule">
				<div className="container">
					<h2 className="ds-reveal ds-display text-display-md mb-[var(--space-block)]">Contact</h2>
					<div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
						<div>
							<h3 className="text-display-sm font-semibold text-ink-1 mb-6">Get in Touch</h3>
							<div className="space-y-4 mb-8">
								<div className="flex items-center gap-3 ds-inset p-4">
									<Mail size={20} className="text-signal" />
									<span className="text-ink-2">imon@iiitkalyani.ac.in</span>
								</div>
								<div className="flex items-center gap-3 ds-inset p-4">
									<MapPin size={20} className="text-signal" />
									<span className="text-ink-2">IIIT Kalyani, West Bengal, India</span>
								</div>
							</div>
							
							<div className="ds-inset p-6">
								<h4 className="font-semibold text-ink-1 mb-2">Office Hours</h4>
								<p className="text-ink-2">Monday - Friday: 9:00 AM - 5:00 PM</p>
								<p className="text-ink-2">Or by appointment</p>
							</div>
						</div>
						
						<div>
							<h3 className="text-display-sm font-semibold text-ink-1 mb-6">Send a Message</h3>
							<form className="space-y-4">
								<div>
									<Input placeholder="Your Name" aria-label="Your name" autoComplete="name" className="w-full min-h-[44px]" />
								</div>
								<div>
									<Input type="email" placeholder="Your Email" aria-label="Your email address" autoComplete="email" className="w-full min-h-[44px]" />
								</div>
								<div>
									<Textarea placeholder="Your Message" aria-label="Your message" rows={5} className="w-full" />
								</div>
								<Button className="w-full min-h-[44px] bg-signal text-signal-ink hover:opacity-90">
									<MessageSquare size={16} className="mr-2" />
									Send Message
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-surface-2 text-ink-2 border-t border-rule py-10">
				<div className="container text-center">
					<p className="text-ink-3">
						© {new Date().getFullYear()} Dr. Imon Mukherjee. All rights reserved.
					</p>
					<p className="text-ink-3 text-sm mt-2">
						Assistant Professor (Grade I), Department of CSE, IIIT Kalyani
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Index;
