import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, User, Send, Mic, Volume2, CheckCircle2, Circle, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export const ConversationalCaseTakingScreen: React.FC = () => {
  const {
    chiefComplaint,
    answers,
    addOrUpdateAnswer,
    chatMessages,
    addChatMessage,
    setStep,
    goBack,
    speakText,
    setIsRedFlagTriggered
  } = useApp();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userInputText, setUserInputText] = useState('');
  const [isMicRecording, setIsMicRecording] = useState(false);

  // Dynamic clinical question set based on chief complaint
  const clinicalQuestions = [
    {
      id: 'q1',
      question: `When did your ${chiefComplaint.toLowerCase()} begin?`,
      category: 'HPI',
      options: ['This morning (Acute)', '1 to 3 days ago', '1 week ago', 'More than a month ago']
    },
    {
      id: 'q2',
      question: `Where is the ${chiefComplaint.toLowerCase()} located & does it spread anywhere?`,
      category: 'HPI',
      options: ['Center of chest to left arm', 'Upper stomach area', 'Diffused whole body', 'Localised to specific side']
    },
    {
      id: 'q3',
      question: `How severe is the discomfort on a scale of 1 (Mild) to 4 (Very Severe)?`,
      category: 'HPI',
      options: ['1 — Mild (Manageable)', '2 — Moderate (Bothersome)', '3 — Severe (Disruptive)', '4 — Very Severe (Crushing / Unbearable)']
    },
    {
      id: 'q4',
      question: `Are you experiencing breathlessness, cold sweating, or nausea?`,
      category: 'HPI',
      options: ['Yes, cold sweating & breathlessness', 'Nausea only', 'No associated symptoms']
    },
    {
      id: 'q5',
      question: `What regular daily medications are you currently taking?`,
      category: 'Medications',
      options: ['Tab. Amlodipine 5mg OD (Hypertension)', 'Metformin 500mg (Diabetes)', 'No regular medications']
    },
    {
      id: 'q6',
      question: `Do you have any known allergies to drugs or medicines?`,
      category: 'Allergies',
      options: ['No known drug allergies (NKDA)', 'Allergic to Penicillin / Amoxicillin', 'Allergic to Sulfa drugs']
    }
  ];

  const currentQ = clinicalQuestions[currentQuestionIdx] || clinicalQuestions[0];

  const handleSelectOption = (opt: string) => {
    // Add patient response bubble
    addChatMessage({
      id: `msg-${Date.now()}`,
      sender: 'patient',
      text: opt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Save answer item
    addOrUpdateAnswer({
      id: currentQ.id,
      question: currentQ.question,
      answer: opt,
      category: currentQ.category as any
    });

    // Check red flag trigger
    if (opt.includes('Very Severe') || opt.includes('cold sweating & breathlessness') || opt.includes('left arm')) {
      setIsRedFlagTriggered(true);
    }

    // Move to next question or transition to Review Answers
    if (currentQuestionIdx < clinicalQuestions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      const nextQ = clinicalQuestions[nextIdx];

      setTimeout(() => {
        addChatMessage({
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: nextQ.question,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: nextQ.options
        });
        speakText(nextQ.question);
      }, 500);
    } else {
      setTimeout(() => {
        setStep('touch_intake');
      }, 800);
    }
  };

  const handleCustomSend = () => {
    if (!userInputText.trim()) return;
    handleSelectOption(userInputText);
    setUserInputText('');
  };

  const handleMicSimulate = () => {
    setIsMicRecording(true);
    speakText("Listening to voice answer...");
    setTimeout(() => {
      setIsMicRecording(false);
      handleSelectOption("Pain started this morning around 7:00 AM with chest pressure.");
    }, 2000);
  };

  const sectionsList = [
    { id: 'HPI', label: 'History of Present Illness', count: answers.filter((a) => a.category === 'HPI').length },
    { id: 'Past History', label: 'Past Medical & Surgical', count: 1 },
    { id: 'Medications', label: 'Drug & Prescription History', count: answers.filter((a) => a.category === 'Medications').length },
    { id: 'Allergies', label: 'Allergy History', count: answers.filter((a) => a.category === 'Allergies').length },
    { id: 'Family History', label: 'Family & Personal History', count: 1 },
    { id: 'ROS', label: 'Review of Systems', count: 1 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Grid: Left Section Progress Bar, Right Conversation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Intake Section Tracker (4 Cols) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-white/80 shadow-lg space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              Intake Tracker
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">Clinical Intake Progress</h2>
            <p className="text-xs text-slate-500">Chief Complaint: <strong>{chiefComplaint}</strong></p>
          </div>

          <div className="space-y-3">
            {sectionsList.map((sec, idx) => {
              const isCompleted = sec.count > 0;
              return (
                <div
                  key={sec.id}
                  className={`p-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between transition ${
                    isCompleted
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : idx === 0
                      ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                      : 'bg-white/50 border-slate-200/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span>{sec.label}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200">
                    {isCompleted ? 'Done' : 'In Progress'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <Bot className="w-4 h-4 text-sky-600" /> AI Intake Assistant
            </div>
            <div>Questions adapt dynamically to narrow down symptom location, onset, and risk factors.</div>
          </div>
        </div>

        {/* RIGHT: Conversation Panel (8 Cols) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-white/80 shadow-lg flex flex-col justify-between min-h-[550px]">
          {/* Chat Messages Stream */}
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'patient'
                      ? 'bg-blue-700 text-white font-medium rounded-tr-none'
                      : 'bg-white/90 border border-slate-200 text-slate-900 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs opacity-75 mb-1 gap-2">
                    <span className="font-bold">{msg.sender === 'ai' ? 'AI Assistant' : 'You (Patient)'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div>{msg.text}</div>
                </div>

                {msg.sender === 'patient' && (
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current Question & Selectable Options */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Question {currentQuestionIdx + 1} of {clinicalQuestions.length}:
              </span>
              <button
                onClick={() => speakText(currentQ.question)}
                className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" /> Listen Question
              </button>
            </div>

            <div className="text-base font-bold text-slate-900 bg-sky-50/80 p-3.5 rounded-2xl border border-sky-200">
              {currentQ.question}
            </div>

            {/* Quick Answer Option Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="p-3.5 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-800 text-xs md:text-sm font-bold text-left transition shadow-xs flex items-center justify-between group"
                >
                  <span>{opt}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>

            {/* Voice & Custom Text Input Bar */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleMicSimulate}
                className={`p-3 rounded-xl border font-bold transition shrink-0 ${
                  isMicRecording
                    ? 'bg-red-600 text-white border-red-600 animate-pulse'
                    : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                }`}
                title="Speak Answer"
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={userInputText}
                onChange={(e) => setUserInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSend()}
                placeholder="Type your answer in your own words..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-white"
              />

              <button
                onClick={handleCustomSend}
                className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold transition shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={goBack}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep('touch_intake')}
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition shadow-md flex items-center gap-2"
            >
              Proceed to Clinical Questions <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
