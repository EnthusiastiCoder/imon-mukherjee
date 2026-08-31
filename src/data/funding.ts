/**
 * Funded projects — the single source of truth.
 *
 * Extracted from Index.tsx because the hero also quotes a total, and the two had
 * already drifted: the hero carried a hard-coded "₹87.86L", which is the sum of
 * the first two grants only. Any figure typed into copy eventually disagrees
 * with the array beside it, so both the hero and the Funded Projects section
 * derive theirs from here — which is why adding the ANRF grant moved the total
 * from ₹105.89L to ₹205.85L with no copy change.
 */

export interface FundedProject {
	title: string;
	funding: string;
	/** Optional by design — not every grant lists one. Callers must guard. */
	duration?: string;
	/** As written for display, e.g. "₹42.25 Lakhs". Parsed for totals. */
	amount: string;
	/** Optional by design, same as duration. */
	role?: string;
}

export const fundedProjects: FundedProject[] = [
	{
		title:
			"In-Context Learning and Multimodal Reasoning in Large Language Models: Foundations and Applications in Scholarly Information Access",
		funding: "ANRF-ARG, Government of India",
		amount: "₹99.96 Lakhs",
	},
	{
		title: "Study of Quantum Attacks on Stream Ciphers and Its Counter-Measures",
		funding: "DRDO, Govt. of India",
		duration: "Sept 2022 – Sept 2024",
		amount: "₹42.25 Lakhs",
		role: "PI",
	},
	{
		title: "Extraction, Organization and Query of Scholarly Information",
		funding: "SERB (CRG), Govt. of India",
		duration: "March 2022 – March 2025",
		amount: "₹45.61 Lakhs",
		role: "PI",
	},
	{
		title: "AI in Agriculture & Food Sustainability",
		funding: "MeitY, Govt. of India",
		duration: "March 2020 – March 2023",
		amount: "₹16.18 Lakhs",
		role: "PI",
	},
	{
		title: "Implementation of Security in eGovernance through Steganography",
		funding: "DST, Govt. of West Bengal",
		duration: "July 2013 – June 2016",
		amount: "₹1.85 Lakhs",
		role: "PI",
	},
];

/** "₹42.25 Lakhs" -> 42.25 */
export function parseLakhs(amount: string): number {
	const n = Number.parseFloat(amount.replace(/[^\d.]/g, ""));
	return Number.isFinite(n) ? n : 0;
}

export const totalFundingLakhs = fundedProjects.reduce(
	(sum, p) => sum + parseLakhs(p.amount),
	0
);

export const maxFundingLakhs = Math.max(
	...fundedProjects.map((p) => parseLakhs(p.amount))
);
