
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
import Img from "@/components/Img";
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

	const fundedProjects = [
		{
			title: "Study of Quantum Attacks on Stream Ciphers and Its Counter-Measures",
			funding: "DRDO, Govt. of India",
			duration: "Sept, 2022 – Sept, 2024",
			amount: "₹42.25 Lakhs",
			role: "PI"
		},
		{
			title: "Extraction, Organization and Query of Scholarly Information",
			funding: "SERB (CRG), Govt. of India",
			duration: "March, 2022 to March, 2025",
			amount: "₹45.61 Lakhs",
			role: "PI"
		},
		{
			title: "AI in Agriculture & Food Sustainability",
			funding: "MeitY, Govt. of India",
			duration: "March, 2020 to March, 2023",
			amount: "₹16.18 Lakhs",
			role: "PI"
		},
		{
			title: "Implementation of Security in eGovernance through Steganography",
			funding: "DST, Govt. of West Bengal",
			duration: "July, 2013, to June, 2016",
			amount: "₹1.85 Lakhs",
			role: "PI"
		}
	];

	const publications = [
		{
			title: "Quantized Contour based Intelligent Stego-malware Sterilizer for Smart Consumer Electronics Network",
      		// authors: "Sreeparna Ganguly, Abhisek Banerjee, Arpan Bairagi and Imon Mukherjee",
      		journal: "IEEE Transactions on Consumer Electronics",
      		year: "Accepted",
			type: "journal",
      		doi: "",
      		impactFactor: "10.9",
      		indexed: "SCI/SCI(E)"
		},
		{
			title: "SteriCNN: Cloud Native Stego content Sterilization",
			journal: "Journal of Information Security and Applications",
			year: "2024",
			type: "journal",
			impactFactor: "5.6"
		},
		{
			title: "A complex network analysis approach to compare the performance of batsmen across different formats",
			journal: "Knowledge-Based Systems",
			year: "2024",
			type: "journal",
			impactFactor: "8.8"
		},
		{
			title: "Design and analysis of an unbiased intelligent recommendation system for all-rounders in cricket based on multiple criteria decision making",
      		// authors: "Nayan Ranjan Das, Imon Mukherjee, Goutam Paul",
      		journal: "Engineering Applications of Artificial Intelligence",
      		year: "2025",
			type: "journal",
      		doi: "https://doi.org/10.1016/j.engappai.2025.112197",
      		impactFactor: "8",
      		indexed: "SCI/SCI(E)"
		},
		{
			title: "A Hybrid Lane Detection Model for Wild Road Conditions",
      		// authors: "Abhishek Mukhopadhyay, LRD Murthy, Imon Mukherjee and Pradipta Biswas",
      		journal: "IEEE Transactions on Artificial Intelligence",
      		year: "2022",
			type: "journal",
      		doi: "10.1109/TAI.2022.3212347",
      		impactFactor: "N/A",
      		indexed: "IEEE"
		},
		{
			title: "Robust Deep Convolutional Solutions for Identifying Biotic Crop Stress in Wild Environments",
      		// authors: "Chiranjit Pal, Imon Mukherjee, Sanjay Chatterji, Sanjoy Pratihar, Pabitra Mitra, Partha Pratim Chakraborti",
      		journal: "IEEE Transactions on AgriFood Electronics",
      		year: "2024",
			type: "journal",
      		doi: "10.1109/TAFE.2024.3422187",
      		impactFactor: "N/A",
      		indexed: "IEEE"
		},
		{
			title: "K-Span Select and Multi-Dimensional Judging for Reliable Scholarly Question Answering",
	      	// authors: "Preetam Pati, Sayan De, Saurabh Tiwari, Debarshi Kumar Sanyal and Imon Mukherjee",
      		journal: "ACM/IEEE Joint Conference on Digital Libraries (JCDL 2025)",
      		year: "Accepted",
			type: "conference",
      		// doi: "10.1109/TAFE.2024.3422187",
      		// impactFactor: "N/A",
      		indexed: "IEEE"
		},
		 {
      		title: "Few-TK: A Dataset for Few-shot Scientific Typed Keyphrase Recognition",
      		// authors: "Avishek Lahiri, Imon Mukherjee, Debarshi",
      		journal: "Findings of the Association for Computational Linguistics: NAACL 2024",
      		venue: "Mexico",
			type: "conference",
      		year: "2024",
      		publisher: "ACL",
      		doi: "10.18653/v1/2024.findings-naacl.253"
    	},

		{
      		title: "AgriNER: An NER Dataset of Agricultural Entities for the Semantic Web",
      		// authors: "Sayan De, Debarshi K. Sanyal, Imon Mukherjee",
      		journal: "ESWC 2023",
			type: "conference",
      		venue: "Hersonissos, Greece",
      		year: "2023",
      		note: "Scopus Indexed, Tier-I Conference"
    	},
 		{
      		title: "CitePrompt: Using Prompts to Identify Citation Intent in Scientific Papers",
      		// authors: "Avishek Lahiri, Debarshi Kumar Sanyal and Imon Mukherjee",
      		journal: "JCDL 2023",
			type: "conference",
      		venue: "Santa Fe, New Mexico, USA",
      		year: "2023"
    	},
		{
      		title: "Disjunctive Edge Map based Image Sterilization for Destruction of Steganograms in Spatial Domain",
      		// authors: "Sreeparna Ganguly, Srijanjeet Singh Sehra, Imon Mukherjee",
      		journal: "2023 IEEE Silchar Subsection Conference (SILCON 2023)",
      		venue: "National Institute of Technology Silchar",
			type: "conference",
      		year: "2023",
      		publisher: "IEEE",
      		award: "Best Paper Award"
    	}
	];

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
		    // {
		    //   name: "Sarbani Sen",
		    //   enrollment: "January, 2023",
		    //   registration: "May, 2024",
		    //   project: "JRF, DRDO, Govt. of India",
		    //   status: "Ongoing"
		    // },
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
		<div className="min-h-screen bg-surface-0">
			<SiteNav />

			<Hero />

			{/* About Section */}
			<section id="about" className="py-[var(--space-section)] bg-surface-1 border-t border-rule">
				<div className="container">
					<h2 className="ds-display text-display-md mb-[var(--space-block)]">About</h2>
					<div className="grid md:grid-cols-2 gap-8 md:gap-12">
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
			<section id="research" className="py-[var(--space-section)] bg-surface-0 border-t border-rule">
			  <div className="container">
			    <h2 className="ds-display text-display-md mb-[var(--space-block)]">
			      Research Interests
			    </h2>
			
			    {/* A flush grid rather than centred floating cards with a coloured
			        left rail — that rail on a translucent rounded card is the exact
			        template look this redesign is replacing. The 2px gap lets the
			        page ground read as a hairline between planes. */}
			    <div className="grid gap-[2px] sm:grid-cols-3">
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


			{/* Funded Projects */}
			<section id="projects" className="py-[var(--space-section)] bg-surface-1 border-t border-rule">
				<div className="container">
					<div className="flex flex-col items-start gap-4 mb-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="ds-display text-display-md">Funded Projects</h2>
						<Button asChild variant="outline" className="border-signal text-signal hover:bg-surface-2 min-h-[44px]">
							<Link to="/funded-projects">
								View All Projects
								<ExternalLink size={16} className="ml-2" />
							</Link>
						</Button>
					</div>
					<div className="grid md:grid-cols-2 gap-6 md:gap-8">
						{fundedProjects.slice(0, 4).map((project, index) => (
							<Card key={index} className="ds-plane transition-colors">
								<CardHeader>
									<CardTitle className="text-ink-1 text-lg">{project.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<Badge className="bg-cat-1 text-white">
												{project.funding}
											</Badge>
											<Badge className="bg-cat-3 text-white">
												{project.role}
											</Badge>
										</div>
										<div className="flex items-center gap-2 text-ink-2">
											<Calendar size={16} />
											<span>{project.duration}</span>
										</div>
										<div className="flex items-center gap-2 text-ink-2">
											<DollarSign size={16} />
											<span className="font-semibold text-status-good">{project.amount}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Publications */}
			<section id="publications" className="py-[var(--space-section)] bg-surface-0 border-t border-rule">
				<div className="container">
					<div className="flex justify-between items-center mb-8">
						<h2 className="ds-display text-display-md">Publications</h2>
						<Button asChild variant="outline" className="border-signal text-signal hover:bg-surface-2 min-h-[44px]">
							<Link to="/publications">
								View All Publications
								<ExternalLink size={16} className="ml-2" />
							</Link>
						</Button>
					</div>
					
					{/* Filter Buttons */}
					<div className="flex justify-center gap-4 mb-8">
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

					<div className="space-y-6">
						{filteredPublications.slice(0, 4).map((pub, index) => (
							<Card key={index} className="ds-plane transition-colors">
								<CardContent className="p-6">
									<div className="flex justify-between items-start gap-4">
										<div className="flex-1">
											<h3 className="font-semibold text-ink-1 mb-2">{pub.title}</h3>
											<p className="text-ink-2 mb-2">{pub.journal}</p>
											<div className="flex items-center gap-3">
												<Badge variant="outline" className="border-rule bg-surface-2 text-ink-2">
													{pub.year}
												</Badge>
												<Badge className={pub.type === "journal" ? "bg-cat-1 text-white" : "bg-cat-3 text-white"}>
													{pub.type === "journal" ? "Journal" : "Conference"}
												</Badge>
												{pub.impactFactor && (
													<Badge className="bg-cat-4 text-white">
														IF: {pub.impactFactor}
													</Badge>
												)}
											</div>
										</div>
										{/* Was a <Button> with no onClick, no href and no accessible
										    name: a control that looked interactive, did nothing when
										    clicked, and announced itself as an unlabelled button to a
										    screen reader. The publication data already carries `doi`,
										    so it now links there when one exists and renders nothing
										    when it does not. */}
										{pub.doi && (
											<a
												href={pub.doi.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`Open "${pub.title}" at the publisher`}
												className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink-3 transition-colors hover:bg-surface-2 hover:text-signal"
											>
												<ExternalLink size={16} aria-hidden="true" />
											</a>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Ph.D. Supervision */}
			<section id="supervision" className="py-[var(--space-section)] bg-surface-1 border-t border-rule">
				<div className="container">
					<div className="flex flex-col items-start gap-4 mb-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="ds-display text-display-md">Ph.D. Supervision</h2>
						<Button asChild variant="outline" className="border-signal text-signal hover:bg-surface-2 min-h-[44px]">
							<Link to="/academic-supervision">
								View All Supervision
								<ExternalLink size={16} className="ml-2" />
							</Link>
						</Button>
					</div>
					
					<div className="grid md:grid-cols-2 gap-8 md:gap-12">
						{/* Awarded */}
						<div>
							<h3 className="text-display-sm font-semibold text-ink-1 mb-6 flex items-center gap-2">
								<Award className="text-status-good" size={24} />
								Awarded ({phdSupervision.awarded.length})
							</h3>
							<div className="space-y-4">
								{phdSupervision.awarded.slice(0, 2).map((student, index) => (
									<Card key={index} className="ds-plane">
										<CardContent className="p-6">
											<h4 className="font-semibold text-ink-1">{student.name}</h4>
											<p className="text-ink-2 text-sm mb-2">{student.thesis}</p>
											<div className="flex items-center justify-between text-sm">
												<span className="text-status-good font-medium">{student.year}</span>
												<span className="text-ink-3">{student.position}</span>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						{/* Ongoing */}
						<div>
							<h3 className="text-display-sm font-semibold text-ink-1 mb-6 flex items-center gap-2">
								<BookOpen className="text-signal" size={24} />
								Ongoing ({phdSupervision.ongoing.length})
							</h3>
							<div className="space-y-4">
								{phdSupervision.ongoing.slice(0, 2).map((student, index) => (
									<Card key={index} className="ds-plane">
										<CardContent className="p-6">
											<h4 className="font-semibold text-ink-1">{student.name}</h4>
											<p className="text-ink-2 text-sm mb-2">{student.thesis}</p>
											<span className="text-signal font-medium text-sm">Started: {student.startYear}</span>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Talks & Outreach */}
			<section id="talks" className="py-[var(--space-section)] bg-surface-0 border-t border-rule">
				<div className="container">
					<h2 className="ds-display text-display-md mb-[var(--space-block)]">Recent Invited Talks</h2>
					<div className="max-w-4xl mx-auto">
						<div className="space-y-6">
							{talks.map((talk, index) => (
								<Card key={index} className="ds-plane transition-colors">
									<CardContent className="p-6">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1">
												<h3 className="font-semibold text-ink-1 mb-2">{talk.title}</h3>
												<p className="text-ink-2">{talk.venue}</p>
											</div>
											{/* A date is not categorical data, so it does not get a
											    categorical colour. Eleven identical blue pills down
											    the page were reading as eleven emphases and drowning
											    the titles they sat beside. Mono, muted, right-aligned:
											    scannable as a column of dates. */}
											<time className="ds-data shrink-0 whitespace-nowrap text-xs text-ink-3">
												{talk.date}
											</time>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className="py-[var(--space-section)] bg-surface-1 border-t border-rule">
				<div className="container">
					<div className="flex flex-col items-start gap-4 mb-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="ds-display text-display-md">Gallery</h2>
						<Button asChild variant="outline" className="border-signal text-signal hover:bg-surface-2 min-h-[44px]">
							<Link to="/gallery">
								View All Images
								<ExternalLink size={16} className="ml-2" />
							</Link>
						</Button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
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
			<section id="contact" className="py-[var(--space-section)] bg-surface-1 border-t border-rule">
				<div className="container">
					<h2 className="ds-display text-display-md mb-[var(--space-block)]">Contact</h2>
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
						© 2025 Dr. Imon Mukherjee. All rights reserved.
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
