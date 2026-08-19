/**
 * Journal publications — the single source of truth.
 *
 * Previously this list existed twice: in full on the Publications page and as a
 * hand-picked subset on the homepage. The two drifted, and it showed. The
 * homepage described the IEEE Transactions on Consumer Electronics paper as
 * "Accepted" long after it had been published as volume 71, issue 4 — the same
 * class of error as the hard-coded funding total. Both pages now read from here.
 *
 * Ordered newest first. The homepage takes the leading entries, so adding a
 * paper at the top is all that is needed to feature it.
 *
 * `impactFactor` is intentionally optional and intentionally empty on the three
 * most recent papers: no impact factor was supplied for them, and inventing one
 * for a real academic's publication list would be worse than omitting it. The
 * UI falls back to the publication type when it is absent.
 */

export interface JournalPublication {
	title: string;
	authors: string;
	journal: string;
	/** Publication year, or "Accepted" / "In press" while awaiting one. */
	year: string;
	doi?: string;
	/** Empty string when not known. Never guessed. */
	impactFactor?: string;
	indexed?: string;
	volume?: string;
	issue?: string;
	/** Page range, or a page count for article-numbered journals. */
	pages?: string;
	/** Article number, used by journals that number rather than paginate. */
	articleNo?: string;
	/** Issue month or month range, when the citation carries one. */
	month?: string;
}

export const journalPublications: JournalPublication[] = [
	{
		title: "Adaptive Stego Content Sterilization in Social Media Through Explainable Multiagent Learning",
		authors: "Abhisek Banerjee, Sreeparna Ganguly, Imon Mukherjee, Nabanita Ganguly",
		journal: "IEEE Transactions on Computational Social Systems",
		year: "2026",
		doi: "10.1109/TCSS.2026.3717681",
		impactFactor: "",
		indexed: "IEEE",
	},
	{
		title: "Evaluation of Language Model Architectures for Scholarly Applications",
		authors: "Avishek Lahiri, Debarshi Kumar Sanyal, Imon Mukherjee",
		journal: "IEEE Transactions on Artificial Intelligence",
		year: "2026",
		doi: "10.1109/TAI.2026.3683034",
		impactFactor: "",
		indexed: "IEEE",
	},
	{
		title: "Augmenting Small Language Model for Better Medical Question Answering through Source Authentication",
		authors: "Sourav Das, Sanjay Chatterji, Imon Mukherjee",
		journal: "ACM Transactions on Information Systems",
		year: "2026",
		volume: "44",
		issue: "6",
		articleNo: "146",
		pages: "39 pages",
		month: "July 2026",
		doi: "10.1145/3797887",
		impactFactor: "",
		indexed: "ACM",
	},
	{
		title: "Quantized Contour-Based Intelligent Stegomalware Sterilizer for Smart Consumer Electronics Network",
		authors: "Sreeparna Ganguly, Abhisek Banerjee, Arpan Bairagi, Imon Mukherjee",
		journal: "IEEE Transactions on Consumer Electronics",
		year: "2025",
		doi: "10.1109/TCE.2025.3610640",
		impactFactor: "10.9",
		indexed: "SCI/SCI(E)",
		volume: "71",
		issue: "4",
		pages: "11064-11072",
		month: "Nov. 2025",
	},
	{
		title: "Fine-tuned encoder models with data augmentation beat ChatGPT in agricultural named entity recognition and relation extraction",
		authors: "Sayan De, Debarshi Kumar Sanyal, Imon Mukherjee",
		journal: "Expert Systems with Applications",
		year: "2025",
		doi: "https://doi.org/10.1016/j.eswa.2025.127126",
		impactFactor: "7.5",
		indexed: "SCI/SCI(E)",
		volume: "277",
		articleNo: "127126",
	},
	{
		title: "I-ROD: An Ensemble CNNs for Object Detection in Unconstrained Road Scenarios",
		authors: "Abhishek Mukhopadhyay, Harshitha BR, Prashant T Gaikwad, Imon Mukherjee, Pradipta Biswas",
		journal: "Signal, Image and Video Processing",
		year: "2024",
		doi: "10.1016/j.jisa.2024.103908",
		impactFactor: "2.0",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "SteriCNN: Cloud Native Stego content Sterilization",
		authors: "Abhisek Banerjee, Sreeparna Ganguly, Imon Mukherjee, Nabanita Ganguly",
		journal: "Journal of Information Security and Applications",
		year: "2024",
		doi: "10.1016/j.jisa.2024.103908",
		impactFactor: "5.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Robust Deep Convolutional Solutions for Identifying Biotic Crop Stress in Wild Environments",
		authors: "Chiranjit Pal, Imon Mukherjee, Sanjay Chatterji, Sanjoy Pratihar, Pabitra Mitra, Partha Pratim Chakrabarti",
		journal: "IEEE Transactions on AgriFood Electronics",
		year: "2024",
		doi: "10.1109/TAFE.2024.3422187",
		impactFactor: "N/A",
		indexed: "IEEE",
		volume: "2",
		issue: "2",
		pages: "497-508",
		month: "Sept.-Oct. 2024",
	},
	{
		title: "Utilizing attention mechanism with exemplar memory for improving domain adaptive person re-identification",
		authors: "Sugam Bhunia, Sambit K. Bakshi, and Imon Mukherjee",
		journal: "Multimedia Tools Applications",
		year: "2024",
		doi: "10.1007/s11042-024-19270-0",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "A complex network analysis approach to compare the performance of batsmen across different formats",
		authors: "Nayan Ranjan Das, Imon Mukherjee, Ankur Konar, Goutam Paul",
		journal: "Knowledge-Based Systems",
		year: "2024",
		doi: "10.1016/j.knosys.2023.111269",
		impactFactor: "8.8",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Integer Wavelet Transform based High Performance Secure Steganography Scheme QVD-LSB",
		authors: "Pratap Chandra Mandal, Imon Mukherjee, BN Chatterji",
		journal: "Multimedia Tools & Applications",
		year: "2024",
		doi: "10.1007/s11042-023-17927-w",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "High capacity secure dynamic multi-bit data hiding using Fibonacci Energetic pixels",
		authors: "Imon Mukherjee, Goutam Paul",
		journal: "Multimedia Tools & Applications",
		year: "2024",
		doi: "10.1007/s11042-023-15504-9",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Stegano-Purge: An integer wavelet transformation based adaptive universal image sterilizer for steganography removal",
		authors: "Sreeparna Ganguly, Imon Mukherjee, Ashutosh Pati",
		journal: "Journal of Information Security and Applications",
		year: "2023",
		doi: "10.1016/j.jisa.2023.103586",
		impactFactor: "5.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Efficient Seizure Prediction and EEG Channel Selection Based on Multi-Objective Optimization",
		authors: "Ranjan Jana and Imon Mukherjee",
		journal: "IEEE Access",
		year: "2023",
		doi: "10.1109/ACCESS.2023.3281450",
		impactFactor: "3.9",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "An intelligent clustering framework for substitute recommendation and player selection",
		authors: "Nayan Ranjan Das, Imon Mukherjee, Anubhab D. Patel, Goutam Paul",
		journal: "Journal of Super Computing",
		year: "2023",
		doi: "10.1007/s11227-023-05314-z",
		impactFactor: "3.3",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Adoption of a ranking based indexing method for the cricket teams",
		authors: "Nayan Ranjan Das, Subhrojit Ghosh, Imon Mukherjee, Goutam Paul",
		journal: "Expert Systems with Applications",
		year: "2023",
		doi: "10.1016/j.eswa.2022.118796",
		impactFactor: "8.5",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "A Hybrid Lane Detection Model for Wild Road Conditions",
		authors: "Abhishek Mukhopadhyay, LRD Murthy, Imon Mukherjee and Pradipta Biswas",
		journal: "IEEE Transactions on Artificial Intelligence",
		year: "2022",
		doi: "10.1109/TAI.2022.3212347",
		impactFactor: "N/A",
		indexed: "IEEE",
	},
	{
		title: "Digital image steganography: A literature survey",
		authors: "Pratap Chandra Mandal, Imon Mukherjee, Goutam Paul, B.N. Chatterji",
		journal: "Information Sciences",
		year: "2022",
		doi: "10.1016/j.ins.2022.07.120",
		impactFactor: "8.1",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "High capacity data hiding based on multi-directional pixel value differencing and decreased difference expansion",
		authors: "Pratap Chandra Mandal, Imon Mukherjee",
		journal: "Multimedia Tools & Applications",
		year: "2022",
		doi: "10.1007/s11042-021-11605-5",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "High capacity steganography based on IWT using eight-way CVD and n-LSB ensuring secure communication",
		authors: "Pratap Chandra Mandal, Imon Mukherjee, B.N. Chatterji",
		journal: "Optik",
		year: "2021",
		doi: "",
		impactFactor: "3.1",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Deep learning based efficient epileptic seizure prediction with EEG channel optimization",
		authors: "Ranjan Jana, Imon Mukherjee",
		journal: "Biomedical Signal Processing and Control",
		year: "2021",
		doi: "10.1016/j.bspc.2021.102767",
		impactFactor: "5.1",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "High Capacity Reversible and Secured Data Hiding in Images using Interpolation and Difference Expansion Technique",
		authors: "Pratap Chandra Mandal, Imon Mukherjee, and BN Chatterji",
		journal: "Multimedia Tools & Applications",
		year: "2021",
		doi: "10.1007/s11042-020-09341-3",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Comparing Shape Descriptor Methods for Different Color Space and Lighting Conditions",
		authors: "Abhishek Mukhopadhyay, Imon Mukherjee, and Pradipta Biswas",
		journal: "Artificial Intelligence in Engineering Design and Manufacturing",
		year: "2019",
		doi: "10.1017/S0890060419000398",
		impactFactor: "2.1",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Lip Biometric Template Security Framework Using Spatial Steganography",
		authors: "Srijan Das, Muhammad Khan, Sambit Bakshi, Imon Mukherjee, Pankaj K. Sa, A.K. Sangaiah, A. Bruno",
		journal: "Pattern Recognition Letters",
		year: "2018",
		doi: "10.1016/j.patrec.2018.06.026",
		impactFactor: "5.1",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Image Feature Based High Capacity Steganographic Algorithm",
		authors: "Rajib Biswas, Imon Mukherjee, Samir Bandopadhyay",
		journal: "Multimedia Tools and Applications",
		year: "2019",
		doi: "10.1007/s11042-019-7369-y",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Multiple video clips preservation using folded back audio-visual cryptography scheme",
		authors: "Imon Mukherjee, Ritam Ganguly",
		journal: "Multimedia Tools and Applications",
		year: "2018",
		doi: "10.1007/s11042-016-3319-0",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Keyless Dynamic Optimal Steganography using Energetic Pixels",
		authors: "Goutam Paul, Ian Davidson, Imon Mukherjee and S.S. Ravi",
		journal: "Multimedia Tools and Applications",
		year: "2017",
		doi: "10.1007/s11042-016-3319-0",
		impactFactor: "3.6",
		indexed: "SCI/SCI(E)",
	},
	{
		title: "Defeating Steganography with Multi-bit Sterilization using Pixel Eccentricity",
		authors: "Imon Mukherjee and Goutam Paul, Jarvis Altrin",
		journal: "IPSI BgD Transactions on Advance Research",
		year: "2015",
		doi: "",
		impactFactor: "N/A",
		indexed: "",
	},
	{
		title: "Image sterilization to prevent LSB-based steganographic transmission",
		authors: "Goutam Paul, G., and Imon Mukherjee",
		journal: "arXiv preprint",
		year: "2010",
		doi: "arXiv:1012.5573",
		impactFactor: "N/A",
		indexed: "",
	},
];

/**
 * The featured selection, in the order Dr. Mukherjee gave.
 *
 * Identified by title rather than by index so it survives any reordering of the
 * list above, and so a typo surfaces as a build-time assertion rather than as a
 * silently missing paper — see `featuredJournals`.
 */
const FEATURED_TITLES = [
	"Adaptive Stego Content Sterilization in Social Media Through Explainable Multiagent Learning",
	"Evaluation of Language Model Architectures for Scholarly Applications",
	"Augmenting Small Language Model for Better Medical Question Answering through Source Authentication",
	"Quantized Contour-Based Intelligent Stegomalware Sterilizer for Smart Consumer Electronics Network",
	"Fine-tuned encoder models with data augmentation beat ChatGPT in agricultural named entity recognition and relation extraction",
	"Robust Deep Convolutional Solutions for Identifying Biotic Crop Stress in Wild Environments",
	"A complex network analysis approach to compare the performance of batsmen across different formats",
] as const;

/**
 * Featured papers in the curated order. The homepage shows these rather than the
 * chronological head of the list, because the selection is deliberate: it omits
 * two 2025 papers that would otherwise precede the last two entries.
 *
 * A title that no longer matches throws on module load instead of quietly
 * dropping a paper from the homepage.
 */
export const featuredJournals: JournalPublication[] = FEATURED_TITLES.map((title) => {
	const found = journalPublications.find((p) => p.title === title);
	if (!found) throw new Error(`Featured publication not found in journalPublications: ${title}`);
	return found;
});
