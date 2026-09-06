import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../mock/mockData';
import { Globe, Volume2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Language } from '../../types';

export const LanguageScreen: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, setStep, goBack, speakText } = useApp();

  const handleSelectLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
    speakText(`Language selected: ${lang.name}`);
  };

  const handleContinue = () => {
    setStep('consent');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
            <Globe className="w-6 h-6 text-sky-700" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
              Select Preferred Language
            </h1>
            <p className="text-sm text-slate-600">
              Choose your language for voice guidance, questions, and interface text.
            </p>
          </div>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage.id === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleSelectLanguage(lang)}
                className={`p-5 rounded-2xl border text-center transition-all relative group flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-blue-50 to-sky-100 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-sky-300 shadow-xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                
                <div className="text-2xl font-bold text-slate-900 mb-1">{lang.nativeName}</div>
                <div className="text-xs font-semibold text-slate-600">{lang.name}</div>
                
                <div className="mt-3 opacity-60 group-hover:opacity-100 transition text-sky-700 flex items-center gap-1 text-xs font-medium">
                  <Volume2 className="w-3.5 h-3.5" /> Listen
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 flex items-center justify-between">
          <span>Current active language: <strong>{selectedLanguage.name} ({selectedLanguage.nativeName})</strong></span>
          <button
            onClick={() => speakText(`You have chosen ${selectedLanguage.name}`)}
            className="flex items-center gap-1 text-blue-700 font-bold hover:underline"
          >
            <Volume2 className="w-4 h-4" /> Test Voice
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
            onClick={handleContinue}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Proceed to Consent <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
