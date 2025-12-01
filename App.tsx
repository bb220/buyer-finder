import React, { useState } from 'react';
import { analyzeCompany } from './services/geminiService';
import { AnalysisResult, LoadingState } from './types';
import { AnalysisView } from './components/AnalysisView';
import { LoadingIndicator } from './components/LoadingIndicator';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>({ status: 'idle' });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoadingState({ status: 'loading' });
    setAnalysisResult(null);

    try {
      const result = await analyzeCompany(url);
      setAnalysisResult(result);
      setLoadingState({ status: 'success' });
    } catch (error) {
      setLoadingState({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-4xl mb-10 animate-fade-in-down">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-6 leading-[1.1]">
          Find potential buyers for <br className="hidden sm:block" /> any business.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Generate a private equity buyer shortlist using AI-powered market intelligence and web research.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-xl mb-6 relative z-10">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex shadow-lg rounded-full overflow-hidden border border-slate-200 bg-white hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
            <input
              type="url"
              className="flex-1 px-6 py-4 text-slate-700 focus:outline-none placeholder-slate-400 text-lg"
              placeholder="https://company-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              disabled={loadingState.status === 'loading'}
            />
            <button
              type="submit"
              disabled={loadingState.status === 'loading'}
              className="bg-slate-900 text-white px-8 py-4 font-semibold hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center"
            >
              {loadingState.status === 'loading' ? 'Analyzing...' : 'Analyze'}
              {!loadingState.status && <Search className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </form>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center min-h-[400px]">
        {loadingState.status === 'loading' && <LoadingIndicator />}
        
        {loadingState.status === 'error' && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded shadow-sm max-w-2xl w-full animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {loadingState.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {loadingState.status === 'success' && analysisResult && (
          <AnalysisView data={analysisResult} />
        )}
      </div>

    </div>
  );
};

// Helper for error icon since we removed direct SVG in App but importing lucide is cleaner
function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    )
}

export default App;