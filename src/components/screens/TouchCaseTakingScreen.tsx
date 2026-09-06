import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, Sliders, Mic, ArrowRight, ArrowLeft, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

export const TouchCaseTakingScreen: React.FC = () => {
  const { chiefComplaint, answers, addOrUpdateAnswer, setStep, goBack, setIsRedFlagTriggered } = useApp();

  const [severity, setSeverity] = useState<number>(4);
  const [onset, setOnset] = useState<string>('This morning (Acute onset)');
  const [radiation, setRadiation] = useState<string>('Center of chest radiating to left arm');
  const [pastHistory, setPastHistory] = useState<string>('Hypertension (2 years), High Cholesterol');
  const [medications, setMedications] = useState<string>('Amlodipine 5mg OD');
  const [allergies, setAllergies] = useState<string>('No known drug allergies (NKDA)');

  const handleSaveAndProceed = () => {
    addOrUpdateAnswer({ id: 'sev', question: 'Pain Severity Level', answer: `Level ${severity} of 4`, category: 'HPI' });
    addOrUpdateAnswer({ id: 'onset', question: 'Symptom Onset', answer: onset, category: 'HPI' });
    addOrUpdateAnswer({ id: 'rad', question: 'Radiation & Location', answer: radiation, category: 'HPI' });
    addOrUpdateAnswer({ id: 'pmh', question: 'Past Medical History', answer: pastHistory, category: 'Past History' });
    addOrUpdateAnswer({ id: 'meds', question: 'Current Medications', answer: medications, category: 'Medications' });
    addOrUpdateAnswer({ id: 'all', question: 'Drug Allergies', answer: allergies, category: 'Allergies' });

    if (severity === 4 || radiation.includes('left arm')) {
      setIsRedFlagTriggered(true);
    }

    setStep('review_answers');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
            <Stethoscope className="w-6 h-6 text-sky-700" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
              Adaptive Clinical Questions
            </h1>
            <p className="text-sm text-slate-600">
              Dual-mode input (Voice 🎤 & Touch 👆) tailored to: <strong>{chiefComplaint}</strong>
            </p>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-6 mt-8">
          {/* Question 1: Severity Rating (1 to 4) */}
          <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" /> How severe is your discomfort? (1 - 4 Scale)
              </label>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Current Rating: {severity} / 4
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { val: 1, label: '1 — Mild', desc: 'Noticeable but manageable' },
                { val: 2, label: '2 — Moderate', desc: 'Bothersome discomfort' },
                { val: 3, label: '3 — Severe', desc: 'Disrupts normal activity' },
                { val: 4, label: '4 — Very Severe', desc: 'Crushing or intense pain' },
              ].map((s) => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => setSeverity(s.val)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    severity === s.val
                      ? 'bg-blue-700 text-white border-blue-700 shadow-md ring-2 ring-blue-400/40'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div className="font-bold text-sm">{s.label}</div>
                  <div className={`text-xs mt-0.5 ${severity === s.val ? 'text-blue-100' : 'text-slate-500'}`}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Onset */}
          <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              When did the symptoms begin?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['This morning (Acute onset)', '1 - 3 Days ago', 'More than 1 week ago'].map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOnset(o)}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold text-left transition ${
                    onset === o
                      ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Radiation / Location */}
          <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-2">
            <label className="block text-sm font-bold text-slate-900">
              Location & Radiation of pain / discomfort:
            </label>
            <input
              type="text"
              value={radiation}
              onChange={(e) => setRadiation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Question 4: Past Medical History */}
          <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-2">
            <label className="block text-sm font-bold text-slate-900">
              Past Medical & Surgical History:
            </label>
            <input
              type="text"
              value={pastHistory}
              onChange={(e) => setPastHistory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Question 5: Medications & Allergies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-2">
              <label className="block text-sm font-bold text-slate-900">Current Regular Medications:</label>
              <input
                type="text"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-white text-slate-900 font-medium"
              />
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs space-y-2">
              <label className="block text-sm font-bold text-slate-900">Known Drug Allergies:</label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-white text-slate-900 font-medium"
              />
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
            onClick={handleSaveAndProceed}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Review Captured Answers <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
