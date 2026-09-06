import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, HelpCircle, Eye, ShieldCheck, Stethoscope, ArrowRight, Activity, Sparkles, AlertCircle } from 'lucide-react';
import { DEMO_CASES } from '../../mock/mockData';

export const WelcomeScreen: React.FC = () => {
  const { setStep, setIsHelpOpen, setIsAccessibilityOpen, loadDemoCase } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* SIH Presentation Banner / Tagline */}
      <div className="glass-card rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-xl border border-white/80">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-sm font-semibold mb-6">
          <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
          High-Volume OPD & AYUSH Intake Kiosk
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
          Patient Case-Taking Software
        </h1>
        
        <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          Complete your comprehensive medical history before meeting the doctor. Answer questions using your voice or touchscreen, and scan previous medical records.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setStep('identification')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/25 flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-current" />
            Start Case-Taking
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsHelpOpen(true)}
            className="px-6 py-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-300 text-slate-800 font-semibold text-base transition flex items-center gap-2 shadow-sm"
          >
            <HelpCircle className="w-5 h-5 text-sky-600" />
            How It Works
          </button>

          <button
            onClick={() => setIsAccessibilityOpen(true)}
            className="px-6 py-4 rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-300 text-slate-800 font-semibold text-base transition flex items-center gap-2 shadow-sm"
          >
            <Eye className="w-5 h-5 text-slate-700" />
            Accessibility Options
          </button>
        </div>

        {/* Visual Patient Journey Diagram */}
        <div className="mt-12 pt-8 border-t border-slate-200/70">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-6">
            Complete Patient Clinical Flow:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold mb-3">
                1
              </div>
              <div className="font-bold text-slate-900 text-base">Patient Arrival</div>
              <div className="text-xs text-slate-600 mt-1">ABHA / Aadhaar ID Verification</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-3">
                2
              </div>
              <div className="font-bold text-slate-900 text-base">AI Case-Taking</div>
              <div className="text-xs text-slate-600 mt-1">Voice & Touch Intake + AYUSH</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mb-3">
                3
              </div>
              <div className="font-bold text-slate-900 text-base">Document Scan</div>
              <div className="text-xs text-slate-600 mt-1">OCR Medical Record Extraction</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-3">
                4
              </div>
              <div className="font-bold text-slate-900 text-base">Physician Review</div>
              <div className="text-xs text-slate-600 mt-1">Structured Consultation Summary</div>
            </div>
          </div>
        </div>
      </div>

      {/* SIH Quick Demo Mode Box */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-sky-300/80 shadow-lg bg-gradient-to-br from-sky-50/90 to-indigo-50/90">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 m-0">
              SIH Presentation — Quick Demo Mode
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Select a pre-loaded clinical persona to quickly experience the complete end-to-end workflow:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {DEMO_CASES.map((demo) => (
            <button
              key={demo.id}
              onClick={() => loadDemoCase(demo.id)}
              className="p-4 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-left transition-all hover:shadow-md hover:border-blue-400 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {demo.complaint}
                  </span>
                  {demo.hasRedFlag && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Priority
                    </span>
                  )}
                </div>
                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition">
                  {demo.title}
                </div>
                <div className="text-xs text-slate-600 mt-1">{demo.subtitle}</div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Load Sample Case</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust & Clinical Safety Footer Notice */}
      <div className="glass-card-subtle rounded-2xl p-4 text-center text-xs text-slate-600 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>
          <strong>Clinical Safety Principle:</strong> AI assists in history collection and organization — the physician makes all final diagnosis and treatment decisions.
        </span>
      </div>
    </div>
  );
};
