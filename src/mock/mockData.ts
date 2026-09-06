import { Language, DemoCase, DocumentItem, TimelineEvent } from '../types';

export const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English', code: 'en-US' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी', code: 'hi-IN' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', code: 'ta-IN' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', code: 'te-IN' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', code: 'kn-IN' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', code: 'ml-IN' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', code: 'bn-IN' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', code: 'mr-IN' },
];

export const COMMON_COMPLAINTS = [
  { id: 'chest_pain', label: 'Chest Pain', icon: '🫀', isRedFlag: true, desc: 'Pressure, tightness, or pain in chest' },
  { id: 'fever', label: 'Fever', icon: '🌡️', isRedFlag: false, desc: 'High body temperature, chills' },
  { id: 'abdominal_pain', label: 'Abdominal Pain', icon: '🩺', isRedFlag: false, desc: 'Stomach pain, cramping, acid' },
  { id: 'breathlessness', label: 'Breathlessness', icon: '🫁', isRedFlag: true, desc: 'Shortness of breath, difficulty breathing' },
  { id: 'headache', label: 'Headache', icon: '🧠', isRedFlag: false, desc: 'Throbbing, pressure or migraine' },
  { id: 'cough', label: 'Cough', icon: '🗣️', isRedFlag: false, desc: 'Dry or wet cough, congestion' },
  { id: 'vomiting', label: 'Vomiting / Nausea', icon: '🤢', isRedFlag: false, desc: 'Inability to keep food down' },
  { id: 'diarrhea', label: 'Diarrhea', icon: '💧', isRedFlag: false, desc: 'Frequent loose stools' },
  { id: 'back_pain', label: 'Back Pain', icon: '🦴', isRedFlag: false, desc: 'Lower or upper spine discomfort' },
  { id: 'joint_pain', label: 'Joint Pain', icon: '🦾', isRedFlag: false, desc: 'Swelling, stiffness in knees or joints' },
  { id: 'other', label: 'Other Symptom', icon: '➕', isRedFlag: false, desc: 'Custom complaint description' },
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    filename: 'prescription_cardiology_2025.png',
    type: 'Prescription',
    date: '14/06/2025',
    fileSize: '1.4 MB',
    previewUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    confidence: 96,
    extractedData: {
      date: '14/06/2025',
      diagnosis: 'Essential Hypertension',
      medications: ['Tab. Amlodipine 5mg (1-0-0)', 'Tab. Telmisartan 40mg (0-0-1)'],
      investigation: 'Blood Pressure Monitoring',
      value: '150/95 mmHg',
      doctor: 'Dr. V. K. Sharma (MD Card)',
      facility: 'City Heart & Vascular Institute',
      notes: 'Advised low salt diet and regular daily walking.'
    }
  },
  {
    id: 'doc-2',
    filename: 'lipid_profile_report_2024.pdf',
    type: 'Laboratory Report',
    date: '10/11/2024',
    fileSize: '820 KB',
    previewUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
    confidence: 91,
    extractedData: {
      date: '10/11/2024',
      diagnosis: 'Hyperlipidemia',
      medications: ['Tab. Atorvastatin 10mg'],
      investigation: 'Lipid Profile',
      value: 'Serum Cholesterol: 240 mg/dL, LDL: 160 mg/dL',
      doctor: 'Dr. R. Nambiar',
      facility: 'Thyrocare Diagnostics',
      notes: 'Elevated total cholesterol and LDL levels.'
    }
  },
  {
    id: 'doc-3',
    filename: 'discharge_summary_2023.pdf',
    type: 'Discharge Summary',
    date: '05/03/2023',
    fileSize: '2.1 MB',
    previewUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    confidence: 88,
    extractedData: {
      date: '05/03/2023',
      diagnosis: 'Acute Gastritis',
      medications: ['Cap. Pantoprazole 40mg', 'Syr. Sucralfate 10ml'],
      investigation: 'USG Abdomen',
      value: 'Mild gastric mucosal edema',
      doctor: 'Dr. S. Mehta',
      facility: 'Apollo Hospitals OPD',
      notes: 'Patient admitted for 24h observation, discharged stable.'
    }
  }
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-1',
    year: '2023',
    date: 'March 05, 2023',
    type: 'Hospital Admission',
    title: 'Acute Gastritis Treatment',
    description: 'Admitted for acute epigastric pain and vomiting. Treated conservatively with PPIs.',
    facility: 'Apollo Hospitals OPD',
    documentId: 'doc-3'
  },
  {
    id: 'tl-2',
    year: '2024',
    date: 'November 10, 2024',
    type: 'Lab Test',
    title: 'Comprehensive Lipid Profile',
    description: 'Elevated Serum Cholesterol (240 mg/dL). Started on low dose statin.',
    facility: 'Thyrocare Diagnostics',
    documentId: 'doc-2'
  },
  {
    id: 'tl-3',
    year: '2025',
    date: 'June 14, 2025',
    type: 'Prescription',
    title: 'Hypertension Consultation',
    description: 'Blood pressure recorded at 150/95 mmHg. Prescribed Amlodipine 5mg.',
    facility: 'City Heart Institute',
    documentId: 'doc-1'
  },
  {
    id: 'tl-4',
    year: '2026',
    date: 'Today (September 2026)',
    type: 'Current Visit',
    title: 'OPD Clinical Intake Consultation',
    description: 'Intake history taking via Patient Case-Taking Software.',
    facility: 'AIIMS Academic OPD'
  }
];

export const DEMO_CASES: DemoCase[] = [
  {
    id: 'case-chest-pain',
    title: 'Case 1: Acute Chest Pain (Priority Red-Flag)',
    subtitle: 'Arun Kumar • 48M • High-Risk Cardiac Presentation',
    complaint: 'Chest Pain',
    hasRedFlag: true,
    patient: {
      patientId: 'PAT-2026-8801',
      abhaId: '91-4820-1192-3041',
      name: 'Arun Kumar',
      age: 48,
      gender: 'Male',
      mobile: '+91 98765 43210',
      preferredLanguage: 'English',
      emergencyContact: 'Sangeetha Kumar (Wife) - +91 98765 43211',
      existingConditions: ['Essential Hypertension (2 years)', 'High Cholesterol'],
      department: 'Cardiology'
    },
    answers: [
      { id: 'a1', question: 'When did the pain begin?', answer: 'This morning around 7:00 AM while climbing stairs.', category: 'HPI' },
      { id: 'a2', question: 'Where is the pain located & does it radiate?', answer: 'Center of chest, radiating to left shoulder and inner arm.', category: 'HPI' },
      { id: 'a3', question: 'What does the pain feel like & severity (1-4)?', answer: 'Heavy crushing sensation. Severity: 4 (Very Severe).', category: 'HPI' },
      { id: 'a4', question: 'Are you experiencing sweating or breathlessness?', answer: 'Yes, profuse cold sweating and mild shortness of breath.', category: 'HPI' },
      { id: 'a5', question: 'Current daily medications?', answer: 'Tab. Amlodipine 5mg once daily morning.', category: 'Medications' },
      { id: 'a6', question: 'Known drug allergies?', answer: 'No known drug allergies (NKDA).', category: 'Allergies' },
      { id: 'a7', question: 'Family medical history?', answer: 'Father had myocardial infarction at age 54.', category: 'Family History' },
    ],
    documents: MOCK_DOCUMENTS,
    timeline: MOCK_TIMELINE
  },
  {
    id: 'case-fever',
    title: 'Case 2: Acute Febrile Illness',
    subtitle: 'Priya Sharma • 32F • General Medicine Intake',
    complaint: 'Fever',
    hasRedFlag: false,
    patient: {
      patientId: 'PAT-2026-4102',
      abhaId: '54-1029-3382-9912',
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      mobile: '+91 91234 56789',
      preferredLanguage: 'Hindi',
      emergencyContact: 'Rajesh Sharma (Husband) - +91 91234 56780',
      existingConditions: ['Mild Asthma (Inhaler as needed)'],
      department: 'General Medicine'
    },
    answers: [
      { id: 'a1', question: 'How long have you had fever?', answer: '3 days, spiking in evening up to 102°F.', category: 'HPI' },
      { id: 'a2', question: 'Associated symptoms?', answer: 'Dry cough, body aches, severe headache, chills.', category: 'HPI' },
      { id: 'a3', question: 'Severity of illness (1-4)?', answer: 'Severity: 2 (Moderate).', category: 'HPI' },
      { id: 'a4', question: 'Current medications taken?', answer: 'Paracetamol 650mg twice daily with temporary relief.', category: 'Medications' },
      { id: 'a5', question: 'Allergies?', answer: 'Allergic to Penicillin (causes skin hives).', category: 'Allergies' },
    ],
    documents: [MOCK_DOCUMENTS[1]],
    timeline: [MOCK_TIMELINE[1], MOCK_TIMELINE[3]]
  },
  {
    id: 'case-abdominal',
    title: 'Case 3: Acute Epigastric Pain',
    subtitle: 'Rajesh Verma • 55M • Gastroenterology OPD',
    complaint: 'Abdominal Pain',
    hasRedFlag: false,
    patient: {
      patientId: 'PAT-2026-5592',
      abhaId: '22-9901-4412-8823',
      name: 'Rajesh Verma',
      age: 55,
      gender: 'Male',
      mobile: '+91 99887 76655',
      preferredLanguage: 'English',
      emergencyContact: 'Amit Verma (Son) - +91 99887 76654',
      existingConditions: ['Type 2 Diabetes Mellitus', 'Acid Reflux'],
      department: 'Surgery'
    },
    answers: [
      { id: 'a1', question: 'Where is the abdominal pain?', answer: 'Upper stomach (epigastric area) worsening after spicy meals.', category: 'HPI' },
      { id: 'a2', question: 'Character & severity?', answer: 'Burning sensation. Severity: 3 (Severe).', category: 'HPI' },
      { id: 'a3', question: 'Associated nausea or vomiting?', answer: 'Nausea present, no actual vomiting. Normal bowel movement.', category: 'HPI' },
      { id: 'a4', question: 'Current diabetes medications?', answer: 'Tab. Metformin 500mg BD after meals.', category: 'Medications' }
    ],
    documents: [MOCK_DOCUMENTS[2]],
    timeline: [MOCK_TIMELINE[0], MOCK_TIMELINE[3]]
  },
  {
    id: 'case-ayush',
    title: 'Case 4: AYUSH / Ayurvedic Holistic Intake',
    subtitle: 'Sunita Patel • 42F • Panchakarma & Kayachikitsa OPD',
    complaint: 'Joint Pain',
    hasRedFlag: false,
    patient: {
      patientId: 'PAT-2026-9041',
      abhaId: '88-3312-5501-4491',
      name: 'Sunita Patel',
      age: 42,
      gender: 'Female',
      mobile: '+91 97654 32109',
      preferredLanguage: 'Gujarati',
      emergencyContact: 'Mahesh Patel (Husband) - +91 97654 32108',
      existingConditions: ['Sandhivata (Osteoarthritis knees)', 'Mandagni'],
      department: 'AYUSH / Ayurveda'
    },
    answers: [
      { id: 'a1', question: 'Joint pain location & timing?', answer: 'Bilateral knee stiffness, severe in cold morning hours.', category: 'HPI' },
      { id: 'a2', question: 'Ahara (Diet) & Agni status?', answer: 'Vishamagni, irregular meal times, prefers warm cooked meals.', category: 'Personal History' },
      { id: 'a3', question: 'Nidra (Sleep) & Koshtha?', answer: 'Disturbed sleep due to joint stiffness, Krura Koshtha (constipation tendencies).', category: 'Personal History' }
    ],
    ayush: {
      prakriti: 'Vata-Pitta Pradhana',
      vikriti: 'Vata Vriddhi in Janu Sandhi',
      sara: 'Madhyama Sara',
      samhanana: 'Madhyama Samhanana',
      pramana: 'Madhyama Pramana',
      satmya: 'Eka-Rasa Satmya',
      sattva: 'Madhyama Sattva',
      aharaShakti: 'Mandagni / Vishamagni',
      vyayamaShakti: 'Avara (Mild physical exertion capacity)',
      vaya: 'Madhyama Vaya (42 Yrs)',
      aharaViharaNotes: 'Follows vegetarian diet, sedentary desk occupation, exposed to cold AC environments.'
    },
    documents: [],
    timeline: [MOCK_TIMELINE[3]]
  }
];
