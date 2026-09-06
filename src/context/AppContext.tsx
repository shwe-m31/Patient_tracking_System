import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppStep,
  Language,
  PatientProfileData,
  AnswerItem,
  ChatMessage,
  DocumentItem,
  TimelineEvent,
  AyushPariksha,
  ClinicalSummaryData,
  StageGroup
} from '../types';
import { LANGUAGES, DEMO_CASES, MOCK_DOCUMENTS, MOCK_TIMELINE } from '../mock/mockData';

interface AppContextType {
  // Navigation & Workflow
  currentStep: AppStep;
  setStep: (step: AppStep) => void;
  goNext: () => void;
  goBack: () => void;
  currentStageGroup: StageGroup;
  
  // Patient & Case Data
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  hasConsented: boolean;
  setHasConsented: (val: boolean) => void;
  patient: PatientProfileData;
  setPatient: React.Dispatch<React.SetStateAction<PatientProfileData>>;
  chiefComplaint: string;
  setChiefComplaint: (complaint: string) => void;
  answers: AnswerItem[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerItem[]>>;
  addOrUpdateAnswer: (item: AnswerItem) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  ayushData: AyushPariksha;
  setAyushData: React.Dispatch<React.SetStateAction<AyushPariksha>>;
  
  // Red Flag Alert
  isRedFlagTriggered: boolean;
  setIsRedFlagTriggered: (val: boolean) => void;
  triageAlertSent: boolean;
  triggerTriageAlert: () => void;
  
  // Documents & Timeline
  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  activeDocument: DocumentItem | null;
  setActiveDocument: (doc: DocumentItem | null) => void;
  timeline: TimelineEvent[];
  
  // AI Clinical Summary & Physician Review
  clinicalSummary: ClinicalSummaryData;
  setClinicalSummary: React.Dispatch<React.SetStateAction<ClinicalSummaryData>>;
  updateSummarySection: (key: keyof ClinicalSummaryData, value: string) => void;
  
  // Demo Mode
  loadDemoCase: (caseId: string) => void;

  // Modals & Panels
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  isAccessibilityOpen: boolean;
  setIsAccessibilityOpen: (open: boolean) => void;
  isExitModalOpen: boolean;
  setIsExitModalOpen: (open: boolean) => void;

  // Accessibility Settings
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: (hc: boolean) => void;
  voiceGuidance: boolean;
  setVoiceGuidance: (vg: boolean) => void;
  reduceAnimation: boolean;
  setReduceAnimation: (ra: boolean) => void;

  // Audio Speech Reader
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;

  // Session Timer
  secondsElapsed: number;
  resetSession: () => void;
}

const defaultPatient: PatientProfileData = {
  patientId: 'PAT-2026-8801',
  abhaId: '91-4820-1192-3041',
  name: 'Arun Kumar',
  age: 48,
  gender: 'Male',
  mobile: '+91 98765 43210',
  preferredLanguage: 'English',
  emergencyContact: 'Sangeetha Kumar (Wife) - +91 98765 43211',
  existingConditions: ['Essential Hypertension (2 years)', 'High Cholesterol'],
  department: 'General Medicine'
};

const defaultAyush: AyushPariksha = {
  prakriti: 'Vata-Pitta Pradhana',
  vikriti: 'Vata Vriddhi in Sandhi & Koshtha',
  sara: 'Madhyama Sara',
  samhanana: 'Madhyama Samhanana',
  pramana: 'Madhyama Pramana (5\'8" height, 72kg weight)',
  satmya: 'Eka-Rasa Satmya (Prefers warm, lightly spiced food)',
  sattva: 'Madhyama Sattva (Good psychological tolerance)',
  aharaShakti: 'Vishamagni (Irregular digestion & appetite)',
  vyayamaShakti: 'Madhyama (Moderate physical exertion capacity)',
  vaya: 'Madhyama Vaya (48 Yrs)',
  aharaViharaNotes: 'Frequent tea consumption, irregular lunch hours due to desk job.'
};

const defaultSummary: ClinicalSummaryData = {
  chiefComplaint: 'Chest pain since this morning.',
  hpi: 'Patient reports chest pain beginning this morning around 7:00 AM while climbing stairs. Pain is intermittent, crushing in nature, rated 4/4 severity, and associated with mild breathlessness and cold sweating.',
  pastMedicalHistory: 'Essential Hypertension diagnosed 2 years ago. Hyperlipidemia.',
  pastSurgicalHistory: 'No major surgeries reported.',
  drugHistory: 'Tab. Amlodipine 5mg OD, Tab. Atorvastatin 10mg HS.',
  allergyHistory: 'No known drug allergies (NKDA).',
  familyHistory: 'Father had myocardial infarction at age 54.',
  personalHistory: 'Non-smoker, occasional alcohol, sedentary lifestyle.',
  reviewOfSystems: 'Cardiovascular: Positive for chest pain, negative for palpitations. Respiratory: Mild dyspnea on exertion.',
  previousInvestigations: 'Blood Pressure: 150/95 mmHg (June 2025). Lipid Profile: Cholesterol 240 mg/dL (Nov 2024).',
  physicianNotes: '',
  isPhysicianApproved: false,
  rejectedSections: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [patient, setPatient] = useState<PatientProfileData>(defaultPatient);
  const [chiefComplaint, setChiefComplaint] = useState<string>('Chest Pain');
  const [answers, setAnswers] = useState<AnswerItem[]>(DEMO_CASES[0].answers);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am your AI Clinical Intake Assistant. What symptom or medical problem brings you to the hospital today?',
      timestamp: '09:00 AM'
    }
  ]);
  const [ayushData, setAyushData] = useState<AyushPariksha>(defaultAyush);
  const [isRedFlagTriggered, setIsRedFlagTriggered] = useState<boolean>(false);
  const [triageAlertSent, setTriageAlertSent] = useState<boolean>(false);
  
  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [activeDocument, setActiveDocument] = useState<DocumentItem | null>(MOCK_DOCUMENTS[0]);
  const [timeline] = useState<TimelineEvent[]>(MOCK_TIMELINE);
  
  const [clinicalSummary, setClinicalSummary] = useState<ClinicalSummaryData>(defaultSummary);
  
  // Modals & Accessibility
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [reduceAnimation, setReduceAnimation] = useState(false);

  // Audio Speech
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update Body classes for Accessibility
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    document.body.classList.remove('text-large', 'text-xlarge');
    if (fontSize === 'large') document.body.classList.add('text-large');
    if (fontSize === 'xlarge') document.body.classList.add('text-xlarge');
  }, [highContrast, fontSize]);

  const setStep = (step: AppStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStageGroup = (step: AppStep): StageGroup => {
    switch (step) {
      case 'welcome':
      case 'identification':
      case 'language':
        return 'identify';
      case 'consent':
      case 'profile':
        return 'consent';
      case 'chief_complaint':
      case 'conversational_intake':
      case 'touch_intake':
      case 'ayush_intake':
      case 'review_answers':
        return 'case_taking';
      case 'document_upload':
      case 'ocr_processing':
      case 'extracted_info':
      case 'medical_timeline':
        return 'documents';
      case 'ai_summary':
      case 'patient_confirmation':
        return 'summary';
      case 'physician_dashboard':
      case 'physician_edit':
      case 'final_record':
      case 'completion':
        return 'review';
      default:
        return 'identify';
    }
  };

  const stepOrder: AppStep[] = [
    'welcome',
    'identification',
    'language',
    'consent',
    'profile',
    'chief_complaint',
    'conversational_intake',
    'touch_intake',
    'review_answers',
    'document_upload',
    'ocr_processing',
    'extracted_info',
    'medical_timeline',
    'ai_summary',
    'patient_confirmation',
    'physician_dashboard',
    'physician_edit',
    'final_record',
    'completion'
  ];

  const goNext = () => {
    const idx = stepOrder.indexOf(currentStep);
    if (idx >= 0 && idx < stepOrder.length - 1) {
      setStep(stepOrder[idx + 1]);
    }
  };

  const goBack = () => {
    const idx = stepOrder.indexOf(currentStep);
    if (idx > 0) {
      setStep(stepOrder[idx - 1]);
    }
  };

  const addOrUpdateAnswer = (item: AnswerItem) => {
    setAnswers((prev) => {
      const existingIdx = prev.findIndex((a) => a.id === item.id || a.question === item.question);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = item;
        return updated;
      }
      return [...prev, item];
    });
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  const addDocument = (doc: DocumentItem) => {
    setDocuments((prev) => [doc, ...prev]);
    setActiveDocument(doc);
  };

  const triggerTriageAlert = () => {
    setTriageAlertSent(true);
  };

  const updateSummarySection = (key: keyof ClinicalSummaryData, value: string) => {
    setClinicalSummary((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const loadDemoCase = (caseId: string) => {
    const demo = DEMO_CASES.find((c) => c.id === caseId);
    if (demo) {
      setPatient(demo.patient);
      setChiefComplaint(demo.complaint);
      setAnswers(demo.answers);
      setIsRedFlagTriggered(demo.hasRedFlag);
      setDocuments(demo.documents);
      setActiveDocument(demo.documents[0] || null);
      if (demo.ayush) {
        setAyushData(demo.ayush);
      }
      // Update clinical summary draft according to demo case
      setClinicalSummary({
        chiefComplaint: `${demo.complaint} reported today.`,
        hpi: demo.answers.map((a) => `${a.question}: ${a.answer}`).join(' '),
        pastMedicalHistory: demo.patient.existingConditions.join(', '),
        pastSurgicalHistory: 'No significant prior surgeries recorded.',
        drugHistory: 'Amlodipine 5mg OD, Atorvastatin 10mg HS',
        allergyHistory: demo.answers.find((a) => a.category === 'Allergies')?.answer || 'No known drug allergies.',
        familyHistory: demo.answers.find((a) => a.category === 'Family History')?.answer || 'Father with hypertension history.',
        personalHistory: 'Non-smoker, moderate diet.',
        reviewOfSystems: 'Relevant symptoms logged in case-taking.',
        previousInvestigations: 'Blood pressure and lab reports attached in records.',
        physicianNotes: '',
        isPhysicianApproved: false,
        rejectedSections: []
      });
      setStep('identification');
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Audio synthesis simulated: "${text}"`);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const resetSession = () => {
    setSecondsElapsed(0);
    setHasConsented(false);
    setIsRedFlagTriggered(false);
    setTriageAlertSent(false);
    setStep('welcome');
  };

  return (
    <AppContext.Provider
      value={{
        currentStep,
        setStep,
        goNext,
        goBack,
        currentStageGroup: getStageGroup(currentStep),
        selectedLanguage,
        setSelectedLanguage,
        hasConsented,
        setHasConsented,
        patient,
        setPatient,
        chiefComplaint,
        setChiefComplaint,
        answers,
        setAnswers,
        addOrUpdateAnswer,
        chatMessages,
        addChatMessage,
        ayushData,
        setAyushData,
        isRedFlagTriggered,
        setIsRedFlagTriggered,
        triageAlertSent,
        triggerTriageAlert,
        documents,
        addDocument,
        activeDocument,
        setActiveDocument,
        timeline,
        clinicalSummary,
        setClinicalSummary,
        updateSummarySection,
        loadDemoCase,
        isHelpOpen,
        setIsHelpOpen,
        isAccessibilityOpen,
        setIsAccessibilityOpen,
        isExitModalOpen,
        setIsExitModalOpen,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        voiceGuidance,
        setVoiceGuidance,
        reduceAnimation,
        setReduceAnimation,
        speakText,
        stopSpeaking,
        isSpeaking,
        secondsElapsed,
        resetSession
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
