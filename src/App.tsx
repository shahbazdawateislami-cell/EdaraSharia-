import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { usePWAInstall } from './hooks/usePWAInstall';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

import { DashboardView } from './components/views/DashboardView';
import { ClassesView } from './components/views/ClassesView';
import { StudentsView } from './components/views/StudentsView';
import { TeachersView } from './components/views/TeachersView';
import { AttendanceView } from './components/views/AttendanceView';
import { HomeworkView } from './components/views/HomeworkView';
import { OnlineClassesView } from './components/views/OnlineClassesView';
import { TimetableView } from './components/views/TimetableView';
import { ExamsView } from './components/views/ExamsView';
import { CurriculumView } from './components/views/CurriculumView';
import { StudyMaterialView } from './components/views/StudyMaterialView';
import { QuestionPapersView } from './components/views/QuestionPapersView';
import { QuestionBankView } from './components/views/QuestionBankView';
import { PaperGeneratorView } from './components/views/PaperGeneratorView';

import { InventoryFeesAccountsView } from './components/views/InventoryFeesAccountsView';
import { IDCardsReportCardsView } from './components/views/IDCardsReportCardsView';
import { CommunicationView } from './components/views/CommunicationView';
import { TeacherStaffToolsView } from './components/views/TeacherStaffToolsView';
import { SystemSettingsView } from './components/views/SystemSettingsView';

import { X } from 'lucide-react';

const PWABanner: React.FC = () => {
  const { settings } = useApp();
  const [showBanner, setShowBanner] = useState(true);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (!showBanner || isInstalled) return null;

  const handleInstall = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowIOSGuide(true); // Treat all unsupported browsers like iOS to show instruction guide
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#14102c]/95 backdrop-blur-md border-t border-purple-900/40 px-4 py-2 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-3">
        {settings.logoUrl ? (
          <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover ring-1 ring-purple-500/40" />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white text-xs">
            ES
          </div>
        )}
        <div>
          <div className="font-bold text-xs text-white">{settings.name}</div>
          <div className="text-[10px] text-purple-300">📲 Install app for quick offline access</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleInstall}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          Install
        </button>
        <button
          onClick={() => setShowBanner(false)}
          className="p-1 text-slate-400 hover:text-white rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-[#1a1630] p-6 shadow-xl border border-purple-800">
            <h3 className="text-lg font-semibold text-white">Install on iPhone / iPad</h3>
            <p className="mt-2 text-sm text-gray-300">
              1. Tap the <strong>Share</strong> button in Safari toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-lg bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'classes':
        return <ClassesView />;
      case 'students':
        return <StudentsView />;
      case 'teachers':
        return <TeachersView />;
      case 'attendance':
        return <AttendanceView />;
      case 'homework':
        return <HomeworkView />;
      case 'online-classes':
        return <OnlineClassesView />;
      case 'timetable':
        return <TimetableView />;
      case 'exams':
        return <ExamsView />;
      case 'curriculum':
        return <CurriculumView />;
      case 'study-material':
        return <StudyMaterialView />;
      case 'question-papers':
        return <QuestionPapersView />;
      case 'question-bank':
        return <QuestionBankView />;
      case 'paper-generator':
        return <PaperGeneratorView />;

      case 'inventory':
      case 'fees':
      case 'accounts':
      case 'salary-receipts':
        return <InventoryFeesAccountsView subTab={activeTab as any} />;

      case 'id-cards':
      case 'report-cards':
      case 'exam-insights':
      case 'certificates':
        return <IDCardsReportCardsView subTab={activeTab as any} />;

      case 'messages':
      case 'calendar':
      case 'notices':
      case 'whatsapp-sms':
      case 'leave-requests':
      case 'leaderboard':
      case 'school-gallery':
      case 'birthdays':
      case 'website':
        return <CommunicationView subTab={activeTab} />;

      case 'teacher-attendance':
      case 'teacher-tasks':
        return <TeacherStaffToolsView subTab={activeTab as any} />;

      case 'vehicle-gps':
      case 'reminders':
      case 'growth-plan':
      case 'session-promotion':
      case 'password-resets':
      case 'recycle-bin':
      case 'settings':
        return <SystemSettingsView subTab={activeTab} />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-[1600px] mx-auto w-full pb-20">
      {renderActiveView()}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0b0819] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <PWABanner />
      </div>
    </AppProvider>
  );
}
