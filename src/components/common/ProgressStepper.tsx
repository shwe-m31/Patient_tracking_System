import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, UserCheck, ShieldCheck, Stethoscope, FileText, FileSpreadsheet, UserCheck2 } from 'lucide-react';
import { StageGroup } from '../../types';

interface StageConfig {
  id: StageGroup;
  label: string;
  icon: React.ReactNode;
}

export const ProgressStepper: React.FC = () => {
  const { currentStageGroup, currentStep, setStep } = useApp();

  // Don't render stepper on welcome screen for cleaner hero introduction
  if (currentStep === 'welcome') return null;

  const stages: StageConfig[] = [
    { id: 'identify', label: 'Identify', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'consent', label: 'Consent', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'case_taking', label: 'Case-Taking', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'summary', label: 'Summary', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'review', label: 'Review', icon: <UserCheck2 className="w-4 h-4" /> },
  ];

  const stageOrder: StageGroup[] = ['identify', 'consent', 'case_taking', 'documents', 'summary', 'review'];
  const currentIdx = stageOrder.indexOf(currentStageGroup);

  const handleStageClick = (stageId: StageGroup) => {
    // Navigate to representative screen for stage
    switch (stageId) {
      case 'identify':
        setStep('identification');
        break;
      case 'consent':
        setStep('consent');
        break;
      case 'case_taking':
        setStep('chief_complaint');
        break;
      case 'documents':
        setStep('document_upload');
        break;
      case 'summary':
        setStep('ai_summary');
        break;
      case 'review':
        setStep('physician_dashboard');
        break;
    }
  };

  return (
    <div className="w-full glass-card-subtle border-b border-slate-200/60 py-3 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2 py-1 scrollbar-none">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <React.Fragment key={stage.id}>
              {/* Stepper Node */}
              <button
                onClick={() => handleStageClick(stage.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-xs md:text-sm transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-400/50'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-white/40 text-slate-500 border border-slate-200/50 hover:bg-white/80'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isCurrent
                      ? 'bg-white text-blue-700 font-bold'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <span>{stage.label}</span>
              </button>

              {/* Connecting line */}
              {idx < stages.length - 1 && (
                <div
                  className={`flex-1 h-0.5 min-w-[16px] md:min-w-[32px] transition-colors ${
                    idx < currentIdx ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
