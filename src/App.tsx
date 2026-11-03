import { useState } from 'react';
import { 
  Building2, 
  Calculator, 
  PiggyBank, 
  FileCheck, 
  AlertCircle, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Mail,
  UserCheck
} from 'lucide-react';
import { 
  type UserProfile, 
  calculateUKBenefits, 
  type CalculationResult 
} from './services/ukBenefitsEngine';
import { BenefitInputPanel } from './components/BenefitInputPanel';
import { BenefitCard } from './components/BenefitCard';
import { SavingsSippExplorer } from './components/SavingsSippExplorer';
import { GovernmentExpenditureStats } from './components/GovernmentExpenditureStats';
import { UnsettledMigrantSection } from './components/UnsettledMigrantSection';

export function App() {
  // Visitor counter starting at 10, persisted in localStorage
  const [visitorCount] = useState<number>(() => {
    const saved = localStorage.getItem('uk_benefit_visitor_count');
    if (saved) {
      const parsed = parseInt(saved, 10);
      const nextCount = isNaN(parsed) ? 10 : parsed + 1;
      localStorage.setItem('uk_benefit_visitor_count', nextCount.toString());
      return nextCount;
    }
    localStorage.setItem('uk_benefit_visitor_count', '10');
    return 10;
  });

  // Default Initial Profile
  const [profile, setProfile] = useState<UserProfile>({
    relationshipStatus: 'single',
    age: 28,
    partnerAge: 28,
    hasRightToReside: true,

    hasChildren: true,
    childrenCount: 1,
    firstBornBeforeApril2017: false,
    disabledChildrenCount: 0,
    severelyDisabledChildrenCount: 0,
    monthlyChildcareCosts: 0,

    housingTenure: 'rent_private',
    monthlyRent: 650,
    estimatedLHA: 650,
    councilTaxBandMonthly: 120,

    employmentStatus: 'employed',
    monthlyEarnedNetIncome: 650,
    partnerMonthlyEarnedNetIncome: 0,
    otherMonthlyIncome: 0,

    liquidSavings: 3500, // Safe under £6k
    sippPotsValue: 25000, // Disregarded SIPP pot
    sippIsDrawnDown: false,
    sippMonthlyDrawdownIncome: 0,

    hasHealthConditionOrDisability: false,
    hasLCWRA: false,
    pipDailyLiving: 'none',
    pipMobility: 'none',
    isCarerForSomeone: false,
  });

  const [activeTab, setActiveTab] = useState<'calculator' | 'savings_sipp' | 'gov_spend' | 'criteria_guide'>('calculator');
  const [expandedBenefitId, setExpandedBenefitId] = useState<string | null>('universal_credit');

  const results: CalculationResult = calculateUKBenefits(profile);

  const handleProfileChange = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const handleSavingsUpdate = (liquid: number, sipp: number) => {
    setProfile(prev => ({
      ...prev,
      liquidSavings: liquid,
      sippPotsValue: sipp
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F3E8] text-[#1F5A45] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#1F5A45] text-[#F8F3E8] border-b border-[#164232] shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="bg-[#E9774F] p-2 rounded-xl text-white shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    UK Benefit Compass
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F3DD87] text-[#1F5A45]">
                    Live DWP Engine
                  </span>
                </div>
                <p className="text-xs text-[#E2ECE5]/90">
                  Instant benefit eligibility, housing LHA & SIPP capital analyzer
                </p>
              </div>
            </div>

            {/* Developer & Visitor Badge on Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#164232] text-xs font-bold text-[#F3DD87]">
                <Eye className="w-3.5 h-3.5" />
                <span>{visitorCount}</span>
              </div>
            </div>
          </div>

          {/* Center / Right: Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-[#164232] p-1 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeTab === 'calculator'
                  ? 'bg-[#E9774F] text-white shadow-sm'
                  : 'text-[#E2ECE5] hover:text-white hover:bg-[#1F5A45]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('savings_sipp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeTab === 'savings_sipp'
                  ? 'bg-[#E9774F] text-white shadow-sm'
                  : 'text-[#E2ECE5] hover:text-white hover:bg-[#1F5A45]'
              }`}
            >
              <PiggyBank className="w-3.5 h-3.5" />
              <span>Savings & SIPP Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('gov_spend')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeTab === 'gov_spend'
                  ? 'bg-[#E9774F] text-white shadow-sm'
                  : 'text-[#E2ECE5] hover:text-white hover:bg-[#1F5A45]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#F3DD87]" />
              <span>UK Government Spend & Map</span>
            </button>

            <button
              onClick={() => setActiveTab('criteria_guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeTab === 'criteria_guide'
                  ? 'bg-[#E9774F] text-white shadow-sm'
                  : 'text-[#E2ECE5] hover:text-white hover:bg-[#1F5A45]'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Statutory Rulebook</span>
            </button>
          </nav>

          {/* Right Corner: Visitor Counter & Developer Credit (Desktop) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Live Visitor Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#164232] border border-[#287358] text-xs font-extrabold text-[#F3DD87]" title="Unique Visitor Count">
              <Eye className="w-3.5 h-3.5 text-[#E9774F]" />
              <span>{visitorCount} Visitors</span>
            </div>

            {/* Developer Pill */}
            <a 
              href="mailto:anildutta007@gmail.com" 
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#E2ECE5] hover:bg-white text-[#1F5A45] text-xs font-bold transition-colors shadow-sm"
              title="Contact Lead Developer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#1F5A45]" />
              <span>Dev: <strong>Anil Dutta</strong></span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Strip */}
      <section className="bg-[#E2ECE5] border-b border-[#cad9ce] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F3DD87] text-[#1F5A45] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E9774F]" />
              Side-by-Side Reactive View
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F5A45] tracking-tight">
              Adjust Your Situation on the Left — See Instant Entitlements on the Right
            </h1>
            <p className="text-xs sm:text-sm text-[#1F5A45]/85 mt-1">
              Change family status, kids, housing, earnings, or pension pots. The calculation updates dynamically.
            </p>
          </div>

          {/* Floating Key Summary Pill */}
          <div className="bg-[#F8F3E8] p-3.5 rounded-xl border border-[#cad9ce] shadow-sm flex items-center gap-5 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#1F5A45]/70 block">
                Total Monthly Benefit
              </span>
              <div className="text-2xl font-black text-[#1F5A45]">
                £{results.totalMonthlyBenefit.toFixed(2)}
              </div>
            </div>
            <div className="border-l border-[#cad9ce] pl-4">
              <span className="text-[10px] uppercase font-bold text-[#1F5A45]/70 block">
                Annual Equivalent
              </span>
              <div className="text-base font-extrabold text-[#E9774F]">
                £{results.totalAnnualBenefit.toLocaleString()} /yr
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Unsettled Migrants and Asylum Support (Stays on main screen as requested) */}
        <UnsettledMigrantSection />

        {/* TAB 1: SIDE-BY-SIDE CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: Inputs Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#E9774F]" />
                  <span className="text-sm font-black text-[#1F5A45] uppercase tracking-wider">
                    Claimant Inputs
                  </span>
                </div>

                {/* Quick Presets / Reset */}
                <button
                  type="button"
                  onClick={() => {
                    setProfile({
                      relationshipStatus: 'single',
                      age: 26,
                      partnerAge: 26,
                      hasRightToReside: true,
                      hasChildren: false,
                      childrenCount: 0,
                      firstBornBeforeApril2017: false,
                      disabledChildrenCount: 0,
                      severelyDisabledChildrenCount: 0,
                      monthlyChildcareCosts: 0,
                      housingTenure: 'rent_private',
                      monthlyRent: 600,
                      estimatedLHA: 600,
                      councilTaxBandMonthly: 110,
                      employmentStatus: 'employed',
                      monthlyEarnedNetIncome: 500,
                      partnerMonthlyEarnedNetIncome: 0,
                      otherMonthlyIncome: 0,
                      liquidSavings: 2000,
                      sippPotsValue: 15000,
                      sippIsDrawnDown: false,
                      sippMonthlyDrawdownIncome: 0,
                      hasHealthConditionOrDisability: false,
                      hasLCWRA: false,
                      pipDailyLiving: 'none',
                      pipMobility: 'none',
                      isCarerForSomeone: false,
                    });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1F5A45]/70 hover:text-[#1F5A45]"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Single item on left with all criteria */}
              <BenefitInputPanel 
                profile={profile} 
                onChange={handleProfileChange} 
              />
            </div>

            {/* RIGHT SIDE: Live Results, Entitlements, Criteria & SIPP Diagnostics */}
            <div className="lg:col-span-7 space-y-5 lg:sticky lg:top-20">
              {/* Dynamic Capital Diagnostic Notice */}
              <div className="p-4 rounded-xl border border-[#cad9ce] bg-[#EFE8DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <PiggyBank className="w-5 h-5 text-[#E9774F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-[#1F5A45]">Capital Diagnostic: </span>
                    <span className="text-[#1F5A45]/90">{results.capitalStatus.explanation}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('savings_sipp')}
                  className="inline-flex items-center gap-1 font-bold text-[#E9774F] hover:underline shrink-0"
                >
                  <span>Explore Simulator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Warnings / Alerts */}
              {results.warnings.length > 0 && (
                <div className="space-y-2">
                  {results.warnings.map((w, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#1F5A45]">
                    Available Benefits & Amounts
                  </h2>
                  <p className="text-xs text-[#1F5A45]/75">
                    Click each benefit card to see duration, exact criteria checklist, and official application links.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-[#F3DD87] text-[#1F5A45] rounded-full shrink-0">
                  {results.benefits.filter(b => b.eligible).length} Eligible
                </span>
              </div>

              {/* Benefit Cards List */}
              <div className="space-y-3.5">
                {results.benefits.map((benefit) => (
                  <BenefitCard 
                    key={benefit.id}
                    benefit={benefit}
                    isExpanded={expandedBenefitId === benefit.id}
                    onToggle={() => {
                      setExpandedBenefitId(expandedBenefitId === benefit.id ? null : benefit.id);
                    }}
                  />
                ))}
              </div>

              {/* Next Steps CTA */}
              <div className="p-4 rounded-xl bg-[#1F5A45] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div>
                  <h4 className="font-bold text-sm text-white">Ready to make a claim?</h4>
                  <p className="text-[11px] text-[#E2ECE5]/80">
                    Apply directly on the official GOV.UK portal. Have tenancy agreement, photo ID, and bank details ready.
                  </p>
                </div>
                <a
                  href="https://www.gov.uk/universal-credit/how-to-claim"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#E9774F] hover:bg-[#d6643c] text-white px-4 py-2 rounded-lg font-bold text-xs shrink-0 transition-colors shadow-sm"
                >
                  <span>Claim on GOV.UK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SAVINGS & SIPP EXPLORER */}
        {activeTab === 'savings_sipp' && (
          <SavingsSippExplorer 
            profile={profile}
            onUpdateSavings={handleSavingsUpdate}
          />
        )}

        {/* TAB 3: UK GOVERNMENT SPEND & REAL MAP */}
        {activeTab === 'gov_spend' && (
          <div className="space-y-6">
            <GovernmentExpenditureStats />
          </div>
        )}

        {/* TAB 4: FULL CRITERIA & RULES REFERENCE */}
        {activeTab === 'criteria_guide' && (
          <div className="bg-[#EFE8DA] rounded-2xl p-6 border-2 border-[#E2ECE5] shadow-sm space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F3DD87] text-[#1F5A45] mb-2">
                Statutory Guidelines
              </span>
              <h3 className="text-2xl font-bold text-[#1F5A45]">
                UK Benefits Eligibility Criteria & Durations Encyclopedia
              </h3>
              <p className="text-sm text-[#1F5A45]/80 mt-1 max-w-3xl">
                Comprehensive reference of standard rates, durations, family size rules, and capital criteria mandated by the Department for Work and Pensions (DWP) and HM Revenue and Customs (HMRC).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Universal Credit Section */}
              <div className="bg-[#F8F3E8] p-5 rounded-xl border border-[#cad9ce] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-[#1F5A45]">Universal Credit (UC)</h4>
                  <span className="text-xs font-bold text-[#E9774F]">Monthly Payment</span>
                </div>
                <div className="text-xs text-[#1F5A45]/80 space-y-2">
                  <p><strong>Who is eligible:</strong> Aged 18 to 65 (under State Pension age), UK resident, low or zero income, and less than £16,000 in capital.</p>
                  <p><strong>Payment Durations:</strong> Paid indefinitely once every calendar month into your bank account as long as you meet the work commitments and ongoing criteria.</p>
                  <p><strong>Single vs Couple:</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Single under 25: £311.68/month</li>
                    <li>Single 25 or over: £393.45/month</li>
                    <li>Couple both under 25: £489.23/month</li>
                    <li>Couple either 25 or over: £617.60/month</li>
                  </ul>
                  <p><strong>Children & Family:</strong> £333.33/mo for first child born before 6 April 2017; £287.92/mo for subsequent children. Subject to the 2-child limit.</p>
                  <p><strong>Capital/Savings:</strong> &lt;£6,000 ignored; £6,000 - £16,000 tariff deducted; &gt;£16,000 ineligible. SIPP/pension pot completely disregarded.</p>
                </div>
              </div>

              {/* Child Benefit Section */}
              <div className="bg-[#F8F3E8] p-5 rounded-xl border border-[#cad9ce] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-[#1F5A45]">Child Benefit (HMRC)</h4>
                  <span className="text-xs font-bold text-[#E9774F]">Every 4 Weeks</span>
                </div>
                <div className="text-xs text-[#1F5A45]/80 space-y-2">
                  <p><strong>Who is eligible:</strong> Anyone responsible for bringing up a child aged under 16, or under 20 if they stay in approved education or training.</p>
                  <p><strong>Rates:</strong> £25.60 per week for your eldest or only child; £16.95 per week for each additional child.</p>
                  <p><strong>Two-child limit:</strong> <em>Does not apply!</em> You get paid for every child in the family.</p>
                  <p><strong>Savings / SIPP:</strong> Completely non-means tested. You can have £1,000,000 in savings and still qualify.</p>
                  <p><strong>High Income Charge:</strong> If you or your partner earn over £60,000 individual gross income, tax clawback begins up to £80,000.</p>
                </div>
              </div>

              {/* PIP Section */}
              <div className="bg-[#F8F3E8] p-5 rounded-xl border border-[#cad9ce] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-[#1F5A45]">Personal Independence Payment (PIP)</h4>
                  <span className="text-xs font-bold text-[#E9774F]">Every 4 Weeks</span>
                </div>
                <div className="text-xs text-[#1F5A45]/80 space-y-2">
                  <p><strong>Who is eligible:</strong> People aged 16 to 65 with long-term physical or mental health conditions or disabilities who have difficulties with daily tasks or mobility.</p>
                  <p><strong>Rates:</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Daily Living: Standard £72.65/wk, Enhanced £108.55/wk</li>
                    <li>Mobility: Standard £28.70/wk, Enhanced £75.75/wk</li>
                  </ul>
                  <p><strong>Duration:</strong> Typically awarded for 2 to 10 years with scheduled review dates. Unaffected by employment, savings, or SIPP.</p>
                </div>
              </div>

              {/* Carer's Allowance Section */}
              <div className="bg-[#F8F3E8] p-5 rounded-xl border border-[#cad9ce] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-[#1F5A45]">Carer's Allowance</h4>
                  <span className="text-xs font-bold text-[#E9774F]">Weekly / 4-Weekly</span>
                </div>
                <div className="text-xs text-[#1F5A45]/80 space-y-2">
                  <p><strong>Who is eligible:</strong> Caring for someone at least 35 hours per week who receives a qualifying disability benefit (e.g. PIP Daily Living).</p>
                  <p><strong>Rate:</strong> £81.90 per week.</p>
                  <p><strong>Earnings Cap:</strong> You must not earn more than £151/week net after allowable expenses.</p>
                  <p><strong>Savings:</strong> No capital or savings limit applies!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#EFE8DA] border-t border-[#cad9ce] py-6 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1F5A45]/80">
          <div>
            <span className="font-bold text-[#1F5A45]">UK Benefit Compass</span> — Developed by{' '}
            <a 
              href="mailto:anildutta007@gmail.com" 
              className="font-extrabold text-[#1F5A45] hover:text-[#E9774F] underline inline-flex items-center gap-1"
            >
              <span>Anil Dutta</span>
              <Mail className="w-3 h-3" />
            </a>{' '}
            (<span className="font-mono text-[#1F5A45]">anildutta007@gmail.com</span>) in accordance with UK DWP and HMRC regulations.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E2ECE5] font-extrabold text-[#1F5A45]">
              <Eye className="w-3 h-3 text-[#E9774F]" /> {visitorCount} Total Visits
            </span>
            <span>•</span>
            <a 
              href="https://www.gov.uk/benefits-calculators" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#1F5A45] hover:underline flex items-center gap-1"
            >
              <span>Gov.uk Benefits Guidance</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="text-[#1F5A45]/60">Updated for 2025/2026 Tax Year</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
