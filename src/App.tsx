import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { ProgressStepper } from './components/common/ProgressStepper';
import { HelpPanel } from './components/common/HelpPanel';
import { AccessibilityPanel } from './components/common/AccessibilityPanel';
import { ExitModal } from './components/common/ExitModal';

// Screens
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { IdentificationScreen } from './components/screens/IdentificationScreen';
import { LanguageScreen } from './components/screens/LanguageScreen';
import { ConsentScreen } from './components/screens/ConsentScreen';
import { PatientProfileScreen } from './components/screens/PatientProfileScreen';
import { ChiefComplaintScreen } from './components/screens/ChiefComplaintScreen';
import { ConversationalCaseTakingScreen } from './components/screens/ConversationalCaseTakingScreen';
import { TouchCaseTakingScreen } from './components/screens/TouchCaseTakingScreen';
import { AyushIntakeScreen } from './components/screens/AyushIntakeScreen';
import { RedFlagAlertModal } from './components/screens/RedFlagAlertModal';
import { ReviewAnswersScreen } from './components/screens/ReviewAnswersScreen';
import { DocumentUploadScreen } from './components/screens/DocumentUploadScreen';
import { OcrProcessingScreen } from './components/screens/OcrProcessingScreen';
import { ExtractedInfoScreen } from './components/screens/ExtractedInfoScreen';
import { MedicalTimelineScreen } from './components/screens/MedicalTimelineScreen';
import { AiClinicalSummaryScreen } from './components/screens/AiClinicalSummaryScreen';
import { PatientConfirmationScreen } from './components/screens/PatientConfirmationScreen';
import { PhysicianDashboardScreen } from './components/screens/PhysicianDashboardScreen';
import { PhysicianEditScreen } from './components/screens/PhysicianEditScreen';
import { FinalCaseRecordScreen } from './components/screens/FinalCaseRecordScreen';
import { CompletionScreen } from './components/screens/CompletionScreen';

const MainAppContent: React.FC = () => {
  const { currentStep } = useApp();

  const renderScreen = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'identification':
        return <IdentificationScreen />;
      case 'language':
        return <LanguageScreen />;
      case 'consent':
        return <ConsentScreen />;
      case 'profile':
        return <PatientProfileScreen />;
      case 'chief_complaint':
        return <ChiefComplaintScreen />;
      case 'conversational_intake':
        return <ConversationalCaseTakingScreen />;
      case 'touch_intake':
        return <TouchCaseTakingScreen />;
      case 'ayush_intake':
        return <AyushIntakeScreen />;
      case 'review_answers':
        return <ReviewAnswersScreen />;
      case 'document_upload':
        return <DocumentUploadScreen />;
      case 'ocr_processing':
        return <OcrProcessingScreen />;
      case 'extracted_info':
        return <ExtractedInfoScreen />;
      case 'medical_timeline':
        return <MedicalTimelineScreen />;
      case 'ai_summary':
        return <AiClinicalSummaryScreen />;
      case 'patient_confirmation':
        return <PatientConfirmationScreen />;
      case 'physician_dashboard':
        return <PhysicianDashboardScreen />;
      case 'physician_edit':
        return <PhysicianEditScreen />;
      case 'final_record':
        return <FinalCaseRecordScreen />;
      case 'completion':
        return <CompletionScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-blue-200 selection:text-blue-900">
      {/* Background Glass Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="fixed bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Global Application Header */}
      <Header />

      {/* Workflow Progress Stepper */}
      <ProgressStepper />

      {/* Active Screen Container */}
      <main className="flex-1 pb-16">
        {renderScreen()}
      </main>

      {/* Global Modals & Overlays */}
      <RedFlagAlertModal />
      <HelpPanel />
      <AccessibilityPanel />
      <ExitModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
