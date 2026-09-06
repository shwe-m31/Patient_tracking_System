import React from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, Eye, LogOut, Globe, Activity, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentStep,
    selectedLanguage,
    setIsHelpOpen,
    setIsAccessibilityOpen,
    setIsExitModalOpen,
    secondsElapsed,
    setStep
  } = useApp();

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const getStepNumber = (): string => {
    switch (currentStep) {
      case 'welcome':
      case 'identification':
        return 'Step 1 of 6';
      case 'language':
      case 'consent':
      case 'profile':
        return 'Step 2 of 6';
      case 'chief_complaint':
      case 'conversational_intake':
      case 'touch_intake':
      case 'ayush_intake':
      case 'review_answers':
        return 'Step 3 of 6';
      case 'document_upload':
      case 'ocr_processing':
      case 'extracted_info':
      case 'medical_timeline':
        return 'Step 4 of 6';
      case 'ai_summary':
      case 'patient_confirmation':
        return 'Step 5 of 6';
      case 'physician_dashboard':
      case 'physician_edit':
      case 'final_record':
      case 'completion':
        return 'Step 6 of 6';
      default:
        return 'OPD Session';
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-header px-4 py-3 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Software Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStep('welcome')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 m-0 leading-none">
              Patient Case-Taking Software
            </h1>
            <p className="text-xs text-sky-700 font-semibold tracking-wide uppercase mt-0.5">
              AI Clinical History & OPD Document Intake • SIH OPD Kiosk
            </p>
          </div>
        </div>

        {/* Current Step Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50/80 border border-sky-200 text-sky-800 text-sm font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-ping"></span>
          {getStepNumber()}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Selector Indicator */}
          <button
            onClick={() => setStep('language')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white border border-slate-200/80 text-slate-700 text-sm font-medium transition"
            title="Change Language"
          >
            <Globe className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">{selectedLanguage.nativeName}</span>
          </button>

          {/* Session Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200 text-slate-700 text-xs md:text-sm font-semibold font-mono">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          {/* Help Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-sm font-semibold transition"
            title="Help / How it works"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Help</span>
          </button>

          {/* Accessibility Options */}
          <button
            onClick={() => setIsAccessibilityOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 text-sm font-medium transition"
            title="Accessibility Settings"
          >
            <Eye className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Accessibility</span>
          </button>

          {/* Exit Session Button */}
          <button
            onClick={() => setIsExitModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-sm font-semibold transition"
            title="Exit Session"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
