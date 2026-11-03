import React from 'react';
import { 
  Users, 
  Baby, 
  Home, 
  Briefcase, 
  PiggyBank, 
  HeartHandshake, 
  Sparkles
} from 'lucide-react';
import type { UserProfile } from '../services/ukBenefitsEngine';

interface Props {
  profile: UserProfile;
  onChange: (updated: Partial<UserProfile>) => void;
}

export const BenefitInputPanel: React.FC<Props> = ({ profile, onChange }) => {
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
          Tweak any field below. Your eligible benefits and amounts on the right re-calculate instantly.
        </p>
      </div>

      {/* 1. Household & Age */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
          <Users className="w-4 h-4 text-[#E9774F]" />
          <span>1. Household & Age</span>
        </div>

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
          <span className="text-[11px] font-semibold text-[#1F5A45]/80">
            {profile.childrenCount} {profile.childrenCount === 1 ? 'child' : 'children'}
          </span>
        </div>

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

      {/* 3. Housing & Rent */}
      <div className="bg-[#F8F3E8] p-4 rounded-xl border border-[#cad9ce] space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
          <Home className="w-4 h-4 text-[#E9774F]" />
          <span>3. Housing & Council Tax</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'rent_private', label: 'Private Rent' },
            { id: 'rent_social', label: 'Council / Housing' },
            { id: 'homeowner', label: 'Homeowner' },
            { id: 'living_with_family', label: 'With Family' },
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
              <label className="block text-[10px] font-bold text-[#1F5A45]">Monthly Rent (£)</label>
              <input 
                type="number"
                step="50"
                value={profile.monthlyRent}
                onChange={(e) => onChange({ monthlyRent: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#1F5A45]">LHA Cap / Limit (£)</label>
              <input 
                type="number"
                step="50"
                value={profile.estimatedLHA}
                onChange={(e) => onChange({ estimatedLHA: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-[#cad9ce] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1F5A45] outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold text-[#1F5A45]">Monthly Council Tax (£)</label>
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
        <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
          <Briefcase className="w-4 h-4 text-[#E9774F]" />
          <span>4. Monthly Net Earnings</span>
        </div>

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
        <p className="text-[10px] text-[#1F5A45]/70">
          Universal Credit tapers at 55% only on earnings above your work allowance.
        </p>
      </div>

      {/* 5. Savings, Capital & SIPP (Key Highlight) */}
      <div className="bg-[#E2ECE5] p-4 rounded-xl border-2 border-[#1F5A45]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
            <PiggyBank className="w-4 h-4 text-[#E9774F]" />
            <span>5. Savings & SIPP / Pension</span>
          </div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#F3DD87] text-[#1F5A45]">
            DWP Capital Test
          </span>
        </div>

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
        <div className="flex items-center gap-2 text-xs font-black text-[#1F5A45] uppercase tracking-wide">
          <HeartHandshake className="w-4 h-4 text-[#E9774F]" />
          <span>6. Health, PIP & Carer</span>
        </div>

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
