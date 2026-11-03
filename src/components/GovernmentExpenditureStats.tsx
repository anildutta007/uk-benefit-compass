import React, { useState } from 'react';
import { 
  Landmark, 
  MapPin, 
  PieChart as PieIcon, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Info,
  Map as MapIcon
} from 'lucide-react';
import { UK_BENEFIT_EXPENDITURE } from '../data/ukExpenditureData';
import { UKRegionalMapVisualizer } from './UKRegionalMapVisualizer';

export const GovernmentExpenditureStats: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'map' | 'regions' | 'categories'>('map');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const stats = UK_BENEFIT_EXPENDITURE;

  return (
    <div className="bg-[#EFE8DA] border-2 border-[#E2ECE5] rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Top Banner Row */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#1F5A45] text-white shrink-0 shadow-sm">
            <Landmark className="w-5 h-5 text-[#F3DD87]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3DD87] text-[#1F5A45]">
                HM Treasury & DWP Statistics
              </span>
              <span className="text-xs text-[#1F5A45]/70 font-semibold">
                FY {stats.financialYear}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1F5A45] tracking-tight mt-0.5">
              UK Government Total Welfare & Benefits Spend: £{stats.totalWelfareBillBillions}bn
            </h2>
            <p className="text-xs text-[#1F5A45]/80 mt-0.5 max-w-2xl">
              Accounting for ~{stats.gdpPercentage}% of UK GDP. Compare how the national budget is divided across benefits and how it is distributed geographically across all UK regions.
            </p>
          </div>
        </div>

        {/* Highlight Metrics & Expand Button */}
        <div className="flex items-center gap-4 justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#cad9ce]">
          <div className="grid grid-cols-2 gap-3 text-right">
            <div className="bg-[#F8F3E8] px-3 py-1.5 rounded-lg border border-[#cad9ce]">
              <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">Pensions</span>
              <span className="text-sm font-black text-[#1F5A45]">£{stats.statePensionBillions}bn</span>
            </div>
            <div className="bg-[#F8F3E8] px-3 py-1.5 rounded-lg border border-[#cad9ce]">
              <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">Working-Age & UC</span>
              <span className="text-sm font-black text-[#E9774F]">£{stats.workingAgeBenefitsBillions}bn</span>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 bg-[#1F5A45] hover:bg-[#164232] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide Breakdown' : 'View Regional Breakdown'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Interactive Tray */}
      {isExpanded && (
        <div className="bg-[#F8F3E8] border-t border-[#cad9ce] p-5 space-y-6">
          {/* Sub-Tabs: Regions vs Benefit Types */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-[#E2ECE5] p-1 rounded-xl">
              <button
                onClick={() => setActiveView('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'map'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-[#F3DD87]" />
                <span>UK Map View (% & Spend)</span>
              </button>

              <button
                onClick={() => setActiveView('regions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'regions'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#F3DD87]" />
                <span>Regional Cards List</span>
              </button>

              <button
                onClick={() => setActiveView('categories')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'categories'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <PieIcon className="w-3.5 h-3.5 text-[#E9774F]" />
                <span>Spend by Category</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#1F5A45]/70">
              <Info className="w-3.5 h-3.5 text-[#1F5A45]" />
              <span>Official DWP Outturn Tables & OBR Economic & Fiscal Outlook</span>
            </div>
          </div>

          {/* VIEW 0: UK MAP VIEW */}
          {activeView === 'map' && (
            <UKRegionalMapVisualizer />
          )}

          {/* VIEW 1: REGIONAL BREAKDOWN */}
          {activeView === 'regions' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stats.regions.map((reg) => {
                  const isSelected = selectedRegion === reg.region;
                  return (
                    <div
                      key={reg.region}
                      onClick={() => setSelectedRegion(isSelected ? null : reg.region)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#E2ECE5] border-[#1F5A45] ring-2 ring-[#1F5A45]/20 shadow-sm' 
                          : 'bg-[#EFE8DA]/80 border-[#cad9ce] hover:border-[#1F5A45]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-[#1F5A45] text-sm flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E9774F]" />
                          {reg.region}
                        </span>
                        <span className="text-xs font-black text-[#1F5A45]">
                          £{reg.totalBillions}bn
                        </span>
                      </div>

                      {/* Progress bar of national share */}
                      <div className="w-full bg-[#cad9ce] h-2 rounded-full overflow-hidden mb-2">
                        <div 
                          className="bg-[#1F5A45] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(reg.totalBillions / 45) * 100}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-[10px] text-[#1F5A45]/80 pt-1 border-t border-[#cad9ce]/60">
                        <div>
                          <span className="block text-[#1F5A45]/60 font-semibold">Share</span>
                          <span className="font-bold text-[#1F5A45]">{reg.percentage}%</span>
                        </div>
                        <div>
                          <span className="block text-[#1F5A45]/60 font-semibold">Per Capita</span>
                          <span className="font-bold text-[#E9774F]">£{reg.perCapitaSpend.toLocaleString()}/yr</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[#1F5A45]/60 font-semibold">Claimants</span>
                          <span className="font-bold text-[#1F5A45]">{reg.claimantsThousands}k</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Regional Summary Note */}
              <div className="bg-[#E2ECE5] p-3 rounded-xl border border-[#cad9ce] text-xs text-[#1F5A45] flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#1F5A45] shrink-0 mt-0.5" />
                <p>
                  <strong>Why does per-capita spend differ?</strong> Regions with older demographics (such as Wales, North East, South West) have higher State Pension expenditures, while regions with higher housing rents (London and South East) incur significantly higher Local Housing Allowance and UC housing components.
                </p>
              </div>
            </div>
          )}

          {/* VIEW 2: CATEGORY BREAKDOWN */}
          {activeView === 'categories' && (
            <div className="space-y-4">
              {/* Stacked Visual Bar */}
              <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner border border-[#cad9ce]">
                {stats.categories.map((c) => (
                  <div
                    key={c.name}
                    style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
                    title={`${c.name}: £${c.amountBillions}bn (${c.percentage}%)`}
                    className="hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stats.categories.map((cat) => (
                  <div key={cat.name} className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <h4 className="font-extrabold text-xs text-[#1F5A45] truncate">{cat.name}</h4>
                      </div>
                      <span className="text-xs font-black text-[#1F5A45]">£{cat.amountBillions}bn</span>
                    </div>

                    <div className="text-[11px] text-[#1F5A45]/80 space-y-1 mt-2">
                      <div className="flex justify-between">
                        <span className="text-[#1F5A45]/60 font-semibold">Share of Total Welfare:</span>
                        <span className="font-bold text-[#1F5A45]">{cat.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1F5A45]/60 font-semibold">Recipients Estimate:</span>
                        <span className="font-bold text-[#E9774F]">{cat.recipientsEstimate}</span>
                      </div>
                      <div className="pt-1 text-[10px] text-[#1F5A45]/70 border-t border-[#cad9ce]">
                        <span className="font-semibold">Covers: </span>{cat.keyProgrammes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
