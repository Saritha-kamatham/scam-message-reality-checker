
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-indigo-100/50 rounded-[100%] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-100/50 rounded-[100%] blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Expose Fraud with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">AI Intelligence</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
          The ultimate defense against scam messages, phishing, and fake offers. 
          Our advanced NLP identifies warning signs instantly to keep your finances and identity secure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Powered by Gemini 3.0 NLP
          </div>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Real-time Threat Analysis
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
