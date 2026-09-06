import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Award, RefreshCw, Stethoscope, FileSpreadsheet, ShieldCheck, Printer } from 'lucide-react';

export const CompletionScreen: React.FC = () => {
  const { patient, chiefComplaint, resetSession } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-white/80 shadow-2xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl">
          <Award className="w-10 h-10" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            ● Ready for Consultation
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 m-0">
            Case-Taking Completed
          </h1>
          <p className="text-base text-slate-600 mt-2 max-w-md mx-auto">
            Your clinical history and digitized medical records have been organized for the doctor consultation.
          </p>
        </div>

        {/* Milestone Accomplishments */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-xl mx-auto pt-2">
          <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div className="font-bold text-xs text-slate-900">History Captured</div>
            <div className="text-[11px] text-slate-500">Voice & Touch Intake</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div className="font-bold text-xs text-slate-900">Docs Processed</div>
            <div className="text-[11px] text-slate-500">OCR Extracted</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div className="font-bold text-xs text-slate-900">Summary Drafted</div>
            <div className="text-[11px] text-slate-500">Physician Structured</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div className="font-bold text-xs text-slate-900">Physician Signed</div>
            <div className="text-[11px] text-slate-500">Consultation Ready</div>
          </div>
        </div>

        {/* Consultation Token Ticket */}
        <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-300 max-w-md mx-auto text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-sky-900 border-b border-sky-200 pb-2">
            <span>OPD CONSULTATION TOKEN</span>
            <span className="font-mono text-blue-700">TOKEN # 42</span>
          </div>
          <div className="text-sm font-bold text-slate-900">Patient: {patient.name} ({patient.patientId})</div>
          <div className="text-xs text-slate-600">Department: {patient.department} • Room 104</div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-base transition shadow-sm flex items-center gap-2"
          >
            <Printer className="w-5 h-5 text-sky-600" /> Print Case Record
          </button>
          <button
            onClick={resetSession}
            className="px-8 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-lg flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Start New Case Session
          </button>
        </div>
      </div>
    </div>
  );
};
