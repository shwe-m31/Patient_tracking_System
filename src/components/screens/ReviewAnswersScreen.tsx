import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, Edit3, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ReviewAnswersScreen: React.FC = () => {
  const { chiefComplaint, answers, ayushData, setStep, goBack, isRedFlagTriggered } = useApp();

  const handleConfirm = () => {
    setStep('document_upload');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              <ClipboardList className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
                Review Your Information
              </h1>
              <p className="text-sm text-slate-600">
                Verify all captured clinical intake answers before adding previous medical documents.
              </p>
            </div>
          </div>
          {isRedFlagTriggered && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" /> Priority Flagged
            </span>
          )}
        </div>

        {/* Answer Cards List */}
        <div className="mt-8 space-y-4">
          {/* Chief Complaint Card */}
          <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Chief Complaint</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{chiefComplaint}</div>
            </div>
            <button
              onClick={() => setStep('chief_complaint')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          {/* Clinical Answers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {answers.map((ans) => (
              <div key={ans.id} className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                    {ans.category}
                  </span>
                  <div className="text-xs font-bold text-slate-600 mt-2">{ans.question}</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{ans.answer}</div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setStep('touch_intake')}
                    className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Section
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AYUSH Card if applicable */}
          {ayushData.prakriti && (
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">AYUSH / Ayurveda Assessment</span>
                <button
                  onClick={() => setStep('ayush_intake')}
                  className="px-3 py-1 rounded-xl bg-white text-emerald-800 text-xs font-bold border border-emerald-200"
                >
                  <Edit3 className="w-3 h-3 inline mr-1" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><strong>Prakriti:</strong> {ayushData.prakriti}</div>
                <div><strong>Vikriti:</strong> {ayushData.vikriti}</div>
                <div><strong>Agni / Ahara:</strong> {ayushData.aharaShakti}</div>
                <div><strong>Ahara-Vihara:</strong> {ayushData.aharaViharaNotes}</div>
              </div>
            </div>
          )}
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
            onClick={handleConfirm}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Confirm Information <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
