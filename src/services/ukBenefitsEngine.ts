// UK Benefits Calculation Engine & Statutory Rulebook
// Based on official UK Department for Work and Pensions (DWP) & HMRC rules

export interface UserProfile {
  // Personal Details
  relationshipStatus: 'single' | 'couple';
  age: number;
  partnerAge: number;
  hasRightToReside: boolean;

  // Children & Dependants
  hasChildren: boolean;
  childrenCount: number;
  firstBornBeforeApril2017: boolean;
  disabledChildrenCount: number;
  severelyDisabledChildrenCount: number;
  monthlyChildcareCosts: number;

  // Housing
  housingTenure: 'rent_private' | 'rent_social' | 'homeowner' | 'living_with_family';
  monthlyRent: number;
  estimatedLHA: number; // Local Housing Allowance bedroom rate
  councilTaxBandMonthly: number;

  // Employment & Income
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'unable_to_work';
  monthlyEarnedNetIncome: number; // Take-home pay
  partnerMonthlyEarnedNetIncome: number;
  otherMonthlyIncome: number; // e.g. private pension drawdown

  // Capital / Savings / SIPP
  liquidSavings: number; // Cash, ISA, bank accounts, stocks, premium bonds
  sippPotsValue: number; // Uncrystallised Pension / SIPP pot value
  sippIsDrawnDown: boolean; // Has any SIPP been drawn into cash/income?
  sippMonthlyDrawdownIncome: number; // Monthly pension income drawn from SIPP

  // Health, Disability & Carer
  hasHealthConditionOrDisability: boolean;
  hasLCWRA: boolean; // Limited Capability for Work and Work-Related Activity
  pipDailyLiving: 'none' | 'standard' | 'enhanced';
  pipMobility: 'none' | 'standard' | 'enhanced';
  isCarerForSomeone: boolean; // 35+ hours/week for someone on disability benefit

  // National Insurance & Redundancy / Unemployment (New Style JSA)
  hasPaidTwoYearsNI: boolean; // Paid Class 1 National Insurance in the last 2 complete tax years
  hoursWorkedPerWeek: number; // Less than 16 hours/week to qualify for New Style JSA
}

export interface BenefitBreakdown {
  id: string;
  name: string;
  category: 'universal_credit' | 'child_benefit' | 'disability' | 'carers' | 'housing_council_tax' | 'pension_credit' | 'jsa';
  monthlyAmount: number;
  weeklyAmount: number;
  annualAmount: number;
  durationExplanation: string;
  criteriaExplanation: string[];
  savingsImpactRule: string;
  eligible: boolean;
  statusTag: 'Eligible' | 'Likely Ineligible' | 'Reduced by Savings' | 'Disregarded Savings';
  officialLink: string;
}

export interface CalculationResult {
  totalMonthlyBenefit: number;
  totalAnnualBenefit: number;
  totalWeeklyBenefit: number;
  benefits: BenefitBreakdown[];
  
  // Specific Capital & SIPP diagnostic
  capitalStatus: {
    totalCountedCapital: number;
    sippTotalDisregarded: number;
    isOverUpperLimit: boolean; // > £16,000 cliff edge
    isUnderLowerLimit: boolean; // < £6,000 no deduction
    isBetweenLimits: boolean; // £6,000 to £16,000 tariff applies
    monthlyTariffDeduction: number;
    explanation: string;
  };

  warnings: string[];
  recommendations: string[];
}

export const STATE_PENSION_AGE = 66;

export function calculateUKBenefits(profile: UserProfile): CalculationResult {
  const benefits: BenefitBreakdown[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // ==========================================
  // 1. CAPITAL & SAVINGS / SIPP LOGIC
  // ==========================================
  // In UK Universal Credit:
  // - Cash, bank balances, ISAs, shares, crypto, premium bonds = Counted Capital
  // - SIPP / Workplace Pension pot that has NOT been cashed in = 100% DISREGARDED (exempt) if under Pension Age.
  // - Once drawn down as monthly income, that income counts as unearned income (£1 for £1 reduction).
  // - If a lump sum is withdrawn into a bank account, it then becomes Counted Capital.
  
  const countedCapital = profile.liquidSavings;
  const sippDisregarded = profile.sippPotsValue;
  
  let monthlyTariffDeduction = 0;
  const isOverUpperLimit = countedCapital > 16000;
  const isUnderLowerLimit = countedCapital <= 6000;
  const isBetweenLimits = countedCapital > 6000 && countedCapital <= 16000;

  if (isBetweenLimits) {
    // For every £250 (or part thereof) over £6,000, DWP treats claimant as having £4.35/month tariff income
    const excess = countedCapital - 6000;
    const slices = Math.ceil(excess / 250);
    monthlyTariffDeduction = slices * 4.35;
  }

  let capitalExplanation = '';
  if (isOverUpperLimit) {
    capitalExplanation = `Your savings of £${countedCapital.toLocaleString()} exceed the £16,000 upper capital limit. You are currently ineligible for Universal Credit and Council Tax Reduction. (Note: Your £${sippDisregarded.toLocaleString()} in unaccessed SIPP/pension is exempt, but your liquid cash/savings alone disqualifies you).`;
  } else if (isBetweenLimits) {
    capitalExplanation = `Your savings of £${countedCapital.toLocaleString()} fall between £6,000 and £16,000. DWP applies a 'tariff income' deduction of £${monthlyTariffDeduction.toFixed(2)}/month from your Universal Credit (£4.35 for every £250 over £6k). Your £${sippDisregarded.toLocaleString()} pension pot remains 100% protected and disregarded.`;
  } else {
    capitalExplanation = `Your savings of £${countedCapital.toLocaleString()} are below the £6,000 lower limit. There are zero deductions to your benefits! Your £${sippDisregarded.toLocaleString()} SIPP/pension pot is also completely disregarded.`;
  }

  // ==========================================
  // 2. UNIVERSAL CREDIT (UC)
  // ==========================================
  const isPensionAge = profile.age >= STATE_PENSION_AGE && (profile.relationshipStatus === 'single' || profile.partnerAge >= STATE_PENSION_AGE);
  
  if (!isPensionAge && profile.hasRightToReside) {
    // Standard Allowance
    let standardAllowance = 0;
    if (profile.relationshipStatus === 'single') {
      standardAllowance = profile.age < 25 ? 311.68 : 393.45;
    } else {
      if (profile.age < 25 && profile.partnerAge < 25) {
        standardAllowance = 489.23;
      } else {
        standardAllowance = 617.60;
      }
    }

    // Child Element (2-child limit applies for children born after 6 April 2017)
    let childElement = 0;
    if (profile.hasChildren && profile.childrenCount > 0) {
      // First child
      if (profile.firstBornBeforeApril2017) {
        childElement += 333.33; // higher rate for 1st child born before April 2017
      } else {
        childElement += 287.92;
      }
      
      // Subsequent children (capped at 2 children total unless exceptional)
      const additionalEligibleChildren = Math.max(0, Math.min(profile.childrenCount - 1, 1));
      childElement += additionalEligibleChildren * 287.92;

      // Disabled child additions
      childElement += (profile.disabledChildrenCount * 156.11);
      childElement += (profile.severelyDisabledChildrenCount * 456.89);
    }

    // Childcare Costs Element (up to 85% of paid childcare, capped at £1,014.63 for 1 child, £1,739.37 for 2+)
    let childcareElement = 0;
    if (profile.monthlyChildcareCosts > 0 && profile.childrenCount > 0) {
      const maxChildcareCap = profile.childrenCount === 1 ? 1014.63 : 1739.37;
      childcareElement = Math.min(profile.monthlyChildcareCosts * 0.85, maxChildcareCap);
    }

    // Housing Element
    let housingElement = 0;
    if (profile.housingTenure === 'rent_private') {
      // Rent capped at estimated Local Housing Allowance (LHA)
      housingElement = Math.min(profile.monthlyRent, profile.estimatedLHA > 0 ? profile.estimatedLHA : profile.monthlyRent);
    } else if (profile.housingTenure === 'rent_social') {
      housingElement = profile.monthlyRent;
    }

    // Health / LCWRA Element
    let healthElement = 0;
    if (profile.hasLCWRA) {
      healthElement = 416.19; // Monthly LCWRA element
    }

    // Carer Element
    let carerElement = 0;
    if (profile.isCarerForSomeone) {
      carerElement = 198.31;
    }

    // Total Maximum Universal Credit Entitlement before deductions
    const maxUCEntitlement = standardAllowance + childElement + childcareElement + housingElement + healthElement + carerElement;

    // Deductions:
    // Earnings Taper: 55% taper rate applied to earnings above Work Allowance (if applicable)
    // Work allowance applies if claimant has children or LCWRA:
    // Higher work allowance (no housing costs claimed): £673/month
    // Lower work allowance (with housing costs claimed): £404/month
    const totalTakeHomePay = profile.monthlyEarnedNetIncome + (profile.relationshipStatus === 'couple' ? profile.partnerMonthlyEarnedNetIncome : 0);
    const hasWorkAllowance = profile.hasChildren || profile.hasLCWRA;
    let workAllowance = 0;
    if (hasWorkAllowance) {
      workAllowance = housingElement > 0 ? 404 : 673;
    }

    const earningsSubjectToTaper = Math.max(0, totalTakeHomePay - workAllowance);
    const earningsDeduction = earningsSubjectToTaper * 0.55;

    // Unearned Income Deduction (e.g. SIPP Drawdown or private pension income is deducted £1 for £1)
    const unearnedIncomeDeduction = profile.otherMonthlyIncome + (profile.sippIsDrawnDown ? profile.sippMonthlyDrawdownIncome : 0);

    // Final UC calculation
    let finalUCMonthly = maxUCEntitlement - earningsDeduction - unearnedIncomeDeduction - monthlyTariffDeduction;

    const ucEligible = !isOverUpperLimit && finalUCMonthly > 0;
    finalUCMonthly = ucEligible ? Math.round(finalUCMonthly * 100) / 100 : 0;

    const ucCriteria = [
      `Aged 18 or over and under State Pension age (${STATE_PENSION_AGE})`,
      `Live in the UK and have the right to reside/habitual residence`,
      `Total capital & savings strictly below £16,000`,
      `Standard Allowance: £${standardAllowance.toFixed(2)}/mo based on ${profile.relationshipStatus} status (${profile.age}yo)`
    ];
    if (childElement > 0) ucCriteria.push(`Child element: £${childElement.toFixed(2)}/mo (subject to 2-child rule if applicable)`);
    if (housingElement > 0) ucCriteria.push(`Housing element: £${housingElement.toFixed(2)}/mo towards rent`);
    if (healthElement > 0) ucCriteria.push(`LCWRA health addition: £${healthElement.toFixed(2)}/mo`);
    if (carerElement > 0) ucCriteria.push(`Carer addition: £${carerElement.toFixed(2)}/mo`);
    if (earningsDeduction > 0) ucCriteria.push(`Earnings taper reduction: -£${earningsDeduction.toFixed(2)}/mo (55% taper rate above £${workAllowance} work allowance)`);
    if (monthlyTariffDeduction > 0) ucCriteria.push(`Tariff income deduction for savings > £6k: -£${monthlyTariffDeduction.toFixed(2)}/mo`);

    benefits.push({
      id: 'universal_credit',
      name: 'Universal Credit (UC)',
      category: 'universal_credit',
      monthlyAmount: finalUCMonthly,
      weeklyAmount: Math.round((finalUCMonthly * 12 / 52) * 100) / 100,
      annualAmount: Math.round(finalUCMonthly * 12 * 100) / 100,
      durationExplanation: 'Paid indefinitely every month into your bank account as long as eligibility criteria, earnings, and claimant commitments are met.',
      criteriaExplanation: ucCriteria,
      savingsImpactRule: 'Strict £16,000 ceiling. Zero penalty if savings ≤ £6,000. £4.35/mo penalty per £250 between £6,000 and £16,000. Unaccessed SIPP is 100% exempt.',
      eligible: ucEligible,
      statusTag: isOverUpperLimit ? 'Likely Ineligible' : (monthlyTariffDeduction > 0 ? 'Reduced by Savings' : (ucEligible ? 'Eligible' : 'Likely Ineligible')),
      officialLink: 'https://www.gov.uk/universal-credit'
    });
  }

  // ==========================================
  // 3. CHILD BENEFIT (HMRC)
  // ==========================================
  // Non-means tested! SIPP, savings, ISAs have ZERO impact!
  // £25.60/week for oldest/only child + £16.95/week for subsequent children.
  if (profile.hasChildren && profile.childrenCount > 0) {
    const weeklyRate = 25.60 + (Math.max(0, profile.childrenCount - 1) * 16.95);
    const annualChildBenefit = weeklyRate * 52;
    const monthlyChildBenefit = Math.round((annualChildBenefit / 12) * 100) / 100;

    const childBenefitCriteria = [
      `You are responsible for a child aged under 16 (or under 20 in approved education/training)`,
      `Non-means tested: DOES NOT depend on savings, ISA, or SIPP balances`,
      `Paid for every child (no 2-child restriction!)`,
      `Note: If either you or your partner earn over £60,000 gross per year, the High Income Child Benefit Charge applies, tapering to 100% at £80,000.`
    ];

    benefits.push({
      id: 'child_benefit',
      name: 'Child Benefit (HMRC)',
      category: 'child_benefit',
      monthlyAmount: monthlyChildBenefit,
      weeklyAmount: weeklyRate,
      annualAmount: annualChildBenefit,
      durationExplanation: 'Paid every 4 weeks (or weekly for single parents) until the child turns 16, or 20 if they stay in approved full-time education or training.',
      criteriaExplanation: childBenefitCriteria,
      savingsImpactRule: 'NO SAVINGS LIMIT. You can have £500,000 in savings or SIPP and still receive 100% of Child Benefit.',
      eligible: true,
      statusTag: 'Eligible',
      officialLink: 'https://www.gov.uk/child-benefit'
    });
  }

  // ==========================================
  // 4. PERSONAL INDEPENDENCE PAYMENT (PIP) / HEALTH
  // ==========================================
  // PIP is completely NON-MEANS-TESTED.
  // Savings, SIPP, earnings have ZERO impact!
  if (profile.hasHealthConditionOrDisability && profile.age < STATE_PENSION_AGE) {
    let pipWeekly = 0;
    const pipDetails: string[] = [];

    // Daily Living component rates (2024/2025/2026 standard DWP rates)
    if (profile.pipDailyLiving === 'standard') {
      pipWeekly += 72.65;
      pipDetails.push('Daily Living (Standard): £72.65/wk');
    } else if (profile.pipDailyLiving === 'enhanced') {
      pipWeekly += 108.55;
      pipDetails.push('Daily Living (Enhanced): £108.55/wk');
    }

    // Mobility component rates
    if (profile.pipMobility === 'standard') {
      pipWeekly += 28.70;
      pipDetails.push('Mobility (Standard): £28.70/wk');
    } else if (profile.pipMobility === 'enhanced') {
      pipWeekly += 75.75;
      pipDetails.push('Mobility (Enhanced): £75.75/wk');
    }

    if (pipWeekly > 0) {
      const pipAnnual = pipWeekly * 52;
      const pipMonthly = Math.round((pipAnnual / 12) * 100) / 100;

      benefits.push({
        id: 'pip',
        name: 'Personal Independence Payment (PIP)',
        category: 'disability',
        monthlyAmount: pipMonthly,
        weeklyAmount: pipWeekly,
        annualAmount: pipAnnual,
        durationExplanation: 'Awarded usually for a fixed period (e.g. 2 to 10 years) with scheduled reviews, or ongoing if condition is permanent/unlikely to change.',
        criteriaExplanation: [
          `Aged 16 to State Pension age`,
          `Have a long-term physical or mental health condition or disability for at least 3 months, expected to last at least 9 months`,
          `Difficulties with daily living activities (preparing food, washing, dressing, communicating) or mobility`,
          ...pipDetails
        ],
        savingsImpactRule: 'COMPLETELY EXEMPT from savings and income tests. SIPP, savings, wages have NO EFFECT.',
        eligible: true,
        statusTag: 'Eligible',
        officialLink: 'https://www.gov.uk/pip'
      });
    }
  }

  // ==========================================
  // 5. NEW STYLE JOBSEEKER’S ALLOWANCE (NEW STYLE JSA)
  // ==========================================
  // For people who worked as employees and paid Class 1 NI in the last 2 complete tax years.
  // Crucial advantage: Non-means tested! SIPP, partner earnings, and savings >£16,000 have ZERO effect!
  // Duration: Paid for up to 182 days (approx. 6 months).
  // Rates (2024-2026): Under 25: £71.70/wk. Age 25+: £90.50/wk.
  const isEligibleForNewJSA = 
    profile.employmentStatus !== 'employed' && 
    profile.hoursWorkedPerWeek < 16 && 
    profile.hasPaidTwoYearsNI &&
    profile.age >= 18 && 
    profile.age < STATE_PENSION_AGE;

  if (profile.hasPaidTwoYearsNI && profile.age < STATE_PENSION_AGE) {
    const jsaWeekly = profile.age < 25 ? 71.70 : 90.50;
    const jsaAnnual = jsaWeekly * 26; // max 26 weeks (182 days)
    const jsaMonthly = Math.round(((jsaWeekly * 52) / 12) * 100) / 100;

    const jsaCriteria = [
      `Worked as an employee and paid sufficient Class 1 National Insurance in the last 2 complete tax years`,
      `Working fewer than 16 hours a week on average and actively seeking work`,
      `Age: ${profile.age}yo (${profile.age < 25 ? 'Under 25 rate: £71.70/wk' : 'Age 25+ rate: £90.50/wk'})`,
      `Partner’s employment, income, or savings have NO IMPACT (it is an individual entitlement)`,
      `Private pension note: If you receive a personal/workplace pension over £50/week, JSA is reduced by the excess.`
    ];

    benefits.push({
      id: 'new_style_jsa',
      name: "New Style Jobseeker's Allowance (JSA)",
      category: 'jsa',
      monthlyAmount: isEligibleForNewJSA ? jsaMonthly : 0,
      weeklyAmount: isEligibleForNewJSA ? jsaWeekly : 0,
      annualAmount: isEligibleForNewJSA ? jsaAnnual : 0,
      durationExplanation: 'Paid every 2 weeks for up to 182 days (6 months maximum). Also awards Class 1 NI credits to protect your State Pension and future benefits.',
      criteriaExplanation: jsaCriteria,
      savingsImpactRule: '100% EXEMPT FROM SAVINGS RULES. You can have £50,000 or £100,000+ in savings, ISAs, or SIPP and still receive your full JSA.',
      eligible: isEligibleForNewJSA,
      statusTag: isEligibleForNewJSA ? 'Eligible' : 'Likely Ineligible',
      officialLink: 'https://www.gov.uk/jobseekers-allowance'
    });

    if (isOverUpperLimit && isEligibleForNewJSA) {
      recommendations.push(
        `Important: While your £${countedCapital.toLocaleString()} in savings blocks you from Universal Credit, you ARE ELIGIBLE for New Style JSA (£${jsaWeekly}/wk) because it ignores your savings completely based on your National Insurance record!`
      );
    }
  }

  // ==========================================
  // 6. CARER’S ALLOWANCE
  // ==========================================
  // £81.90 / week
  // Earnings limit: £151/week after allowable expenses.
  // Savings: NO SAVINGS LIMIT!
  if (profile.isCarerForSomeone) {
    const weeklyRate = 81.90;
    const annualAmount = weeklyRate * 52;
    const monthlyAmount = Math.round((annualAmount / 12) * 100) / 100;
    
    // Check if claimant earns more than £151/week net (£654.33/mo)
    const exceedsEarningsLimit = profile.monthlyEarnedNetIncome > 654.33;

    benefits.push({
      id: 'carers_allowance',
      name: "Carer's Allowance",
      category: 'carers',
      monthlyAmount: exceedsEarningsLimit ? 0 : monthlyAmount,
      weeklyAmount: exceedsEarningsLimit ? 0 : weeklyRate,
      annualAmount: exceedsEarningsLimit ? 0 : annualAmount,
      durationExplanation: 'Paid weekly or every 4 weeks for as long as you care for the person for 35+ hours/week and meet the weekly earnings limit.',
      criteriaExplanation: [
        `Care for someone at least 35 hours a week`,
        `The person you care for must receive a qualifying benefit (PIP Daily Living, Attendance Allowance, or DLA care rate)`,
        `You must not earn more than £151 a week after tax, National Insurance and allowable expenses`,
        exceedsEarningsLimit ? `WARNING: Your earned income of £${profile.monthlyEarnedNetIncome}/mo exceeds the £151/wk (~£654/mo) limit!` : `Earnings are within the £151/week threshold.`
      ],
      savingsImpactRule: 'NO SAVINGS LIMIT. You can have any amount in savings, ISAs, or SIPP.',
      eligible: !exceedsEarningsLimit,
      statusTag: exceedsEarningsLimit ? 'Likely Ineligible' : 'Eligible',
      officialLink: 'https://www.gov.uk/carers-allowance'
    });
  }

  // ==========================================
  // 6. COUNCIL TAX REDUCTION (CTR)
  // ==========================================
  // Varies by local authority, but single persons get 25% automatic discount,
  // and low-income claimants can get up to 100% reduction (subject to £16,000 savings cap in most councils).
  let ctrMonthly = 0;
  const ctrCriteria: string[] = [];
  
  if (profile.councilTaxBandMonthly > 0) {
    // Single person 25% discount
    let discountPercent = profile.relationshipStatus === 'single' ? 0.25 : 0;
    
    // Low income / Universal Credit top-up
    if (!isOverUpperLimit && (profile.monthlyEarnedNetIncome < 1500 || profile.hasLCWRA)) {
      discountPercent = Math.min(1.0, discountPercent + 0.60); // Up to 85%-100% relief
    }

    ctrMonthly = Math.round(profile.councilTaxBandMonthly * discountPercent * 100) / 100;

    ctrCriteria.push(`Liable to pay Council Tax on your main home`);
    if (profile.relationshipStatus === 'single') ctrCriteria.push(`Automatic 25% Single Person Discount applied`);
    if (!isOverUpperLimit) {
      ctrCriteria.push(`Low-income council scheme reduction applied`);
    } else {
      ctrCriteria.push(`Note: If you have over £16,000 in savings, low-income CTR is usually denied, but 25% single discount remains.`);
      // If over limit, they still get single discount if single
      if (profile.relationshipStatus === 'single') {
        ctrMonthly = Math.round(profile.councilTaxBandMonthly * 0.25 * 100) / 100;
      } else {
        ctrMonthly = 0;
      }
    }

    benefits.push({
      id: 'council_tax_reduction',
      name: 'Council Tax Reduction (CTR) & Discounts',
      category: 'housing_council_tax',
      monthlyAmount: ctrMonthly,
      weeklyAmount: Math.round((ctrMonthly * 12 / 52) * 100) / 100,
      annualAmount: Math.round(ctrMonthly * 12 * 100) / 100,
      durationExplanation: 'Applied as a reduction directly onto your annual council tax bill. Reassessed annually or whenever circumstances change.',
      criteriaExplanation: ctrCriteria,
      savingsImpactRule: 'Single person 25% discount ignores savings completely. Low-income support typically follows the £16,000 capital cutoff.',
      eligible: ctrMonthly > 0,
      statusTag: ctrMonthly > 0 ? 'Eligible' : 'Likely Ineligible',
      officialLink: 'https://www.gov.uk/apply-council-tax-reduction'
    });
  }

  // ==========================================
  // 7. PENSION CREDIT (For over State Pension Age)
  // ==========================================
  if (isPensionAge) {
    const singleGuarantee = 218.15; // Weekly guarantee credit
    const coupleGuarantee = 332.95;
    const baseline = profile.relationshipStatus === 'single' ? singleGuarantee : coupleGuarantee;

    // Capital rules for Pension Credit:
    // First £10,000 is ignored completely.
    // For every £500 (or part thereof) over £10,000, it counts as £1/week income. NO UPPER LIMIT!
    let pcWeeklyTariff = 0;
    if (profile.liquidSavings > 10000) {
      const pcExcess = profile.liquidSavings - 10000;
      pcWeeklyTariff = Math.ceil(pcExcess / 500) * 1;
    }

    const weeklyIncomeEstimate = ((profile.monthlyEarnedNetIncome + profile.otherMonthlyIncome) * 12 / 52) + pcWeeklyTariff;
    const weeklyPensionCredit = Math.max(0, baseline - weeklyIncomeEstimate);

    if (weeklyPensionCredit > 0) {
      const pcAnnual = weeklyPensionCredit * 52;
      const pcMonthly = Math.round((pcAnnual / 12) * 100) / 100;

      benefits.push({
        id: 'pension_credit',
        name: 'Pension Credit (Guarantee Credit)',
        category: 'pension_credit',
        monthlyAmount: pcMonthly,
        weeklyAmount: Math.round(weeklyPensionCredit * 100) / 100,
        annualAmount: Math.round(pcAnnual * 100) / 100,
        durationExplanation: 'Paid every 4 weeks for life as long as your income remains below the minimum guarantee level.',
        criteriaExplanation: [
          `Must have reached State Pension age (${STATE_PENSION_AGE})`,
          `Tops up weekly income to standard minimum of £${baseline.toFixed(2)}/wk`,
          `Unlocks Winter Fuel Payment, free TV licence (75+), and NHS dental treatment`
        ],
        savingsImpactRule: 'NO UPPER £16,000 LIMIT. First £10,000 ignored. Every £500 above £10,000 counts as £1/week tariff income.',
        eligible: true,
        statusTag: 'Eligible',
        officialLink: 'https://www.gov.uk/pension-credit'
      });
    }
  }

  // Totals
  const totalMonthlyBenefit = Math.round(benefits.filter(b => b.eligible).reduce((sum, b) => sum + b.monthlyAmount, 0) * 100) / 100;
  const totalAnnualBenefit = Math.round(totalMonthlyBenefit * 12 * 100) / 100;
  const totalWeeklyBenefit = Math.round((totalMonthlyBenefit * 12 / 52) * 100) / 100;

  // Key Warnings & Insights
  if (isOverUpperLimit) {
    warnings.push(`You have £${countedCapital.toLocaleString()} in liquid capital. This blocks you from Universal Credit until your cash/savings drop below £16,000.`);
  }

  if (profile.sippPotsValue > 0) {
    recommendations.push(`Good news: Your £${profile.sippPotsValue.toLocaleString()} held in a SIPP or personal pension pot is 100% exempt from the Universal Credit £16k asset test while unaccessed.`);
  }

  if (profile.childrenCount > 2) {
    warnings.push(`Two-child limit notice: Under UK law, Universal Credit only pays the child element for the first two children unless an exception applies (e.g. multiple births, adoption). Child Benefit, however, pays for ALL children.`);
  }

  return {
    totalMonthlyBenefit,
    totalAnnualBenefit,
    totalWeeklyBenefit,
    benefits,
    capitalStatus: {
      totalCountedCapital: countedCapital,
      sippTotalDisregarded: sippDisregarded,
      isOverUpperLimit,
      isUnderLowerLimit,
      isBetweenLimits,
      monthlyTariffDeduction,
      explanation: capitalExplanation
    },
    warnings,
    recommendations
  };
}
