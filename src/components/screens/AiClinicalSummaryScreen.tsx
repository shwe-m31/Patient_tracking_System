import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Sparkles, AlertCircle, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AiClinicalSummaryScreen: React.FC = () => {
  const { clinicalSummary, patient, answers, setStep, goBack, isRedFlagTriggered } = useApp();

  const handleProceedToConfirmation = () => {
    setStep('patient_confirmation');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl space-y-6">
        {/* Header with Draft Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI-Generated Draft Summary
              </span>
              {isRedFlagTriggered && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                  Priority Red-Flag Flagged
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
              Structured Clinical History Summary
            </h1>
            <p className="text-sm text-slate-600">
              Physician-ready structured intake record generated from patient voice & document intake.
            </p>
          </div>

          <div className="text-right text-xs text-slate-500 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div>Patient: <strong>{patient.name} ({patient.age}Y / {patient.gender})</strong></div>
            <div>Case ID: <strong className="font-mono text-blue-700">PC-2026-00124</strong></div>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-amber-900 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong>Physician Notice:</strong> This is an AI-generated draft summary prepared prior to consultation. Please review and confirm all clinical details before final OPD entry.
          </div>
        </div>

        {/* Structured Summary Document Layout */}
        <div className="bg-white/90 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 text-slate-800 font-serif">
          {/* Section 1: Chief Complaint */}
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
              Chief Complaint
            </h3>
            <p className="text-base font-bold text-slate-900">{clinicalSummary.chiefComplaint}</p>
          </div>

          {/* Section 2: HPI */}
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
              History of Present Illness (HPI)
            </h3>
            <p className="text-sm leading-relaxed">{clinicalSummary.hpi}</p>
          </div>

          {/* Section 3: Past History & Surgery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-4 text-sm">
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Past Medical History
              </h3>
              <p>{clinicalSummary.pastMedicalHistory}</p>
            </div>
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Past Surgical History
              </h3>
              <p>{clinicalSummary.pastSurgicalHistory}</p>
            </div>
          </div>

          {/* Section 4: Drug & Allergy History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-4 text-sm">
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Drug History (Current Medications)
              </h3>
              <p>{clinicalSummary.drugHistory}</p>
            </div>
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Allergy History
              </h3>
              <p>{clinicalSummary.allergyHistory}</p>
            </div>
          </div>

          {/* Section 5: Family & Personal History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-4 text-sm">
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Family Medical History
              </h3>
              <p>{clinicalSummary.familyHistory}</p>
            </div>
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Personal History
              </h3>
              <p>{clinicalSummary.personalHistory}</p>
            </div>
          </div>

          {/* Section 6: ROS & Previous Investigations */}
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Review of Systems (ROS)
              </h3>
              <p>{clinicalSummary.reviewOfSystems}</p>
            </div>
            <div>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                Previous Documented Investigations
              </h3>
              <p>{clinicalSummary.previousInvestigations}</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={goBack}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleProceedToConfirmation}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Proceed to Patient Confirmation <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
