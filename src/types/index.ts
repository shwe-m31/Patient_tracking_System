export type AppStep =
  | 'welcome'
  | 'identification'
  | 'language'
  | 'consent'
  | 'profile'
  | 'chief_complaint'
  | 'conversational_intake'
  | 'touch_intake'
  | 'ayush_intake'
  | 'review_answers'
  | 'document_upload'
  | 'ocr_processing'
  | 'extracted_info'
  | 'medical_timeline'
  | 'ai_summary'
  | 'patient_confirmation'
  | 'physician_dashboard'
  | 'physician_edit'
  | 'final_record'
  | 'completion';

export type StageGroup = 'identify' | 'consent' | 'case_taking' | 'documents' | 'summary' | 'review';

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string;
}

export interface PatientProfileData {
  patientId: string;
  abhaId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  preferredLanguage: string;
  emergencyContact: string;
  existingConditions: string[];
  department: 'General Medicine' | 'Surgery' | 'Pediatrics' | 'Cardiology' | 'AYUSH / Ayurveda';
}

export interface AnswerItem {
  id: string;
  question: string;
  answer: string;
  category: 'HPI' | 'Past History' | 'Medications' | 'Allergies' | 'Family History' | 'Personal History' | 'ROS';
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'patient';
  text: string;
  timestamp: string;
  options?: string[];
  category?: string;
  isVoiceInput?: boolean;
}

export interface DocumentItem {
  id: string;
  filename: string;
  type: 'Prescription' | 'Laboratory Report' | 'Discharge Summary' | 'Imaging Report' | 'Surgery Record' | 'Other';
  date: string;
  fileSize: string;
  previewUrl: string;
  confidence: number;
  extractedData: {
    date: string;
    diagnosis: string;
    medications: string[];
    investigation: string;
    value: string;
    doctor: string;
    facility: string;
    notes: string;
  };
}

export interface TimelineEvent {
  id: string;
  year: string;
  date: string;
  type: 'Lab Test' | 'Hospital Admission' | 'Prescription' | 'Current Visit';
  title: string;
  description: string;
  facility: string;
  documentId?: string;
}

export interface AyushPariksha {
  prakriti: string;
  vikriti: string;
  sara: string;
  samhanana: string;
  pramana: string;
  satmya: string;
  sattva: string;
  aharaShakti: string;
  vyayamaShakti: string;
  vaya: string;
  aharaViharaNotes: string;
}

export interface ClinicalSummaryData {
  chiefComplaint: string;
  hpi: string;
  pastMedicalHistory: string;
  pastSurgicalHistory: string;
  drugHistory: string;
  allergyHistory: string;
  familyHistory: string;
  personalHistory: string;
  reviewOfSystems: string;
  previousInvestigations: string;
  physicianNotes: string;
  isPhysicianApproved: boolean;
  rejectedSections: string[];
}

export interface DemoCase {
  id: string;
  title: string;
  subtitle: string;
  complaint: string;
  patient: PatientProfileData;
  answers: AnswerItem[];
  hasRedFlag: boolean;
  documents: DocumentItem[];
  timeline: TimelineEvent[];
  ayush?: AyushPariksha;
}
