import React from 'react';
import { AnalysisResult, Buyer } from '../types';
import { TextRenderer } from './MarkdownRenderer';
import { Building2, Globe, Users, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface AnalysisViewProps {
  data: AnalysisResult;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
  const { report, groundingSources } = data;

  return (
    <div className="w-full max-w-5xl animate-fade-in pb-20">
      
      {/* 1. Company Profile Section */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Company Profile</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Name</label>
                <div className="mt-1 text-lg font-medium text-slate-900">
                    <TextRenderer content={report.companyProfile.name} />
                </div>
             </div>
             <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Industry</label>
                <div className="mt-1 text-lg font-medium text-slate-900">
                    <TextRenderer content={report.companyProfile.industry} />
                </div>
             </div>
             <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Location</label>
                <div className="mt-1 text-lg font-medium text-slate-900">
                    <TextRenderer content={report.companyProfile.location} />
                </div>
             </div>
             <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Size (EST.)</label>
                <div className="mt-1 text-slate-900">
                    <TextRenderer content={report.companyProfile.size} />
                </div>
             </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
             <label className="text-xs font-semibold text-slate-400 uppercase mb-2 block">Offerings</label>
             <div className="text-slate-700 leading-relaxed">
                <TextRenderer content={report.companyProfile.offerings} />
             </div>
          </div>
        </div>
      </section>

      {/* 2. Investment Suitability Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Market & Scalability */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Market & Scalability</h3>
            </div>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">Market Analysis</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <TextRenderer content={report.suitability.marketAnalysis} />
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">Scalability Potential</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <TextRenderer content={report.suitability.scalability} />
                    </p>
                </div>
            </div>
        </div>

        {/* Thesis & Risks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Investment Thesis</h3>
            </div>
            <div className="mb-6 flex-grow">
                <p className="text-sm text-slate-600 leading-relaxed">
                    <TextRenderer content={report.suitability.investmentThesis} />
                </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h4 className="font-semibold text-slate-800 text-sm">Key Risks</h4>
                </div>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {report.suitability.risks.map((risk, idx) => (
                        <li key={idx}><TextRenderer content={risk} /></li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* 3. Buyers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-slate-700" />
            Potential Buyers
        </h2>
        <div className="grid grid-cols-1 gap-6">
            {report.buyers.map((buyer, index) => (
                <BuyerCard key={index} buyer={buyer} />
            ))}
        </div>
      </section>
    </div>
  );
};

const BuyerCard: React.FC<{ buyer: Buyer }> = ({ buyer }) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6 md:flex md:gap-8">
                {/* Header / Main Info */}
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{buyer.name}</h3>
                        <div className="text-xs font-semibold text-slate-500 uppercase mb-4 tracking-wider">
                            Private Equity Fund
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                            <span className="font-semibold text-slate-900">Profile: </span>
                            <TextRenderer content={buyer.buyerProfile} />
                        </p>
                    </div>
                    <a 
                        href={buyer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                </div>

                {/* Details */}
                <div className="md:w-2/3 pt-4 md:pt-0 pl-0 md:pl-2 space-y-4">
                     <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Why they are a good fit</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <TextRenderer content={buyer.fitReason} />
                        </p>
                     </div>
                     <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <h4 className="text-xs font-bold text-blue-800 uppercase mb-1">Portfolio Evidence</h4>
                        <p className="text-sm text-blue-900">
                             <TextRenderer content={buyer.portfolioHighlight} />
                        </p>
                     </div>
                </div>
            </div>
        </div>
    );
}