import React, { useState } from 'react';
import { 
  Users, 
  Baby, 
  Home, 
  Briefcase, 
  PiggyBank, 
  HeartHandshake, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';
import type { UserProfile } from '../services/ukBenefitsEngine';

interface Props {
  profile: UserProfile;
  onChange: (updated: Partial<UserProfile>) => void;
  onCalculate: () => void;
}

export const CalculatorWizard: React.FC<Props> = ({ profile, onChange, onCalculate }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    { id: 1, title: 'Household & Age', icon: Users },
    { id: 2, title: 'Children & Family', icon: Baby },
    { id: 3, title: 'Housing & Rent', icon: Home },
    { id: 4, title: 'Earnings & Work', icon: Briefcase },
    { id: 5, title: 'Savings & SIPP', icon: PiggyBank },
    { id: 6, title: 'Health & Caring', icon: HeartHandshake },
  ];

  return (
    <div className="bg-[#EFE8DA] rounded-2xl border-2 border-[#E2ECE5] p-6 shadow-sm">
      {/* Stepper Navigation Pills */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-4 mb-6 border-b border-[#cad9ce]">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.id;
          const isDone = activeStep > s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive 
                  ? 'bg-[#1F5A45] text-[#F8F3E8] shadow-sm' 
                  : isDone 
                  ? 'bg-[#E2ECE5] text-[#1F5A45] hover:bg-[#cad9ce]'
                  : 'bg-[#F8F3E8] text-[#1F5A45]/60 hover:text-[#1F5A45]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{s.title}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[340px] flex flex-col justify-between">
        {/* STEP 1: Household & Age */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1F5A45] mb-1">Who is in your household?</h3>
              <p className="text-xs text-[#1F5A45]/80">
                UK benefit allowances differ significantly between single adults and couples, as well as age brackets (under or over 25).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => onChange({ relationshipStatus: 'single' })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  profile.relationshipStatus === 'single'
                    ? 'border-[#1F5A45] bg-[#E2ECE5] ring-1 ring-[#1F5A45]'
                    : 'border-[#cad9ce] bg-[#F8F3E8] hover:border-[#1F5A45]/50'
                }`}
              >
                <div className="font-bold text-[#1F5A45] text-base mb-1">Single Person</div>
                <div className="text-xs text-[#1F5A45]/70">
                  Living alone or as a single adult with/without dependants.
                </div>
              </div>

              <div 
                onClick={() => onChange({ relationshipStatus: 'couple' })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  profile.relationshipStatus === 'couple'
                    ? 'border-[#1F5A45] bg-[#E2ECE5] ring-1 ring-[#1F5A45]'
                    : 'border-[#cad9ce] bg-[#F8F3E8] hover:border-[#1F5A45]/50'
                }`}
              >
                <div className="font-bold text-[#1F5A45] text-base mb-1">Couple</div>
                <div className="text-xs text-[#1F5A45]/70">
                  Living with a spouse, civil partner, or cohabiting partner.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#1F5A45] mb-1">Your Age</label>
                <input 
                  type="number" 
                  min="16" 
                  max="100"
                  value={profile.age} 
                  onChange={(e) => onChange({ age: Number(e.target.value) || 18 })}
                  className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                />
                <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                  {profile.age < 25 ? 'Under 25 rate applies' : profile.age >= 66 ? 'State Pension Age reached' : 'Standard 25+ adult rate'}
                </span>
              </div>

              {profile.relationshipStatus === 'couple' && (
                <div>
                  <label className="block text-xs font-bold text-[#1F5A45] mb-1">Partner's Age</label>
                  <input 
                    type="number" 
                    min="16" 
                    max="100"
                    value={profile.partnerAge} 
                    onChange={(e) => onChange({ partnerAge: Number(e.target.value) || 18 })}
                    className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                  />
                  <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                    Couples where either person is 25+ receive the higher standard allowance.
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={profile.hasRightToReside} 
                  onChange={(e) => onChange({ hasRightToReside: e.target.checked })}
                  className="rounded text-[#1F5A45] focus:ring-[#1F5A45] accent-[#1F5A45] w-4 h-4"
                />
                <span className="text-xs font-semibold text-[#1F5A45]">
                  I am habitually resident in the UK with the legal right to claim public funds (British / Irish citizen, settled status, or indefinite leave).
                </span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 2: Children & Family */}
        {activeStep === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1F5A45] mb-1">Children & Dependants</h3>
              <p className="text-xs text-[#1F5A45]/80">
                Child Benefit is paid for <strong>all children</strong>, whereas Universal Credit has a <strong>2-child limit</strong> for children born on or after 6 April 2017.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                  Number of Children (aged under 16, or under 20 in education)
                </label>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => onChange({ 
                        childrenCount: num, 
                        hasChildren: num > 0 
                      })}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        profile.childrenCount === num
                          ? 'bg-[#1F5A45] text-white shadow-sm'
                          : 'bg-[#F8F3E8] border border-[#cad9ce] text-[#1F5A45] hover:bg-[#E2ECE5]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {profile.childrenCount > 0 && (
                <div>
                  <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                    Monthly Registered Childcare Costs (£)
                  </label>
                  <input 
                    type="number" 
                    step="50"
                    value={profile.monthlyChildcareCosts}
                    onChange={(e) => onChange({ monthlyChildcareCosts: Number(e.target.value) || 0 })}
                    className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                    placeholder="e.g. 500"
                  />
                  <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                    Universal Credit can cover up to 85% of paid nursery/childminder fees!
                  </span>
                </div>
              )}
            </div>

            {profile.childrenCount > 0 && (
              <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={profile.firstBornBeforeApril2017}
                    onChange={(e) => onChange({ firstBornBeforeApril2017: e.target.checked })}
                    className="rounded text-[#1F5A45] accent-[#1F5A45] w-4 h-4 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1F5A45] block">
                      Was your oldest child born before 6 April 2017?
                    </span>
                    <span className="text-[11px] text-[#1F5A45]/70">
                      Eligible for the grandfathered higher rate (£333.33/month vs standard £287.92/month).
                    </span>
                  </div>
                </label>

                <div className="pt-2 border-t border-[#cad9ce] grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                      Disabled Children (DLA / PIP recipient)
                    </label>
                    <select
                      value={profile.disabledChildrenCount}
                      onChange={(e) => onChange({ disabledChildrenCount: Number(e.target.value) })}
                      className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-3 py-2 text-xs font-semibold text-[#1F5A45]"
                    >
                      <option value="0">None</option>
                      <option value="1">1 child (+£156.11/mo)</option>
                      <option value="2">2 children</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                      Severely Disabled Children (Higher rate DLA care)
                    </label>
                    <select
                      value={profile.severelyDisabledChildrenCount}
                      onChange={(e) => onChange({ severelyDisabledChildrenCount: Number(e.target.value) })}
                      className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-3 py-2 text-xs font-semibold text-[#1F5A45]"
                    >
                      <option value="0">None</option>
                      <option value="1">1 child (+£456.89/mo)</option>
                      <option value="2">2 children</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Housing & Rent */}
        {activeStep === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1F5A45] mb-1">Housing & Accommodation</h3>
              <p className="text-xs text-[#1F5A45]/80">
                Universal Credit includes a housing element to cover all or part of your rent. Homeowners do not receive rent help, but can qualify for Support for Mortgage Interest (SMI) loan.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'rent_private', label: 'Private Rent' },
                { id: 'rent_social', label: 'Council / Housing Assoc' },
                { id: 'homeowner', label: 'Homeowner' },
                { id: 'living_with_family', label: 'Living with Family' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChange({ housingTenure: t.id as any })}
                  className={`p-3 rounded-xl text-xs font-bold text-center transition-all ${
                    profile.housingTenure === t.id
                      ? 'bg-[#1F5A45] text-white shadow-sm'
                      : 'bg-[#F8F3E8] border border-[#cad9ce] text-[#1F5A45] hover:bg-[#E2ECE5]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {profile.housingTenure.startsWith('rent') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                    Your Actual Monthly Rent (£)
                  </label>
                  <input 
                    type="number" 
                    step="50"
                    value={profile.monthlyRent}
                    onChange={(e) => onChange({ monthlyRent: Number(e.target.value) || 0 })}
                    className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                    placeholder="e.g. 750"
                  />
                </div>

                {profile.housingTenure === 'rent_private' && (
                  <div>
                    <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                      Estimated Local Housing Allowance (LHA) Cap (£)
                    </label>
                    <input 
                      type="number" 
                      step="50"
                      value={profile.estimatedLHA}
                      onChange={(e) => onChange({ estimatedLHA: Number(e.target.value) || 0 })}
                      className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                      placeholder="e.g. 700"
                    />
                    <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                      Leave blank or same as rent if unsure of your council's 30th percentile cap.
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                Monthly Council Tax Bill (£)
              </label>
              <input 
                type="number" 
                step="10"
                value={profile.councilTaxBandMonthly}
                onChange={(e) => onChange({ councilTaxBandMonthly: Number(e.target.value) || 0 })}
                className="w-full sm:w-1/2 bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                placeholder="e.g. 140"
              />
              <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                Single adults automatically qualify for a 25% single-person discount, plus means-tested low income reductions.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: Earnings & Work */}
        {activeStep === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1F5A45] mb-1">Employment & Net Earnings</h3>
              <p className="text-xs text-[#1F5A45]/80">
                You can work and claim Universal Credit! The <strong>taper rate is 55%</strong> (for every £1 you earn above your work allowance, your payment only reduces by 55p).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                  Your Monthly Net Take-Home Pay (£)
                </label>
                <input 
                  type="number" 
                  step="50"
                  value={profile.monthlyEarnedNetIncome}
                  onChange={(e) => onChange({ monthlyEarnedNetIncome: Number(e.target.value) || 0 })}
                  className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                  placeholder="£0 if unemployed"
                />
                <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                  Net earnings after tax, National Insurance, and workplace pension.
                </span>
              </div>

              {profile.relationshipStatus === 'couple' && (
                <div>
                  <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                    Partner's Monthly Net Take-Home Pay (£)
                  </label>
                  <input 
                    type="number" 
                    step="50"
                    value={profile.partnerMonthlyEarnedNetIncome}
                    onChange={(e) => onChange({ partnerMonthlyEarnedNetIncome: Number(e.target.value) || 0 })}
                    className="w-full bg-[#F8F3E8] border border-[#cad9ce] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                    placeholder="£0 if unemployed"
                  />
                </div>
              )}
            </div>

            <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce]">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#1F5A45] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1F5A45]">
                  <span className="font-bold">Work Allowance Note: </span>
                  If you or your partner have children or limited capability for work, you get a <strong>Work Allowance</strong> (£404/mo if claiming housing costs, or £673/mo if not). The 55% taper only applies to earnings <em>above</em> this threshold!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Savings & SIPP */}
        {activeStep === 5 && (
          <div className="space-y-5">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F3DD87] text-[#1F5A45] mb-1">
                Crucial Threshold Rule
              </div>
              <h3 className="text-xl font-bold text-[#1F5A45] mb-1">Savings, Capital & SIPP / Pensions</h3>
              <p className="text-xs text-[#1F5A45]/80">
                This is where most people get confused. Here are the exact statutory rules applied to your wealth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce]">
                <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                  Liquid Capital & Savings (£)
                </label>
                <input 
                  type="number" 
                  step="250"
                  value={profile.liquidSavings}
                  onChange={(e) => onChange({ liquidSavings: Number(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#cad9ce] rounded-xl px-4 py-2.5 text-base font-extrabold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                />
                <div className="text-[11px] text-[#1F5A45]/80 mt-2 space-y-1">
                  <div>Includes: Bank accounts, cash, ISAs, stocks, crypto, Premium Bonds.</div>
                  <div className="font-semibold text-[#E9774F]">
                    {profile.liquidSavings <= 6000 
                      ? '✓ Under £6,000: Full benefit, zero penalty.'
                      : profile.liquidSavings <= 16000
                      ? '⚠ £6k - £16k: Tariff penalty (£4.35/mo per £250 excess).'
                      : '✖ Over £16,000: Disqualified from Universal Credit.'}
                  </div>
                </div>
              </div>

              <div className="bg-[#E2ECE5] p-4 rounded-xl border-2 border-[#1F5A45]/30">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#1F5A45]">
                    SIPP & Personal Pension Pot (£)
                  </label>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#F3DD87] text-[#1F5A45]">
                    100% EXEMPT
                  </span>
                </div>
                <input 
                  type="number" 
                  step="1000"
                  value={profile.sippPotsValue}
                  onChange={(e) => onChange({ sippPotsValue: Number(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#cad9ce] rounded-xl px-4 py-2.5 text-base font-extrabold text-[#1F5A45] focus:outline-none focus:border-[#1F5A45]"
                />
                <div className="text-[11px] text-[#1F5A45]/80 mt-2 space-y-1">
                  <div>Any pension/SIPP pot that has <strong>not been cashed in</strong> is completely ignored by DWP while you are below State Pension age.</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F3E8] p-3 rounded-xl border border-[#cad9ce]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={profile.sippIsDrawnDown}
                  onChange={(e) => onChange({ sippIsDrawnDown: e.target.checked })}
                  className="rounded text-[#1F5A45] accent-[#1F5A45] w-4 h-4"
                />
                <span className="text-xs font-bold text-[#1F5A45]">
                  Are you currently drawing a monthly pension income from your SIPP?
                </span>
              </label>

              {profile.sippIsDrawnDown && (
                <div className="mt-3 pl-6">
                  <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                    Monthly SIPP Drawdown Income (£)
                  </label>
                  <input 
                    type="number" 
                    step="50"
                    value={profile.sippMonthlyDrawdownIncome}
                    onChange={(e) => onChange({ sippMonthlyDrawdownIncome: Number(e.target.value) || 0 })}
                    className="w-full sm:w-1/2 bg-white border border-[#cad9ce] rounded-xl px-4 py-2 text-xs font-semibold text-[#1F5A45]"
                    placeholder="e.g. 200"
                  />
                  <span className="text-[11px] text-[#1F5A45]/70 mt-1 block">
                    DWP treats regular drawn pension income as unearned income (reduces Universal Credit £1 for £1).
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: Health & Caring */}
        {activeStep === 6 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-[#1F5A45] mb-1">Health, Disability & Carer Duties</h3>
              <p className="text-xs text-[#1F5A45]/80">
                Disability benefits like <strong>PIP</strong> and <strong>Carer's Allowance</strong> have <strong>NO savings limits</strong>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={profile.hasHealthConditionOrDisability}
                    onChange={(e) => onChange({ hasHealthConditionOrDisability: e.target.checked })}
                    className="rounded text-[#1F5A45] accent-[#1F5A45] w-4 h-4 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1F5A45] block">
                      I have a long-term illness, mental health condition, or physical disability
                    </span>
                    <span className="text-[11px] text-[#1F5A45]/70">
                      Unlocks Personal Independence Payment (PIP) and Universal Credit LCWRA health element.
                    </span>
                  </div>
                </label>

                {profile.hasHealthConditionOrDisability && (
                  <div className="pt-3 border-t border-[#cad9ce] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                        PIP Daily Living Needs
                      </label>
                      <select
                        value={profile.pipDailyLiving}
                        onChange={(e) => onChange({ pipDailyLiving: e.target.value as any })}
                        className="w-full bg-white border border-[#cad9ce] rounded-xl px-3 py-2 text-xs font-semibold text-[#1F5A45]"
                      >
                        <option value="none">None / Not claiming</option>
                        <option value="standard">Standard Rate (£72.65/wk)</option>
                        <option value="enhanced">Enhanced Rate (£108.55/wk)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F5A45] mb-1">
                        PIP Mobility Needs
                      </label>
                      <select
                        value={profile.pipMobility}
                        onChange={(e) => onChange({ pipMobility: e.target.value as any })}
                        className="w-full bg-white border border-[#cad9ce] rounded-xl px-3 py-2 text-xs font-semibold text-[#1F5A45]"
                      >
                        <option value="none">None / Not claiming</option>
                        <option value="standard">Standard Rate (£28.70/wk)</option>
                        <option value="enhanced">Enhanced Rate (£75.75/wk)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={profile.hasLCWRA}
                          onChange={(e) => onChange({ hasLCWRA: e.target.checked })}
                          className="rounded text-[#1F5A45] accent-[#1F5A45] w-4 h-4"
                        />
                        <span className="text-xs font-bold text-[#1F5A45]">
                          Assessed as having Limited Capability for Work-Related Activity (LCWRA) in Universal Credit (+£416.19/mo)
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Carer Section */}
              <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={profile.isCarerForSomeone}
                    onChange={(e) => onChange({ isCarerForSomeone: e.target.checked })}
                    className="rounded text-[#1F5A45] accent-[#1F5A45] w-4 h-4 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1F5A45] block">
                      I care for someone for at least 35 hours a week
                    </span>
                    <span className="text-[11px] text-[#1F5A45]/70">
                      The person cared for must receive a qualifying disability benefit (such as PIP Daily Living). Carer's Allowance is £81.90/week (no savings limit; earnings under £151/wk).
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stepper Footer Controls */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#cad9ce]">
        {activeStep > 1 ? (
          <button
            onClick={() => setActiveStep(activeStep - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#E2ECE5] hover:bg-[#cad9ce] text-[#1F5A45] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        ) : <div />}

        {activeStep < 6 ? (
          <button
            onClick={() => setActiveStep(activeStep + 1)}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#1F5A45] hover:bg-[#164232] text-white shadow-sm transition-colors"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onCalculate}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-extrabold text-sm bg-[#E9774F] hover:bg-[#d6643c] text-white shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <span>Calculate All Benefits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
