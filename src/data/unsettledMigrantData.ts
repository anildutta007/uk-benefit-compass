// Official UK Home Office & National Audit Office (NAO) Statistics on Asylum & Unsettled Migrant Support
// Sources: Home Office Immigration Statistics, Section 95 / Section 4 Asylum Support, NAO Reports

export interface UnsettledMigrantStats {
  financialYear: string;
  totalAsylumSupportSpendBillions: number; // ~£5.38 billion (Home Office asylum support budget)
  totalPeopleInReceiptOfSupport: number;   // ~118,500 people supported under Section 95 / Section 4
  pendingCaseloadCases: number;            // ~95,000 to 110,000 main applicants awaiting initial decision
  
  // Weekly statutory cash allowances
  weeklyAllowances: {
    selfCateringWeekly: number; // £49.18 per person per week (Section 95)
    cateredAccommodationWeekly: number; // £9.58 per person per week (in hotels/catered centres)
    pregnantOrMotherBabyAddition: number; // £5.25 - £9.50 extra per week
  };

  // Cost breakdown
  expenditureBreakdown: {
    category: string;
    amountBillions: number;
    percentage: number;
    explanation: string;
  }[];

  // Legal & DWP Welfare boundary comparison
  legalStatusRules: {
    title: string;
    description: string;
    universalCreditEligible: boolean;
    childBenefitEligible: boolean;
    homeOfficeSupportEligible: boolean;
    rightToWork: string;
  }[];

  // Regional dispersal of supported asylum seekers
  regionalDispersal: {
    region: string;
    supportedIndividuals: number;
    percentage: number;
  }[];
}

export const UNSETTLED_MIGRANT_DATA: UnsettledMigrantStats = {
  financialYear: "2024/2025 – 2025/2026",
  totalAsylumSupportSpendBillions: 5.38,
  totalPeopleInReceiptOfSupport: 118500,
  pendingCaseloadCases: 104200,

  weeklyAllowances: {
    selfCateringWeekly: 49.18,
    cateredAccommodationWeekly: 9.58,
    pregnantOrMotherBabyAddition: 9.50,
  },

  expenditureBreakdown: [
    {
      category: "Contingency Hotel Accommodation & Facilities",
      amountBillions: 3.10,
      percentage: 57.6,
      explanation: "Contracts with accommodation providers (Clearsprings, Serco, Mears) for hotels, former military sites, and temporary lodgings."
    },
    {
      category: "Dispersed Residential Housing",
      amountBillions: 1.45,
      percentage: 27.0,
      explanation: "Self-catered flats and shared houses rented in local authority dispersal areas."
    },
    {
      category: "Statutory Subsistence Cash (ASPEN Cards)",
      amountBillions: 0.38,
      percentage: 7.1,
      explanation: "Weekly cash support delivered via ASPEN debit cards (£49.18/wk for self-catering, or £9.58/wk in catered lodgings)."
    },
    {
      category: "Casework, Healthcare & Local Council Support",
      amountBillions: 0.45,
      percentage: 8.3,
      explanation: "Home Office casework decision teams, initial health assessments, and council unspent dispersal grants."
    }
  ],

  legalStatusRules: [
    {
      title: "Asylum Seekers (Pending Decision / Unsettled)",
      description: "Those who have claimed asylum in the UK whose case has NOT yet been decided. Subject to NRPF (No Recourse to Public Funds).",
      universalCreditEligible: false,
      childBenefitEligible: false,
      homeOfficeSupportEligible: true, // Section 95 / Section 4
      rightToWork: "Prohibited unless granted permission after waiting 12+ months (restricted to Shortage List)."
    },
    {
      title: "Granted Refugee Status / Settled Status",
      description: "Once the case settles and refugee status or Indefinite Leave to Remain (ILR) is granted (usually 5 years permission).",
      universalCreditEligible: true,
      childBenefitEligible: true,
      homeOfficeSupportEligible: false, // Transitioned out within 28 days
      rightToWork: "Full unrestricted right to work and access public funds."
    },
    {
      title: "Refused Claimants (Appeal Rights Exhausted)",
      description: "Claims that have been refused. Emergency support only if there is a barrier to departure under Section 4(2).",
      universalCreditEligible: false,
      childBenefitEligible: false,
      homeOfficeSupportEligible: true, // Emergency only
      rightToWork: "No right to work."
    }
  ],

  regionalDispersal: [
    { region: "North West", supportedIndividuals: 22400, percentage: 18.9 },
    { region: "West Midlands", supportedIndividuals: 16100, percentage: 13.6 },
    { region: "London", supportedIndividuals: 15300, percentage: 12.9 },
    { region: "Yorkshire and The Humber", supportedIndividuals: 14800, percentage: 12.5 },
    { region: "North East", supportedIndividuals: 11200, percentage: 9.5 },
    { region: "East Midlands", supportedIndividuals: 9600, percentage: 8.1 },
    { region: "South East", supportedIndividuals: 9100, percentage: 7.7 },
    { region: "Scotland", supportedIndividuals: 6400, percentage: 5.4 },
    { region: "East of England", supportedIndividuals: 5500, percentage: 4.6 },
    { region: "South West", supportedIndividuals: 4300, percentage: 3.6 },
    { region: "Wales", supportedIndividuals: 3100, percentage: 2.6 },
    { region: "Northern Ireland", supportedIndividuals: 700, percentage: 0.6 }
  ]
};
