import React, { useState, useEffect } from 'react';
import { HealthReport, UserData } from '../types';
import { Button } from './Button';
import { generateAudioNarration, createAudioBufferFromPCM } from '../services/geminiService';

interface Props {
  report: HealthReport;
  userData: UserData;
  onReset: () => void;
}

export const ReportView: React.FC<Props> = ({ report, userData, onReset }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);

  const riskColor = {
    Low: "bg-green-100 text-green-800 border-green-200",
    Moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    High: "bg-red-100 text-red-800 border-red-200"
  };

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const handlePlayAudio = async () => {
    if (isPlaying && audioSource) {
      audioSource.stop();
      setIsPlaying(false);
      return;
    }

    setIsLoadingAudio(true);
    try {
      // Initialize Audio Context on user interaction
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      setAudioContext(ctx);

      // Create text for narration: Summary + Recommendations
      const textToRead = `${report.summary}. Recommendations: ${report.recommendations.join(". ")}`;
      
      const pcmData = await generateAudioNarration(textToRead, userData.language);
      
      // Use helper to convert raw PCM to AudioBuffer manually
      const audioBuffer = createAudioBufferFromPCM(pcmData, ctx);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => setIsPlaying(false);
      
      source.start(0);
      setAudioSource(source);
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio playback failed", err);
      alert("Could not generate audio. Please check connection.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Niramaya Report</h2>
              <p className="text-slate-400 text-sm">{userData.name} • {userData.age}</p>
            </div>
            <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${riskColor[report.riskLevel]}`}>
              {report.riskLevel} Risk
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Audio Controls */}
          <div className="flex justify-center">
            <Button 
              onClick={handlePlayAudio} 
              disabled={isLoadingAudio}
              variant="secondary"
              className="rounded-full px-8 flex items-center gap-2 border-teal-200"
            >
              {isLoadingAudio ? (
                <span className="animate-spin text-xl">◌</span>
              ) : isPlaying ? (
                <span>⏹ Stop Narration</span>
              ) : (
                <span>🔊 Listen in {userData.language}</span>
              )}
            </Button>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</h3>
            <p className="text-slate-700 leading-relaxed text-lg">{report.summary}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Recommendations</h3>
            <ul className="space-y-3">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 items-start bg-slate-50 p-3 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">{i + 1}</span>
                  <span className="text-slate-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-xs text-orange-800 text-center italic">
              {report.disclaimer}
            </p>
          </div>
        </div>
      </div>

      <Button onClick={onReset} variant="outline" fullWidth>
        Start New Screening
      </Button>
    </div>
  );
};