import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, Mic, TouchpadIcon as Touch, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export const HelpPanel: React.FC = () => {
  const { isHelpOpen, setIsHelpOpen, currentStep } = useApp();

  if (!isHelpOpen) return null;

  const getHelpContent = () => {
    switch (currentStep) {
      case 'welcome':
        return {
          title: 'Welcome to Patient Case-Taking',
          body: 'This software allows patients to complete their medical history prior to seeing the doctor. You can speak or tap your responses, and upload previous hospital prescriptions or lab reports.'
        };
      case 'identification':
        return {
          title: 'Patient Identification',
          body: 'Enter your 14-digit ABHA ID (e.g. 91-4820-1192-3041) or Scan your ABHA QR code. You can also register as a new patient. No real backend submission takes place.'
        };
      case 'language':
        return {
          title: 'Selecting Your Preferred Language',
          body: 'Choose from 8 major Indian languages. The system provides audio questions and voice-to-text input in your preferred regional language.'
        };
      case 'consent':
        return {
          title: 'Clinical Consent & Data Privacy',
          body: 'Your medical details are collected exclusively for this consultation. Click "Play Consent Explanation" to listen to the audio consent in English or your native language.'
        };
      case 'chief_complaint':
      case 'conversational_intake':
      case 'touch_intake':
        return {
          title: 'Clinical Case-Taking Intake',
          body: 'You can respond by clicking the microphone button to Speak (Voice Mode) or by clicking pre-formatted Touch cards. Questions adapt dynamically based on your main symptom.'
        };
      case 'document_upload':
      case 'ocr_processing':
      case 'extracted_info':
        return {
          title: 'Medical Document Scanner & OCR',
          body: 'Upload or snap photos of your previous prescriptions, lab reports, or discharge summaries. The system automatically reads clinical values and builds your medical timeline.'
        };
      case 'ai_summary':
      case 'physician_dashboard':
      case 'physician_edit':
        return {
          title: 'Physician Review & Clinical Summary',
          body: 'The AI structures your history for the treating physician. The doctor can review, edit, or confirm all generated summary sections prior to final OPD entry.'
        };
      default:
        return {
          title: 'Case-Taking Assistance',
          body: 'Follow the on-screen steps. You can review and edit your answers at any point before submitting to the doctor.'
        };
    }
  };

  const content = getHelpContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="glass-modal max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-white/80">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5 text-sky-800 font-bold text-xl">
            <HelpCircle className="w-6 h-6 text-sky-600" />
            <h2>{content.title}</h2>
          </div>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-slate-700 text-base leading-relaxed">
          <p>{content.body}</p>

          <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-4 space-y-2 text-sm">
            <div className="font-semibold text-sky-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              How It Helps Your OPD Visit:
            </div>
            <ul className="space-y-1.5 text-slate-700 list-disc pl-5">
              <li>Reduces waiting & repetitive history taking at doctor's desk.</li>
              <li>Organizes old laboratory reports into an instant medical timeline.</li>
              <li>Highlights urgent red-flag symptoms directly to triage staff.</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/70 border border-slate-200 text-slate-700 font-medium">
              <Mic className="w-4 h-4 text-sky-600" /> Speak Answers
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/70 border border-slate-200 text-slate-700 font-medium">
              <Touch className="w-4 h-4 text-emerald-600" /> Tap Options
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/70 border border-slate-200 text-slate-700 font-medium">
              <FileText className="w-4 h-4 text-indigo-600" /> Scan Documents
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/70 border border-slate-200 text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Physician Reviews
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsHelpOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition shadow-md"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
