import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMON_COMPLAINTS } from '../../mock/mockData';
import { Mic, TouchpadIcon as Touch, Volume2, ArrowRight, ArrowLeft, Check, AlertTriangle, Sparkles } from 'lucide-react';

export const ChiefComplaintScreen: React.FC = () => {
  const {
    chiefComplaint,
    setChiefComplaint,
    setStep,
    goBack,
    setIsRedFlagTriggered,
    patient,
    speakText
  } = useApp();

  const [inputMode, setInputMode] = useState<'touch' | 'voice'>('touch');
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const handleSelectComplaint = (label: string, isRedFlag: boolean) => {
    setChiefComplaint(label);
    if (isRedFlag) {
      setIsRedFlagTriggered(true);
    }
  };

  const handleStartVoiceRecord = () => {
    setIsListening(true);
    setVoiceTranscript('');
    speakText("Listening... Please describe your chief symptom.");

    // Simulate Speech-to-Text transcript after 2 seconds or Web Speech API if supported
    setTimeout(() => {
      setIsListening(false);
      setVoiceTranscript("I have chest pain since this morning around 7:00 AM.");
      setChiefComplaint("Chest Pain");
      setIsRedFlagTriggered(true);
    }, 2500);
  };

  const handleConfirmVoice = () => {
    if (patient.department === 'AYUSH / Ayurveda') {
      setStep('ayush_intake');
    } else {
      setStep('conversational_intake');
    }
  };

  const handleContinueTouch = () => {
    if (patient.department === 'AYUSH / Ayurveda') {
      setStep('ayush_intake');
    } else {
      setStep('conversational_intake');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              OPD Intake Stage 1
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 m-0">
              What brings you to the hospital today?
            </h1>
            <p className="text-sm text-slate-600">
              Select or speak your main complaint to begin structured clinical history taking.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 shrink-0">
            <button
              onClick={() => setInputMode('touch')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                inputMode === 'touch'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Touch className="w-4 h-4 text-emerald-600" /> Touch Cards
            </button>

            <button
              onClick={() => setInputMode('voice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                inputMode === 'voice'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-4 h-4 text-red-500" /> Voice Input 🎤
            </button>
          </div>
        </div>

        {/* MODE A: VOICE INTERACTION */}
        {inputMode === 'voice' && (
          <div className="my-8 text-center space-y-6 max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-b from-sky-50 to-indigo-50/50 border border-sky-200 shadow-md">
            <div className="relative inline-block">
              <button
                onClick={handleStartVoiceRecord}
                disabled={isListening}
                className={`w-28 h-28 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all transform hover:scale-105 cursor-pointer ${
                  isListening
                    ? 'bg-red-600 animate-mic-pulse ring-8 ring-red-300/50'
                    : 'bg-gradient-to-tr from-blue-700 to-sky-500 hover:from-blue-800'
                }`}
              >
                <Mic className="w-10 h-10 mb-1" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isListening ? 'Listening' : 'Tap & Speak'}
                </span>
              </button>
            </div>

            {isListening ? (
              <div className="space-y-2">
                <div className="text-sm font-bold text-red-600 animate-pulse">
                  Listening to your speech... Speak clearly into microphone.
                </div>
                <div className="text-xs text-slate-500">"I have chest pain since morning..."</div>
              </div>
            ) : voiceTranscript ? (
              <div className="space-y-4 p-4 rounded-2xl bg-white border border-slate-200 text-left">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Simulated Speech Recognition Output:
                </div>
                <div className="text-base font-semibold text-slate-900 italic bg-sky-50 p-3 rounded-xl border border-sky-100">
                  "{voiceTranscript}"
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleConfirmVoice}
                    className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Confirm Complaint
                  </button>
                  <button
                    onClick={handleStartVoiceRecord}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Click the microphone button to describe your symptoms in English or your native language.
              </div>
            )}
          </div>
        )}

        {/* MODE B: TOUCH INTERACTION */}
        {inputMode === 'touch' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 my-6">
            {COMMON_COMPLAINTS.map((item) => {
              const isSelected = chiefComplaint === item.label;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectComplaint(item.label, item.isRedFlag)}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-50 to-sky-100 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                      : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-sky-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    {item.isRedFlag && (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <AlertTriangle className="w-3 h-3" /> Priority
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{item.desc}</div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-2 border-t border-blue-200/80 flex items-center justify-between text-xs font-bold text-blue-700">
                      <span>Selected</span>
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Complaint Banner */}
        <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-300 flex items-center justify-between text-sm">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Selected Chief Complaint:</span>
            <strong className="text-slate-900 text-base">{chiefComplaint || 'None Selected'}</strong>
          </div>
          <button
            onClick={() => speakText(`Selected complaint is ${chiefComplaint}`)}
            className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
          >
            <Volume2 className="w-4 h-4" /> Speak
          </button>
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
            onClick={handleContinueTouch}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Continue to Case-Taking <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
