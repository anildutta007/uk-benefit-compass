import React, { useState } from 'react';
import { 
  Users, 
  Baby, 
  Home, 
  Briefcase, 
  PiggyBank, 
  HeartHandshake, 
  Sparkles,
  HelpCircle,
  ChevronUp
} from 'lucide-react';
import type { UserProfile } from '../services/ukBenefitsEngine';

interface Props {
  profile: UserProfile;
  onChange: (updated: Partial<UserProfile>) => void;
}

export const BenefitInputPanel: React.FC<Props> = ({ profile, onChange }) => {
  // Toggle states for help explainer accordions
  const [openHelp, setOpenHelp] = useState<string | null>(null);

  const toggleHelp = (key: string) => {
    setOpenHelp(prev => (prev === key ? null : key));
  };

  return (
    <div className="bg-[#EFE8DA] rounded-2xl border-2 border-[#cad9ce] p-5 shadow-sm space-y-6">
      <div className="border-b border-[#cad9ce] pb-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#F3DD87] text-[#1F5A45]">
            <Sparkles className="w-3.5 h-3.5 text-[#E9774F]" /> Live Reactive Inputs
          </span>
          <span className="text-[11px] font-bold text-[#1F5A45]/70">
            Updates in real-time →
          </span>
        </div>
        <h3 className="text-xl font-black text-[#1F5A45] mt-1.5">
          Your Criteria & Situation
        </h3>
        <p className="text-xs text-[#1F5A45]/80">
          Tweak any field below. Click <HelpCircle className="w-3.5 h-3.5 inline text-[#E9774F]" /> for official explanations of terms, rules, and ownership types.
        </p>
      </div>

      {/* 1. Household & Age */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <Users className="w-4 h-4 text-[#E9774F]" />
            <span>1. Household & Age</span>
          </div>
          <button
            type="button"
            onClick={() => toggleHelp('household')}
            className="text-[11px] font-bold text-[#E9774F] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Explain rules</span>
          </button>
        </div>

        {/* Explainer Accordion for Household */}
        {openHelp === 'household' && (
          <div className="p-3 bg-[#E2ECE5] rounded-lg border border-[#cad9ce] text-[11px] text-[#1F5A45] space-y-2">
            <div className="font-bold flex items-center justify-between">
              <span>Why Age & Partner Status Matter:</span>
              <button onClick={() => toggleHelp('household')} className="text-[#1F5A45]/70"><ChevronUp className="w-3.5 h-3.5" /></button>
            </div>
            <p>
              • <strong>Under 25 vs 25+:</strong> DWP pays a lower Standard Allowance (£311.68/mo) for single claimants under 25, reflecting assumed lower living expenses. At 25+, it rises to £393.45/mo.
            </p>
            <p>
              • <strong>Couple Claims:</strong> If living with a partner as a couple, you <em>must</em> make a joint claim. Your combined income and capital are assessed together. If either of you is 25+, you receive the higher couple allowance (£617.60/mo).
            </p>
            <p>
              • <strong>Right to Reside:</strong> To claim UK public funds, you must pass the Habitual Residence Test and have qualifying settled status or British/Irish citizenship.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange({ relationshipStatus: 'single' })}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
              profile.relationshipStatus === 'single'
                ? 'bg-[#1F5A45] text-white border-[#1F5A45] shadow-sm'
                : 'bg-white text-[#1F5A45] border-[#cad9ce] hover:bg-[#E2ECE5]'
            }`}
          >
            Single Person
          </button>
          <button
            type="button"
            onClick={() => onChange({ relationshipStatus: 'couple' })}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
              profile.relationshipStatus === 'couple'
                ? 'bg-[#1F5A45] text-white border-[#1F5A45] shadow-sm'
                : 'bg-white text-[#1F5A45] border-[#cad9ce] hover:bg-[#E2ECE5]'
            }`}
          >
            Couple
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-[#1F5A45] mb-1">Your Age</label>
            <input 
              type="number"
              min="16"
              max="100"
              value={profile.age}
              onChange={(e) => onChange({ age: Number(e.target.value) || 18 })}
              className="w-full bg-white border border-[#cad9ce] rounded-lg px-3 py-1.5 text-xs font-bold text-[#1F5A45] focus:ring-1 focus:ring-[#1F5A45] outline-none"
            />
            <span className="text-[10px] text-[#1F5A45]/70 block mt-0.5">
              {profile.age < 25 ? 'Under 25 rate' : profile.age >= 66 ? 'Pension Age (66+)' : '25+ Adult rate'}
            </span>
          </div>

          {profile.relationshipStatus === 'couple' && (
            <div>
              <label className="block text-[11px] font-bold text-[#1F5A45] mb-1">Partner Age</label>
              <input 
                type="number"
                min="16"
                max="100"
                value={profile.partnerAge}
                onChange={(e) => onChange({ partnerAge: Number(e.target.value) || 18 })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-3 py-1.5 text-xs font-bold text-[#1F5A45] focus:ring-1 focus:ring-[#1F5A45] outline-none"
              />
              <span className="text-[10px] text-[#1F5A45]/70 block mt-0.5">
                {profile.partnerAge < 25 && profile.age < 25 ? 'Both under 25' : 'Higher couple rate'}
              </span>
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1 text-[11px] font-medium text-[#1F5A45]">
          <input 
            type="checkbox"
            checked={profile.hasRightToReside}
            onChange={(e) => onChange({ hasRightToReside: e.target.checked })}
            className="rounded accent-[#1F5A45] w-3.5 h-3.5"
          />
          <span>UK habitual resident / Right to reside</span>
        </label>
      </div>

      {/* 2. Children & Family */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <Baby className="w-4 h-4 text-[#E9774F]" />
            <span>2. Children & Dependants</span>
          </div>
          <button
            type="button"
            onClick={() => toggleHelp('children')}
            className="text-[11px] font-bold text-[#E9774F] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Explain rules</span>
          </button>
        </div>

        {/* Explainer Accordion for Children */}
        {openHelp === 'children' && (
          <div className="p-3 bg-[#E2ECE5] rounded-lg border border-[#cad9ce] text-[11px] text-[#1F5A45] space-y-2">
            <div className="font-bold flex items-center justify-between">
              <span>Children & Childcare Rules:</span>
              <button onClick={() => toggleHelp('children')} className="text-[#1F5A45]/70"><ChevronUp className="w-3.5 h-3.5" /></button>
            </div>
            <p>
              • <strong>Two-Child Limit:</strong> Under UK Universal Credit rules, you only receive the child element for your first 2 children, unless children were born before 6 April 2017, or born as twins/triplets, or adopted. <em>(Child Benefit from HMRC pays for ALL children without any 2-child restriction!)</em>
            </p>
            <p>
              • <strong>Pre-April 2017 Rate:</strong> First children born before 6 April 2017 get a higher protected rate of £333.33/mo (vs £287.92/mo standard).
            </p>
            <p>
              • <strong>Childcare Costs:</strong> If working, UC covers up to 85% of registered nursery/childminder fees (capped at £1,014.63 for 1 child, £1,739.37 for 2+).
            </p>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-[#1F5A45] mb-1.5">Number of Children</label>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChange({ childrenCount: num, hasChildren: num > 0 })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  profile.childrenCount === num
                    ? 'bg-[#1F5A45] text-white border-[#1F5A45]'
                    : 'bg-white text-[#1F5A45] border-[#cad9ce] hover:bg-[#E2ECE5]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {profile.childrenCount > 0 && (
          <div className="space-y-2.5 pt-1 border-t border-[#cad9ce]">
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#1F5A45]">
              <input 
                type="checkbox"
                checked={profile.firstBornBeforeApril2017}
                onChange={(e) => onChange({ firstBornBeforeApril2017: e.target.checked })}
                className="rounded accent-[#1F5A45] w-3.5 h-3.5 mt-0.5"
              />
              <span>Oldest child born before 6 April 2017 (£333.33/mo grandfathered rate)</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-[#1F5A45]">Childcare Costs (£/mo)</label>
                <input 
                  type="number"
                  step="50"
                  value={profile.monthlyChildcareCosts}
                  onChange={(e) => onChange({ monthlyChildcareCosts: Number(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
                  placeholder="£0"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#1F5A45]">Disabled Children</label>
                <select
                  value={profile.disabledChildrenCount}
                  onChange={(e) => onChange({ disabledChildrenCount: Number(e.target.value) })}
                  className="w-full bg-white border border-[#cad9ce] rounded-lg px-2 py-1 text-xs font-bold text-[#1F5A45] outline-none"
                >
                  <option value="0">0</option>
                  <option value="1">1 (+£156/mo)</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Housing, Ownership & Council Tax (EXPANDED EXPLAINER) */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <Home className="w-4 h-4 text-[#E9774F]" />
            <span>3. Housing, Ownership & Council Tax</span>
          </div>
          <button
            type="button"
            onClick={() => toggleHelp('housing')}
            className="text-[11px] font-bold text-[#E9774F] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ownership & LHA Guide</span>
          </button>
        </div>

        {/* Detailed Explainer for Housing, Ownership & LHA */}
        {openHelp === 'housing' && (
          <div className="p-3.5 bg-[#E2ECE5] rounded-xl border border-[#cad9ce] text-[11px] text-[#1F5A45] space-y-2.5">
            <div className="font-bold flex items-center justify-between border-b border-[#cad9ce] pb-1.5">
              <span className="text-xs font-black uppercase text-[#1F5A45]">Housing Types & What LHA Means:</span>
              <button onClick={() => toggleHelp('housing')} className="text-[#1F5A45]/70"><ChevronUp className="w-3.5 h-3.5" /></button>
            </div>
            
            <div>
              <strong className="text-[#1F5A45]">1. Private Rent & Local Housing Allowance (LHA) Cap:</strong>
              <p className="mt-0.5">
                • <strong>What is LHA?</strong> Local Housing Allowance is the maximum amount of rent support Universal Credit will pay for private rentals in your postcode area.
                <br />
                • <strong>How is it set?</strong> It is based on the 30th percentile of local market rents for your required number of bedrooms.
                <br />
                • <strong>The Cap Effect:</strong> If your rent is £900/mo but your area’s LHA limit is £750/mo, UC will only pay £750. You must pay the remaining £150 difference yourself.
              </p>
            </div>

            <div>
              <strong className="text-[#1F5A45]">2. Council / Social Housing Rent:</strong>
              <p className="mt-0.5">
                • Not subject to the private LHA cap. Universal Credit covers 100% of your actual eligible social rent, subject to the "Under-occupancy deduction" (Bedroom Tax: -14% for 1 spare bedroom, -25% for 2+ spare bedrooms).
              </p>
            </div>

            <div>
              <strong className="text-[#1F5A45]">3. Homeowner:</strong>
              <p className="mt-0.5">
                • UC does <strong>not pay mortgage repayments</strong> or property capital.
                <br />
                • Homeowners can however qualify for <strong>Support for Mortgage Interest (SMI)</strong>, which is a government loan to help pay interest on mortgages up to £200,000 after claiming UC for 3 months.
                <br />
                • Your main home equity is 100% ignored in the capital/savings test.
              </p>
            </div>

            <div>
              <strong className="text-[#1F5A45]">4. Living with Family / Friends:</strong>
              <p className="mt-0.5">
                • You cannot claim the UC housing element because you are not legally liable for rent under a formal tenancy agreement.
              </p>
            </div>

            <div>
              <strong className="text-[#1F5A45]">5. Council Tax Reduction (CTR):</strong>
              <p className="mt-0.5">
                • <strong>25% Single Person Discount:</strong> If you are the only adult (18+) living in the home, your council bill is automatically cut by 25%, regardless of income or savings!
                <br />
                • <strong>Low Income Support:</strong> Local councils provide means-tested discounts up to 100% off the bill if you receive Universal Credit or are on a low wage.
              </p>
            </div>
          </div>
        )}

        {/* Ownership Selector Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'rent_private', label: 'Private Rent (LHA capped)' },
            { id: 'rent_social', label: 'Council / Housing Assoc' },
            { id: 'homeowner', label: 'Homeowner' },
            { id: 'living_with_family', label: 'Living with Family' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ housingTenure: t.id as any })}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all border ${
                profile.housingTenure === t.id
                  ? 'bg-[#1F5A45] text-white border-[#1F5A45]'
                  : 'bg-white text-[#1F5A45] border-[#cad9ce] hover:bg-[#E2ECE5]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {profile.housingTenure.startsWith('rent') && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="block text-[10px] font-bold text-[#1F5A45]">Your Actual Rent (£/mo)</label>
              <input 
                type="number"
                step="50"
                value={profile.monthlyRent}
                onChange={(e) => onChange({ monthlyRent: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-[10px] font-bold text-[#1F5A45]">LHA Cap / Limit (£)</label>
                <button 
                  type="button" 
                  onClick={() => toggleHelp('housing')}
                  className="text-[9px] text-[#E9774F] font-bold hover:underline"
                >
                  What is this?
                </button>
              </div>
              <input 
                type="number"
                step="50"
                value={profile.estimatedLHA}
                onChange={(e) => onChange({ estimatedLHA: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
                placeholder="Leave same as rent if unsure"
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-bold text-[#1F5A45]">Monthly Council Tax Bill (£)</label>
            <span className="text-[10px] text-[#1F5A45]/70">
              {profile.relationshipStatus === 'single' ? '✓ Automatic 25% single discount applies' : 'Joint bill'}
            </span>
          </div>
          <input 
            type="number"
            step="10"
            value={profile.councilTaxBandMonthly}
            onChange={(e) => onChange({ councilTaxBandMonthly: Number(e.target.value) || 0 })}
            className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
          />
        </div>
      </div>

      {/* 4. Earnings & Take-Home Pay */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <Briefcase className="w-4 h-4 text-[#E9774F]" />
            <span>4. Monthly Net Earnings</span>
          </div>
          <button
            type="button"
            onClick={() => toggleHelp('earnings')}
            className="text-[11px] font-bold text-[#E9774F] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Work taper rules</span>
          </button>
        </div>

        {/* Explainer for Earnings */}
        {openHelp === 'earnings' && (
          <div className="p-3 bg-[#E2ECE5] rounded-lg border border-[#cad9ce] text-[11px] text-[#1F5A45] space-y-2">
            <div className="font-bold flex items-center justify-between">
              <span>Earnings Taper & Work Allowance:</span>
              <button onClick={() => toggleHelp('earnings')} className="text-[#1F5A45]/70"><ChevronUp className="w-3.5 h-3.5" /></button>
            </div>
            <p>
              • <strong>Work Allowance:</strong> If you or your partner have children or limited capability for work, you can earn up to £404/mo (if claiming rent help) or £673/mo (if not claiming rent help) before your Universal Credit is reduced by a single penny.
            </p>
            <p>
              • <strong>The 55% Taper Rate:</strong> For every £1 you earn <em>above</em> your work allowance, your UC reduces by 55p. This means you always keep 45p plus your net wages.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-[#1F5A45]">Your Net Earnings (£/mo)</label>
            <input 
              type="number"
              step="50"
              value={profile.monthlyEarnedNetIncome}
              onChange={(e) => onChange({ monthlyEarnedNetIncome: Number(e.target.value) || 0 })}
              className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#1F5A45] outline-none"
              placeholder="£0"
            />
          </div>

          {profile.relationshipStatus === 'couple' && (
            <div>
              <label className="block text-[10px] font-bold text-[#1F5A45]">Partner Net Pay (£/mo)</label>
              <input 
                type="number"
                step="50"
                value={profile.partnerMonthlyEarnedNetIncome}
                onChange={(e) => onChange({ partnerMonthlyEarnedNetIncome: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#1F5A45] outline-none"
                placeholder="£0"
              />
            </div>
          )}
        </div>
      </div>

      {/* 5. Savings, Capital & SIPP */}
      <div className="bg-[#E2ECE5] p-4 rounded-xl border-2 border-[#1F5A45]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <PiggyBank className="w-4 h-4 text-[#E9774F]" />
            <span>5. Savings & SIPP / Pension</span>
          </div>
          <button
            type="button"
            onClick={() => toggleHelp('savings')}
            className="text-[11px] font-bold text-[#E9774F] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Capital rules</span>
          </button>
        </div>

        {/* Explainer for Savings & SIPP */}
        {openHelp === 'savings' && (
          <div className="p-3 bg-[#F8F3E8] rounded-lg border border-[#cad9ce] text-[11px] text-[#1F5A45] space-y-2">
            <div className="font-bold flex items-center justify-between">
              <span>Savings Limits & SIPP Protections:</span>
              <button onClick={() => toggleHelp('savings')} className="text-[#1F5A45]/70"><ChevronUp className="w-3.5 h-3.5" /></button>
            </div>
            <p>
              • <strong>£6,000 Lower Limit:</strong> Any savings under £6,000 have zero impact on Universal Credit.
            </p>
            <p>
              • <strong>£6k to £16k Tariff Income:</strong> DWP treats every £250 above £6,000 as producing £4.35/month in income, which is deducted from your payment.
            </p>
            <p>
              • <strong>£16,000 Cliff Edge:</strong> If your cash/ISAs exceed £16,000, you are completely ineligible for Universal Credit.
            </p>
            <p>
              • <strong>SIPP & Personal Pension Pot:</strong> Under Regulation 55 of the Universal Credit Regulations 2013, unaccessed pension pots are <strong>100% exempt</strong> from the £16k test while you are under State Pension age.
            </p>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-bold text-[#1F5A45]">
              Liquid Savings (Bank, Cash, ISAs)
            </label>
            <span className="text-xs font-extrabold text-[#1F5A45]">
              £{profile.liquidSavings.toLocaleString()}
            </span>
          </div>
          <input 
            type="range"
            min="0"
            max="25000"
            step="250"
            value={profile.liquidSavings}
            onChange={(e) => onChange({ liquidSavings: Number(e.target.value) || 0 })}
            className="w-full accent-[#E9774F] h-1.5 bg-white rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#1F5A45]/70 mt-1">
            <span>£0</span>
            <span className="font-bold text-emerald-700">£6,000 (Safe)</span>
            <span className="font-bold text-red-700">£16,000 (Cutoff)</span>
            <span>£25k+</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#cad9ce]">
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-bold text-[#1F5A45]">
              SIPP / Pension Pot Value
            </label>
            <span className="text-xs font-black text-[#1F5A45] flex items-center gap-1">
              £{profile.sippPotsValue.toLocaleString()}
              <span className="text-[9px] px-1.5 py-0.2 bg-[#F3DD87] text-[#1F5A45] rounded font-extrabold">100% EXEMPT</span>
            </span>
          </div>
          <input 
            type="range"
            min="0"
            max="100000"
            step="2500"
            value={profile.sippPotsValue}
            onChange={(e) => onChange({ sippPotsValue: Number(e.target.value) || 0 })}
            className="w-full accent-[#1F5A45] h-1.5 bg-white rounded-lg cursor-pointer"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1 text-[11px] font-medium text-[#1F5A45]">
          <input 
            type="checkbox"
            checked={profile.sippIsDrawnDown}
            onChange={(e) => onChange({ sippIsDrawnDown: e.target.checked })}
            className="rounded accent-[#1F5A45] w-3.5 h-3.5"
          />
          <span>Drawing monthly income from SIPP?</span>
        </label>

        {profile.sippIsDrawnDown && (
          <div>
            <label className="block text-[10px] font-bold text-[#1F5A45]">Monthly Pension Drawdown (£/mo)</label>
            <input 
              type="number"
              step="50"
              value={profile.sippMonthlyDrawdownIncome}
              onChange={(e) => onChange({ sippMonthlyDrawdownIncome: Number(e.target.value) || 0 })}
              className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
              placeholder="e.g. 200"
            />
          </div>
        )}
      </div>

      {/* 6. Health & Caring */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <HeartHandshake className="w-4 h-4 text-[#E9774F]" />
            <span>6. Health, PIP & Carer</span>
          </div>
          <button
            type="button"
            onClick={() => toggleHelp('health')}
            className="text-[11px] font-bold text-[#E9774F] hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PIP & LCWRA guide</span>
          </button>
        </div>

        {/* Explainer for Health */}
        {openHelp === 'health' && (
          <div className="p-3 bg-[#E2ECE5] rounded-lg border border-[#cad9ce] text-[11px] text-[#1F5A45] space-y-2">
            <div className="font-bold flex items-center justify-between">
              <span>Disability & Carer Benefits:</span>
              <button onClick={() => toggleHelp('health')} className="text-[#1F5A45]/70"><ChevronUp className="w-3.5 h-3.5" /></button>
            </div>
            <p>
              • <strong>PIP (Personal Independence Payment):</strong> Completely non-means tested. You can have £500,000 in savings or earn high wages and still receive PIP if you have difficulties with daily tasks or mobility.
            </p>
            <p>
              • <strong>LCWRA (Limited Capability for Work and Work-Related Activity):</strong> An extra element within Universal Credit (£416.19/month) for claimants whose disability severely restricts their ability to prepare for or find work.
            </p>
            <p>
              • <strong>Carer's Allowance:</strong> Paid at £81.90/week if you care for someone 35+ hours/week who receives PIP Daily Living. It has no savings limit, but your earnings must not exceed £151/week net.
            </p>
          </div>
        )}

        <label className="flex items-start gap-2 cursor-pointer text-[11px] font-bold text-[#1F5A45]">
          <input 
            type="checkbox"
            checked={profile.hasHealthConditionOrDisability}
            onChange={(e) => onChange({ hasHealthConditionOrDisability: e.target.checked })}
            className="rounded accent-[#1F5A45] w-3.5 h-3.5 mt-0.5"
          />
          <span>Long-term illness / disability (Unlocks PIP & LCWRA)</span>
        </label>

        {profile.hasHealthConditionOrDisability && (
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#cad9ce]">
            <div>
              <label className="block text-[10px] font-bold text-[#1F5A45]">PIP Daily Living</label>
              <select
                value={profile.pipDailyLiving}
                onChange={(e) => onChange({ pipDailyLiving: e.target.value as any })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2 py-1 text-[11px] font-bold text-[#1F5A45] outline-none"
              >
                <option value="none">None</option>
                <option value="standard">Standard (£72.65/wk)</option>
                <option value="enhanced">Enhanced (£108.55/wk)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1F5A45]">PIP Mobility</label>
              <select
                value={profile.pipMobility}
                onChange={(e) => onChange({ pipMobility: e.target.value as any })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2 py-1 text-[11px] font-bold text-[#1F5A45] outline-none"
              >
                <option value="none">None</option>
                <option value="standard">Standard (£28.70/wk)</option>
                <option value="enhanced">Enhanced (£75.75/wk)</option>
              </select>
            </div>

            <label className="col-span-2 flex items-center gap-2 cursor-pointer text-[10px] font-bold text-[#1F5A45]">
              <input 
                type="checkbox"
                checked={profile.hasLCWRA}
                onChange={(e) => onChange({ hasLCWRA: e.target.checked })}
                className="rounded accent-[#1F5A45] w-3.5 h-3.5"
              />
              <span>LCWRA Health Element awarded (+£416.19/mo)</span>
            </label>
          </div>
        )}

        <label className="flex items-start gap-2 cursor-pointer text-[11px] font-bold text-[#1F5A45] pt-1 border-t border-[#cad9ce]">
          <input 
            type="checkbox"
            checked={profile.isCarerForSomeone}
            onChange={(e) => onChange({ isCarerForSomeone: e.target.checked })}
            className="rounded accent-[#1F5A45] w-3.5 h-3.5 mt-0.5"
          />
          <span>Caring 35+ hrs/week (Carer's Allowance: £81.90/wk)</span>
        </label>
      </div>
    </div>
  );
};
