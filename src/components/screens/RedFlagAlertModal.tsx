import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Bell, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RedFlagAlertModal: React.FC = () => {
  const { isRedFlagTriggered, setIsRedFlagTriggered, triageAlertSent, triggerTriageAlert } = useApp();

  if (!isRedFlagTriggered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal max-w-lg w-full rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-red-500/80 bg-white">
        <div className="flex items-center gap-3 text-red-600 font-extrabold text-2xl pb-4 border-b border-red-100">
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center animate-bounce">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <div>
            <h2 className="m-0 leading-none">⚠️ PRIORITY ALERT</h2>
            <p className="text-xs text-red-700 font-semibold mt-1">High-Risk Clinical Red-Flag Detected</p>
          </div>
        </div>

        <div className="py-5 space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 font-bold text-base">
            Possible emergency symptoms detected.
          </div>

          <p>
            Your responses indicate acute symptoms (such as severe chest pain radiating to arm, cold sweating, or breathlessness) that may require immediate medical assessment by triage nursing staff.
          </p>

          {triageAlertSent ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <strong>Triage Alert Sent!</strong> OPD Triage Staff & Nursing Station have been notified of your priority status.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Clinical Principle:</strong> This system identifies potential red-flag symptoms for prioritization — it does not provide an autonomous diagnosis.
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={() => setIsRedFlagTriggered(false)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            Continue Case-Taking
          </button>

          {!triageAlertSent && (
            <button
              onClick={triggerTriageAlert}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4 animate-bounce" /> Alert Triage Staff
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
