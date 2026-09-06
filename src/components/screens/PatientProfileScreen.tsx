import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Calendar, HeartPulse, Building2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const PatientProfileScreen: React.FC = () => {
  const { patient, setPatient, setStep, goBack } = useApp();

  const handleDepartmentChange = (dept: 'General Medicine' | 'Surgery' | 'Pediatrics' | 'Cardiology' | 'AYUSH / Ayurveda') => {
    setPatient((prev) => ({ ...prev, department: dept }));
  };

  const handleContinue = () => {
    if (patient.department === 'AYUSH / Ayurveda') {
      setStep('chief_complaint');
    } else {
      setStep('chief_complaint');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            <User className="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">
              Patient Demographic & Clinical Profile
            </h1>
            <p className="text-sm text-slate-600">
              Verify your patient details before proceeding to clinical case-taking.
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Patient Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={patient.name}
                onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Age (Years)
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="number"
                  value={patient.age}
                  onChange={(e) => setPatient({ ...patient, age: parseInt(e.target.value) || 0 })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Gender
              </label>
              <select
                value={patient.gender}
                onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={patient.mobile}
                onChange={(e) => setPatient({ ...patient, mobile: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Emergency Contact Person
            </label>
            <input
              type="text"
              value={patient.emergencyContact}
              onChange={(e) => setPatient({ ...patient, emergencyContact: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Pre-existing Medical Conditions
            </label>
            <div className="relative">
              <HeartPulse className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={patient.existingConditions.join(', ')}
                onChange={(e) =>
                  setPatient({ ...patient, existingConditions: e.target.value.split(',').map((s) => s.trim()) })
                }
                placeholder="e.g. Hypertension, Diabetes, Asthma"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium bg-white"
              />
            </div>
          </div>

          {/* Department Selection */}
          <div className="md:col-span-2 pt-2">
            <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" /> Select OPD Consultation Department
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'General Medicine', label: 'Gen. Medicine' },
                { id: 'Cardiology', label: 'Cardiology' },
                { id: 'Surgery', label: 'Surgery' },
                { id: 'Pediatrics', label: 'Pediatrics' },
                { id: 'AYUSH / Ayurveda', label: 'AYUSH / Ayurveda' },
              ].map((dept) => {
                const isSelected = patient.department === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => handleDepartmentChange(dept.id as any)}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition text-center ${
                      isSelected
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {dept.label}
                  </button>
                );
              })}
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
            Start Case-Taking <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
