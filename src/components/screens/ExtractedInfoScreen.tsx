import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, CheckCircle2, AlertCircle, Edit3, ArrowRight, ArrowLeft, Calendar, UserCheck, Eye } from 'lucide-react';

export const ExtractedInfoScreen: React.FC = () => {
  const { activeDocument, setStep, goBack } = useApp();

  const docData = activeDocument?.extractedData || {
    date: '14/06/2025',
    diagnosis: 'Essential Hypertension',
    medications: ['Tab. Amlodipine 5mg (1-0-0)', 'Tab. Telmisartan 40mg (0-0-1)'],
    investigation: 'Blood Pressure Monitoring',
    value: '150/95 mmHg',
    doctor: 'Dr. V. K. Sharma (MD Card)',
    facility: 'City Heart & Vascular Institute',
    notes: 'Advised low salt diet and regular daily walking.'
  };

  const [extractedForm, setExtractedForm] = useState(docData);

  const handleContinue = () => {
    setStep('medical_timeline');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High Confidence OCR Extraction ({activeDocument?.confidence || 96}%)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
              Extracted Medical Information
            </h1>
            <p className="text-sm text-slate-600">
              Review and edit OCR parsed clinical entities from: <strong>{activeDocument?.filename || 'Prescription Card'}</strong>
            </p>
          </div>

          <button
            onClick={() => setStep('medical_timeline')}
            className="px-4 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs transition flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-sky-600" /> View Medical Timeline
          </button>
        </div>

        {/* Split Screen Grid: LEFT Document Preview, RIGHT Parsed Data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Document Image Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Eye className="w-4 h-4 text-sky-600" /> Original Scanned Document Preview
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 shadow-inner group relative">
              <img
                src={activeDocument?.previewUrl || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'}
                alt="Medical Record"
                className="w-full h-[400px] object-cover opacity-90 group-hover:opacity-100 transition"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-between border border-white/20">
                <span>{activeDocument?.type || 'Prescription'}</span>
                <span>Date: {extractedForm.date}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Extracted Clinical Information Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center justify-between">
              <span>Parsed Structured Entities:</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                Editable Fields
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Consultation Date</label>
                <input
                  type="text"
                  value={extractedForm.date}
                  onChange={(e) => setExtractedForm({ ...extractedForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Diagnosed Condition</label>
                <input
                  type="text"
                  value={extractedForm.diagnosis}
                  onChange={(e) => setExtractedForm({ ...extractedForm, diagnosis: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Prescribed Medications</label>
                <input
                  type="text"
                  value={extractedForm.medications.join(', ')}
                  onChange={(e) => setExtractedForm({ ...extractedForm, medications: e.target.value.split(',') })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Key Investigation</label>
                <input
                  type="text"
                  value={extractedForm.investigation}
                  onChange={(e) => setExtractedForm({ ...extractedForm, investigation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Clinical Value / Reading</label>
                <input
                  type="text"
                  value={extractedForm.value}
                  onChange={(e) => setExtractedForm({ ...extractedForm, value: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Prescribing Physician</label>
                <input
                  type="text"
                  value={extractedForm.doctor}
                  onChange={(e) => setExtractedForm({ ...extractedForm, doctor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Facility / Hospital Name</label>
                <input
                  type="text"
                  value={extractedForm.facility}
                  onChange={(e) => setExtractedForm({ ...extractedForm, facility: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white"
                />
              </div>
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
            onClick={handleContinue}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            View Medical Timeline <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
