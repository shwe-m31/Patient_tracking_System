import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Cpu, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

export const OcrProcessingScreen: React.FC = () => {
  const { activeDocument, setStep } = useApp();
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Uploading document...');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(35);
      setStageText('Running OCR Text Recognition (100%)...');
    }, 600);

    const t2 = setTimeout(() => {
      setProgress(70);
      setStageText('Extracting Clinical Entities & Medications (100%)...');
    }, 1400);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStageText('Structuring Timeline & Finalizing Extraction...');
    }, 2200);

    const t4 = setTimeout(() => {
      setStep('extracted_info');
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [setStep]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-white/80 shadow-2xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center shadow-xl relative">
          <Cpu className="w-10 h-10 animate-pulse" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
            Processing Medical Document
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Analyzing <strong>{activeDocument?.filename || 'Uploaded Document'}</strong>
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden p-0.5 border border-slate-300">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              {stageText}
            </span>
            <span className="font-mono text-blue-700">{progress}%</span>
          </div>
        </div>

        {/* Extraction Stages Status Checklist */}
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-xs font-bold text-left pt-4">
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${progress >= 35 ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-slate-50 text-slate-400'}`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>OCR 100%</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${progress >= 70 ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-slate-50 text-slate-400'}`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Clinical Entities 100%</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${progress >= 100 ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-slate-50 text-slate-400'}`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Timeline Organized 100%</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${progress >= 100 ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-slate-50 text-slate-400'}`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
