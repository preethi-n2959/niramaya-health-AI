import React from 'react';
import { UserData, Gender, LANGUAGES } from '../types';
import { Button } from './Button';

interface Props {
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
}

export const IntakeAgent: React.FC<Props> = ({ data, onUpdate, onNext }) => {
  const isComplete = data.name && data.age && data.language;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-teal-100 text-teal-700 p-2 rounded-lg text-sm">Agent 01</span>
          Intake & Registration
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="e.g., Rajesh Kumar"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
              <input
                type="number"
                value={data.age}
                onChange={(e) => onUpdate({ age: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => onUpdate({ gender: e.target.value as Gender })}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {Object.values(Gender).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Preferred Language</label>
            <select
              value={data.language}
              onChange={(e) => onUpdate({ language: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">
              Your report and voice narration will be in this language.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={onNext} disabled={!isComplete} fullWidth>
        Next: Identify Symptoms
      </Button>
    </div>
  );
};