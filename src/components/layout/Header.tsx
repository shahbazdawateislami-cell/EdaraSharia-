import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  Bell,
  Search,
  Calendar,
  User,
  ShieldCheck,
  GraduationCap,
  Users,
  X,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    settings,
    role,
    setRole,
    currentUserId,
    setCurrentUserId,
    teachers,
    students,
    notices,
    searchQuery,
    setSearchQuery,
    messages,
    resetDataToDefault
  } = useApp();

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showNoticesModal, setShowNoticesModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const unreadMessagesCount = messages.filter(m => !m.isRead && m.receiverId === currentUserId).length;
  const urgentNotices = notices.filter(n => n.type === 'Urgent');

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handleSelectRole = (newRole: Role, userId?: string) => {
    setRole(newRole);
    if (userId) {
      setCurrentUserId(userId);
    } else if (newRole === 'admin') {
      setCurrentUserId('admin');
    } else if (newRole === 'teacher' && teachers.length > 0) {
      setCurrentUserId(teachers[0].id);
    } else if (newRole === 'student' && students.length > 0) {
      setCurrentUserId(students[0].id);
    }
    setShowRoleModal(false);
  };

  const currentUserObj = role === 'teacher'
    ? teachers.find(t => t.id === currentUserId)
    : role === 'student'
    ? students.find(s => s.id === currentUserId)
    : { name: 'Nazim-e-Aala / Admin' };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 bg-[#120f26]/90 backdrop-blur-md border-b border-purple-900/30">
      {/* Zone 1: Brand & Session */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={settings.name}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-purple-500/30 shadow-md"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center font-bold text-white shadow-md text-xs">
              ES
            </div>
          )}
          <div>
            <h1 className="text-base font-bold text-white tracking-tight leading-tight flex items-center gap-2">
              {settings.name.includes('ERP') ? settings.name : `${settings.name} ERP`}
            </h1>
            <div className="flex items-center gap-2 text-xs text-purple-300/70">
              <span className="bg-purple-900/40 text-purple-300 border border-purple-700/40 px-1.5 py-0.5 rounded text-[10px] font-mono">
                📅 {settings.session}
              </span>
              <span className="hidden sm:inline-block">· {settings.tagline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 2: Global Search & Role Quick Switcher */}
      <div className="hidden md:flex items-center gap-3">
        <div className="relative w-64 lg:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-purple-400/60" />
          <input
            type="text"
            placeholder="Search tulaba, asatiza, ilaan-nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b1638] border border-purple-900/40 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Role Toggle Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#1a1536] border border-purple-900/40 rounded-xl">
          <button
            onClick={() => handleSelectRole('admin')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Nazim
          </button>
          <button
            onClick={() => handleSelectRole('teacher')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'teacher'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Ustadh
          </button>
          <button
            onClick={() => handleSelectRole('student')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'student'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-purple-300/70 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Talib-e-Ilm
          </button>
        </div>
      </div>

      {/* Zone 3: Quick Info & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Current Date Badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#1b1638] border border-purple-900/40 text-purple-200 px-2.5 py-1.5 rounded-xl text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => setShowNoticesModal(true)}
          className="relative p-2 bg-[#1b1638] border border-purple-900/40 rounded-xl text-purple-300 hover:text-white hover:border-purple-500/50 transition-all"
          title="Ilaan-Nama & Alerts"
        >
          <Bell className="w-4 h-4" />
          {(urgentNotices.length > 0 || unreadMessagesCount > 0) && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#120f26] animate-pulse" />
          )}
        </button>

        {/* Reset Data Button */}
        <button
          onClick={() => setShowResetModal(true)}
          className="p-2 bg-[#1b1638] border border-purple-900/40 rounded-xl text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
          title="Reset System Demo Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Profile Card / Switch Account */}
        <button
          onClick={() => setShowRoleModal(true)}
          className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-[#1b1638] border border-purple-900/40 hover:border-purple-500/50 rounded-xl transition-all text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-200 font-semibold text-xs">
            {role === 'admin' ? '👑' : role === 'teacher' ? '👩‍🏫' : '🎒'}
          </div>
          <div className="hidden lg:block text-xs">
            <div className="font-semibold text-slate-100 truncate max-w-[120px]">
              {currentUserObj ? currentUserObj.name : 'User'}
            </div>
            <div className="text-[10px] text-purple-400 capitalize">
              {role === 'admin' ? 'Nazim' : role === 'teacher' ? 'Ustadh' : 'Talib-e-Ilm'} Account
            </div>
          </div>
        </button>
      </div>

      {/* Role Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowRoleModal(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" /> Switch Account / Role
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Select portal role to test:
            </p>

            <div className="space-y-3">
              <div
                onClick={() => handleSelectRole('admin')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  role === 'admin'
                    ? 'bg-purple-900/40 border-purple-500 text-white ring-1 ring-purple-500'
                    : 'bg-[#1e193d] border-purple-900/30 text-slate-300 hover:border-purple-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-600/30 rounded-xl text-purple-300 font-bold">👑</div>
                  <div>
                    <div className="font-bold text-sm">Nazim-e-Aala / Admin Panel</div>
                    <div className="text-xs text-slate-400">Full control over Madrasa & Edara Sharia system</div>
                  </div>
                </div>
                {role === 'admin' && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
              </div>

              {/* Teacher Selection */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Select Ustadh
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {teachers.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleSelectRole('teacher', t.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        role === 'teacher' && currentUserId === t.id
                          ? 'bg-purple-900/40 border-purple-500 text-white'
                          : 'bg-[#1c173b] border-purple-900/20 text-slate-300 hover:border-purple-500/50'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-100">{t.name}</div>
                        <div className="text-[10px] text-purple-400">{t.subject}</div>
                      </div>
                      {role === 'teacher' && currentUserId === t.id && (
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Selection */}
              <div className="space-y-2 pt-2 border-t border-purple-900/30">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Select Talib-e-Ilm
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {students.map(s => (
                    <div
                      key={s.id}
                      onClick={() => handleSelectRole('student', s.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        role === 'student' && currentUserId === s.id
                          ? 'bg-purple-900/40 border-purple-500 text-white'
                          : 'bg-[#1c173b] border-purple-900/20 text-slate-300 hover:border-purple-500/50'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-100">{s.name} (Roll: {s.rollNo})</div>
                        <div className="text-[10px] text-purple-400">Darja Hifz</div>
                      </div>
                      {role === 'student' && currentUserId === s.id && (
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer Modal */}
      {showNoticesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowNoticesModal(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-400" /> Ilaan-Nama & Alerts
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Latest broadcasts and urgent notices:
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {notices.map(notice => (
                <div
                  key={notice.id}
                  className="p-3.5 rounded-xl bg-[#1c173b] border border-purple-900/30 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-sm">{notice.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        notice.type === 'Urgent'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-purple-900/40 text-purple-300'
                      }`}
                    >
                      {notice.type}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{notice.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-purple-400/80 pt-1 border-t border-purple-900/20">
                    <span>By: {notice.postedBy}</span>
                    <span>{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reset Data Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-400" /> Reset Demo Data?
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              This will restore all default Darjaat, Tulaba, Asatiza, Imtehanat, and Settings to original state.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-xs font-semibold bg-[#221c47] text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDataToDefault();
                  setShowResetModal(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl hover:bg-rose-700"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
