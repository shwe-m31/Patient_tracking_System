import React from 'react';
import { useApp } from '../../context/AppContext';
import { Leaf, Sparkles, ArrowRight, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

export const AyushIntakeScreen: React.FC = () => {
  const { ayushData, setAyushData, setStep, goBack } = useApp();

  const handleSave = () => {
    setStep('review_answers');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* AYUSH Header Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-emerald-300/80 shadow-xl bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> AYUSH / Ayurveda OPD Case Intake
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 m-0">
              Dashavidha Pariksha & Ahara-Vihara Assessment
            </h1>
            <p className="text-sm text-slate-600">
              Ten-fold clinical examination framework for Ayurvedic holistic diagnosis.
            </p>
          </div>
        </div>

        {/* Dashavidha Pariksha Grid */}
        <div className="mt-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-emerald-200 pb-2">
            1. Dashavidha Pariksha (Ten-Fold Clinical Examination)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Prakriti (Dosha Constitution)
              </label>
              <input
                type="text"
                value={ayushData.prakriti}
                onChange={(e) => setAyushData({ ...ayushData, prakriti: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold bg-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Vikriti (Current Pathological Imbalance)
              </label>
              <input
                type="text"
                value={ayushData.vikriti}
                onChange={(e) => setAyushData({ ...ayushData, vikriti: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold bg-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Sara (Tissue Excellence & Vitality)
              </label>
              <input
                type="text"
                value={ayushData.sara}
                onChange={(e) => setAyushData({ ...ayushData, sara: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold bg-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Samhanana (Body Compactness)
              </label>
              <input
                type="text"
                value={ayushData.samhanana}
                onChange={(e) => setAyushData({ ...ayushData, samhanana: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold bg-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Ahara Shakti (Digestive & Assimilation Power - Agni)
              </label>
              <input
                type="text"
                value={ayushData.aharaShakti}
                onChange={(e) => setAyushData({ ...ayushData, aharaShakti: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold bg-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Vyayama Shakti (Physical Work Capacity)
              </label>
              <input
                type="text"
                value={ayushData.vyayamaShakti}
                onChange={(e) => setAyushData({ ...ayushData, vyayamaShakti: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold bg-white"
              />
            </div>
          </div>

          {/* Section 2: Ahara-Vihara Assessment */}
          <h2 className="text-lg font-bold text-slate-900 border-b border-emerald-200 pb-2 pt-4">
            2. Ahara-Vihara Assessment (Dietary & Lifestyle Patterns)
          </h2>

          <div className="p-5 rounded-2xl bg-white/90 border border-emerald-200 space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
              Dietary Habits, Daily Routine (Dinacharya) & Sleep (Nidra):
            </label>
            <textarea
              rows={3}
              value={ayushData.aharaViharaNotes}
              onChange={(e) => setAyushData({ ...ayushData, aharaViharaNotes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
            />
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
            onClick={handleSave}
            className="px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Save AYUSH Intake <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
