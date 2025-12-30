import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { IntakeAgent } from './components/IntakeAgent';
import { SymptomTriage } from './components/SymptomTriage';
import { ProcessingView } from './components/ProcessingView';
import { ReportView } from './components/ReportView';
import { generateHealthReport, validateApiKey } from './services/geminiService';
import { AppStep, UserData, Gender, HealthReport, ProcessingStatus } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Intake);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    gender: Gender.Male,
    language: 'English'
  });
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [report, setReport] = useState<HealthReport | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>({ stage: 'intake', message: '' });

  useEffect(() => {
    // Validate API Key on mount
    const { valid, error } = validateApiKey();
    if (!valid && error) {
      setApiKeyError(error);
      setStep(AppStep.Error);
    }
  }, []);

  const handleIntakeNext = () => setStep(AppStep.Symptoms);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleGenerate = async () => {
    setStep(AppStep.Processing);
    
    // Simulate Agentic Workflow Steps (Optimized for speed)
    const sequence = async () => {
      setStatus({ stage: 'intake', message: 'Intake Agent validating data...' });
      await new Promise(r => setTimeout(r, 400));
      
      setStatus({ stage: 'triage', message: 'Triage Agent mapping symptoms...' });
      await new Promise(r => setTimeout(r, 400));
      
      setStatus({ stage: 'screening', message: 'Screening Agent analyzing risk models...' });
      
      // Actual API Call
      try {
        const result = await generateHealthReport(userData, selectedSymptoms);
        
        setStatus({ stage: 'finalizing', message: 'Generating Voice Narration...' });
        await new Promise(r => setTimeout(r, 400)); // Brief pause for UX

        setReport(result);
        setStep(AppStep.Report);
      } catch (error: any) {
        console.error(error);
        // Display the actual error message to help with debugging
        setApiKeyError(error.message || "Failed to generate report. Please try again or check your connection.");
        setStep(AppStep.Error);
      }
    };

    sequence();
  };

  const handleReset = () => {
    setUserData({ name: '', age: '', gender: Gender.Male, language: 'English' });
    setSelectedSymptoms([]);
    setReport(null);
    setStep(AppStep.Intake);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* App Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <h1 className="font-bold text-lg tracking-tight text-teal-900">Niramaya<span className="font-light text-slate-500">AI</span></h1>
          </div>
          <div className="text-xs text-slate-400 font-medium">v1.0 Beta</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {step === AppStep.Error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-fade-in">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-2">System Error</h3>
            <p className="text-red-700 text-sm mb-6 break-words">{apiKeyError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 w-full"
            >
              Reload Application
            </button>
          </div>
        )}

        {step === AppStep.Intake && (
          <IntakeAgent 
            data={userData} 
            onUpdate={(u) => setUserData({ ...userData, ...u })} 
            onNext={handleIntakeNext} 
          />
        )}

        {step === AppStep.Symptoms && (
          <SymptomTriage 
            selectedSymptoms={selectedSymptoms} 
            onToggle={handleSymptomToggle} 
            onNext={handleGenerate}
            onBack={() => setStep(AppStep.Intake)}
          />
        )}

        {step === AppStep.Processing && (
          <ProcessingView status={status} />
        )}

        {step === AppStep.Report && report && (
          <ReportView 
            report={report} 
            userData={userData} 
            onReset={handleReset} 
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-400">
        <p>Protected by Agentic AI Privacy Protocols.</p>
        <p className="mt-1">Powered by Gemini 3 Flash</p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);