
import React from 'react';
import { ScamAnalysis, VerdictType } from '../types';

interface AnalysisResultProps {
  analysis: ScamAnalysis;
  originalMessage: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, originalMessage }) => {
  const isScam = analysis.verdict === VerdictType.SCAM;
  const isSuspicious = analysis.verdict === VerdictType.SUSPICIOUS;

  const getVerdictStyles = () => {
    if (isScam) return "bg-red-50 text-red-700 border-red-200 shadow-red-100";
    if (isSuspicious) return "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100";
    return "bg-green-50 text-green-700 border-green-200 shadow-green-100";
  };

  const getIcon = () => {
    if (isScam) return (
      <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
    if (isSuspicious) return (
      <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    return (
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Verdict Card */}
      <div className={`p-8 rounded-3xl border shadow-xl transition-all duration-300 ${getVerdictStyles()}`}>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-inherit">
            {getIcon()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold mb-1 tracking-tight">{analysis.verdict}</h2>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-75">Scam Confidence Score:</span>
              <span className="text-xl font-mono font-bold">{analysis.score}%</span>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl opacity-90 font-medium">
              {analysis.explanation}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Red Flags Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            Red Flags Detected
          </h3>
          <ul className="space-y-3">
            {analysis.redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-slate-700 font-medium">{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Advice Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            What You Should Do
          </h3>
          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
            <p className="text-indigo-900 font-semibold leading-relaxed">
              {analysis.advice}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors">
              Report this message
            </button>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors">
              Delete and Block
            </button>
          </div>
        </div>
      </div>

      {/* Deep Dive Highlights */}
      {analysis.highlightedParts.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
             <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            NLP Pattern Analysis
          </h3>
          <div className="space-y-4">
            {analysis.highlightedParts.map((part, idx) => (
              <div key={idx} className="group border-l-4 border-slate-200 hover:border-indigo-500 pl-4 py-1 transition-all">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    part.category === 'Urgency' ? 'bg-orange-100 text-orange-700' :
                    part.category === 'Financial' ? 'bg-emerald-100 text-emerald-700' :
                    part.category === 'Social' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {part.category}
                  </span>
                </div>
                <p className="text-slate-900 font-mono text-sm bg-slate-50 p-2 rounded-lg border border-slate-100 mb-2 italic">
                  "{part.text}"
                </p>
                <p className="text-slate-600 text-sm font-medium">
                  <span className="text-indigo-600 font-bold">Insight:</span> {part.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
