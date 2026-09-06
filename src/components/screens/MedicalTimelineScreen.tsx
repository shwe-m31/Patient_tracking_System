import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, FileText, Activity, Pill, Building2, ArrowRight, ArrowLeft, Eye, X } from 'lucide-react';
import { TimelineEvent } from '../../types';

export const MedicalTimelineScreen: React.FC = () => {
  const { timeline, setStep, goBack } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const handleContinue = () => {
    setStep('ai_summary');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
              <Calendar className="w-6 h-6 text-sky-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
                Patient Medical History Timeline
              </h1>
              <p className="text-sm text-slate-600">
                Chronological organization of previous prescriptions, hospital admissions, and diagnostic lab reports.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full">
            2023 — 2026 Records
          </span>
        </div>

        {/* Timeline Visualization */}
        <div className="relative pl-6 md:pl-10 space-y-8 border-l-2 border-sky-300 py-4 my-8">
          {timeline.map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-blue-600 shadow-md group-hover:scale-125 transition-transform" />

              {/* Event Card */}
              <div
                onClick={() => setSelectedEvent(evt)}
                className="p-5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 hover:border-sky-400 shadow-xs transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-sky-100 text-sky-900 font-mono">
                      {evt.year}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{evt.date}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {evt.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 m-0 group-hover:text-blue-700 transition">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs text-slate-500 font-medium pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-slate-400" /> {evt.facility}
                  </span>
                  <button className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 font-bold hover:bg-sky-100 transition flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail for Event */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
            <div className="glass-modal max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-white/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {selectedEvent.type}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedEvent.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <div><strong>Date of Record:</strong> {selectedEvent.date}</div>
                <div><strong>Healthcare Facility:</strong> {selectedEvent.facility}</div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mt-2">
                  <strong>Clinical Summary:</strong>
                  <p className="mt-1 text-xs text-slate-600">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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
            Generate AI Clinical Summary <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
