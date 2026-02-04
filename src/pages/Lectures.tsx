import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Video, FileText, Users, Clock, Star, Download, Play, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const courses = [
	{
		id: "quantum-computing",
		title: "Quantum Computing Fundamentals",
		code: "CS-501",
		credits: 4,
		students: 45,
		rating: 4.8,
		progress: 85,
		description: "Comprehensive introduction to quantum computing principles, algorithms, and applications in modern computing.",
		topics: [
			"Quantum Bits and Superposition",
			"Quantum Gates and Circuits",
			"Quantum Algorithms (Grover, Shor)",
			"Quantum Cryptography",
			"Quantum Machine Learning"
		],
		lectures: [
			{
				title: "Introduction to Quantum Mechanics",
				duration: "90 min",
				type: "video",
				views: 156,
				date: "2024-01-15"
			},
			{
				title: "Quantum Gates and Circuits",
				duration: "120 min",
				type: "video",
				views: 134,
				date: "2024-01-22"
			},
			{
				title: "Quantum Algorithms Lab",
				duration: "180 min",
				type: "lab",
				views: 89,
				date: "2024-01-29"
			}
		],
		materials: [
			"Quantum Computing Textbook (PDF)",
			"Lab Manual and Exercises",
			"Programming Assignments",
			"Research Papers Collection"
		]
	},
	{
		id: "cryptography",
		title: "Advanced Cryptography",
		code: "CS-502",
		credits: 3,
		students: 38,
		rating: 4.9,
		progress: 72,
		description: "Advanced cryptographic techniques including post-quantum cryptography, steganography, and secure communication protocols.",
		topics: [
			"Public Key Cryptography",
			"Post-Quantum Cryptography",
			"Steganography Techniques",
			"Digital Signatures",
			"Secure Protocols"
		],
		lectures: [
			{
				title: "Cryptographic Foundations",
				duration: "75 min",
				type: "video",
				views: 142,
				date: "2024-02-05"
			},
			{
				title: "Steganography Implementation",
				duration: "150 min",
				type: "lab",
				views: 98,
				date: "2024-02-12"
			},
			{
				title: "Post-Quantum Security",
				duration: "90 min",
				type: "video",
				views: 112,
				date: "2024-02-19"
			}
		],
		materials: [
			"Applied Cryptography Handbook",
			"Steganography Tools",
			"Security Protocols Guide",
			"Case Studies Collection"
		]
	},
	{
		id: "information-security",
		title: "Information Security & Privacy",
		code: "CS-503",
		credits: 4,
		students: 52,
		rating: 4.7,
		progress: 60,
		description: "Comprehensive coverage of information security principles, privacy protection, and cybersecurity best practices.",
		topics: [
			"Security Fundamentals",
			"Network Security",
			"Privacy Protection",
			"Incident Response",
			"Security Auditing"
		],
		lectures: [
			{
				title: "Security Architecture",
				duration: "100 min",
				type: "video",
				views: 167,
				date: "2024-03-01"
			},
			{
				title: "Penetration Testing Lab",
				duration: "200 min",
				type: "lab",
				views: 76,
				date: "2024-03-08"
			},
			{
				title: "Privacy Regulations",
				duration: "80 min",
				type: "video",
				views: 145,
				date: "2024-03-15"
			}
		],
		materials: [
			"Security Framework Guide",
			"Penetration Testing Tools",
			"Privacy Compliance Manual",
			"Security Assessment Templates"
		]
	}
];

const Lectures = () => {
	const [activeCourse, setActiveCourse] = useState(courses[0].id);
	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
	const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
	const [selectedLecture, setSelectedLecture] = useState<{title: string, type: string} | null>(null);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
			{/* Header */}
			<div className="bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
				<div className="container mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						<Link to="/">
							<Button variant="ghost" className="flex items-center gap-2">
								<ArrowLeft size={16} />
								Back to Home
							</Button>
						</Link>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Dr. Imon Mukherjee
						</h1>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-6 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
						Academic Lectures
					</h2>
					<p className="text-xl text-slate-600 max-w-4xl mx-auto">
						Explore comprehensive lecture series on quantum computing, cryptography, and information security. 
						Interactive learning materials, hands-on labs, and cutting-edge research insights.
					</p>
				</motion.div>

				{/* Course Selection */}
				<div className="flex justify-center mb-8">
					<Tabs value={activeCourse} onValueChange={setActiveCourse} className="w-full max-w-4xl">
						<TabsList className="grid w-full grid-cols-3">
							{courses.map((course) => (
								<TabsTrigger key={course.id} value={course.id} className="text-sm">
									{course.code}
								</TabsTrigger>
							))}
						</TabsList>

						{courses.map((course) => (
							<TabsContent key={course.id} value={course.id} className="mt-8">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									{/* Course Header */}
									<Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
										<CardHeader>
											<div className="flex justify-between items-start">
												<div>
													<CardTitle className="text-2xl text-slate-800 mb-2">{course.title}</CardTitle>
													<p className="text-slate-600 mb-4">{course.description}</p>
													<div className="flex flex-wrap gap-4">
														<div className="flex items-center gap-2">
															<BookOpen size={16} className="text-blue-600" />
															<span className="text-sm text-slate-600">{course.credits} Credits</span>
														</div>
														<div className="flex items-center gap-2">
															<Users size={16} className="text-purple-600" />
															<span className="text-sm text-slate-600">{course.students} Students</span>
														</div>
														<div className="flex items-center gap-2">
															<Star size={16} className="text-yellow-500" />
															<span className="text-sm text-slate-600">{course.rating}/5.0</span>
														</div>
													</div>
												</div>
												<div className="text-right">
													<Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white mb-2">
														{course.progress}% Complete
													</Badge>
													<Progress value={course.progress} className="w-32" />
												</div>
											</div>
										</CardHeader>
									</Card>

									<div className="grid md:grid-cols-2 gap-8">
										{/* Topics Covered */}
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<Award size={20} className="text-blue-600" />
													Topics Covered
												</CardTitle>
											</CardHeader>
											<CardContent>
												<ul className="space-y-2">
													{course.topics.map((topic, index) => (
														<li key={index} className="flex items-center gap-2 text-slate-600">
															<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
															{topic}
														</li>
													))}
												</ul>
											</CardContent>
										</Card>

										{/* Course Materials */}
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<FileText size={20} className="text-purple-600" />
													Course Materials
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-3">
													{course.materials.map((material, index) => (
														<div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
															<span className="text-sm text-slate-700">{material}</span>
															<Button 
																size="sm" 
																variant="ghost"
																	onClick={() => setIsDownloadModalOpen(true)}
															>
																<Download size={16} />
															</Button>
														</div>
													))}
												</div>
											</CardContent>
										</Card>
									</div>

									{/* Lectures */}
									<Card className="mt-8">
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<Video size={20} className="text-green-600" />
												Lecture Series
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												{course.lectures.map((lecture, index) => (
													<motion.div
														key={index}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ duration: 0.3, delay: index * 0.1 }}
														className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow"
													>
														<div className="flex items-center gap-4">
															<div className={`p-2 rounded-full ${lecture.type === 'video' ? 'bg-blue-100' : 'bg-green-100'}`}>
																{lecture.type === 'video' ? <Play size={16} className="text-blue-600" /> : <BookOpen size={16} className="text-green-600" />}
															</div>
															<div>
																<h4 className="font-semibold text-slate-800">{lecture.title}</h4>
																<div className="flex items-center gap-4 text-sm text-slate-600">
																	<span className="flex items-center gap-1">
																		<Clock size={14} />
																		{lecture.duration}
																	</span>
																	<span className="flex items-center gap-1">
																		<Users size={14} />
																		{lecture.views} views
																	</span>
																	<span className="flex items-center gap-1">
																		<Calendar size={14} />
																		{lecture.date}
																	</span>
																</div>
															</div>
														</div>
															<Button 
																variant="outline" 
																size="sm"
																onClick={() => {
																	setSelectedLecture({title: lecture.title, type: lecture.type});
																	setIsLectureModalOpen(true);
																}}
															>
															{lecture.type === 'video' ? 'Watch' : 'Access'}
														</Button>
													</motion.div>
												))}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							</TabsContent>
						))}
					</Tabs>
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-16"
				>
					<p className="text-slate-600 mb-4">
						Interactive learning experience with hands-on labs and real-world applications
					</p>
					<Link to="/">
						<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
							Return to Homepage
						</Button>
					</Link>
				</motion.div>
			</div>

			{/* Download Modal */}
			<Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Course Materials Access</DialogTitle>
						<DialogDescription className="space-y-4 pt-4">
							<p className="text-slate-600">
								Course materials and downloads are available exclusively to enrolled students.
							</p>
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
								<p className="text-blue-800 font-medium mb-2">How to Access:</p>
								<ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
									<li>Log in to the Learning Management System</li>
									<li>Navigate to your enrolled course</li>
									<li>Or contact the department for assistance</li>
								</ul>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			{/* Lecture Access Modal */}
			<Dialog open={isLectureModalOpen} onOpenChange={setIsLectureModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Lecture Access Restricted</DialogTitle>
						<DialogDescription className="space-y-4 pt-4">
							<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
								<p className="text-purple-800 font-medium mb-2">{selectedLecture?.title}</p>
								<p className="text-purple-700 text-sm">
									Type: {selectedLecture?.type === 'video' ? 'Video Lecture' : 'Lab Session'}
								</p>
							</div>
							<p className="text-slate-600">
								Access to lectures is restricted to enrolled students only.
							</p>
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
								<p className="text-blue-800 font-medium mb-2">To Access This Lecture:</p>
								<ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
									<li>Log in to the Learning Management System with your credentials</li>
									<li>Ensure you are enrolled in this course</li>
									<li>Contact the department if you need enrollment assistance</li>
								</ul>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Lectures; 