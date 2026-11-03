import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  FileCheck2,
  Banknote
} from 'lucide-react';
import type { BenefitBreakdown } from '../services/ukBenefitsEngine';

interface Props {
  benefit: BenefitBreakdown;
  isExpanded: boolean;
  onToggle: () => void;
}

export const BenefitCard: React.FC<Props> = ({ benefit, isExpanded, onToggle }) => {
  return (
    <div className={`rounded-2xl border-2 transition-all overflow-hidden ${
      benefit.eligible 
        ? 'bg-[#F8F3E8] border-[#cad9ce] hover:border-[#1F5A45]/60 shadow-sm' 
        : 'bg-[#EFE8DA]/60 border-[#cad9ce] opacity-90'
    }`}>
      {/* Top Header Row */}
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-xl font-bold text-[#1F5A45]">
              {benefit.name}
            </h3>
            
            {/* Status Pill */}
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              benefit.statusTag === 'Eligible' 
                ? 'bg-[#E2ECE5] text-[#1F5A45]' 
                : benefit.statusTag === 'Reduced by Savings'
                ? 'bg-[#F3DD87] text-[#1F5A45]'
                : 'bg-red-100 text-red-800'
            }`}>
              {benefit.statusTag}
            </span>

            <span className="text-xs text-[#1F5A45]/70 font-medium">
              • Official UK Benefit
            </span>
          </div>

          <p className="text-xs text-[#1F5A45]/80 line-clamp-2">
            {benefit.durationExplanation}
          </p>
        </div>

        {/* Money Display */}
        <div className="flex items-center gap-6 justify-between md:justify-end">
          <div className="text-right">
            <div className="text-2xl font-black text-[#1F5A45]">
              £{benefit.monthlyAmount.toFixed(2)}
              <span className="text-xs font-normal text-[#1F5A45]/70 ml-1">/month</span>
            </div>
            <div className="text-xs text-[#1F5A45]/80 font-medium flex items-center justify-end gap-2">
              <span>£{benefit.weeklyAmount.toFixed(2)} /wk</span>
              <span>•</span>
              <span className="font-bold text-[#E9774F]">£{benefit.annualAmount.toLocaleString()} /yr</span>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="p-2 rounded-xl bg-[#E2ECE5] hover:bg-[#cad9ce] text-[#1F5A45] transition-colors"
            title="Toggle Details"
            aria-label="Toggle Details"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Deep Breakdown */}
      {isExpanded && (
        <div className="bg-[#EFE8DA] p-5 border-t border-[#cad9ce] space-y-4 text-xs text-[#1F5A45]">
          {/* Criteria Checklist */}
          <div>
            <h4 className="font-bold text-[#1F5A45] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#1F5A45]" />
              Eligibility Criteria & Breakdown Factors
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {benefit.criteriaExplanation.map((crit, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#F8F3E8] p-2.5 rounded-lg border border-[#cad9ce]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">{crit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings / SIPP specific note */}
          <div className="bg-[#F8F3E8] p-3 rounded-xl border border-[#cad9ce] flex items-start gap-3">
            <Banknote className="w-4 h-4 text-[#E9774F] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1F5A45]">Capital & SIPP Rule for this benefit: </span>
              <span className="text-[#1F5A45]/90">{benefit.savingsImpactRule}</span>
            </div>
          </div>

          {/* Payment & Duration details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2 bg-[#E2ECE5] p-3 rounded-lg">
              <Clock className="w-4 h-4 text-[#1F5A45] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1F5A45] block">Payment Schedule & Duration</span>
                <span className="text-[#1F5A45]/80">{benefit.durationExplanation}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#E2ECE5] p-3 rounded-lg">
              <div>
                <span className="font-bold text-[#1F5A45] block">How to Claim</span>
                <span className="text-[#1F5A45]/80">Official DWP / HMRC application portal</span>
              </div>
              <a 
                href={benefit.officialLink} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 bg-[#E9774F] hover:bg-[#d6643c] text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-colors shrink-0 shadow-sm"
              >
                <span>Apply on Gov.uk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
