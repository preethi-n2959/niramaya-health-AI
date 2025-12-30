import React from 'react';
import { SYMPTOMS_LIST } from '../types';
import { Button } from './Button';

interface Props {
  selectedSymptoms: string[];
  onToggle: (symptom: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SymptomTriage: React.FC<Props> = ({ selectedSymptoms, onToggle, onNext, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-sm">Agent 02</span>
          Symptom Triage
        </h2>
        <p className="text-slate-500 text-sm mb-6">Tap all that apply to you currently.</p>

        <div className="grid grid-cols-2 gap-3">
          {SYMPTOMS_LIST.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => onToggle(symptom)}
                className={`p-4 rounded-xl text-sm font-medium text-left transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                    : 'border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {symptom}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} fullWidth className="flex-[2]">
          Generate Report
        </Button>
      </div>
    </div>
  );
};