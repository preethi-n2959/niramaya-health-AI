import React, { useEffect, useState } from 'react';
import { ProcessingStatus } from '../types';

interface Props {
  status: ProcessingStatus;
}

export const ProcessingView: React.FC<Props> = ({ status }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
      {/* Animated Mesh Network Visualization */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-teal-100 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 border-4 border-teal-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
          <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {/* Satellites / Nodes */}
        <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-2 animate-bounce delay-100"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-500 rounded-full translate-x-2 translate-y-2 animate-bounce delay-300"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-indigo-500 rounded-full -translate-x-2 translate-y-2 animate-bounce delay-500"></div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        {status.stage === 'intake' && 'Intake Agent Active'}
        {status.stage === 'triage' && 'Triage Agent Analyzing'}
        {status.stage === 'screening' && 'Screening Agent Computing'}
        {status.stage === 'finalizing' && 'Finalizing Report'}
      </h3>
      
      <p className="text-slate-500 font-medium max-w-xs">
        {status.message}{dots}
      </p>

      <div className="mt-8 flex gap-2 text-xs text-slate-400">
        <span className={`px-2 py-1 rounded-full ${['intake', 'triage', 'screening', 'finalizing'].includes(status.stage) ? 'bg-teal-100 text-teal-700' : 'bg-slate-100'}`}>Data</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded-full ${['triage', 'screening', 'finalizing'].includes(status.stage) ? 'bg-blue-100 text-blue-700' : 'bg-slate-100'}`}>Mesh</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded-full ${['screening', 'finalizing'].includes(status.stage) ? 'bg-purple-100 text-purple-700' : 'bg-slate-100'}`}>AI Model</span>
      </div>
    </div>
  );
};