
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AnalysisResult from './components/AnalysisResult';
import { analyzeMessage } from './services/geminiService';
import { ScamAnalysis, HistoryItem } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<ScamAnalysis | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setCurrentAnalysis(null);

    try {
      const result = await analyzeMessage(inputText);
      setCurrentAnalysis(result);
      
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        message: inputText,
        analysis: result
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearInput = () => {
    setInputText('');
    setCurrentAnalysis(null);
    setError(null);
  };

  const pasteExample = (text: string) => {
    setInputText(text);
    setCurrentAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pb-20">
        <Hero />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden transition-all duration-300">
            <div className="p-8">
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2 px-1">
                  Paste the suspicious message below:
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-lg font-medium resize-none"
                    placeholder="e.g., 'CONGRATULATIONS! You have won a $1000 Amazon gift card. Click here to claim: http://fake-link.com/win'..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  {inputText && (
                    <button 
                      onClick={clearInput}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl shadow-sm border border-slate-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                   <button 
                    onClick={() => pasteExample("Your PayPal account has been locked. Verify identity here to avoid permanent suspension: http://secure-pay-alert.net")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-bold transition-all border border-slate-200"
                  >
                    Phishing SMS
                  </button>
                  <button 
                    onClick={() => pasteExample("Hey, are we still meeting for lunch at 1 PM today? Let me know if you need directions.")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-bold transition-all border border-slate-200"
                  >
                    Genuine Message
                  </button>
                  <button 
                    onClick={() => pasteExample("URGENT: Your package from FedEx could not be delivered. Pay $1.99 redelivery fee now to avoid return to sender: http://fedex-deliver.support/pay")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-bold transition-all border border-slate-200"
                  >
                    Delivery Scam
                  </button>
                </div>

                <button
                  disabled={!inputText.trim() || isAnalyzing}
                  onClick={handleAnalyze}
                  className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all transform active:scale-95 flex items-center justify-center space-x-3
                    ${!inputText.trim() || isAnalyzing 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200'}`}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing Patterns...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <span>Check Message</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 font-medium">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Loading Placeholder */}
            {isAnalyzing && (
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <div className="animate-pulse space-y-6">
                  <div className="h-24 bg-slate-200 rounded-3xl w-full"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-48 bg-slate-200 rounded-3xl"></div>
                    <div className="h-48 bg-slate-200 rounded-3xl"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Result Display */}
            {currentAnalysis && !isAnalyzing && (
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <AnalysisResult analysis={currentAnalysis} originalMessage={inputText} />
              </div>
            )}
          </div>

          {/* Previous Checks - History */}
          {history.length > 0 && (
             <div className="mt-16">
              <h3 className="text-xl font-bold text-slate-800 mb-6 px-4">Recent Scans</h3>
              <div className="space-y-4">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setInputText(item.message);
                      setCurrentAnalysis(item.analysis);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-6 bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-xl ${
                        item.analysis.verdict === 'Likely Scam' ? 'bg-red-100 text-red-600' : 
                        item.analysis.verdict === 'Likely Genuine' ? 'bg-green-100 text-green-600' : 
                        'bg-amber-100 text-amber-600'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-sm truncate max-w-xs md:max-w-lg">
                          {item.message}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {new Date(item.timestamp).toLocaleTimeString()} • {item.analysis.verdict}
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2 opacity-80">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">ScamShield AI</span>
          </div>
          <div className="flex space-x-8 text-sm font-medium">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Safety Tips</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a>
          </div>
          <p className="text-xs font-medium">© 2024 ScamShield AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
