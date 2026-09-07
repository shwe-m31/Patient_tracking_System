import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, AlertTriangle, FileText, HeartPulse, Stethoscope, Edit3, CheckCircle2, XCircle, PlusCircle, ArrowRight, ClipboardList, Activity } from 'lucide-react';

export const PhysicianDashboardScreen: React.FC = () => {
  const { patient, chiefComplaint, isRedFlagTriggered, documents, clinicalSummary, answers, ayushData, setStep } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Physician Header Banner */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-blue-300/80 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-bold uppercase tracking-wider mb-1">
                Physician Consultation Review Dashboard
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white m-0">
                Patient Case Review: {patient.name}
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-0.5">
                Age: <strong>{patient.age}Y</strong> • Gender: <strong>{patient.gender}</strong> • ABHA: <strong className="font-mono text-sky-300">{patient.abhaId}</strong>
              </p>
            </div>
          </div>

          <div className="text-right text-xs bg-white/10 p-3 rounded-2xl border border-white/20">
            <div className="text-slate-300">OPD Case ID:</div>
            <div className="font-mono text-lg font-bold text-sky-400">PC-2026-00124</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">● Ready for Doctor Signoff</div>
          </div>
        </div>
      </div>

      {/* Four Major Physician Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Current Complaint */}
        <div className="glass-card rounded-2xl p-5 border border-white/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
            <span>Current Complaint</span>
            <Stethoscope className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{chiefComplaint}</div>
          <div className="text-xs text-slate-600">Acute onset reported by patient</div>
        </div>

        {/* Card 2: Red Flags */}
        <div className={`glass-card rounded-2xl p-5 border shadow-md space-y-2 ${
          isRedFlagTriggered ? 'bg-red-50/90 border-red-300' : 'border-white/80'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
            <span>Red Flag Status</span>
            <AlertTriangle className={`w-4 h-4 ${isRedFlagTriggered ? 'text-red-600' : 'text-slate-400'}`} />
          </div>
          <div className={`text-lg font-bold ${isRedFlagTriggered ? 'text-red-700' : 'text-emerald-700'}`}>
            {isRedFlagTriggered ? '⚠ Potential Red Flag' : 'No Red Flags'}
          </div>
          <div className="text-xs text-slate-600">
            {isRedFlagTriggered ? 'Severe radiation / cold sweating' : 'Normal stable triage status'}
          </div>
        </div>

        {/* Card 3: Previous Conditions */}
        <div className="glass-card rounded-2xl p-5 border border-white/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
            <span>Previous Conditions</span>
            <HeartPulse className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-base font-bold text-slate-900">
            {patient.existingConditions.join(', ') || 'None Reported'}
          </div>
          <div className="text-xs text-slate-600">Documented in past history</div>
        </div>

        {/* Card 4: Documents */}
        <div className="glass-card rounded-2xl p-5 border border-white/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
            <span>Processed Records</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{documents.length} Medical Documents</div>
          <div className="text-xs text-slate-600">OCR digitized & timeline linked</div>
        </div>
      </div>

      {/* Detailed Consultation Review Card */}
      <div className="glass-card rounded-3xl p-6 border border-white/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900 m-0">Structured Clinical Summary & Review Details</h2>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep('physician_edit')}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" /> Edit / Confirm Summary
            </button>
          </div>
        </div>

        {/* Summary & Review Display */}
        <div className="bg-white/90 rounded-2xl p-5 border border-slate-200 space-y-5 text-sm">
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800">History of Present Illness (HPI)</h4>
            <p className="mt-1 font-serif text-slate-900 leading-relaxed">{clinicalSummary.hpi}</p>
          </div>

          {/* Captured Intake Answers Grid */}
          {answers.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800">Captured Patient Intake Answers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {answers.map((ans) => (
                  <div key={ans.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="font-bold text-blue-900 uppercase text-[10px] tracking-wider mb-0.5">{ans.category}</div>
                    <div className="text-slate-600 font-medium">{ans.question}</div>
                    <div className="font-bold text-slate-900 mt-0.5">{ans.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AYUSH Assessment details if available */}
          {ayushData.prakriti && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800">AYUSH Clinical Assessment</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-sans">
                <div><span className="font-bold">Prakriti:</span> {ayushData.prakriti}</div>
                <div><span className="font-bold">Vikriti:</span> {ayushData.vikriti}</div>
                <div><span className="font-bold">Agni / Ahara:</span> {ayushData.aharaShakti}</div>
                <div><span className="font-bold">Ahara-Vihara:</span> {ayushData.aharaViharaNotes}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800">Past History & Medications</h4>
              <p className="mt-1 font-serif text-slate-800">{clinicalSummary.pastMedicalHistory} • {clinicalSummary.drugHistory}</p>
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800">Allergies & Family History</h4>
              <p className="mt-1 font-serif text-slate-800">{clinicalSummary.allergyHistory} • {clinicalSummary.familyHistory}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800">Review of Systems (ROS)</h4>
              <p className="mt-1 font-serif text-slate-800">{clinicalSummary.reviewOfSystems}</p>
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-blue-800">Previous Documented Investigations</h4>
              <p className="mt-1 font-serif text-slate-800">{clinicalSummary.previousInvestigations}</p>
            </div>
          </div>

          {clinicalSummary.physicianNotes && (
            <div className="pt-3 border-t border-slate-100">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800">Physician Clinical Notes</h4>
              <p className="mt-1 font-sans text-slate-900 bg-indigo-50/80 p-3 rounded-xl border border-indigo-200 whitespace-pre-wrap">{clinicalSummary.physicianNotes}</p>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setStep('ai_summary')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            View Full Draft
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep('physician_edit')}
              className="px-5 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-sky-700" /> Add Clinical Note
            </button>
            <button
              onClick={() => setStep('final_record')}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition shadow-md flex items-center gap-2"
            >
              Confirm Case Record <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
