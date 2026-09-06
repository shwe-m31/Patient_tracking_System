import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, UserCheck, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, IdCard, Sparkles } from 'lucide-react';

export const IdentificationScreen: React.FC = () => {
  const { patient, setPatient, setStep, goBack } = useApp();
  const [activeTab, setActiveTab] = useState<'abha' | 'qr' | 'patient_id' | 'new_patient'>('abha');
  const [abhaInput, setAbhaInput] = useState(patient.abhaId);
  const [patientIdInput, setPatientIdInput] = useState(patient.patientId);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const handleContinue = () => {
    if (activeTab === 'abha') {
      setPatient((prev) => ({ ...prev, abhaId: abhaInput || '91-4820-1192-3041' }));
    } else if (activeTab === 'patient_id') {
      setPatient((prev) => ({ ...prev, patientId: patientIdInput || 'PAT-2026-8801' }));
    }
    setStep('language');
  };

  const handleSimulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAbhaInput('91-4820-1192-3041');
      setIsVerified(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              <IdCard className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
                Patient Identification
              </h1>
              <p className="text-sm text-slate-600">
                Identify yourself using ABHA ID, Hospital Patient ID, or Register as a New Patient.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
            ABDM Kiosk Verification
          </span>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200">
          <button
            onClick={() => setActiveTab('abha')}
            className={`py-2.5 px-3 rounded-xl font-bold text-sm transition ${
              activeTab === 'abha'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ABHA Number
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2.5 px-3 rounded-xl font-bold text-sm transition ${
              activeTab === 'qr'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scan ABHA QR
          </button>
          <button
            onClick={() => setActiveTab('patient_id')}
            className={`py-2.5 px-3 rounded-xl font-bold text-sm transition ${
              activeTab === 'patient_id'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hospital ID
          </button>
          <button
            onClick={() => setActiveTab('new_patient')}
            className={`py-2.5 px-3 rounded-xl font-bold text-sm transition ${
              activeTab === 'new_patient'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Patient
          </button>
        </div>

        {/* Form Body */}
        <div className="mt-8 space-y-6">
          {activeTab === 'abha' && (
            <div className="space-y-4 max-w-md mx-auto">
              <label className="block text-sm font-bold text-slate-800">
                Enter your 14-digit ABHA Number:
              </label>
              <input
                type="text"
                value={abhaInput}
                onChange={(e) => setAbhaInput(e.target.value)}
                placeholder="XX-XXXX-XXXX-XXXX"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg font-mono text-center font-bold tracking-wider text-slate-900 bg-white"
              />
              {isVerified && (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Mock Verified: Arun Kumar (48M) • ABDM Patient Record Found
                </div>
              )}
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="text-center space-y-4 max-w-sm mx-auto p-6 rounded-2xl bg-white/70 border border-slate-200">
              <div className="w-32 h-32 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center text-white p-4 shadow-md relative overflow-hidden">
                <QrCode className="w-24 h-24 text-sky-400" />
                {isScanning && (
                  <div className="absolute inset-0 bg-blue-600/30 backdrop-blur-xs flex items-center justify-center animate-pulse">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Scanning...</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-600">
                Hold your ABHA Card or Ayushman Bharat App QR code in front of the kiosk camera.
              </p>
              <button
                onClick={handleSimulateQRScan}
                disabled={isScanning}
                className="w-full py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-sm transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                {isScanning ? 'Simulating Scan...' : 'Simulate Camera QR Scan'}
              </button>
            </div>
          )}

          {activeTab === 'patient_id' && (
            <div className="space-y-4 max-w-md mx-auto">
              <label className="block text-sm font-bold text-slate-800">
                Enter Hospital Patient / OPD Number:
              </label>
              <input
                type="text"
                value={patientIdInput}
                onChange={(e) => setPatientIdInput(e.target.value)}
                placeholder="PAT-2026-8801"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg font-mono text-center font-bold tracking-wider text-slate-900 bg-white"
              />
              <div className="text-xs text-slate-500 text-center">
                Found on your physical hospital Registration Slip or Card.
              </div>
            </div>
          )}

          {activeTab === 'new_patient' && (
            <div className="space-y-4 max-w-md mx-auto text-center p-6 rounded-2xl bg-sky-50/70 border border-sky-200">
              <UserCheck className="w-10 h-10 text-blue-700 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">First Time at this Hospital?</h3>
              <p className="text-xs text-slate-600">
                You can complete intake as a New Patient. Basic profile details will be recorded in the next step.
              </p>
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <div className="mt-8 p-3 rounded-xl bg-slate-100/90 text-xs text-slate-600 flex items-center justify-center gap-2 border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Your information is used only for this clinical intake session.</span>
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
            Continue <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
