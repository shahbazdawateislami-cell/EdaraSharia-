import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  GraduationCap,
  Building,
  CreditCard,
  Plus,
  ClipboardCheck,
  Edit3,
  Megaphone,
  FileSpreadsheet,
  Trophy,
  Calendar,
  X,
  Sparkles,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    students,
    teachers,
    classes,
    transactions,
    notices,
    leaveRequests,
    setActiveTab,
    settings
  } = useApp();

  const totalStudentsCount = students.length;
  const totalTeachersCount = teachers.length;
  const totalClassesCount = classes.length;

  const totalFeeDue = students.reduce((sum, s) => sum + s.totalFee, 0);
  const totalFeeCollected = students.reduce((sum, s) => sum + s.paidFee, 0);
  const totalFeePending = totalFeeDue - totalFeeCollected;
  const feePercent = totalFeeDue > 0 ? Math.round((totalFeeCollected / totalFeeDue) * 100) : 0;

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending');

  const [widgets, setWidgets] = useState({
    attendanceTrend: true,
    studentsByClass: true,
    genderDist: true,
    topPerformers: true
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Welcome Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Dashboard (Markaz)</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-700/50 text-[11px] font-semibold text-purple-300">
              📅 {settings.session}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Welcome back, Nazim Sahib · Complete Edara Sharia System
          </p>
        </div>
      </div>

      {/* Top 6 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Stat 1: Total Tulaba */}
        <div
          onClick={() => setActiveTab('students')}
          className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-900/50 border border-purple-700/40 flex items-center justify-center text-purple-300 shadow-md">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono tabular-nums">{totalStudentsCount}</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Total Tulaba (Students)</div>
        </div>

        {/* Stat 2: Total Asatiza */}
        <div
          onClick={() => setActiveTab('teachers')}
          className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-teal-900/50 border border-teal-700/40 flex items-center justify-center text-teal-300 shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono tabular-nums">{totalTeachersCount}</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Total Asatiza (Teachers)</div>
        </div>

        {/* Stat 3: Total Darjaat */}
        <div
          onClick={() => setActiveTab('classes')}
          className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-900/50 border border-rose-700/40 flex items-center justify-center text-rose-300 shadow-md">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono tabular-nums">{totalClassesCount}</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Total Darjaat (Classes)</div>
        </div>

        {/* Stat 4: Taleemi Hadiya / Fees */}
        <div
          onClick={() => setActiveTab('fees')}
          className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/50 border border-emerald-700/40 flex items-center justify-center text-emerald-300 shadow-md">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-black text-white font-mono tabular-nums">₹{(totalFeeCollected / 1000).toFixed(1)}K</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Taleemi Hadiya Collected</div>
        </div>

        {/* Stat 5: Income */}
        <div
          onClick={() => setActiveTab('accounts')}
          className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-900/50 border border-indigo-700/40 flex items-center justify-center text-indigo-300 shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-black text-white font-mono tabular-nums">₹{(totalIncome / 1000).toFixed(1)}K</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Total Income</div>
        </div>

        {/* Stat 6: Expense */}
        <div
          onClick={() => setActiveTab('accounts')}
          className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex items-center justify-center text-amber-300 shadow-md">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-black text-white font-mono tabular-nums">₹{(totalExpense / 1000).toFixed(1)}K</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Total Expenses</div>
        </div>
      </div>

      {/* Quick Action Grid Row */}
      <div className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl">
        <div className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Fawri Action Shortcuts
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-9 gap-2.5">
          {[
            { label: '+ Talib-e-Ilm', icon: Plus, tab: 'students', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: '+ Ustadh', icon: Plus, tab: 'teachers', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Naya Darja', icon: Building, tab: 'classes', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Hazri', icon: ClipboardCheck, tab: 'attendance', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Imtehanat', icon: Edit3, tab: 'exams', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Taleemi Hadiya', icon: CreditCard, tab: 'fees', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Ilaan-Nama', icon: Megaphone, tab: 'notices', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Koshfiya', icon: FileSpreadsheet, tab: 'report-cards', bg: 'bg-[#211b47] hover:bg-purple-600' },
            { label: 'Mumtaz Tulaba', icon: Trophy, tab: 'leaderboard', bg: 'bg-[#211b47] hover:bg-purple-600' }
          ].map(act => {
            const Icon = act.icon;
            return (
              <button
                key={act.label}
                onClick={() => setActiveTab(act.tab)}
                className={`p-3 ${act.bg} border border-purple-900/30 rounded-2xl text-center flex flex-col items-center justify-center gap-1.5 transition-all text-white group shadow-md`}
              >
                <div className="w-7 h-7 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white truncate max-w-full">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Notices & Pending Leaves Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Notices Box */}
        <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Recent Ilaan-Nama (Notices)</h3>
            </div>
            <button
              onClick={() => setActiveTab('notices')}
              className="px-3 py-1 bg-purple-600 text-white font-bold text-xs rounded-xl hover:bg-purple-500 transition-all"
            >
              View All
            </button>
          </div>

          <div className="space-y-2 min-h-[120px] flex flex-col justify-center">
            {notices.slice(0, 2).map(n => (
              <div key={n.id} className="p-3 bg-[#110e28] border border-purple-900/20 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100">{n.title}</span>
                  <span className="text-[10px] text-purple-400 font-mono">{n.date}</span>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-1">{n.content}</p>
              </div>
            ))}
            {notices.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-500 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-purple-900/20 flex items-center justify-center text-purple-400">
                  <Megaphone className="w-6 h-6" />
                </div>
                <span>No notices posted yet</span>
              </div>
            )}
          </div>
        </div>

        {/* Pending Leaves Box */}
        <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Darkhwast-e-Rukhsaat ({pendingLeaves.length})</h3>
            </div>
            <button
              onClick={() => setActiveTab('leave-requests')}
              className="px-3 py-1 bg-purple-600 text-white font-bold text-xs rounded-xl hover:bg-purple-500 transition-all"
            >
              Manage
            </button>
          </div>

          <div className="space-y-2 min-h-[120px] flex flex-col justify-center">
            {pendingLeaves.map(l => (
              <div key={l.id} className="p-3 bg-[#110e28] border border-amber-900/20 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-100">{l.applicantName} ({l.applicantType})</div>
                  <div className="text-[10px] text-slate-400">{l.leaveType} · {l.startDate} to {l.endDate}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  Pending
                </span>
              </div>
            ))}
            {pendingLeaves.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-500 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
                  ✓
                </div>
                <span>No pending leave requests</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fee Collection Overview Card */}
      <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm">💰</div>
            <h3 className="text-sm font-bold text-white">Taleemi Hadiya & Fee Collection Overview</h3>
          </div>
          <button
            onClick={() => setActiveTab('fees')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            Manage Fees →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-[#110e28] border border-teal-900/40 rounded-2xl space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold">Collected</div>
            <div className="text-2xl font-black text-teal-400 font-mono tabular-nums">
              ₹{totalFeeCollected.toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-[#110e28] border border-rose-900/40 rounded-2xl space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold">Pending</div>
            <div className="text-2xl font-black text-rose-400 font-mono tabular-nums">
              ₹{totalFeePending.toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-[#110e28] border border-purple-900/40 rounded-2xl space-y-1">
            <div className="text-[11px] text-slate-400 font-semibold">Total Expected</div>
            <div className="text-2xl font-black text-purple-300 font-mono tabular-nums">
              ₹{totalFeeDue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-1 pt-1">
          <div className="w-full h-2 bg-[#110e28] rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, feePercent))}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono">{feePercent}% collected</div>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            📊 Analytics Dashboard
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Widget 1: Hazri Trend */}
          {widgets.attendanceTrend && (
            <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl space-y-3 relative">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  📈 Hazri (Attendance) Trend (last 7 days)
                </h4>
                <button
                  onClick={() => setWidgets(prev => ({ ...prev, attendanceTrend: false }))}
                  className="p-1 text-slate-500 hover:text-white rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-purple-900/20 text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'].map((day, idx) => {
                  const h = [85, 90, 88, 95, 92, 84, 96][idx];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] font-mono text-teal-400 font-bold">{h}%</span>
                      <div className="w-full bg-teal-500/80 rounded-t-md transition-all hover:bg-teal-400" style={{ height: `${h}%` }} />
                      <span className="text-[10px] text-slate-400">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Widget 2: Tulaba by Darja */}
          {widgets.studentsByClass && (
            <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl space-y-3 relative">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  🏫 Tulaba Count by Darja
                </h4>
                <button
                  onClick={() => setWidgets(prev => ({ ...prev, studentsByClass: false }))}
                  className="p-1 text-slate-500 hover:text-white rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                {classes.slice(0, 4).map(c => {
                  const cnt = students.filter(s => s.classId === c.id).length || 4;
                  return (
                    <div key={c.id} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>{c.name}</span>
                        <span className="font-mono text-purple-300 font-bold">{cnt} Tulaba</span>
                      </div>
                      <div className="w-full h-2 bg-[#110e28] rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${Math.min(100, cnt * 12)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Widget 3: Top Performers */}
          {widgets.topPerformers && (
            <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl space-y-3 relative md:col-span-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  🏆 Mumtaz Tulaba (Top Performers)
                </h4>
                <button
                  onClick={() => setWidgets(prev => ({ ...prev, topPerformers: false }))}
                  className="p-1 text-slate-500 hover:text-white rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-3 bg-[#110e28] border border-amber-500/30 rounded-xl space-y-0.5">
                  <div className="text-lg">🥇</div>
                  <div className="font-bold text-amber-300 truncate">Mohammad Anas</div>
                  <div className="text-[10px] text-slate-400 font-mono">98% · Mumtaz</div>
                </div>
                <div className="p-3 bg-[#110e28] border border-slate-400/30 rounded-xl space-y-0.5">
                  <div className="text-lg">🥈</div>
                  <div className="font-bold text-slate-200 truncate">Fatima-tuz-Zahra</div>
                  <div className="text-[10px] text-slate-400 font-mono">96% · Mumtaz</div>
                </div>
                <div className="p-3 bg-[#110e28] border border-amber-800/30 rounded-xl space-y-0.5">
                  <div className="text-lg">🥉</div>
                  <div className="font-bold text-amber-600 truncate">Mohammad Huzaifa</div>
                  <div className="text-[10px] text-slate-400 font-mono">85% · Jayyid Jiddan</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
