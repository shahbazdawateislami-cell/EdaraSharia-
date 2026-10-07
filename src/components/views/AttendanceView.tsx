import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardCheck, CheckCircle2, XCircle, Clock, Save, BarChart3, AlertTriangle } from 'lucide-react';
import { AttendanceRecord } from '../../types';

export const AttendanceView: React.FC = () => {
  const { classes, students, attendance, saveAttendance } = useApp();
  const [activeTab, setActiveTab] = useState<'mark' | 'report'>('mark');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Local state for daily marking
  const currentClassStudents = students.filter(s => s.classId === selectedClassId);

  const getExistingStatus = (studentId: string): 'Present' | 'Absent' | 'Late' => {
    const record = attendance.find(a => a.date === selectedDate && a.studentId === studentId);
    return record ? record.status : 'Present';
  };

  const [localStatusMap, setLocalStatusMap] = useState<{ [studentId: string]: 'Present' | 'Absent' | 'Late' }>({});

  const getStatus = (studentId: string): 'Present' | 'Absent' | 'Late' => {
    if (localStatusMap[studentId] !== undefined) {
      return localStatusMap[studentId];
    }
    return getExistingStatus(studentId);
  };

  const cycleStatus = (studentId: string) => {
    const current = getStatus(studentId);
    let next: 'Present' | 'Absent' | 'Late' = 'Present';
    if (current === 'Present') next = 'Absent';
    else if (current === 'Absent') next = 'Late';
    else if (current === 'Late') next = 'Present';

    setLocalStatusMap(prev => ({ ...prev, [studentId]: next }));
  };

  const markAll = (status: 'Present' | 'Absent') => {
    const newMap: { [studentId: string]: 'Present' | 'Absent' | 'Late' } = {};
    currentClassStudents.forEach(s => {
      newMap[s.id] = status;
    });
    setLocalStatusMap(newMap);
  };

  const handleSave = () => {
    const recordsToSave: AttendanceRecord[] = currentClassStudents.map(s => ({
      id: `att_${selectedDate}_${s.id}`,
      date: selectedDate,
      classId: selectedClassId,
      studentId: s.id,
      status: getStatus(s.id)
    }));
    saveAttendance(recordsToSave);
    alert('✅ Daily Attendance Saved Successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-purple-400" /> Attendance Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mark daily attendance, quick cycle status, and review class performance metrics
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#100d24] border border-purple-900/40 rounded-xl">
          <button
            onClick={() => setActiveTab('mark')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'mark'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" /> Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> 📊 Report
          </button>
        </div>
      </div>

      {activeTab === 'mark' ? (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-4 bg-[#16122d] border border-purple-900/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Class</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => {
                    setSelectedClassId(e.target.value);
                    setLocalStatusMap({});
                  }}
                  className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setLocalStatusMap({});
                  }}
                  className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Quick Bulk Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => markAll('Present')}
                className="px-3 py-2 bg-emerald-900/30 border border-emerald-500/40 hover:bg-emerald-800/40 text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> All Present
              </button>
              <button
                onClick={() => markAll('Absent')}
                className="px-3 py-2 bg-rose-900/30 border border-rose-500/40 hover:bg-rose-800/40 text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all"
              >
                <XCircle className="w-3.5 h-3.5" /> All Absent
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save className="w-4 h-4" /> Save Attendance
              </button>
            </div>
          </div>

          {/* Student Attendance Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentClassStudents.map(student => {
              const status = getStatus(student.id);

              return (
                <div
                  key={student.id}
                  onClick={() => cycleStatus(student.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 relative select-none ${
                    status === 'Present'
                      ? 'bg-emerald-950/20 border-emerald-500/50 hover:border-emerald-400'
                      : status === 'Absent'
                      ? 'bg-rose-950/20 border-rose-500/50 hover:border-rose-400'
                      : 'bg-amber-950/20 border-amber-500/50 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {student.photoUrl ? (
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-700/40 flex items-center justify-center font-bold text-xs text-purple-200">
                        {student.name.slice(0, 2)}
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-white truncate">{student.name}</div>
                      <div className="text-[10px] text-slate-400">Roll No: {student.rollNo}</div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between pt-2 border-t border-purple-900/20">
                    <span className="text-[10px] text-slate-400">Click to cycle status</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      status === 'Present'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : status === 'Absent'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {status === 'Present' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {status === 'Absent' && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      {status === 'Late' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                      {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Attendance Report Tab */
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Class Attendance Report & &lt;75% Warnings</h3>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-1.5"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#100d24] text-purple-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Total Days</th>
                  <th className="p-3">Present</th>
                  <th className="p-3">Absent</th>
                  <th className="p-3">Attendance %</th>
                  <th className="p-3">Status Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20 text-slate-200">
                {currentClassStudents.map(student => {
                  const studentRecords = attendance.filter(a => a.studentId === student.id);
                  const totalDays = Math.max(1, studentRecords.length);
                  const presentDays = studentRecords.filter(a => a.status === 'Present' || a.status === 'Late').length;
                  const absentDays = studentRecords.filter(a => a.status === 'Absent').length;
                  const pct = Math.round((presentDays / totalDays) * 100);
                  const isLow = pct < 75;

                  return (
                    <tr key={student.id} className="hover:bg-[#1b1638]">
                      <td className="p-3 font-semibold">{student.name}</td>
                      <td className="p-3 font-mono">{student.rollNo}</td>
                      <td className="p-3 font-mono">{totalDays}</td>
                      <td className="p-3 font-mono text-emerald-400">{presentDays}</td>
                      <td className="p-3 font-mono text-rose-400">{absentDays}</td>
                      <td className="p-3 font-mono font-bold">
                        <span className={isLow ? 'text-rose-400' : 'text-emerald-400'}>{pct}%</span>
                      </td>
                      <td className="p-3">
                        {isLow ? (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/40 flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3 text-rose-400" /> Below 75%
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold w-fit">
                            Good (&ge;75%)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
