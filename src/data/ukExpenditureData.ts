// Official UK Department for Work and Pensions (DWP) & OBR Benefit Expenditure Statistics
// Source: DWP Benefit Expenditure and Caseload Tables & Office for Budget Responsibility (OBR)

export interface BenefitCategorySpend {
  name: string;
  amountBillions: number;
  percentage: number;
  color: string;
  recipientsEstimate: string;
  keyProgrammes: string;
}

export interface RegionalSpend {
  region: string;
  totalBillions: number;
  percentage: number;
  perCapitaSpend: number;
  populationMillions: number;
  claimantsThousands: number;
}

export interface UKExpenditureStats {
  financialYear: string;
  totalWelfareBillBillions: number; // ~£315.8bn
  statePensionBillions: number;     // ~£137.5bn
  workingAgeBenefitsBillions: number; // ~£112.4bn
  disabilityHealthBillions: number; // ~£41.2bn
  childBenefitHMRCBillions: number; // ~£13.5bn
  otherSupportBillions: number;      // ~£11.2bn
  gdpPercentage: number;             // ~11.2% of UK GDP
  dwpSourceDate: string;
  categories: BenefitCategorySpend[];
  regions: RegionalSpend[];
}

export const UK_BENEFIT_EXPENDITURE: UKExpenditureStats = {
  financialYear: "2024/2025 – 2025/2026",
  totalWelfareBillBillions: 315.8,
  statePensionBillions: 137.5,
  workingAgeBenefitsBillions: 112.4,
  disabilityHealthBillions: 41.2,
  childBenefitHMRCBillions: 13.5,
  otherSupportBillions: 11.2,
  gdpPercentage: 11.1,
  dwpSourceDate: "DWP National Statistics / OBR Fiscal Outlook",
  categories: [
    {
      name: "State Pension (Retirement)",
      amountBillions: 137.5,
      percentage: 43.5,
      color: "#1F5A45", // Forest Green
      recipientsEstimate: "12.7 million pensioners",
      keyProgrammes: "Basic State Pension, New State Pension, Pension Credit"
    },
    {
      name: "Universal Credit & Working-Age",
      amountBillions: 88.6,
      percentage: 28.1,
      color: "#E9774F", // Coral
      recipientsEstimate: "6.9 million people on UC",
      keyProgrammes: "Universal Credit Standard, Housing & Child Elements, legacy JSA/ESA"
    },
    {
      name: "Disability & Incapacity (PIP / DLA / AA)",
      amountBillions: 41.2,
      percentage: 13.0,
      color: "#287358", // Forest Light
      recipientsEstimate: "3.6 million PIP recipients",
      keyProgrammes: "Personal Independence Payment, Attendance Allowance, DLA"
    },
    {
      name: "Housing Support (Housing Benefit)",
      amountBillions: 16.5,
      percentage: 5.2,
      color: "#F3DD87", // Butter Yellow
      recipientsEstimate: "1.9 million households (legacy HB)",
      keyProgrammes: "Local Authority Housing Benefit (outside UC)"
    },
    {
      name: "Child Benefit & Tax Credits (HMRC)",
      amountBillions: 13.5,
      percentage: 4.3,
      color: "#d6643c",
      recipientsEstimate: "7.1 million families (12.2m children)",
      keyProgrammes: "HMRC Child Benefit, Child Tax Credit remnants"
    },
    {
      name: "Carer’s Allowance & Other",
      amountBillions: 18.5,
      percentage: 5.9,
      color: "#cad9ce",
      recipientsEstimate: "1.4 million carers",
      keyProgrammes: "Carer's Allowance, Maternity Allowance, Winter Support"
    }
  ],
  regions: [
    {
      region: "North West",
      totalBillions: 39.4,
      percentage: 12.5,
      perCapitaSpend: 5240,
      populationMillions: 7.5,
      claimantsThousands: 980
    },
    {
      region: "London",
      totalBillions: 38.6,
      percentage: 12.2,
      perCapitaSpend: 4340,
      populationMillions: 8.9,
      claimantsThousands: 1040
    },
    {
      region: "South East",
      totalBillions: 36.8,
      percentage: 11.7,
      perCapitaSpend: 3950,
      populationMillions: 9.3,
      claimantsThousands: 720
    },
    {
      region: "West Midlands",
      totalBillions: 31.2,
      percentage: 9.9,
      perCapitaSpend: 5200,
      populationMillions: 6.0,
      claimantsThousands: 790
    },
    {
      region: "Yorkshire and The Humber",
      totalBillions: 28.5,
      percentage: 9.0,
      perCapitaSpend: 5180,
      populationMillions: 5.5,
      claimantsThousands: 690
    },
    {
      region: "Scotland",
      totalBillions: 27.9,
      percentage: 8.8,
      perCapitaSpend: 5110,
      populationMillions: 5.5,
      claimantsThousands: 680
    },
    {
      region: "East of England",
      totalBillions: 26.7,
      percentage: 8.5,
      perCapitaSpend: 4210,
      populationMillions: 6.3,
      claimantsThousands: 580
    },
    {
      region: "South West",
      totalBillions: 25.8,
      percentage: 8.2,
      perCapitaSpend: 4520,
      populationMillions: 5.7,
      claimantsThousands: 530
    },
    {
      region: "East Midlands",
      totalBillions: 23.4,
      percentage: 7.4,
      perCapitaSpend: 4790,
      populationMillions: 4.9,
      claimantsThousands: 520
    },
    {
      region: "Wales",
      totalBillions: 17.6,
      percentage: 5.6,
      perCapitaSpend: 5620,
      populationMillions: 3.1,
      claimantsThousands: 430
    },
    {
      region: "North East",
      totalBillions: 15.2,
      percentage: 4.8,
      perCapitaSpend: 5740,
      populationMillions: 2.6,
      claimantsThousands: 390
    },
    {
      region: "Northern Ireland",
      totalBillions: 10.7,
      percentage: 3.4,
      perCapitaSpend: 5610,
      populationMillions: 1.9,
      claimantsThousands: 280
    }
  ]
};
