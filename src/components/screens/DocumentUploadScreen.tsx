import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_DOCUMENTS } from '../../mock/mockData';
import { FileText, Upload, Camera, QrCode, ArrowRight, ArrowLeft, Trash2, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DocumentItem } from '../../types';

export const DocumentUploadScreen: React.FC = () => {
  const { documents, addDocument, setActiveDocument, setStep, goBack } = useApp();

  const [dragOver, setDragOver] = useState(false);

  const handleSelectSampleDoc = (doc: DocumentItem) => {
    setActiveDocument(doc);
    setStep('ocr_processing');
  };

  const handleSimulateFileUpload = () => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      filename: 'opd_prescription_recent.png',
      type: 'Prescription',
      date: '20/08/2025',
      fileSize: '1.2 MB',
      previewUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      confidence: 94,
      extractedData: {
        date: '20/08/2025',
        diagnosis: 'Essential Hypertension',
        medications: ['Tab. Amlodipine 5mg OD', 'Tab. Telmisartan 40mg OD'],
        investigation: 'Blood Pressure',
        value: '148/92 mmHg',
        doctor: 'Dr. V. K. Sharma',
        facility: 'City Heart Institute',
        notes: 'Advised regular daily walking and low sodium diet.'
      }
    };
    addDocument(newDoc);
    setStep('ocr_processing');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              <FileText className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
                Add Previous Medical Documents
              </h1>
              <p className="text-sm text-slate-600">
                Upload prescriptions, laboratory reports, or discharge summaries for automated AI parsing.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded-full">
            AI OCR Scanner
          </span>
        </div>

        {/* Upload Action Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <button
            onClick={handleSimulateFileUpload}
            className="p-5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-dashed border-sky-300 hover:border-blue-500 text-center transition flex flex-col items-center justify-center gap-2 group shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 group-hover:bg-blue-600 text-sky-700 group-hover:text-white transition flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-900 text-base">Upload File</div>
            <div className="text-xs text-slate-500">Select PDF, PNG, or JPG document</div>
          </button>

          <button
            onClick={handleSimulateFileUpload}
            className="p-5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-dashed border-sky-300 hover:border-blue-500 text-center transition flex flex-col items-center justify-center gap-2 group shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 group-hover:bg-blue-600 text-sky-700 group-hover:text-white transition flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-900 text-base">Take Photo</div>
            <div className="text-xs text-slate-500">Snap document via kiosk camera</div>
          </button>

          <button
            onClick={handleSimulateFileUpload}
            className="p-5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-dashed border-sky-300 hover:border-blue-500 text-center transition flex flex-col items-center justify-center gap-2 group shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 group-hover:bg-blue-600 text-sky-700 group-hover:text-white transition flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-900 text-base">Scan Document</div>
            <div className="text-xs text-slate-500">Flatbed scanner hardware intake</div>
          </button>
        </div>

        {/* Sample Documents for SIH Presentation */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Select Sample Medical Document for Demo:
            </span>
            <span className="text-xs text-slate-400">Click any document to test OCR parser</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCK_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectSampleDoc(doc)}
                className="p-4 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 hover:border-blue-400 text-left transition shadow-xs cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-2">
                    <span className="bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{doc.type}</span>
                    <span className="text-slate-500">{doc.date}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition line-clamp-1">
                    {doc.filename}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Diagnosis: {doc.extractedData.diagnosis}</div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Run AI OCR Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
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
            onClick={() => setStep('ai_summary')}
            className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition shadow-md flex items-center gap-2"
          >
            Skip Documents to Summary <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
