import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, GraduationCap, Users, ExternalLink, MapPin, Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ScrollableTabsList from "@/components/ScrollableTabsList";

const AcademicSupervision = () => {
  const phdAwarded = [
    {
      name: "Dr. Pratap Chandra Mandal",
      thesis: "Unseen within Seen : A Steganographic Paradigm and Analysis",
      year: "Oct., 2021",
      position: "Assistant Professor, B.P. Poddar Institute of Management and Technology"
    },
    {
      name: "Dr. Abhishek Mukhopadhyay",
      thesis: "Object Detection in the Wild: Novel Techniques and Practical Applications",
      year: "Sept., 2023",
      // position: "Post Doctoral Research Fellow, IISc Bangalore",
      position: "Assistant Professor, Amity University, Kolkata",
      coSupervisor: "Dr. Pradipta Biswas, IISc Bangalore"
    },
    {
      name: "Dr. Nayan Ranjan Das",
      thesis: "Intelligent Decisions Lead to Success: An Unbiased Recommendation System in the Sport of Cricket for Quantifying Precedence of Players",
      year: "Nov., 2023",
      position: "Assistant Professor, Academy of Technology",
      coSupervisor: "Dr. Goutam Kumar Paul, ISI Kolkata"
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
      year: "Sept., 2025",
      position: "Post-Doctoral Research Fellow, IIT BHU",
      coSupervisor: "Dr. Sanjoy Pratihar and Dr. Sanjay Chatterji"
    }
  ];

  const phdOngoing = [
    // {
    //   name: "Chiranjit Pal",
    //   enrollment: "January, 2021",
    //   registration: "Aug., 2022",
    //   project: "Project JRF, MeitY, Govt. of India",
    //   status: "Thesis Submitted"
    // },
    {
      name: "Sreeparna Ganguly",
      enrollment: "January, 2021",
      registration: "Sept., 2022",
      project: "SRF, UGC-NET Fellow",
      status: "Ongoing"
    },
    {
      name: "Koushik Deb",
      enrollment: "February, 2021",
      registration: "August, 2022",
      project: "Institute Research Fellow",
      status: "Ongoing"
    },
    {
      name: "Soumen Bajpayee",
      enrollment: "February, 2022",
      registration: "June, 2023",
      project: "Institute Research Fellow",
      status: "Ongoing"
    },
    {
      name: "Abhisek Banerjee",
      enrollment: "January, 2021",
      registration: "June, 2023",
      project: "Institute Research Fellow",
      status: "Ongoing"
    },
    {
      name: "Sayan De",
      enrollment: "January, 2023",
      project: "JRF, SERB-CRG, Govt. of India",
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
      enrollment: "February, 2019",
      registration: "February, 2024",
      project: "Co-supervisor: Dr. Sambit Bakshi, NIT Rourkela",
      status: "Ongoing"
    }
  ];

  const mtechStudents = [
    {
      name: "Anjan Kumar Payra",
      thesis: "Steganology for The Computer Forensics Examiners",
      institution: "Dept. of Computer Science & Engineering, Kalyani Government Engineering College, Nadia, West Bengal, India",
      year: "2011"
    }
  ];

  const mscStudents = [
    {
      name: "Subhrajit Ghosh",
      thesis: "Adoption of a ranking based indexing for the cricket playing nations",
      institution: "Dept. of Data Science, Kalyani University, Nadia, West Bengal, India",
      year: "2021"
    },
    {
      name: "Arpan Bairagi",
      thesis: "Developing A Deep Framework for Extraction and Analysis of Steganalytic Features of a Lossless Image Cover",
      institution: "Computer Science, Ramakrishna Mission Residential College, Narendrapur, West Bengal, India",
      year: "2021"
    }
  ];

  const btechProjects = [
    {
      title: "Removal of Image Stegogram through Sterilization",
      students: ["Ankit Mishra", "Rahul", "Vinay Singh"],
      year: "2024",
      institution: "IIIT Kalyani"
    },
    {
      title: "Study and Implementation of Steganalysis Techniques",
      students: ["Alok Kumar Rai", "Srijanjeet Singh Sehra", "Subham Maji"],
      year: "2024",
      institution: "IIIT Kalyani"
    },
    {
      title: "Eye Disease Identification using Quantum Machine Learning",
      students: ["Prithwish Dey", "Amit Mandhana", "Chirag Shukla", "Sayan Mandal"],
      year: "2024",
      institution: "IIIT Kalyani"
    },
    {
      title: "Question-answering Model Design using Quantum Machine Learning",
      students: ["Raj Narayan Sharma", "Ranit Purkait", "Priyanshu Khatick", "Priyanshu Ranjan"],
      year: "2024",
      institution: "IIIT Kalyani"
    },
    {
      title: "Knowledge-graph based Question-answering System Design",
      students: ["Aditya Mishra", "Ankit Ghosh", "Aditya"],
      year: "2023",
      institution: "IIIT Kalyani"
    },
    {
      title: "Name Entity Recognition for Question-answering System",
      students: ["Pritam Pati", "Sourav Sharma"],
      year: "2023",
      institution: "IIIT Kalyani"
    },
    {
      title: "Disease Identification in Rice Crop",
      students: ["Namballa Mukesh", "Tanneru Yedukondalu", "Banoth Rithvik"],
      year: "2022",
      institution: "IIIT Kalyani"
    },
    {
      title: "Prediction of Cyclone Trajectory Path Using Time-series Data",
      students: ["Sweta Barnwal", "Rahul Kumar", "Sneha Sana"],
      year: "2022",
      institution: "IIIT Kalyani"
    },
    {
      title: "Lane Detection In Context Of Autonomous Vehicles",
      students: ["Akshat Bhutra", "Ananya Sarkar", "Mohit Raj"],
      year: "2021",
      institution: "IIIT Kalyani"
    },
    {
      title: "Cricket Data Analysis",
      students: ["Anubhav Patel", "Ankur Konar", "Ratna Priya"],
      year: "2021",
      institution: "IIIT Kalyani"
    },
    {
      title: "Automatic Attendance Through Facial Recognition",
      students: ["Mrinmoy Aus", "Pralay Sarkar", "Soham Biswas", "Abhisekh Gharami"],
      year: "2021",
      institution: "IIIT Kalyani"
    },
    {
      title: "Classification of Roads and Buildings from Satellite Images",
      students: ["Puskar Sahay", "Abhishek Karmakar", "Sattam Ghoshal"],
      year: "2020",
      institution: "IIIT Kalyani"
    },
    {
      title: "Automatic Scoreboard Design",
      students: ["Sanjay Tiwari", "Tanmay Jain", "Uma Shankar"],
      year: "2019",
      institution: "IIIT Kalyani"
    },
    {
      title: "Sign Language Recognition",
      students: ["Arjun Tandon", "Saqueliean Mustaque", "Rahul Mili"],
      year: "2021",
      institution: "IIIT Kalyani"
    },
    {
      title: "Person Re-Identification",
      students: ["Akshat Bhutra", "Ananya Sarkar", "Mohit Raj"],
      year: "2021",
      institution: "IIIT Kalyani"
    },
    {
      title: "Leaf Disease Identification with Deep Learning",
      students: ["Namballa Mukhesh", "Tanneru Yedukondalu", "Banoth Rithvik"],
      year: "2021",
      institution: "IIIT Kalyani"
    },
    {
      title: "Person Tracking and Re-Identification",
      students: ["Dhruva Mishra", "Gurpreet Singh Behal"],
      year: "2020",
      institution: "IIIT Kalyani"
    },
    {
      title: "Detection & Classification of Leaf Blast and Brown Spot Disease in Rice Plant",
      students: ["Abhas Kumar", "Sudhanshu Kumar"],
      year: "2020",
      institution: "IIIT Kalyani"
    },
    {
      title: "Automatic Attendance System",
      students: ["Tushar Nema", "Vikrant Kr. Sinha"],
      year: "2020",
      institution: "IIIT Kalyani"
    },
    {
      title: "E-Voting using Blockchain",
      students: ["Aman Kumar Singh", "Aman Prasad"],
      year: "2019",
      institution: "IIIT Kalyani"
    },
    {
      title: "Obstacle Detection in Automotive Environment",
      students: ["Ayush Kumar Agarwal"],
      year: "2019",
      institution: "IIIT Kalyani"
    },
    {
      title: "Image Integrity Analysis with Blockchain Technology",
      students: ["Anuj Kr. Pathak", "Sayan Shankhari"],
      year: "2019",
      institution: "IIIT Kalyani"
    },
    {
      title: "EyeGaze Tracking System based on Image Processing",
      students: ["Atul Sahay"],
      year: "2018",
      institution: "IIIT Kalyani"
    },
    {
      title: "Real Time Heart Beat Monitoring System",
      students: ["Abhishek Mishra", "Shubham Kumar"],
      year: "2018",
      institution: "IIIT Kalyani"
    },
    {
      title: "Face Detection and Recognition for E-Voting Applications",
      students: ["Shubham Kumar Rajput"],
      year: "2018",
      institution: "IIIT Kalyani"
    },
    {
      title: "Novel Approaches for Multi-bit Steganology in Spatial Domain",
      students: ["Debanjan Barman", "Uttiya Ghosh", "Smritikana Maity"],
      year: "2015",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Implementation of e-Governance Security",
      students: ["Aritro Banerjee", "Swagatam Chakraborti", "Sayantan Mukherjee"],
      year: "2016",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata",
      coSupervisor: "Biswajita Dutta"
    },
    {
      title: "Study and Implementation of Cryptographic Algorithms",
      students: ["Aayush Aishwani", "Suryatapa Banerjee", "Santosh Kumar"],
      year: "2015",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Design and Implementation of Cryptographic Algorithms using PRNG",
      students: ["Soumya Shankha Banerjee", "Dipanjan Deb", "Suparna Dutta"],
      year: "2015",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Comparative Study and Analysis of Image Steganographic Algorithms",
      students: ["Shibangee Bhattacharjee", "Tanusree Malla"],
      year: "2015",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Data Hiding for Secret Communication",
      students: ["Rituraj Banerjee", "Srijan Das"],
      year: "2015",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata",
      coSupervisor: "Biswajita Dutta"
    },
    {
      title: "Information Security through Data Hiding and Image Sanitization",
      students: ["Arnab Mukherjee", "Jarvish Altrin", "Arunangshu Poddar"],
      year: "2014",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Implementation of Image Processing Tools",
      students: ["Gaurav Kumar Rai", "Piyush Jain", "Jaydeep Aditya", "Nabanita Nath", "Pankaj Kumar Mahato"],
      year: "2014",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Protecting Privacy and Preventing Piracy",
      students: ["Avirupa Basu", "Subhojit Dutta", "Gulistan Mahtab", "Soumyodeep Raha"],
      year: "2013",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    },
    {
      title: "Image Steganography and LSB Sanitization",
      students: ["Subrato Roy Choudhury", "Zishan Ahmed", "Somak Bhattacharyya", "Debasish Ballabh"],
      year: "2013",
      institution: "St. Thomas' College of Engineering & Technology, Kolkata"
    }
  ];

  const otherInstitutions = [
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <PageHeader title="Academic Supervision" />

      {/* Header */}
      <section className="pt-24 pb-10 sm:pb-16">
        <div className="container text-center">
          <h1 className="text-display-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Academic Supervision
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive record of Dr. Imon Mukherjee's academic supervision across
            Ph.D., M.Tech., MS/M.Sc., and B.Tech. levels
          </p>
        </div>
      </section>

      {/* Supervision Tabs */}
      <section className="pb-16">
        <div className="container">
          <Tabs defaultValue="phd" className="w-full">
            <ScrollableTabsList cols="md:grid-cols-5" className="mb-8">
              <TabsTrigger value="phd" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <GraduationCap size={16} className="shrink-0" />
                Ph.D. ({phdAwarded.length + phdOngoing.length})
              </TabsTrigger>
              <TabsTrigger value="mtech" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <BookOpen size={16} className="shrink-0" />
                M.Tech. ({mtechStudents.length})
              </TabsTrigger>
              <TabsTrigger value="msc" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <BookOpen size={16} className="shrink-0" />
                MS/M.Sc. ({mscStudents.length})
              </TabsTrigger>
              <TabsTrigger value="btech" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <Users size={16} className="shrink-0" />
                B.Tech. ({btechProjects.length})
              </TabsTrigger>
              <TabsTrigger value="other" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <Users size={16} className="shrink-0" />
                Other ({otherInstitutions.length})
              </TabsTrigger>
            </ScrollableTabsList>

            {/* Ph.D. Tab */}
            <TabsContent value="phd" className="space-y-8">
              {/* Awarded Ph.D.s */}
              <div>
                <h3 className="text-display-sm font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Award className="text-green-600" size={24} />
                  Awarded Ph.D.s ({phdAwarded.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {phdAwarded.map((student, index) => (
                    <Card key={index} className="bg-gradient-to-r from-green-50 to-teal-50 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-4 sm:p-6">
                        <h4 className="font-semibold text-slate-800 text-lg mb-2">{student.name}</h4>
                        <p className="text-slate-600 text-sm mb-3 italic">{student.thesis}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar size={16} className="text-green-600" />
                          <span className="text-green-600 font-medium">{student.year}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-slate-600" />
                          <span className="text-slate-700 font-medium">{student.position}</span>
                        </div>
                        {student.coSupervisor && (
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Co-supervisor:</span> {student.coSupervisor}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Ongoing Ph.D.s */}
              <div>
                <h3 className="text-display-sm font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={24} />
                  Ongoing Ph.D.s ({phdOngoing.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {phdOngoing.map((student, index) => (
                    <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-4 sm:p-6">
                        <h4 className="font-semibold text-slate-800 text-lg mb-2">{student.name}</h4>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-600" />
                            <span className="text-slate-600 text-sm">
                              <span className="font-medium">Enrolled:</span> {student.enrollment}
                            </span>
                          </div>
                          {student.registration && (
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-purple-600" />
                              <span className="text-slate-600 text-sm">
                                <span className="font-medium">Registered:</span> {student.registration}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-slate-700 text-sm font-medium">{student.project}</p>
                        <Badge className={`mt-2 ${
                          student.status === "Thesis Submitted" 
                            ? "bg-yellow-500 text-white" 
                            : "bg-blue-500 text-white"
                        }`}>
                          {student.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* M.Tech Tab */}
            <TabsContent value="mtech" className="space-y-6">
              {mtechStudents.map((student, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold text-slate-800 text-lg mb-3">{student.name}</h3>
                    <p className="text-slate-600 mb-3 italic">{student.thesis}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-slate-600" />
                      <span className="text-slate-700">{student.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-600" />
                      <span className="text-slate-600">{student.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* M.Sc Tab */}
            <TabsContent value="msc" className="space-y-6">
              {mscStudents.map((student, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold text-slate-800 text-lg mb-3">{student.name}</h3>
                    <p className="text-slate-600 mb-3 italic">{student.thesis}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-slate-600" />
                      <span className="text-slate-700">{student.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-600" />
                      <span className="text-slate-600">{student.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* B.Tech Tab */}
            <TabsContent value="btech" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {btechProjects.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-semibold text-slate-800 text-lg mb-3">{project.title}</h3>
                      <div className="mb-3">
                        <p className="text-slate-600 text-sm font-medium mb-1">Students:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.students.map((student, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {student}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-slate-600" />
                        <span className="text-slate-700 text-sm">{project.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-600" />
                        <span className="text-slate-600 text-sm">{project.year}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other Institutions Tab */}
            <TabsContent value="other" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {otherInstitutions.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-semibold text-slate-800 text-lg mb-3">{project.title}</h3>
                      <div className="mb-3">
                        <p className="text-slate-600 text-sm font-medium mb-1">Students:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.students.map((student, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {student}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-slate-600" />
                        <span className="text-slate-700 text-sm">{project.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-slate-600" />
                        <span className="text-slate-600 text-sm">{project.year}</span>
                      </div>
                      {project.coSupervisor && (
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Co-supervisor:</span> {project.coSupervisor}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
        <div className="container text-center">
          <p className="text-slate-300">
            © 2024 Dr. Imon Mukherjee. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Distinguished Professor, Department of CSE, IIIT Kalyani
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AcademicSupervision;
