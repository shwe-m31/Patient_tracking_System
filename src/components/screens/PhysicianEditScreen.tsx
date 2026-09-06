import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit3, CheckCircle2, XCircle, PlusCircle, Save, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const PhysicianEditScreen: React.FC = () => {
  const { clinicalSummary, setClinicalSummary, setStep, goBack } = useApp();

  const [editForm, setEditForm] = useState(clinicalSummary);
  const [activeTab, setActiveTab] = useState<'hpi' | 'meds' | 'notes'>('hpi');
  const [physicianNoteInput, setPhysicianNoteInput] = useState('');

  const handleSaveEdits = () => {
    setClinicalSummary({
      ...editForm,
      isPhysicianApproved: true,
      physicianNotes: physicianNoteInput
        ? `${editForm.physicianNotes}\n[Dr. Note]: ${physicianNoteInput}`
        : editForm.physicianNotes
    });
    setStep('final_record');
  };

  const handleRejectSummary = () => {
    if (confirm("Are you sure you want to reject the AI draft summary? A blank template will be initialized.")) {
      setClinicalSummary((prev) => ({
        ...prev,
        hpi: 'AI summary rejected by physician. Re-taking history manually.',
        isPhysicianApproved: false
      }));
      setStep('physician_dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              <Edit3 className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
                Physician Clinical Summary Editor
              </h1>
              <p className="text-sm text-slate-600">
                Modify, add notes, or confirm AI-generated clinical sections.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
            Physician Confirmed Badging
          </span>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('hpi')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
              activeTab === 'hpi' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            HPI & History Sections
          </button>
          <button
            onClick={() => setActiveTab('meds')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
              activeTab === 'meds' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Medications & Allergies
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
              activeTab === 'notes' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Add Doctor Notes
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {activeTab === 'hpi' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 uppercase">Chief Complaint</label>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Physician Editable
                  </span>
                </div>
                <input
                  type="text"
                  value={editForm.chiefComplaint}
                  onChange={(e) => setEditForm({ ...editForm, chiefComplaint: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 uppercase">History of Present Illness (HPI)</label>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    AI-Generated Draft
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={editForm.hpi}
                  onChange={(e) => setEditForm({ ...editForm, hpi: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 font-serif text-sm bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === 'meds' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase">Drug History & Medications</label>
                <textarea
                  rows={3}
                  value={editForm.drugHistory}
                  onChange={(e) => setEditForm({ ...editForm, drugHistory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-serif text-sm bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 uppercase">Allergies</label>
                <input
                  type="text"
                  value={editForm.allergyHistory}
                  onChange={(e) => setEditForm({ ...editForm, allergyHistory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-serif text-sm bg-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase">Doctor Clinical Impression & OPD Notes</label>
              <textarea
                rows={4}
                value={physicianNoteInput}
                onChange={(e) => setPhysicianNoteInput(e.target.value)}
                placeholder="Enter physical examination findings or consultation notes..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white font-sans"
              />
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleRejectSummary}
            className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4 text-red-600" /> Reject AI Summary
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
            >
              Cancel Edits
            </button>
            <button
              onClick={handleSaveEdits}
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save & Confirm Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
