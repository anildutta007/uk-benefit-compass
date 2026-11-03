import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  PiggyBank, 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { type UserProfile, calculateUKBenefits } from '../services/ukBenefitsEngine';

interface Props {
  profile: UserProfile;
  onUpdateSavings: (liquid: number, sipp: number) => void;
}

export const SavingsSippExplorer: React.FC<Props> = ({ profile, onUpdateSavings }) => {
  const [testSavings, setTestSavings] = useState<number>(profile.liquidSavings);
  const [testSipp, setTestSipp] = useState<number>(profile.sippPotsValue);

  // Compute live test scenario
  const scenarioProfile: UserProfile = {
    ...profile,
    liquidSavings: testSavings,
    sippPotsValue: testSipp
  };
  const testResults = calculateUKBenefits(scenarioProfile);

  return (
    <div className="bg-[#EFE8DA] rounded-2xl p-6 border-2 border-[#E2ECE5] shadow-sm">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F3DD87] text-[#1F5A45] mb-2">
            <PiggyBank className="w-4 h-4" /> Capital & Pension Rules Explorer
          </span>
          <h3 className="text-2xl font-bold text-[#1F5A45]">
            How Savings & SIPP Affect Your UK Benefits
          </h3>
          <p className="text-sm text-[#1F5A45]/80 mt-1 max-w-2xl">
            Simulate your savings and SIPP pots dynamically to see the exact threshold triggers, tariff deductions, and exemption rules set by DWP and HMRC.
          </p>
        </div>

        <a 
          href="https://www.gov.uk/universal-credit/eligibility" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5A45] bg-[#E2ECE5] hover:bg-[#cad9ce] px-3 py-2 rounded-lg transition-colors"
        >
          <span>DWP Rules (gov.uk)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3 Key Ground Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Card 1: < £6,000 */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          testSavings <= 6000 
            ? 'bg-[#E2ECE5] border-[#1F5A45] ring-2 ring-[#1F5A45]/30' 
            : 'bg-[#F8F3E8] border-[#cad9ce]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Safe Zone
            </span>
            <span className="text-xs font-semibold text-[#1F5A45]">£0 – £6,000</span>
          </div>
          <h4 className="font-bold text-[#1F5A45] text-base mb-1">Under £6,000</h4>
          <p className="text-xs text-[#1F5A45]/80 leading-relaxed">
            <strong>Zero deduction.</strong> You receive 100% of your Universal Credit and Council Tax Reduction. DWP ignores this money completely.
          </p>
        </div>

        {/* Card 2: £6,000 - £16,000 */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          testSavings > 6000 && testSavings <= 16000 
            ? 'bg-[#F3DD87]/30 border-[#1F5A45] ring-2 ring-[#1F5A45]/30' 
            : 'bg-[#F8F3E8] border-[#cad9ce]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              Tariff Zone
            </span>
            <span className="text-xs font-semibold text-[#1F5A45]">£6,001 – £16,000</span>
          </div>
          <h4 className="font-bold text-[#1F5A45] text-base mb-1">£6,000 to £16,000</h4>
          <p className="text-xs text-[#1F5A45]/80 leading-relaxed">
            <strong>Tariff Income:</strong> DWP reduces Universal Credit by <strong>£4.35/month</strong> for every £250 (or fraction) above £6,000.
          </p>
        </div>

        {/* Card 3: > £16,000 */}
        <div className={`p-4 rounded-xl border-2 transition-all ${
          testSavings > 16000 
            ? 'bg-red-50 border-red-500 ring-2 ring-red-300' 
            : 'bg-[#F8F3E8] border-[#cad9ce]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
              Cliff Edge
            </span>
            <span className="text-xs font-semibold text-red-700">&gt; £16,000</span>
          </div>
          <h4 className="font-bold text-red-900 text-base mb-1">Over £16,000</h4>
          <p className="text-xs text-red-800/90 leading-relaxed">
            <strong>Complete Disqualification:</strong> You cannot get Universal Credit or CTR. <em>(Note: Child Benefit & PIP are never affected by this!)</em>
          </p>
        </div>
      </div>

      {/* SIPP Special Callout Banner */}
      <div className="bg-[#1F5A45] text-[#F8F3E8] rounded-xl p-5 mb-8 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#E9774F] text-white rounded-xl shadow-inner shrink-0 mt-0.5">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="text-lg font-bold text-white">SIPP & Personal Pension Protection Rule</h4>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#F3DD87] text-[#1F5A45]">
                100% EXEMPT
              </span>
            </div>
            <p className="text-sm text-[#E2ECE5] leading-relaxed">
              Under Regulation 55 of the Universal Credit Regulations 2013, the value of any <strong>unaccessed SIPP, workplace pension, or personal pension scheme</strong> is completely <strong>disregarded</strong> when assessing your capital, provided you are under State Pension Age.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#1F5A45]/40 text-xs">
              <div className="flex items-center gap-2 text-[#F8F3E8]">
                <CheckCircle2 className="w-4 h-4 text-[#F3DD87] shrink-0" />
                <span>You can hold £100,000+ in your SIPP and still claim Universal Credit.</span>
              </div>
              <div className="flex items-center gap-2 text-[#F8F3E8]">
                <AlertTriangle className="w-4 h-4 text-[#E9774F] shrink-0" />
                <span>Withdrawing cash from your SIPP into your bank turns it into countable capital!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="bg-[#F8F3E8] rounded-xl p-5 border border-[#cad9ce] mb-6">
        <h4 className="font-bold text-[#1F5A45] text-base mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E9774F]" />
          Interactive Simulator: Drag sliders to test your savings impact
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Slider 1: Liquid Savings */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#1F5A45] uppercase tracking-wider">
                Liquid Savings (Bank, ISAs, Shares, Cash)
              </label>
              <span className="text-base font-extrabold text-[#1F5A45]">
                £{testSavings.toLocaleString()}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="25000" 
              step="250"
              value={testSavings}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTestSavings(val);
                onUpdateSavings(val, testSipp);
              }}
              className="w-full accent-[#E9774F] cursor-pointer h-2 bg-[#EFE8DA] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#1F5A45]/70 mt-1">
              <span>£0</span>
              <span className="text-emerald-700 font-semibold">£6,000 (Safe)</span>
              <span className="text-red-700 font-semibold">£16,000 (Limit)</span>
              <span>£25,000+</span>
            </div>
          </div>

          {/* Slider 2: SIPP / Pension Pot */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#1F5A45] uppercase tracking-wider">
                SIPP / Unaccessed Pension Pot
              </label>
              <span className="text-base font-extrabold text-[#1F5A45]">
                £{testSipp.toLocaleString()}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="150000" 
              step="2500"
              value={testSipp}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTestSipp(val);
                onUpdateSavings(testSavings, val);
              }}
              className="w-full accent-[#1F5A45] cursor-pointer h-2 bg-[#EFE8DA] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#1F5A45]/70 mt-1">
              <span>£0</span>
              <span>£50,000</span>
              <span>£100,000</span>
              <span className="text-[#1F5A45] font-semibold">100% Disregarded!</span>
            </div>
          </div>
        </div>

        {/* Live Simulator Outcome */}
        <div className="mt-5 p-4 rounded-xl bg-[#E2ECE5] border border-[#cad9ce] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-[#1F5A45]/70">Simulation Impact on Universal Credit</div>
            <div className="text-lg font-bold text-[#1F5A45] mt-0.5">
              {testSavings > 16000 ? (
                <span className="text-red-600 flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" /> Ineligible for UC (&gt;£16,000 limit)
                </span>
              ) : testSavings > 6000 ? (
                <span className="text-[#1F5A45] flex items-center gap-1.5">
                  <TrendingDown className="w-5 h-5 text-[#E9774F]" />
                  -£{testResults.capitalStatus.monthlyTariffDeduction.toFixed(2)}/month tariff deduction
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" /> Full Universal Credit (£0 deduction)
                </span>
              )}
            </div>
            <p className="text-xs text-[#1F5A45]/80 mt-1">
              {testResults.capitalStatus.explanation}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-[#1F5A45]/70">Estimated Total Entitlement</div>
            <div className="text-2xl font-black text-[#1F5A45]">
              £{testResults.totalMonthlyBenefit.toFixed(2)} <span className="text-xs font-normal text-[#1F5A45]/70">/month</span>
            </div>
            <div className="text-xs font-bold text-[#E9774F]">
              £{testResults.totalAnnualBenefit.toFixed(2)} /year
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-[#cad9ce] bg-[#F8F3E8]">
        <table className="w-full text-left text-xs text-[#1F5A45]">
          <thead className="bg-[#E2ECE5] uppercase font-bold tracking-wider text-[11px] border-b border-[#cad9ce]">
            <tr>
              <th className="p-3">Asset Type</th>
              <th className="p-3">Counts as Capital?</th>
              <th className="p-3">Universal Credit Rule</th>
              <th className="p-3">Child Benefit & PIP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cad9ce]">
            <tr>
              <td className="p-3 font-semibold">Cash & Bank Accounts</td>
              <td className="p-3"><span className="text-red-700 font-bold">YES</span></td>
              <td className="p-3">Subject to £6k / £16k limit</td>
              <td className="p-3 text-emerald-700 font-bold">Ignored (No Limit)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Stocks & Shares / ISAs</td>
              <td className="p-3"><span className="text-red-700 font-bold">YES</span></td>
              <td className="p-3">Subject to £6k / £16k limit</td>
              <td className="p-3 text-emerald-700 font-bold">Ignored (No Limit)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Premium Bonds</td>
              <td className="p-3"><span className="text-red-700 font-bold">YES</span></td>
              <td className="p-3">Counted at purchase face value</td>
              <td className="p-3 text-emerald-700 font-bold">Ignored (No Limit)</td>
            </tr>
            <tr className="bg-[#E2ECE5]/50 font-medium">
              <td className="p-3 font-bold text-[#1F5A45]">SIPP / Personal Pension (Under Age 66)</td>
              <td className="p-3"><span className="text-emerald-700 font-bold">NO (100% EXEMPT)</span></td>
              <td className="p-3 text-emerald-800">Completely disregarded while unaccessed</td>
              <td className="p-3 text-emerald-700 font-bold">Ignored (No Limit)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">SIPP Drawdown (Monthly Income taken)</td>
              <td className="p-3"><span className="text-amber-700 font-bold">Treated as Income</span></td>
              <td className="p-3">Deducted £1 for £1 as unearned income</td>
              <td className="p-3 text-emerald-700 font-bold">Ignored (No Limit)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Main Home you live in</td>
              <td className="p-3"><span className="text-emerald-700 font-bold">NO (EXEMPT)</span></td>
              <td className="p-3">Home equity is completely disregarded</td>
              <td className="p-3 text-emerald-700 font-bold">Ignored (No Limit)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
