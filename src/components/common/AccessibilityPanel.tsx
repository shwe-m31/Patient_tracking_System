import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Eye, Volume2, Type, Contrast, Sparkles } from 'lucide-react';

export const AccessibilityPanel: React.FC = () => {
  const {
    isAccessibilityOpen,
    setIsAccessibilityOpen,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    voiceGuidance,
    setVoiceGuidance,
    reduceAnimation,
    setReduceAnimation,
    speakText
  } = useApp();

  if (!isAccessibilityOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="glass-modal max-w-md w-full rounded-2xl p-6 shadow-2xl border border-white/80">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-xl">
            <Eye className="w-6 h-6 text-blue-700" />
            <h2>Accessibility Options</h2>
          </div>
          <button
            onClick={() => setIsAccessibilityOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          {/* Text Size Control */}
          <div>
            <label className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <Type className="w-4 h-4 text-blue-600" /> Text Size Adjustment
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize('normal')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition ${
                  fontSize === 'normal'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                Normal (100%)
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`py-2 px-3 rounded-xl border text-base font-semibold transition ${
                  fontSize === 'large'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                Large (115%)
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`py-2 px-3 rounded-xl border text-lg font-bold transition ${
                  fontSize === 'xlarge'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                X-Large (130%)
              </button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Contrast className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">High Contrast Mode</div>
                <div className="text-xs text-slate-500">Increases visual sharpness & text readability</div>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                highContrast ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Voice Guidance */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Voice Guidance (Read Aloud)</div>
                <div className="text-xs text-slate-500">Automatically reads intake questions out loud</div>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !voiceGuidance;
                setVoiceGuidance(next);
                if (next) speakText("Voice guidance is now enabled.");
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                voiceGuidance ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  voiceGuidance ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Reduce Animations</div>
                <div className="text-xs text-slate-500">Minimizes screen motion and transitions</div>
              </div>
            </div>
            <button
              onClick={() => setReduceAnimation(!reduceAnimation)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                reduceAnimation ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  reduceAnimation ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsAccessibilityOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition"
          >
            Apply & Save
          </button>
        </div>
      </div>
    </div>
  );
};
