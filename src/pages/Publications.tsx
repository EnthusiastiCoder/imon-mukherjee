import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, FileText, Award, Search } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ScrollableTabsList from "@/components/ScrollableTabsList";
import { journalPublications } from "@/data/publications";

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const conferencePublications = [
    // {
    //   title: "A Quantum Public Key Cryptographic Scheme using Entangled States and Grover Operator",
    //   authors: "Soumen Bajpayee, Sarbani Sen, Prithwish Dey, Imon Mukherjee",
    //   conference: "3rd International Conference on Security and Privacy (ICSP 2024)",
    //   venue: "National Institute of Technology, Jamshedpur",
    //   date: "20-21st November, 2024",
    //   publisher: "Springer",
    //   status: "Accepted"
    // },
    // {
    //   title: "Analysis of the Effects of Crosstalk Errors on Various Quantum Circuits",
    //   authors: "Soumen Bajpayee, Imon Mukherjee",
    //   conference: "37th International Conference on VLSI Design (VLSID 2024)",
    //   venue: "Kolkata, India",
    //   date: "6-10th January, 2024",
    //   publisher: "IEEE",
    //   doi: "10.1109/VLSID60093.2024.00074"
    // },
    // {
    //   title: "Few-TK: A Dataset for Few-shot Scientific Typed Keyphrase Recognition",
    //   authors: "Avishek Lahiri, Imon Mukherjee, Debarshi",
    //   conference: "Findings of the Association for Computational Linguistics: NAACL 2024",
    //   venue: "Mexico",
    //   date: "2024",
    //   publisher: "ACL",
    //   doi: "10.18653/v1/2024.findings-naacl.253"
    // },
    // {
    //   title: "Disjunctive Edge Map based Image Sterilization for Destruction of Steganograms in Spatial Domain",
    //   authors: "Sreeparna Ganguly, Srijanjeet Singh Sehra, Imon Mukherjee",
    //   conference: "2023 IEEE Silchar Subsection Conference (SILCON 2023)",
    //   venue: "National Institute of Technology Silchar",
    //   date: "2023",
    //   publisher: "IEEE",
    //   award: "Best Paper Award"
    // },
    // {
    //   title: "A Keyphrase-Centric Search Engine for Scientific Papers",
    //   authors: "Avishek Lahiri, Debarshi Kumar Sanyal and Imon Mukherjee",
    //   conference: "15th Annual Meeting of the Forum for Information Retrieval Evaluation",
    //   venue: "Association for Computing Machinery (ACM), New York, NY, USA",
    //   date: "2023",
    //   publisher: "ACM",
    //   doi: "10.1145/3632754.3632772"
    // }
    {
      title: "Information Hiding Framework for Secure Communication of Consumer Data in Smartgrids",
      authors: "Sreeparna Ganguly, Abhisek Banerjee, and Imon Mukherjee",
      conference: "10th International Conference on Computer Vision and Image Processing (CVIP - 2025)",
      venue: "IIT Roper, India",
      date: "2025",
      publisher: "",
      status: "Accepted"
    },
    {
      title: "Agentic Stego Content Sterilization using Chain-of-Agent Architectures in MLOps Pipelines",
      authors: "Abhisek Banerjee, Sreeparna Ganguly, Imon Mukherjee, and Nabanita Ganguly",
      conference: "10th International Conference on Computer Vision and Image Processing (CVIP - 2025)",
      venue: "IIT Roper, India",
      date: "2025",
      publisher: "",
      status: "Accepted"
    },
    {
      title: "Quantum Quest: Resource Requirement of RC4 Cryptanalysis under Grover’s Lens",
      authors: "S. Sen, S. Bajpayee, I. Mukherjee, G. Paul and B. Singh",
      conference: "2024 IEEE Calcutta Conference (CALCON)",
      venue: "Kolkata, India",
      date: "2024",
      publisher: "IEEE",
      doi: "https://doi.org/10.1109/CALCON63337.2024.10914073",
      pages: "1-5"
    },
    {
      title: "Quantum Teleportation under Siege: Analyzing Noise Attack with Virtual Entanglement",
      authors: "S. Bajpayee, S. Sen, A. Mandal and I. Mukherjee",
      conference: "2024 IEEE Calcutta Conference (CALCON)",
      venue: "Kolkata, India",
      date: "2024",
      publisher: "IEEE",
      doi: "https://doi.org/10.1109/CALCON63337.2024.10914263",
      pages: "1-5"
    },
    {
      title: "A Quantum Public Key Cryptographic Scheme using Entangled States and Grover Operator",
      authors: "Soumen Bajpayee, Sarbani Sen, Prithwish Dey, Imon Mukherjee",
      conference: "3rd International Conference on Security and Privacy (ICSP 2024)",
      venue: "National Institute of Technology, Jamshedpur",
      date: "20-21st November, 2024",
      publisher: "Springer",
      status: "Accepted"
    },
    {
      title: "Analysis of the Effects of Crosstalk Errors on Various Quantum Circuits",
      authors: "Soumen Bajpayee, Imon Mukherjee",
      conference: "37th International Conference on VLSI Design (VLSID 2024)",
      venue: "Kolkata, India",
      date: "6-10th January, 2024",
      publisher: "IEEE",
      doi: "10.1109/VLSID60093.2024.00074"
    },
    {
      title: "Few-TK: A Dataset for Few-shot Scientific Typed Keyphrase Recognition",
      authors: "Avishek Lahiri, Imon Mukherjee, Debarshi",
      conference: "Findings of the Association for Computational Linguistics: NAACL 2024",
      venue: "Mexico",
      date: "2024",
      publisher: "ACL",
      doi: "10.18653/v1/2024.findings-naacl.253"
    },
    {
      title: "Disjunctive Edge Map based Image Sterilization for Destruction of Steganograms in Spatial Domain",
      authors: "Sreeparna Ganguly, Srijanjeet Singh Sehra, Imon Mukherjee",
      conference: "2023 IEEE Silchar Subsection Conference (SILCON 2023)",
      venue: "National Institute of Technology Silchar",
      date: "2023",
      publisher: "IEEE",
      award: "Best Paper Award"
    },
    {
      title: "A Keyphrase-Centric Search Engine for Scientific Papers",
      authors: "Avishek Lahiri, Debarshi Kumar Sanyal and Imon Mukherjee",
      conference: "15th Annual Meeting of the Forum for Information Retrieval Evaluation",
      venue: "Association for Computing Machinery (ACM), New York, NY, USA",
      date: "2023",
      publisher: "ACM",
      doi: "10.1145/3632754.3632772"
    },
    {
      title: "Annihilation of Image Stegogram Through Deep Texture Extraction Based Sterilization",
      authors: "Sreeparna Ganguly, Ankit Mishra, Imon Mukherjee",
      conference: "Pattern Recognition and Machine Intelligence (PReMI 2023)",
      venue: "Lecture Notes in Computer Science, vol 14301, Springer, Cham",
      date: "2023",
      doi: "10.1007/978-3-031-45170-6_69"
    },
    {
      title: "Combating Hallucination and Misinformation: Factual Information Generation with Tokenized Generative Transformer",
      authors: "Sourav Das, Sanjay Chatterji, and Imon Mukherjee",
      conference: "Joint 3rd International Conference on Natural Language Processing for Digital Humanities and 8th International Workshop on Computational Linguistics for Uralic Languages (NLP4DH and IWCLUL 2023)",
      venue: "Tokyo, Japan",
      date: "Dec 1-3, 2023"
    },
    {
      title: "A Multiple Criteria Decision Making Approach for Ranking Cricket Captains",
      authors: "Nayan Ranjan Das, Imon Mukherjee, Goutam Paul and Ratna Priya",
      conference: "2023 IEEE Guwahati Subsection Conference (GCON)",
      venue: "Guwahati, India",
      date: "2023",
      doi: "10.1109/GCON58516.2023.10183420"
    },
    {
      title: "AgriNER: An NER Dataset of Agricultural Entities for the Semantic Web",
      authors: "Sayan De, Debarshi K. Sanyal, Imon Mukherjee",
      conference: "ESWC 2023",
      venue: "Hersonissos, Greece",
      date: "May 28- June 1, 2023",
      note: "Scopus Indexed, Tier-I Conference"
    },
    {
      title: "CitePrompt: Using Prompts to Identify Citation Intent in Scientific Papers",
      authors: "Avishek Lahiri, Debarshi Kumar Sanyal and Imon Mukherjee",
      conference: "JCDL 2023",
      venue: "Santa Fe, New Mexico, USA",
      date: "June 26 - 30, 2023"
    },
    {
      title: "Pose Recognition in Cricket using Keypoints",
      authors: "Rahul Mili, Nayan Ranjan Das, Arjun Tandon, Saquelain Mokhtar, Imon Mukherjee, Goutam Paul",
      conference: "2022 IEEE 9th Uttar Pradesh Section International Conference on Electrical, Electronics and Computer Engineering (UPCON)",
      venue: "IIIT Allahabad, Prayagraj, India",
      date: "2022",
      doi: "10.1109/UPCON56432.2022.9986481"
    },
    {
      title: "A custom CNN model for detection of rice disease under complex environment",
      authors: "Chiranjit Pal, Sanjoy Pratihar, and Imon Mukherjee",
      conference: "First Workshop on NLP in Agriculture and Livestock Management",
      venue: "IIIT Delhi, New Delhi, India",
      date: "2022"
    },
    {
      title: "Image Sterilization through Adaptive Noise Blending in Integer Wavelet Transformation",
      authors: "Sreeparna Ganguly and Imon Mukherjee",
      conference: "2022 IEEE 19th India Council International Conference (INDICON)",
      venue: "NIT Warangal, India",
      date: "2022",
      doi: "10.1109/INDICON56171.2022.10039861"
    },
    {
      title: "Comparative Study on Various CNNs for Classification and Identification of Biotic Stress of Paddy Leaf",
      authors: "Soham Biswas, Chiranjit Pal, Imon Mukherjee",
      conference: "Advances in Data-Driven Computing and Intelligent Systems (ADCIS 2022)",
      venue: "IIT Guwahati",
      date: "2022",
      doi: "10.1007/978-981-99-3250-4_9"
    },
    {
      title: "Automatic Rice Crop Extraction using Edge based Color Features and Color Indices",
      authors: "Chiranjit. Pal, Sanjoy Pratihar, Sanjay Chatterji and Imon Mukherjee",
      conference: "2nd Asian Conference on Innovation in Technology (ASIANCON)",
      venue: "Ravet, India",
      date: "2022",
      doi: "10.1109/ASIANCON55314.2022.9908801"
    },
    {
      title: "Investigating the Impact of COVID-19 on Important Economic Indicators",
      authors: "Debanjan Banerjee, Arijit Ghosal, Imon Mukherjee",
      conference: "Computational Intelligence in Data Mining",
      venue: "Springer, Singapore",
      date: "2022",
      doi: "10.1007/978-981-16-9447-9_34"
    },
    {
      title: "Index-Based Improved High Capacity Data Hiding Technique",
      authors: "Pratap Chandra Mandal, Imon Mukherjee",
      conference: "FICTA 2021, NIT Mizoram",
      venue: "",
      date: "2022",
      doi: "10.1007/978-981-16-6616-2_48"
    },
    {
      title: "Generating Synthetic Data for Deep Learning using VR Digital Twin",
      authors: "Abhishek Mukhopadhyay, GS Rajshekar Reddy, Imon Mukherjee, Gokul Kumar Gopa, Anasol Pena-Rios, and Pradipta Biswas",
      conference: "2021 5th International Conference on Cloud and Big Data Computing (ICCBDC ’21)",
      venue: "",
      date: "2021",
      doi: "10.1145/3481646.3481655"
    },
    {
      title: "Modified Hedonic Based Price Prediction Model for Players in IPL Auction",
      authors: "Nayan Ranjan Das, Ratna Priya, Imon Mukherjee, Goutam Paul",
      conference: "2021 12th International Conference on Computing Communication and Networking Technologies (ICCCNT)",
      venue: "IIT Kharagpur, India",
      date: "2021",
      doi: "10.1109/ICCCNT51525.2021.9580108"
    },
    {
      title: "Integer Wavelet Transform based Secured Image Steganography using LSB and Coefficient Value Differencing",
      authors: "Pratap Chandra Mandal and Imon Mukherjee",
      conference: "2021 2nd International Conference on Secure Cyber Computing and Communications (ICSCCC)",
      venue: "NIT Jalandhar, India",
      date: "2021",
      doi: "10.1109/ICSCCC52869.2021.9644637"
    },
    {
      title: "Epileptic Seizure Prediction from Raw EEG Signal Using Convolutional Neural Network",
      authors: "Ranjan Jana, Imon Mukherjee",
      conference: "MAI 2021, IIITDM Jabalpur",
      venue: "",
      date: "2021",
      doi: "10.1007/978-981-16-5078-9_20"
    },
    {
      title: "A Type-Specific Attention Model For Fine Grained Entity Type Classification",
      authors: "Atul Sahay, Kavi Arya, Smita Gholkar, Imon Mukherjee",
      conference: "7th International Conference on Advanced Computing, Networking, and Informatics",
      venue: "",
      date: "2019",
      doi: "10.1007/978-981-15-8610-1_8"
    }
    ,
    {
      title: "Decoding CNN based Object Classifier Using Visualization",
      authors: "Abhishek Mukhopadhyay, Imon Mukherjee, and Pradipta Biswas",
      conference: "12th International Conference on Automotive User Interfaces and Interactive Vehicular Applications (AutomotiveUI '20)",
      venue: "Association for Computing Machinery, New York, NY, USA",
      date: "2020",
      doi: "10.1145/3409251.3411721",
      note: "50–53, Scopus Indexed"
    },
    {
      title: "Comparing CNNs for non-conventional traffic participants",
      authors: "Abhishek Mukhopadhyay, Imon Mukherjee, and Pradipta Biswas",
      conference: "11th International Conference on Automotive User Interfaces and Interactive Vehicular Applications: Adjunct Proceedings (AutomotiveUI '19)",
      venue: "Association for Computing Machinery, New York, NY, USA",
      date: "2019",
      doi: "10.1145/3349263.3351336",
      note: "171–175, Scopus Indexed, ACM Global Fellowship Award"
    },
    {
      title: "Performance Comparison of Different CNN models for Indian Road Dataset",
      authors: "Abhishek Mukhopadhyay, Pradipta Biswas, Ayush Agarwal, and Imon Mukherjee",
      conference: "3rd International Conference on Graphics and Signal Processing (ICGSP '19)",
      venue: "Association for Computing Machinery, New York, NY, USA",
      date: "2019",
      doi: "10.1145/3338472.3338480",
      note: "29–33, Scopus Indexed, Best Presentation Award"
    },
    {
      title: "PCB Inspection in the Context of Smart Manufacturing",
      authors: "Abhishek Mukhopadhyay, L.R.D. Murthy, Manish Arora, Amaresh Chakrabarti, Imon Mukherjee, Pradipta Biswas",
      conference: "Research into Design for a Connected World (Smart Innovation, Systems and Technologies, vol 134)",
      venue: "Springer, Singapore",
      date: "2019",
      doi: "10.1007/978-981-13-5974-3_57",
      note: "Scopus Indexed"
    },
    {
      title: "Prediction of Gold Price Movement Using Geopolitical Risk as a Factor",
      authors: "Debanjan Banerjee, Arijit Ghosal, Imon Mukherjee",
      conference: "Emerging Technologies in Data Mining and Information Security (Advances in Intelligent Systems and Computing, vol 814)",
      venue: "Springer, Singapore",
      date: "2019",
      doi: "10.1007/978-981-13-1501-5_77",
      note: "Scopus Indexed"
    },
    {
      title: "Prediction of Gold Price Movement Using Discretization Procedure",
      authors: "Debanjan Banerjee, Arijit Ghosal, Imon Mukherjee",
      conference: "Computational Intelligence in Data Mining (Advances in Intelligent Systems and Computing, vol 711)",
      venue: "Springer, Singapore",
      date: "2019",
      doi: "10.1007/978-981-10-8055-5_31",
      note: "Scopus Indexed"
    },
    {
      title: "A Framework for Pixel Intensity Modulation Based Image Steganography",
      authors: "Srijan Das, Saurav Sharma, Sambit Bakshi, Imon Mukherjee",
      conference: "Progress in Advanced Computing and Intelligent Engineering (Advances in Intelligent Systems and Computing, vol 563)",
      venue: "Springer, Singapore",
      date: "2018",
      doi: "10.1007/978-981-10-6872-0_1",
      note: "Scopus Indexed"
    },
    {
      title: "Adaptive Multi-bit Image Steganography Using Pixel-Pair Differential Approach",
      authors: "Uttiya Ghosh, Debanjan Burman, Smritikana Maity, Imon Mukherjee",
      conference: "Progress in Advanced Computing and Intelligent Engineering (Advances in Intelligent Systems and Computing, vol 563)",
      venue: "Springer, Singapore",
      date: "2018",
      doi: "10.1007/978-981-10-6872-0_5",
      note: "Scopus Indexed"
    },
    {
      title: "A Novel Approach to E-Voting Using Multi-bit Steganography",
      authors: "Soura Dutta, Xavier Das, Ritam Ganguly, Imon Mukherjee",
      conference: "Proceedings of the First International Conference on Intelligent Computing and Communication (Advances in Intelligent Systems and Computing, vol 458)",
      venue: "Springer, Singapore",
      date: "2017",
      doi: "10.1007/978-981-10-2035-3_59",
      note: "Scopus Indexed"
    },
    {
      title: "Privacy preserving of two sixteen-segmented image using visual cryptography",
      authors: "Imon Mukherjee and Ritam Ganguly",
      conference: "2015 IEEE International Conference on Research in Computational Intelligence and Communication Networks (ICRCICN)",
      venue: "Kolkata, India",
      date: "2015",
      doi: "10.1109/ICRCICN.2015.7434275",
      note: "Scopus Indexed"
    },
    {
      title: "A novel double layered image steganography in spatial domain using triangular number system",
      authors: "Pratik Halder and Imon Mukherjee",
      conference: "2015 IEEE International Conference on Research in Computational Intelligence and Communication Networks (ICRCICN)",
      venue: "Kolkata, India",
      date: "2015",
      doi: "10.1109/ICRCICN.2015.7434274",
      note: "Scopus Indexed"
    },
    {
      title: "Statistical Attack Resistant Multi-Bit Steganography Using Mobile Keypad Character Encoding",
      authors: "Uttiya Ghosh, Smritikana Maity, Imon Mukherjee",
      conference: "International Conference on Telecommunication Technology & Management (ICTTM-2015)",
      venue: "IIT Delhi",
      date: "2015",
      note: "Scopus Indexed"
    },
    {
      title: "A Novel Distant E-Voting Mechanism Using Dual Layer Security",
      authors: "Soura Dutta, Ritam Ganguly, Xavier Das, Imon Mukherjee, S. Bhattacharjee",
      conference: "International Conference on Telecommunication Technology & Management (ICTTM-2015)",
      venue: "IIT Delhi",
      date: "2015",
      note: "Scopus Indexed"
    },
    {
      title: "Sterilization of Stego-images through Histogram Normalization",
      authors: "Goutam Paul, Imon Mukherjee",
      conference: "11th International Conference on Security and Management",
      venue: "Las Vegas, USA",
      date: "2012",
      note: "Proceedings pages 16-20"
    },
    {
      title: "Context Based Speech Analysis of Bengali Language as a Part of TTS Conversion",
      authors: "Nabanita Mukherjee, Imon Mukherjee, Debnath Bhattacharyya, Tai-hoon Kim",
      conference: "Signal Processing, Image Processing and Pattern Recognition (SIP 2011)",
      venue: "Springer, Berlin, Heidelberg",
      date: "2011",
      doi: "https://doi.org/10.1007/978-3-642-27183-0_22",
      note: "Scopus Indexed"
    },
    {
      title: "Double Bit Sterilization of Stego Images",
      authors: "Imon Mukherjee, Goutam Paul",
      conference: "10th International Conference on Security and Management (SAM)",
      venue: "",
      date: "2011",
      note: "Volume 1, Pages 743-746"
    }
  ];

  const bookChapters = [
    {
      title: "DWT Difference Modulation Based Novel Steganographic Algorithm",
      authors: "Imon Mukherjee, Biswajita Dutta, Rituraj Banerjee, Srijan Das",
      book: "Lecture Notes, Chapter 36, pp. 1-10, vol. 9478",
      publisher: "Springer",
      year: "2015",
      isbn: "978-3-319-26960-3"
    },
    {
      title: "DCT Based Robust Multi-bit Steganographic Algorithm",
      authors: "Imon Mukherjee, Arunanshu Podder",
      book: "Advanced Computing, Networking and Informatics- Volume 2, Chapter 41, pp. 375-382",
      publisher: "Springer",
      year: "2014",
      isbn: "978-3-319-07349-1"
    },
    {
      title: "Efficient Multi-bit Image Steganography in Spatial Domain",
      authors: "Imon Mukherjee and Goutam Paul",
      book: "Lecture Notes, Chapter 21, pp. 270-284, vol. 8303",
      publisher: "Springer",
      year: "2013",
      isbn: "978-3-642-45203-1"
    },
    {
      title: "Keyless Steganography in Spatial Domain using Energetic Pixels",
      authors: "Goutam Paul, Ian Davidson, Imon Mukherjee and S.S. Ravi",
      book: "Lecture Notes, Chapter 10, pp. 134-148, vol. 7671",
      publisher: "Springer",
      year: "2012",
      isbn: "978-3-642-35129-7"
    }
  ];

  const patents = [
    {
      title: "An Intelligent Device for Seizure Prediction Using Ensemble Learning for Smart Healthcare",
      inventors: "Ranjan Jana, Imon Mukherjee, Hiranmoy Roy, Soumyadip Dhar",
      applicationNumber: "202431039903",
      publishedDate: "31st May, 2024"
    },
    {
      title: "Drone-Augmented Pest Control System",
      inventors: "Koushik Deb, Imon Mukherjee",
      applicationNumber: "202431013004",
      publishedDate: "08/03/2024"
    }
  ];

  const filteredJournals = journalPublications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredConferences = conferencePublications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.conference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <PageHeader title="Publications" />

      {/* Header */}
      <section className="pt-24 pb-10 sm:pb-16">
        <div className="container text-center">
          <h1 className="text-display-lg font-bold ds-display mb-6">
            Publications
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-ink-2 max-w-3xl mx-auto">
            Comprehensive collection of Dr. Imon Mukherjee's research contributions in
            Quantum Computing, Steganography, and Information Security
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="pb-8">
        <div className="container max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" size={20} />
            <Input
              placeholder="Search publications…"
              aria-label="Search publications by title, authors, or journal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-base sm:text-lg min-h-[44px]"
            />
          </div>
        </div>
      </section>

      {/* Publications Tabs */}
      <section className="pb-16">
        <div className="container">
          <Tabs defaultValue="journals" className="w-full">
            <ScrollableTabsList cols="md:grid-cols-4" className="mb-8">
              <TabsTrigger value="journals" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <FileText size={16} className="shrink-0" />
                Journals ({filteredJournals.length})
              </TabsTrigger>
              <TabsTrigger value="conferences" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <BookOpen size={16} className="shrink-0" />
                Conferences ({filteredConferences.length})
              </TabsTrigger>
              <TabsTrigger value="chapters" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <BookOpen size={16} className="shrink-0" />
                Book Chapters ({bookChapters.length})
              </TabsTrigger>
              <TabsTrigger value="patents" className="flex shrink-0 items-center gap-2 min-h-[40px]">
                <Award size={16} className="shrink-0" />
                Patents ({patents.length})
              </TabsTrigger>
            </ScrollableTabsList>

            {/* Journals Tab */}
            <TabsContent value="journals" className="space-y-6">
              {filteredJournals.map((pub, index) => (
                <Card key={index} className="transition-colors ds-plane">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1 break-words">
                        <h3 className="font-semibold text-ink-1 mb-3 text-lg">{pub.title}</h3>
                        <p className="text-ink-2 mb-2 italic">{pub.authors}</p>
                        <p className="text-ink-1 mb-1 font-medium">{pub.journal}</p>
                        {/* Volume / issue / pages, assembled only from the parts a
                            given citation actually carries — journals that number
                            articles instead of paginating supply articleNo. */}
                        {(pub.volume || pub.issue || pub.pages || pub.articleNo || pub.month) && (
                          <p className="text-ink-2 mb-3 text-sm">
                            {[
                              pub.volume && `Vol. ${pub.volume}`,
                              pub.issue && `No. ${pub.issue}`,
                              pub.articleNo && `Article ${pub.articleNo}`,
                              pub.pages && (pub.pages.includes("page") ? pub.pages : `pp. ${pub.pages}`),
                              pub.month,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="bg-surface-2">
                            {pub.year}
                          </Badge>
                          <Badge className="ds-chip border-cat-1">
                            {pub.indexed}
                          </Badge>
                          {/* Also skip when empty, not just "N/A". The three most
                              recent papers have no impact factor supplied, and the
                              previous check rendered a bare "IF:" badge for them. */}
                          {pub.impactFactor && pub.impactFactor !== "N/A" && (
                            <Badge className="ds-chip border-cat-3">
                              IF: {pub.impactFactor}
                            </Badge>
                          )}
                        </div>
                        {pub.doi && (
                          <p className="text-sm text-ink-3 mt-2">
                            DOI: <span className="font-mono break-all">{pub.doi}</span>
                          </p>
                        )}
                      </div>
                      {pub.doi && (
                        <a 
                          href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="sm" className="hover:bg-surface-2">
                            <ExternalLink size={16} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Conferences Tab */}
            <TabsContent value="conferences" className="space-y-6">
              {filteredConferences.map((pub, index) => (
                <Card key={index} className="transition-colors ds-plane">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1 break-words">
                        <h3 className="font-semibold text-ink-1 mb-3 text-lg">{pub.title}</h3>
                        <p className="text-ink-2 mb-2 italic">{pub.authors}</p>
                        <p className="text-ink-1 mb-2 font-medium">{pub.conference}</p>
                        <p className="text-ink-2 mb-3">{pub.venue}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="bg-surface-2">
                            {pub.date}
                          </Badge>
                          <Badge className="ds-chip border-cat-3">
                            {pub.publisher}
                          </Badge>
                          {pub.award && (
                            <Badge className="ds-chip border-cat-4">
                              {pub.award}
                            </Badge>
                          )}
                        </div>
                        {pub.doi && (
                          <p className="text-sm text-ink-3 mt-2">
                            DOI: <span className="font-mono break-all">{pub.doi}</span>
                          </p>
                        )}
                      </div>
                      {pub.doi && (
                        <a 
                          href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="sm" className="hover:bg-surface-2">
                            <ExternalLink size={16} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Book Chapters Tab */}
            <TabsContent value="chapters" className="space-y-6">
              {bookChapters.map((chapter, index) => (
                <Card key={index} className="transition-colors ds-plane">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1 break-words">
                        <h3 className="font-semibold text-ink-1 mb-3 text-lg">{chapter.title}</h3>
                        <p className="text-ink-2 mb-2 italic">{chapter.authors}</p>
                        <p className="text-ink-1 mb-2 font-medium">{chapter.book}</p>
                        <p className="text-ink-2 mb-3">{chapter.publisher}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="bg-surface-2">
                            {chapter.year}
                          </Badge>
                          <Badge className="ds-chip border-cat-1">
                            ISBN: {chapter.isbn}
                          </Badge>
                        </div>
                      </div>
                      <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(chapter.isbn)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" className="hover:bg-surface-2">
                          <ExternalLink size={16} />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Patents Tab */}
            <TabsContent value="patents" className="space-y-6">
              {patents.map((patent, index) => (
                <Card key={index} className="transition-colors ds-plane">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1 break-words">
                        <h3 className="font-semibold text-ink-1 mb-3 text-lg">{patent.title}</h3>
                        <p className="text-ink-2 mb-2 italic">{patent.inventors}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="bg-surface-2">
                            {patent.publishedDate}
                          </Badge>
                          <Badge className="ds-chip border-cat-2">
                            {patent.applicationNumber}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-2 text-ink-2 border-t border-rule py-8">
        <div className="container text-center">
          <p className="text-ink-3">
            © {new Date().getFullYear()} Dr. Imon Mukherjee. All rights reserved.
          </p>
          <p className="text-ink-3 text-sm mt-2">
            Distinguished Professor, Department of CSE, IIIT Kalyani
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Publications;
