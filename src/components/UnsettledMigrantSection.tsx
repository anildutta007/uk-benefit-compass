import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Hotel, 
  CreditCard, 
  MapPin, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';
import { UNSETTLED_MIGRANT_DATA } from '../data/unsettledMigrantData';

export const UnsettledMigrantSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'meaning' | 'costs' | 'regional' | 'rules'>('meaning');
  
  const data = UNSETTLED_MIGRANT_DATA;

  return (
    <div className="bg-[#EFE8DA] rounded-2xl border-2 border-[#cad9ce] shadow-sm overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#E9774F] text-white shrink-0 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3DD87] text-[#1F5A45]">
                Home Office Section 95 / 4 System
              </span>
              <span className="text-xs text-[#1F5A45]/70 font-semibold">
                NRPF (No Recourse to Public Funds)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1F5A45] tracking-tight mt-0.5">
              Unsettled Migrants & Asylum Seekers: Annual Spend £{data.totalAsylumSupportSpendBillions}bn
            </h3>
            <p className="text-xs text-[#1F5A45]/80 mt-0.5 max-w-2xl">
              What does "Unsettled Migrant" mean? How is their statutory accommodation & subsistence funded while awaiting an asylum decision?
            </p>
          </div>
        </div>

        {/* Quick metrics + Toggle */}
        <div className="flex items-center gap-4 justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#cad9ce]">
          <div className="grid grid-cols-2 gap-3 text-right">
            <div className="bg-[#F8F3E8] px-3 py-1.5 rounded-lg border border-[#cad9ce]">
              <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">Supported</span>
              <span className="text-sm font-black text-[#1F5A45]">{(data.totalPeopleInReceiptOfSupport / 1000).toFixed(1)}k people</span>
            </div>
            <div className="bg-[#F8F3E8] px-3 py-1.5 rounded-lg border border-[#cad9ce]">
              <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">Weekly Cash</span>
              <span className="text-sm font-black text-[#E9774F]">£{data.weeklyAllowances.selfCateringWeekly}/wk</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 bg-[#1F5A45] hover:bg-[#164232] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
            aria-expanded={isOpen}
          >
            <span>{isOpen ? 'Close Section' : 'Open Section'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Body */}
      {isOpen && (
        <div className="bg-[#F8F3E8] border-t border-[#cad9ce] p-5 space-y-6">
          {/* Sub Navigation */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-[#E2ECE5] p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('meaning')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'meaning'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#F3DD87]" />
                <span>What is an "Unsettled Migrant"?</span>
              </button>

              <button
                onClick={() => setActiveTab('costs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'costs'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <Hotel className="w-3.5 h-3.5" />
                <span>Cost & Hotel Breakdown</span>
              </button>

              <button
                onClick={() => setActiveTab('regional')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'regional'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Regional Dispersal</span>
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'rules'
                    ? 'bg-[#1F5A45] text-white shadow-sm'
                    : 'text-[#1F5A45] hover:bg-[#cad9ce]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>NRPF vs DWP Rules</span>
              </button>
            </div>

            <a
              href="https://www.gov.uk/asylum-support"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1F5A45] hover:underline"
            >
              <span>Home Office Asylum Support (GOV.UK)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* TAB 0: WHAT DOES UNSETTLED MIGRANT MEAN? */}
          {activeTab === 'meaning' && (
            <div className="space-y-4">
              <div className="bg-[#EFE8DA] p-5 rounded-xl border border-[#cad9ce] space-y-3">
                <h4 className="text-base font-black text-[#1F5A45] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#E9774F]" />
                  Definition: What is an "Unsettled Migrant" in the UK?
                </h4>
                <div className="text-xs text-[#1F5A45]/90 space-y-2 leading-relaxed">
                  <p>
                    An <strong>unsettled migrant</strong> is any foreign national present in the UK whose immigration status is <strong>pending, temporary, or undecided</strong> under the UK Immigration Rules and 1951 UN Refugee Convention. 
                  </p>
                  <p>
                    The vast majority of individuals in this official expenditure category are <strong>asylum seekers</strong> who have formally applied for humanitarian protection and are waiting for the Home Office to investigate and decide their claim.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#F8F3E8] p-3.5 rounded-lg border border-[#cad9ce]">
                    <div className="font-extrabold text-[#1F5A45] text-xs mb-1">1. Legal Exclusion from DWP</div>
                    <p className="text-[11px] text-[#1F5A45]/80">
                      Under Section 115 of the Immigration and Asylum Act 1999, unsettled migrants are subject to <strong>No Recourse to Public Funds (NRPF)</strong>. They are strictly prohibited from receiving Universal Credit, Child Benefit, Personal Independence Payment (PIP), or Council Housing.
                    </p>
                  </div>

                  <div className="bg-[#F8F3E8] p-3.5 rounded-lg border border-[#cad9ce]">
                    <div className="font-extrabold text-[#1F5A45] text-xs mb-1">2. Statutory Safety Net</div>
                    <p className="text-[11px] text-[#1F5A45]/80">
                      To prevent destitution under domestic and international law, the Home Office operates a standalone support system: <strong>Section 95 Support</strong> (providing basic accommodation and £49.18/wk on an ASPEN card) and <strong>Section 4 Support</strong>.
                    </p>
                  </div>

                  <div className="bg-[#F8F3E8] p-3.5 rounded-lg border border-[#cad9ce]">
                    <div className="font-extrabold text-[#1F5A45] text-xs mb-1">3. Right to Work Restrictions</div>
                    <p className="text-[11px] text-[#1F5A45]/80">
                      Unsettled asylum seekers are legally barred from employment. They can only apply for permission to work if their claim has been pending without a decision for more than 12 months through no fault of their own, and work is restricted to jobs on the Shortage Occupation List.
                    </p>
                  </div>
                </div>

                <div className="bg-[#E2ECE5] p-3 rounded-lg border border-[#cad9ce] text-[11px] text-[#1F5A45]">
                  <strong>What happens when their case settles?</strong>
                  <br />
                  If granted refugee status or Indefinite Leave to Remain (ILR), Home Office asylum support terminates within 28 days (the "move-on" period). The person is then transitioned into mainstream society, receives full right to work, and can claim Universal Credit and child benefits through the DWP.
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: COSTS & ALLOWANCES */}
          {activeTab === 'costs' && (
            <div className="space-y-4">
              {/* Allowance cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce]">
                  <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">
                    Self-Catering (Section 95)
                  </span>
                  <div className="text-2xl font-black text-[#1F5A45] mt-0.5">
                    £{data.weeklyAllowances.selfCateringWeekly} <span className="text-xs font-normal text-[#1F5A45]/70">/wk per person</span>
                  </div>
                  <p className="text-[11px] text-[#1F5A45]/80 mt-1">
                    Loaded weekly onto an <strong>ASPEN debit card</strong> for food, toiletries, clothing, and travel when living in independent dispersed flats.
                  </p>
                </div>

                <div className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce]">
                  <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">
                    Catered Hotel Lodging
                  </span>
                  <div className="text-2xl font-black text-[#E9774F] mt-0.5">
                    £{data.weeklyAllowances.cateredAccommodationWeekly} <span className="text-xs font-normal text-[#1F5A45]/70">/wk per person</span>
                  </div>
                  <p className="text-[11px] text-[#1F5A45]/80 mt-1">
                    For individuals accommodated in contingency hotels where meals are provided on-site. Used for basic personal essentials.
                  </p>
                </div>

                <div className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce]">
                  <span className="text-[10px] font-bold text-[#1F5A45]/70 block uppercase">
                    Pregnancy / Mother & Baby
                  </span>
                  <div className="text-2xl font-black text-[#1F5A45] mt-0.5">
                    +£{data.weeklyAllowances.pregnantOrMotherBabyAddition} <span className="text-xs font-normal text-[#1F5A45]/70">/wk extra</span>
                  </div>
                  <p className="text-[11px] text-[#1F5A45]/80 mt-1">
                    Additional nutritional allowance for pregnant mothers, plus a £300 one-off maternity grant for babies.
                  </p>
                </div>
              </div>

              {/* Expenditure Breakdown List */}
              <div className="bg-[#EFE8DA] p-4 rounded-xl border border-[#cad9ce] space-y-3">
                <h4 className="text-xs font-black text-[#1F5A45] uppercase tracking-wider">
                  Where Does the £5.38 Billion Annual Budget Go?
                </h4>
                <div className="space-y-2">
                  {data.expenditureBreakdown.map((item) => (
                    <div key={item.category} className="bg-[#F8F3E8] p-3 rounded-lg border border-[#cad9ce] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1F5A45]">{item.category}</span>
                          <span className="text-[10px] font-black px-2 py-0.2 rounded bg-[#E2ECE5] text-[#1F5A45]">
                            {item.percentage}%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#1F5A45]/70">{item.explanation}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-[#1F5A45]">£{item.amountBillions.toFixed(2)}bn</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGIONAL DISPERSAL */}
          {activeTab === 'regional' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-black text-[#1F5A45] uppercase tracking-wider mb-1">
                  Supported Asylum Seekers Breakdown by UK Region (118,500 Total)
                </h4>
                <p className="text-xs text-[#1F5A45]/80">
                  Under the Home Office Full Dispersal Model, unsettled claimants are housed across local authorities while awaiting determination.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.regionalDispersal.map((r) => (
                  <div key={r.region} className="bg-[#EFE8DA] p-3 rounded-xl border border-[#cad9ce]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#1F5A45]">{r.region}</span>
                      <span className="text-xs font-black text-[#E9774F]">{r.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#cad9ce] h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div 
                        className="bg-[#1F5A45] h-full rounded-full" 
                        style={{ width: `${(r.percentage / 20) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-[#1F5A45]/70 flex justify-between">
                      <span>Supported individuals:</span>
                      <span className="font-bold text-[#1F5A45]">{r.supportedIndividuals.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DWP vs HOME OFFICE RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="bg-[#E2ECE5] p-3 rounded-xl border border-[#cad9ce] text-xs text-[#1F5A45] flex items-start gap-2">
                <Info className="w-4 h-4 text-[#1F5A45] shrink-0 mt-0.5" />
                <p>
                  <strong>The "No Recourse to Public Funds" (NRPF) Boundary:</strong> Section 115 of the Immigration and Asylum Act 1999 legally prevents anyone subject to immigration control from claiming welfare benefits (Universal Credit, Child Benefit, PIP, Housing Benefit). They can only receive Home Office asylum support while their claim is unsettled.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.legalStatusRules.map((rule) => (
                  <div key={rule.title} className="bg-[#EFE8DA] p-4 rounded-xl border border-[#cad9ce] space-y-3">
                    <h5 className="font-black text-sm text-[#1F5A45]">{rule.title}</h5>
                    <p className="text-[11px] text-[#1F5A45]/80">{rule.description}</p>
                    
                    <div className="space-y-1.5 text-xs pt-2 border-t border-[#cad9ce]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#1F5A45]/70">Universal Credit:</span>
                        {rule.universalCreditEligible ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-red-700 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> No (Excluded)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#1F5A45]/70">Child Benefit:</span>
                        {rule.childBenefitEligible ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-red-700 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> No (Excluded)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#1F5A45]/70">Home Office Support:</span>
                        {rule.homeOfficeSupportEligible ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-red-700 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> No
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-[#1F5A45]/70 border-t border-[#cad9ce]">
                      <span className="font-bold text-[#1F5A45]">Work Right: </span>
                      {rule.rightToWork}
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
