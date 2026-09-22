import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Users, Building, ExternalLink, Award, Briefcase } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ScrollableTabsList from "@/components/ScrollableTabsList";
import { useState } from "react";

const FundedProjects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof fundedProjects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NOTE: this list is this page's own copy. src/data/funding.ts holds a second,
  // leaner one that the homepage hero and its Grants section read. Both must be
  // updated together or the totals disagree — which has happened before, when
  // the hero quoted a stale hard-coded figure. Consolidating them is outstanding.
  const fundedProjects: {
    title: string;
    funding: string;
    investigators?: string[];
    duration?: string;
    totalCost: string;
    status: string;
    description?: string;
    outcomes?: string[];
    note?: string;
  }[] = [
    {
      title:
        "In-Context Learning and Multimodal Reasoning in Large Language Models: Foundations and Applications in Scholarly Information Access",
      funding: "ANRF-ARG, Government of India",
      totalCost: "99.96L",
      // This grant carries no duration, role or investigator list — those are
      // optional by design, and every read of them is guarded. Status is the one
      // field that cannot be blank: the stat row above counts Ongoing plus
      // Completed, so an unset status would leave those tiles summing to one
      // fewer than the project count.
      status: "Ongoing",
    },
    {
      title: "Study of Quantum Attacks on Stream Ciphers and Its Counter-Measures",
      funding: "DRDO, Govt. of India",
      investigators: ["Dr. Imon Mukherjee (IIIT Kalyani)", "Dr. Uma Das (IIIT Kalyani)"],
      duration: "Sept, 2022 – Sept, 2024",
      totalCost: "42.25L",
      status: "Completed",
      description: "Research focused on analyzing quantum attacks on stream ciphers and developing counter-measures to enhance cryptographic security in the quantum era.",
      outcomes: ["Quantum attack analysis", "Counter-measure development", "Security enhancement protocols"]
    },
    {
      title: "Extraction, Organization and Query of Scholarly Information",
      funding: "ANRF (CRG), Govt. of India",
      investigators: ["Dr. Imon Mukherjee (IIIT Kalyani)", "Dr. Debarshi Kumar Sanyal (Indian Association for the Cultivation of Science)"],
      duration: "March, 2022 to March, 2025",
      totalCost: "45.61L",
      status: "Ongoing",
      description: "Development of advanced systems for extracting, organizing, and querying scholarly information to improve research accessibility and knowledge discovery.",
      outcomes: ["Information extraction algorithms", "Knowledge organization systems", "Advanced query mechanisms"]
    },
    {
      title: "AI in Agriculture & Food Sustainability",
      funding: "MeitY, Govt. of India",
      investigators: ["Dr. Imon Mukherjee (IIIT Kalyani)", "Dr. Sanjay Chatterji (IIIT Kalyani)", "Dr. Sanjoy Pratihar (IIIT Kalyani)"],
      duration: "March, 2020 to March, 2023",
      totalCost: "16.18L",
      status: "Completed",
      description: "Application of artificial intelligence techniques to improve agricultural practices and ensure food sustainability through advanced monitoring and prediction systems.",
      outcomes: ["AI-based crop monitoring", "Disease prediction systems", "Sustainable farming solutions"]
    },
    {
      title: "Implementation of Security in eGovernance through Steganography",
      funding: "DST, Govt. of West Bengal",
      investigators: ["Dr. Imon Mukherjee (IIIT Kalyani*)", "Dr. Biswajita Dutta (St. Thomas' College of Engineering & Technology)"],
      duration: "July, 2013, to June, 2016",
      totalCost: "1.85L",
      status: "Completed",
      description: "Development of steganographic techniques to enhance security in e-governance systems, ensuring secure communication and data protection.",
      outcomes: ["Steganographic protocols", "e-Governance security", "Data protection methods"],
      note: "*The work was done at St. Thomas' College of Engineering & Technology, Kolkata."
    }
  ];


  // Agency roll-up, derived rather than written out. The four cards below used
  // to carry hardcoded names and totals; ANRF's still read ₹45.61L after the
  // ₹99.96L ARG grant was added, and its description was SERB's expansion. A
  // figure typed beside the list it summarises drifts from that list.
  const agencies = [
    { key: "DRDO",  label: "DRDO",   name: "Defence Research & Development Organisation", tone: "text-signal" },
    { key: "ANRF",  label: "ANRF",   name: "Anusandhan National Research Foundation",     tone: "text-status-good" },
    { key: "MeitY", label: "MeitY",  name: "Ministry of Electronics & IT",                tone: "text-signal" },
    { key: "DST",   label: "DST-WB", name: "DST, Govt. of West Bengal",                   tone: "text-status-warn" },
  ].map((a) => ({
    ...a,
    total: fundedProjects
      .filter((proj) => proj.funding.startsWith(a.key))
      .reduce((sum, proj) => sum + (parseFloat(proj.totalCost.replace("L", "")) || 0), 0),
  }));

  const totalFunding = fundedProjects.reduce((sum, project) => {
    const amount = parseFloat(project.totalCost.replace('L', ''));
    return sum + amount;
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "ds-chip border-status-good";
      case "Ongoing":
        return "ds-chip border-cat-1";
      case "Proposed":
        return "ds-chip border-cat-4";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getFundingColor = (amount: string) => {
    const value = parseFloat(amount.replace('L', ''));
    if (value >= 40) return "text-status-good";
    if (value >= 20) return "text-signal";
    if (value >= 10) return "text-signal";
    return "text-status-warn";
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Funded Projects" />

      {/* Header */}
      <section className="pt-24 pb-10 sm:pb-16">
        <div className="container text-center">
          <h1 className="text-display-lg font-bold ds-display mb-6">
            Funded Research Projects
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-ink-2 max-w-3xl mx-auto mb-8">
            Comprehensive portfolio of research projects funded by prestigious government agencies 
            and organizations, demonstrating Dr. Imon Mukherjee's leadership in cutting-edge research
          </p>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
            <Card className="bg-surface-2 border-l-4 border-l-blue-600">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-signal mb-2">{fundedProjects.length}</div>
                <div className="text-sm sm:text-base text-ink-2">Total Projects</div>
              </CardContent>
            </Card>
            <Card className="bg-surface-2 border-l-4 border-l-green-600">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-status-good mb-2">₹{totalFunding.toFixed(2)}L</div>
                <div className="text-sm sm:text-base text-ink-2">Total Funding</div>
              </CardContent>
            </Card>
            <Card className="bg-surface-2 border-l-4 border-l-signal">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-signal mb-2">{fundedProjects.filter(p => p.status === "Ongoing").length}</div>
                <div className="text-sm sm:text-base text-ink-2">Active Projects</div>
              </CardContent>
            </Card>
            <Card className="bg-surface-2 border-l-4 border-l-signal">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-status-warn mb-2">{fundedProjects.filter(p => p.status === "Completed").length}</div>
                <div className="text-sm sm:text-base text-ink-2">Completed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects.
          Previously grouped under four headings by substring-matching the title
          for "quantum", "ai", "security" and so on. Dr. Mukherjee asked for the
          categories to go: they split five projects across four headings, and a
          title matching no keyword would have vanished from the page entirely. */}
      <section className="pb-16">
        <div className="container">
          <Tabs defaultValue="funded" className="w-full">
            <ScrollableTabsList cols="md:grid-cols-2" className="mb-8">
              <TabsTrigger value="funded" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <Award size={16} className="shrink-0" />
                Funded Projects ({fundedProjects.length})
              </TabsTrigger>
              <TabsTrigger value="consultancy" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <Briefcase size={16} className="shrink-0" />
                Consultancy Projects
              </TabsTrigger>
            </ScrollableTabsList>

            <TabsContent value="funded">
                <div className="grid md:grid-cols-2 gap-8">
                  {fundedProjects.map((project, index) => (
                    <Card key={index} className="transition-colors ds-plane">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <CardTitle className="text-ink-1 text-lg leading-tight">{project.title}</CardTitle>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Building size={16} className="text-signal" />
                            <Badge variant="outline" className="bg-surface-2">
                              {project.funding}
                            </Badge>
                          </div>
                          
                          {project.investigators && project.investigators.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-signal" />
                              <div className="text-sm text-ink-2">
                                <span className="font-medium">Investigators:</span>
                                <ul className="mt-1 space-y-1">
                                  {project.investigators.map((investigator, idx) => (
                                    <li key={idx} className="text-xs">• {investigator}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                          
                          {project.duration && (
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-status-good" />
                              <span className="text-ink-2 text-sm">{project.duration}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-status-warn" />
                            <span className={`font-semibold text-lg ${getFundingColor(project.totalCost)}`}>
                              ₹{project.totalCost}
                            </span>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-rule">
                          {project.description && (
                            <p className="text-ink-1 text-sm mb-3">{project.description}</p>
                          )}

                          {project.outcomes && project.outcomes.length > 0 && (
                            <div className="mb-3">
                              <p className="text-ink-2 text-sm font-medium mb-2">Key Outcomes:</p>
                              <div className="flex flex-wrap gap-1">
                                {project.outcomes.map((outcome, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-surface-2">
                                    {outcome}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {project.note && (
                            <div className="p-3 bg-surface-2 border border-rule rounded-lg">
                              <p className="text-status-warn text-xs italic">{project.note}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end pt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-surface-2"
                            onClick={() => {
                              setSelectedProject(project);
                              setIsModalOpen(true);
                            }}
                          >
                            <ExternalLink size={16} />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            </TabsContent>

            <TabsContent value="consultancy">
              <Card className="ds-plane">
                <CardContent className="p-6 sm:p-8">
                  <p className="ds-label">Total projects offered</p>
                  <p className="ds-data mt-2 text-4xl leading-none text-ink-1">07</p>
                  <p className="mt-4 text-sm text-ink-2">
                    Not allowed as per institute norms.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Funding Agencies */}
      <section className="pb-16 bg-surface-1">
        <div className="container">
          <h2 className="text-display-md font-bold text-center text-ink-1 mb-12">Funding Agencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {agencies.map((agency) => (
              <Card key={agency.key} className="text-center transition-colors">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building size={32} className={agency.tone} />
                  </div>
                  <h3 className="font-semibold text-ink-1 mb-2">{agency.label}</h3>
                  <p className="text-sm text-ink-2">{agency.name}</p>
                  <p className={`text-lg font-bold mt-2 ${agency.tone}`}>₹{agency.total.toFixed(2)}L</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-2 text-ink-2 border-t border-rule py-8">
        <div className="container text-center">
          <p className="text-ink-3">
            © {new Date().getFullYear()} Dr. Imon Mukherjee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FundedProjects;
