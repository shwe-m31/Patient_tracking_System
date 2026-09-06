import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckSquare, ArrowRight, ArrowLeft, UserCheck, Stethoscope } from 'lucide-react';

export const FinalCaseRecordScreen: React.FC = () => {
  const { patient, chiefComplaint, setStep, goBack } = useApp();

  const handleFinalConfirm = () => {
    setStep('completion');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-md">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
            Confirm Clinical Case Record
          </h1>
          <p className="text-sm text-slate-600">
            Final physician verification and signoff for OPD EMR entry.
          </p>
        </div>

        {/* Verification Checklist */}
        <div className="bg-white/90 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
            Physician Verification Checklist:
          </h3>

          <div className="space-y-3 text-sm text-slate-800 font-semibold">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Patient Identity & ABHA Verification Reviewed ({patient.name})</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Clinical Intake History Reviewed ({chiefComplaint})</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Previous Medical Records & OCR Extractions Reviewed</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>AI-Generated Summary & Red Flag Warnings Verified</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Physician Signoff Completed</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={goBack}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleFinalConfirm}
            className="px-8 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-lg flex items-center gap-2"
          >
            Confirm Case Record <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
