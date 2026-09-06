import React from 'react';
import { useApp } from '../../context/AppContext';
import { LogOut, AlertTriangle } from 'lucide-react';

export const ExitModal: React.FC = () => {
  const { isExitModalOpen, setIsExitModalOpen, resetSession } = useApp();

  if (!isExitModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="glass-modal max-w-md w-full rounded-2xl p-6 shadow-2xl border border-white/80">
        <div className="flex items-center gap-3 text-red-600 font-bold text-xl pb-3 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2>End Case-Taking Session?</h2>
        </div>

        <div className="py-4 text-slate-700 text-sm leading-relaxed space-y-2">
          <p>
            Are you sure you want to end this case-taking session?
          </p>
          <p className="text-xs text-slate-500 bg-slate-100 p-3 rounded-xl border border-slate-200">
            Ending the session will clear current answers and return to the Welcome screen for the next OPD patient.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => setIsExitModalOpen(false)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
          >
            Continue Session
          </button>
          <button
            onClick={() => {
              setIsExitModalOpen(false);
              resetSession();
            }}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition shadow-md flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> End Session
          </button>
        </div>
      </div>
    </div>
  );
};
