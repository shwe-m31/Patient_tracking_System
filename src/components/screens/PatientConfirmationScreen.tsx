import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, FileText, UserCheck, AlertTriangle } from 'lucide-react';

export const PatientConfirmationScreen: React.FC = () => {
  const { setStep, goBack, patient, chiefComplaint, isRedFlagTriggered } = useApp();
  const [isChecked, setIsChecked] = useState(true);

  const handleConfirmSubmission = () => {
    setStep('physician_dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
            Confirm & Submit Case History
          </h1>
          <p className="text-sm text-slate-600">
            Final patient sign-off before sending your clinical history to the physician desk.
          </p>
        </div>

        {/* Verification Checklist Card */}
        <div className="bg-white/90 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
            Summary Checklist:
          </h3>

          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Patient Identity Verified: <strong>{patient.name} ({patient.abhaId})</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Chief Complaint Recorded: <strong>{chiefComplaint}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Previous Medical Documents Processed & Digitized</span>
            </div>
            {isRedFlagTriggered && (
              <div className="flex items-center gap-2 text-red-700 font-bold bg-red-50 p-2 rounded-xl border border-red-200">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Priority Red-Flag Alert Logged for Triage</span>
              </div>
            )}
          </div>
        </div>

        {/* Checkbox */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-300 flex items-center gap-3 cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-5 h-5 text-blue-700 rounded focus:ring-blue-600 cursor-pointer"
          />
          <div className="text-xs font-bold text-slate-900 select-none">
            I confirm that the information provided is accurate and ready for doctor review.
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
            onClick={handleConfirmSubmission}
            disabled={!isChecked}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 text-white font-bold text-base transition shadow-lg flex items-center gap-2"
          >
            Submit to Physician Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
