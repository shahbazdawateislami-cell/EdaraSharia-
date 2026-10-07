import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building,
  Users,
  UserCheck,
  ClipboardCheck,
  BookOpen,
  FileText,
  Video,
  AlarmClock,
  Edit3,
  Scroll,
  Folder,
  FileCode,
  CheckSquare,
  FolderArchive,
  Sparkles,
  Box,
  CreditCard,
  Briefcase,
  Badge,
  FileSpreadsheet,
  Brain,
  Award,
  Bus,
  MessageSquare,
  Calendar,
  Megaphone,
  MessageCircle,
  Trophy,
  Image as ImageIcon,
  Cake,
  Globe,
  Bell,
  TrendingUp,
  GraduationCap,
  Key,
  Trash2,
  Settings,
  Search,
  Menu,
  X
} from 'lucide-react';

interface NavGroup {
  title?: string;
  items: {
    id: string;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
    roles?: ('admin' | 'teacher' | 'student')[];
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, role, settings, teachers, currentUserId, notices, leaveRequests } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const currentTeacher = role === 'teacher' ? teachers.find(t => t.id === currentUserId) : null;
  const teacherAccess = currentTeacher?.access;

  const pendingLeavesCount = leaveRequests.filter(l => l.status === 'Pending').length;
  const urgentNoticesCount = notices.filter(n => n.type === 'Urgent').length;

  const navGroups: NavGroup[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'classes', label: 'Darjaat (Classes)', icon: Building, roles: ['admin', 'teacher', 'student'] },
        { id: 'students', label: 'Tulaba (Students)', icon: Users, roles: ['admin', 'teacher', 'student'] },
        { id: 'teachers', label: 'Asatiza (Teachers)', icon: UserCheck, roles: ['admin', 'teacher'] },
        { id: 'attendance', label: 'Hazri (Attendance)', icon: ClipboardCheck },
        { id: 'homework', label: 'Khangi Kaam (Homework)', icon: BookOpen },
        { id: 'online-classes', label: 'Online Darjaat', icon: Video },
        { id: 'timetable', label: 'Oqaat (Timetable)', icon: AlarmClock },
        { id: 'exams', label: 'Imtehanat & Namberat', icon: Edit3 },
        { id: 'curriculum', label: 'Nisab (Curriculum)', icon: Scroll },
        { id: 'study-material', label: 'Kutub & Notes', icon: Folder },
        { id: 'question-papers', label: 'Imtehani Parchaye', icon: FileCode },
        { id: 'teacher-attendance', label: 'Hazri Asatiza', icon: UserCheck, roles: ['admin'] },
        { id: 'teacher-tasks', label: 'Faraiz Asatiza', icon: CheckSquare, roles: ['admin', 'teacher'] },
        { id: 'question-bank', label: 'Majmua-e-Aswala', icon: FolderArchive, roles: ['admin', 'teacher'] },
        { id: 'paper-generator', label: 'Paper Generator ⚡', icon: Sparkles, roles: ['admin'] }
      ]
    },
    {
      title: 'ADMINISTRATION (INTIZAMIYA)',
      items: [
        { id: 'inventory', label: 'Asha (Inventory)', icon: Box, roles: ['admin'] },
        { id: 'fees', label: 'Taleemi Hadiya & Fees', icon: CreditCard },
        { id: 'accounts', label: 'Hisab-Kitab (Accounts)', icon: Briefcase, roles: ['admin'] },
        { id: 'salary-receipts', label: 'Wazeefa (Salary Slips)', icon: FileText, roles: ['admin', 'teacher'] },
        { id: 'id-cards', label: 'Shanaakhti Cards', icon: Badge },
        { id: 'report-cards', label: 'Koshfiya (Report Cards)', icon: FileSpreadsheet, roles: ['admin'] },
        { id: 'exam-insights', label: 'Nayeja Analytics', icon: Brain, roles: ['admin', 'teacher'] },
        { id: 'certificates', label: 'Sanad (Certificates)', icon: Award, roles: ['admin'] }
      ]
    },
    {
      title: 'MONITORING',
      items: [
        { id: 'vehicle-gps', label: 'Vehicle GPS', icon: Bus }
      ]
    },
    {
      title: 'COMMUNICATION (MAWASLAT)',
      items: [
        { id: 'messages', label: 'Paigamat (Messages)', icon: MessageSquare },
        { id: 'calendar', label: 'Taqween (Calendar)', icon: Calendar },
        { id: 'notices', label: 'Ilaan-Nama (Notices)', icon: Megaphone, badge: urgentNoticesCount > 0 ? `${urgentNoticesCount}` : undefined },
        { id: 'whatsapp-sms', label: 'WhatsApp & SMS', icon: MessageCircle, roles: ['admin'] },
        { id: 'leave-requests', label: 'Rukhsaat (Leaves)', icon: FileSpreadsheet, badge: pendingLeavesCount > 0 ? `${pendingLeavesCount}` : undefined },
        { id: 'leaderboard', label: 'Mumtaz Tulaba', icon: Trophy },
        { id: 'school-gallery', label: 'Tasaveer (Gallery)', icon: ImageIcon },
        { id: 'birthdays', label: 'Yaum-e-Pedaish', icon: Cake },
        { id: 'website', label: 'Public Portal', icon: Globe }
      ]
    },
    {
      title: 'SYSTEM (NIZAM)',
      items: [
        { id: 'reminders', label: 'Tanbeeh (Reminders)', icon: Bell, roles: ['admin'] },
        { id: 'growth-plan', label: 'Tarakki Mansooba', icon: TrendingUp, roles: ['admin'] },
        { id: 'session-promotion', label: 'Tarkee Darjaat', icon: GraduationCap, roles: ['admin'] },
        { id: 'password-resets', label: 'Tajdeed Password', icon: Key, roles: ['admin'] },
        { id: 'recycle-bin', label: 'Recycle Bin', icon: Trash2, roles: ['admin'] },
        { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] }
      ]
    }
  ];

  const isItemVisible = (item: { id: string; roles?: string[] }) => {
    if (item.roles && !item.roles.includes(role)) return false;

    if (role === 'teacher' && teacherAccess) {
      if (item.id === 'attendance' && !teacherAccess.attendance) return false;
      if (item.id === 'homework' && !teacherAccess.homework) return false;
      if (item.id === 'timetable' && !teacherAccess.timetable) return false;
      if (item.id === 'exams' && !teacherAccess.exams) return false;
      if (item.id === 'study-material' && !teacherAccess.studyMaterial) return false;
      if (item.id === 'question-papers' && !teacherAccess.questionPapers) return false;
      if (item.id === 'notices' && !teacherAccess.notices) return false;
      if (item.id === 'leave-requests' && !teacherAccess.leaves) return false;
      if (item.id === 'leaderboard' && !teacherAccess.leaderboard) return false;
    }

    if (filterText.trim()) {
      return item.id.toLowerCase().includes(filterText.toLowerCase()) ||
        (item as any).label?.toLowerCase().includes(filterText.toLowerCase());
    }
    return true;
  };

  const renderContent = () => (
    <div className="flex flex-col h-full bg-[#120f26] border-r border-purple-900/30 text-slate-300 w-64 select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-purple-900/30 flex items-center gap-3">
        {settings.logoUrl ? (
          <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover ring-1 ring-purple-500/40" />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white text-xs">
            ES
          </div>
        )}
        <div className="overflow-hidden">
          <div className="font-bold text-xs text-white truncate">{settings.name}</div>
          <div className="text-[10px] text-purple-400 font-mono flex items-center gap-1">
            <span>📅</span> {settings.session}
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="px-3 py-2 border-b border-purple-900/20">
        <div className="relative">
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-purple-400/60" />
          <input
            type="text"
            placeholder="Filter menu..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-[#1a1538] border border-purple-900/30 rounded-lg pl-8 pr-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Menu Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/40">
        {navGroups.map((group, gIdx) => {
          const visibleItems = group.items.filter(isItemVisible);
          if (visibleItems.length === 0) return null;

          return (
            <div key={gIdx} className="space-y-1">
              {group.title && (
                <div className="px-3 py-1 text-[10px] font-bold text-purple-400/70 tracking-wider uppercase">
                  {group.title}
                </div>
              )}

              {visibleItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all font-semibold ${
                      isActive
                        ? 'bg-[#3b2575] border-l-4 border-purple-400 text-white shadow-xl shadow-purple-950/80 ring-1 ring-purple-500/40'
                        : 'text-slate-300 hover:bg-purple-900/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500 text-white rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Role Banner */}
      <div className="p-3 border-t border-purple-900/30 bg-[#161230]">
        <div className="flex items-center justify-between text-xs text-purple-300">
          <span className="font-semibold capitalize flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {role === 'admin' ? 'Nazim / Admin' : role === 'teacher' ? 'Ustadh' : 'Talib-e-Ilm'} Mode
          </span>
          <span className="text-[10px] text-slate-400 font-mono">v1.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center ring-2 ring-purple-400/50"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <aside className="hidden md:block shrink-0 h-[calc(100vh-57px)] sticky top-[57px]">
        {renderContent()}
      </aside>

      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="relative z-50 h-full w-64 shadow-2xl">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};
