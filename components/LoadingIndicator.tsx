import React, { useEffect, useState } from 'react';
import { Search, Brain, FileText, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { text: "Researching business...", duration: 15000, icon: Search },
  { text: "Evaluating investment suitability...", duration: 40000, icon: Brain },
  { text: "Compiling list of buyers...", duration: 40000, icon: FileText }
];

export const LoadingIndicator: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsed(Date.now() - start);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Determine current step based on accumulated duration
  let currentStepIndex = 0;
  if (elapsed < 15000) {
    currentStepIndex = 0;
  } else if (elapsed < 55000) { // 15s + 40s
    currentStepIndex = 1;
  } else {
    currentStepIndex = 2;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 max-w-lg mx-auto animate-fade-in">
      {/* Top Spinner */}
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">Preparing report</h2>
      <p className="text-slate-500 text-center mb-10 leading-relaxed max-w-md text-base">
        AI is analyzing the website, evaluating investment suitability, and matching with PE criteria.
      </p>

      <div className="w-full max-w-sm space-y-5 px-4 sm:px-0">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isCompleted = idx < currentStepIndex;
          const isPending = idx > currentStepIndex;

          let IconComponent = step.icon;
          let iconColorClass = "text-slate-300";
          let textColorClass = "text-slate-400";
          let bgClass = "bg-transparent";

          if (isActive) {
            iconColorClass = "text-blue-600";
            textColorClass = "text-slate-800 font-semibold";
            bgClass = "bg-blue-50";
          } else if (isCompleted) {
            IconComponent = CheckCircle2;
            iconColorClass = "text-emerald-500";
            textColorClass = "text-slate-500";
            bgClass = "bg-emerald-50/50";
          }

          return (
            <div 
              key={idx} 
              className={`flex items-center gap-4 p-2 rounded-lg transition-all duration-500 ${isActive ? 'translate-x-2' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${bgClass}`}>
                <IconComponent className={`w-5 h-5 ${iconColorClass} ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <span className={`text-base transition-colors duration-300 ${textColorClass}`}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
