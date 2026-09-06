import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Volume2, Square, CheckSquare, ArrowRight, ArrowLeft, AlertCircle, Play, SquareCheck } from 'lucide-react';

export const ConsentScreen: React.FC = () => {
  const { hasConsented, setHasConsented, setStep, goBack, speakText, stopSpeaking, isSpeaking } = useApp();

  const consentText = `Consent for Clinical Case-Taking. Please read carefully. Your clinical history will be collected. Previous medical documents may be digitized. Information will be shown to the treating physician. You can review all information before submission. The AI generated summary is not an autonomous diagnosis. Consent can be withdrawn at any time before final submission.`;

  const handlePlayConsentAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(consentText);
    }
  };

  const handleGiveConsent = () => {
    if (!hasConsented) {
      alert("Please check the consent box to proceed.");
      return;
    }
    setStep('profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
                Consent for Clinical Case-Taking
              </h1>
              <p className="text-sm text-slate-600">
                Patient Rights & Privacy Information for OPD Intake
              </p>
            </div>
          </div>

          <button
            onClick={handlePlayConsentAudio}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 border ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
            }`}
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-600" /> Pause Audio Explanation
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-sky-600 fill-current" /> Play Audio Consent
              </>
            )}
          </button>
        </div>

        {/* Structured Terms List */}
        <div className="mt-6 space-y-3 bg-white/70 rounded-2xl p-6 border border-slate-200 text-slate-800 text-sm leading-relaxed">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
            <div><strong>Clinical History Collection:</strong> Your symptoms, past illness, medications, and family history will be gathered for your OPD visit.</div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
            <div><strong>Medical Document Digitization:</strong> Any uploaded previous prescriptions, lab reports, or discharge summaries will be processed into your timeline.</div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
            <div><strong>Physician Review:</strong> Structured summaries are prepared for your treating doctor to review during consultation.</div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
            <div><strong>Patient Verification:</strong> You will review and confirm all answers before submission.</div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Important Safety Disclaimer:</strong> The AI assistant organizes information and highlights potential red flags — it does <em>NOT</em> provide an autonomous diagnosis or treatment prescription.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</div>
            <div><strong>Withdrawal of Consent:</strong> Consent can be withdrawn at any point prior to final physician submission.</div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="mt-6 p-4 rounded-2xl bg-sky-50/80 border border-sky-300 flex items-center gap-4 cursor-pointer" onClick={() => setHasConsented(!hasConsented)}>
          <button className="text-blue-700 transition">
            {hasConsented ? (
              <SquareCheck className="w-7 h-7 text-blue-700 fill-blue-50" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </button>
          <div className="text-sm font-bold text-slate-900 select-none">
            I understand and consent to clinical history taking and medical document processing.
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={goBack}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <button
            onClick={handleGiveConsent}
            disabled={!hasConsented}
            className={`px-8 py-3 rounded-xl font-bold text-base transition shadow-md flex items-center gap-2 ${
              hasConsented
                ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Give Consent <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
