
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// removed: import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, MapPin, ExternalLink, Calendar, DollarSign, User, BookOpen, Award, MessageSquare, ChevronDown, Cpu, Lock, Brain, Atom, GraduationCap, Users, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";

const Index = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	const researchInterests = [
		{ 
			name: "Steganography", 
			description: "Advanced data hiding, secure communication, and image sterilization",
			icon: Lock,
			color: "bg-purple-100 text-purple-800 border-purple-200",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Steganography_logo.svg/1200px-Steganography_logo.svg.png"
		},
		{ 
			name: "Quantum Cryptography", 
			description: "Quantum cryptographic protocols and network security",
			icon: Lock,
			color: "bg-red-100 text-red-800 border-red-200",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cryptography_logo.svg/1200px-Cryptography_logo.svg.png"
		},
		{ 
			name: "Data Analytics and Natural Language Processing", 
			description: "AI applications in agriculture, computer vision",
			icon: Lock,
			color: "bg-red-100 text-red-800 border-red-200",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cryptography_logo.svg/1200px-Cryptography_logo.svg.png"
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

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		element?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
			{/* Navigation with Dropdowns */}
			<nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-sm">
				<div className="container mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-bold text-slate-800"></h1>
						<div className="hidden md:flex space-x-6">
							<button onClick={() => scrollToSection('home')} className="text-slate-600 hover:text-blue-600 transition-colors">Home</button>
							<button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-blue-600 transition-colors">About</button>
							
							{/* Research Dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
									Research <ChevronDown size={16} />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-white border shadow-lg">
									<DropdownMenuItem onClick={() => scrollToSection('research')}>Research Interests</DropdownMenuItem>
									<Link to="/funded-projects">
										<DropdownMenuItem>Funded Projects</DropdownMenuItem>
									</Link>
									<Link to="/publications">
										<DropdownMenuItem>Publications</DropdownMenuItem>
									</Link>
								</DropdownMenuContent>
							</DropdownMenu>
							
							{/* Academic Dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
									Academic <ChevronDown size={16} />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-white border shadow-lg">
									<Link to="/academic-supervision">
										<DropdownMenuItem>Academic Supervision</DropdownMenuItem>
									</Link>
									<Link to="/lectures">
										<DropdownMenuItem>Lectures</DropdownMenuItem>
									</Link>
									<DropdownMenuItem onClick={() => scrollToSection('talks')}>Talks & Conferences</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							
							<Link to="/gallery">
								<button className="text-slate-600 hover:text-blue-600 transition-colors">Gallery</button>
							</Link>

							<button onClick={() => scrollToSection('contact')} className="text-slate-600 hover:text-blue-600 transition-colors">Contact</button>
						</div>
					</div>
				</div>
			</nav>

			<Hero />

			{/* About Section */}
			<section id="about" className="py-16 px-6 bg-white">
				<div className="container mx-auto">
					<h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12">About</h2>
					<div className="grid md:grid-cols-2 gap-12">
						<div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-4">Academic Background</h3>
							<div className="space-y-4">
								<div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
									<h4 className="font-semibold text-slate-700">Current Position</h4>
									<p className="text-slate-600">Assistant Professor (Grade I), Department of Computer Science & Engineering</p>
									<p className="text-slate-600">Indian Institute of Information Technology (IIIT) Kalyani</p>
								</div>
								<div className="p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg">
									<h4 className="font-semibold text-slate-700">Education</h4>
									<p className="text-slate-600">Ph.D. in Computer Science and Engineering from Jadavpur University (JU)</p>
									<p className="text-slate-600">Specialization: Steganography</p>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-4">Contact Information</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
									<Mail size={20} className="text-blue-600" />
									<span className="text-slate-600">imon@iiitkalyani.ac.in</span>
								</div>
								<div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
									<MapPin size={20} className="text-purple-600" />
									<span className="text-slate-600">IIIT Kalyani, West Bengal, India</span>
								</div>
								<div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
									<img 
										src="https://scholar.google.com/favicon.ico" 
										alt="Google Scholar" 
										className="w-5 h-5"
									/>
									<a href="https://scholar.google.com/citations?user=3xcXNz0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-green-600">
										Google Scholar Profile
									</a>
								</div>
								<div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
									<img 
										src="https://orcid.org/sites/default/files/images/orcid_16x16.png" 
										alt="ORCID" 
										className="w-5 h-5"
									/>
									<a href="https://orcid.org/0000-0002-8598-148X" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-600">
										ORCID Profile
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Research Interests */}
			{/* <section id="research" className="py-16 px-6 bg-gradient-to-r from-slate-50 to-blue-50">
				<div className="container mx-auto">
					<h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12">Research Interests</h2>
					<div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
						{researchInterests.map((interest, index) => {
							const IconComponent = interest.icon;
							return (
								<Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-blue-600 bg-white/80 backdrop-blur-sm">
									<CardContent className="p-6">
										<div className="flex items-center gap-3 mb-4">
											<div className={`w-12 h-12 rounded-full ${interest.color} flex items-center justify-center`}>
												<IconComponent size={24} />
											</div>
											<img 
												src={interest.logo} 
												alt={`${interest.name} logo`}
												className="w-8 h-8 object-contain"
												onError={(e) => {
													e.currentTarget.style.display = 'none';
												}}
											/>
										</div>
										<h3 className="font-semibold text-slate-800 mb-2">{interest.name}</h3>
										<p className="text-sm text-slate-600">{interest.description}</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section> */}

			{/* Research Interests */}
			<section id="research" className="py-16 px-6 bg-gradient-to-r from-slate-50 to-blue-50">
			  <div className="container mx-auto">
			    <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12">
			      Research Interests
			    </h2>
			
			    <div className="flex flex-wrap justify-center gap-6">
				  {researchInterests.map((interest, index) => {
				    const IconComponent = interest.icon;
				    return (
				      <Card
				        key={index}
				        className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-blue-600 bg-white/80 backdrop-blur-sm w-72"
				      >
				        <CardContent className="p-6">
				          <div className="flex items-center gap-3 mb-4">
				            <div className={`w-12 h-12 rounded-full ${interest.color} flex items-center justify-center`}>
				              <IconComponent size={24} />
				            </div>
				            <img
				              src={interest.logo}
				              alt={`${interest.name} logo`}
				              className="w-8 h-8 object-contain"
				              onError={(e) => {
				                e.currentTarget.style.display = 'none';
				              }}
				            />
				          </div>
				          <h3 className="font-semibold text-slate-800 mb-2">{interest.name}</h3>
				          <p className="text-sm text-slate-600">{interest.description}</p>
				        </CardContent>
				      </Card>
				    );
				  })}
				</div>
			  </div>
			</section>


			{/* Funded Projects */}
			<section id="projects" className="py-16 px-6 bg-white">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-12">
						<h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Funded Projects</h2>
						<Link to="/funded-projects">
							<Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
								View All Projects
								<ExternalLink size={16} className="ml-2" />
							</Button>
						</Link>
					</div>
					<div className="grid md:grid-cols-2 gap-8">
						{fundedProjects.slice(0, 4).map((project, index) => (
							<Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50">
								<CardHeader>
									<CardTitle className="text-slate-800 text-lg">{project.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
												{project.funding}
											</Badge>
											<Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
												{project.role}
											</Badge>
										</div>
										<div className="flex items-center gap-2 text-slate-600">
											<Calendar size={16} />
											<span>{project.duration}</span>
										</div>
										<div className="flex items-center gap-2 text-slate-600">
											<DollarSign size={16} />
											<span className="font-semibold text-green-600">{project.amount}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Publications */}
			<section id="publications" className="py-16 px-6 bg-gradient-to-r from-slate-50 to-purple-50">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Publications</h2>
						<Link to="/publications">
							<Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
								View All Publications
								<ExternalLink size={16} className="ml-2" />
							</Button>
						</Link>
					</div>
					
					{/* Filter Buttons */}
					<div className="flex justify-center gap-4 mb-8">
						<Button 
							onClick={() => setActiveFilter("all")}
							variant={activeFilter === "all" ? "default" : "outline"}
							className={activeFilter === "all" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : ""}
						>
							All
						</Button>
						<Button 
							onClick={() => setActiveFilter("journal")}
							variant={activeFilter === "journal" ? "default" : "outline"}
							className={activeFilter === "journal" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : ""}
						>
							Journals
						</Button>
						<Button 
							onClick={() => setActiveFilter("conference")}
							variant={activeFilter === "conference" ? "default" : "outline"}
							className={activeFilter === "conference" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : ""}
						>
							Conferences
						</Button>
					</div>

					<div className="space-y-6">
						{filteredPublications.slice(0, 4).map((pub, index) => (
							<Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
								<CardContent className="p-6">
									<div className="flex justify-between items-start gap-4">
										<div className="flex-1">
											<h3 className="font-semibold text-slate-800 mb-2">{pub.title}</h3>
											<p className="text-slate-600 mb-2">{pub.journal}</p>
											<div className="flex items-center gap-3">
												<Badge variant="outline" className="bg-slate-50">
													{pub.year}
												</Badge>
												<Badge className={pub.type === "journal" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-gradient-to-r from-green-500 to-teal-500 text-white"}>
													{pub.type === "journal" ? "Journal" : "Conference"}
												</Badge>
												{pub.impactFactor && (
													<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
														IF: {pub.impactFactor}
													</Badge>
												)}
											</div>
										</div>
										<Button variant="ghost" size="sm" className="hover:bg-blue-50">
											<ExternalLink size={16} />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Ph.D. Supervision */}
			<section id="supervision" className="py-16 px-6 bg-white">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-12">
						<h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ph.D. Supervision</h2>
						<Link to="/academic-supervision">
							<Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
								View All Supervision
								<ExternalLink size={16} className="ml-2" />
							</Button>
						</Link>
					</div>
					
					<div className="grid md:grid-cols-2 gap-12">
						{/* Awarded */}
						<div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
								<Award className="text-green-600" size={24} />
								Awarded ({phdSupervision.awarded.length})
							</h3>
							<div className="space-y-4">
								{phdSupervision.awarded.slice(0, 2).map((student, index) => (
									<Card key={index} className="bg-gradient-to-r from-green-50 to-teal-50">
										<CardContent className="p-6">
											<h4 className="font-semibold text-slate-800">{student.name}</h4>
											<p className="text-slate-600 text-sm mb-2">{student.thesis}</p>
											<div className="flex items-center justify-between text-sm">
												<span className="text-green-600 font-medium">{student.year}</span>
												<span className="text-slate-500">{student.position}</span>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						{/* Ongoing */}
						<div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
								<BookOpen className="text-blue-600" size={24} />
								Ongoing ({phdSupervision.ongoing.length})
							</h3>
							<div className="space-y-4">
								{phdSupervision.ongoing.slice(0, 2).map((student, index) => (
									<Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50">
										<CardContent className="p-6">
											<h4 className="font-semibold text-slate-800">{student.name}</h4>
											<p className="text-slate-600 text-sm mb-2">{student.thesis}</p>
											<span className="text-blue-600 font-medium text-sm">Started: {student.startYear}</span>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Talks & Outreach */}
			<section id="talks" className="py-16 px-6 bg-gradient-to-r from-slate-50 to-blue-50">
				<div className="container mx-auto">
					<h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12">Recent Invited Talks</h2>
					<div className="max-w-4xl mx-auto">
						<div className="space-y-6">
							{talks.map((talk, index) => (
								<Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
									<CardContent className="p-6">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1">
												<h3 className="font-semibold text-slate-800 mb-2">{talk.title}</h3>
												<p className="text-slate-600">{talk.venue}</p>
											</div>
											<Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
												{talk.date}
											</Badge>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className="py-16 px-6 bg-white">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-12">
						<h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gallery</h2>
						<Link to="/gallery">
							<Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
								View All Images
								<ExternalLink size={16} className="ml-2" />
							</Button>
						</Link>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
								className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<img
									src={image.url}
									alt={image.alt}
									className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute bottom-0 left-0 right-0 p-4">
										<h3 className="text-white font-semibold text-sm">{image.title}</h3>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-16 px-6 bg-white">
				<div className="container mx-auto">
					<h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12">Contact</h2>
					<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
						<div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-6">Get in Touch</h3>
							<div className="space-y-4 mb-8">
								<div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
									<Mail size={20} className="text-blue-600" />
									<span className="text-slate-600">imon@iiitkalyani.ac.in</span>
								</div>
								<div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-lg">
									<MapPin size={20} className="text-purple-600" />
									<span className="text-slate-600">IIIT Kalyani, West Bengal, India</span>
								</div>
							</div>
							
							<div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 rounded-lg">
								<h4 className="font-semibold text-slate-800 mb-2">Office Hours</h4>
								<p className="text-slate-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
								<p className="text-slate-600">Or by appointment</p>
							</div>
						</div>
						
						<div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-6">Send a Message</h3>
							<form className="space-y-4">
								<div>
									<Input placeholder="Your Name" className="w-full" />
								</div>
								<div>
									<Input type="email" placeholder="Your Email" className="w-full" />
								</div>
								<div>
									<Textarea placeholder="Your Message" rows={5} className="w-full" />
								</div>
								<Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
									<MessageSquare size={16} className="mr-2" />
									Send Message
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8 px-6">
				<div className="container mx-auto text-center">
					<p className="text-slate-300">
						© 2025 Dr. Imon Mukherjee. All rights reserved.
					</p>
					<p className="text-slate-400 text-sm mt-2">
						Assistant Professor (Grade I), Department of CSE, IIIT Kalyani
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Index;
