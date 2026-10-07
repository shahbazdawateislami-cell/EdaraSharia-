import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlarmClock, Settings, Plus, Trash2, X, Check, Calendar } from 'lucide-react';

export const TimetableView: React.FC = () => {
  const {
    timetableConfig,
    updateTimetableConfig,
    timetableCells,
    saveTimetableCell,
    deleteTimetableCell,
    classes,
    teachers,
    role
  } = useApp();

  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showCellModal, setShowCellModal] = useState(false);

  // Cell editing
  const [activeDay, setActiveDay] = useState('Mon');
  const [activeSlotId, setActiveSlotId] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [isBreak, setIsBreak] = useState(false);

  // Config modal state
  const [tempDays, setTempDays] = useState<string[]>(timetableConfig.operatingDays);

  const handleCellClick = (day: string, slotId: string) => {
    setActiveDay(day);
    setActiveSlotId(slotId);

    const existing = timetableCells.find(
      c => c.classId === selectedClassId && c.day === day && c.slotId === slotId
    );

    if (existing) {
      setSubject(existing.subject);
      setTeacherId(existing.teacherId || '');
      setIsBreak(!!existing.isBreak);
    } else {
      setSubject('');
      setTeacherId('');
      setIsBreak(false);
    }

    if (role === 'admin' || role === 'teacher') {
      setShowCellModal(true);
    }
  };

  const handleSaveCell = () => {
    if (!subject.trim() && !isBreak) return;
    saveTimetableCell({
      classId: selectedClassId,
      day: activeDay,
      slotId: activeSlotId,
      subject: isBreak ? 'Break' : subject,
      teacherId: isBreak ? undefined : teacherId,
      isBreak
    });
    setShowCellModal(false);
  };

  const handleToggleDay = (day: string) => {
    if (tempDays.includes(day)) {
      setTempDays(tempDays.filter(d => d !== day));
    } else {
      setTempDays([...tempDays, day]);
    }
  };

  const handleSaveConfig = () => {
    updateTimetableConfig({
      ...timetableConfig,
      operatingDays: tempDays
    });
    setShowConfigModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlarmClock className="w-5 h-5 text-purple-400" /> Weekly Class Schedule & Timetable
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customizable weekly timetable, period slots, break periods, and subject teacher assignments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-[#100d24] border border-purple-900/40 text-slate-200 text-xs rounded-xl px-3 py-2.5 font-semibold"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {role === 'admin' && (
            <button
              onClick={() => {
                setTempDays(timetableConfig.operatingDays);
                setShowConfigModal(true);
              }}
              className="px-3.5 py-2.5 bg-[#100d24] border border-purple-900/40 hover:border-purple-500 text-purple-300 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shrink-0"
            >
              <Settings className="w-4 h-4" /> ⚙️ Configure Days & Slots
            </button>
          )}
        </div>
      </div>

      {/* Timetable Schedule Grid Table */}
      <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl overflow-x-auto shadow-xl">
        <table className="w-full text-xs text-center border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#100d24] text-purple-300 font-bold border-b border-purple-900/30">
              <th className="p-3 text-left w-36">Time / Period</th>
              {timetableConfig.operatingDays.map(day => (
                <th key={day} className="p-3 uppercase tracking-wider">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/20 text-slate-200">
            {timetableConfig.timeSlots.map(slot => (
              <tr key={slot.id} className="hover:bg-[#181333]">
                <td className="p-3 text-left bg-[#120f26] font-semibold">
                  <div className="text-purple-300">{slot.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{slot.start} - {slot.end}</div>
                </td>

                {timetableConfig.operatingDays.map(day => {
                  const cell = timetableCells.find(
                    c => c.classId === selectedClassId && c.day === day && c.slotId === slot.id
                  );
                  const teacher = cell?.teacherId ? teachers.find(t => t.id === cell.teacherId) : null;

                  return (
                    <td
                      key={day}
                      onClick={() => handleCellClick(day, slot.id)}
                      className="p-2 cursor-pointer transition-colors border-l border-purple-900/20 hover:bg-purple-900/20"
                    >
                      {cell ? (
                        <div className={`p-2 rounded-xl text-center space-y-0.5 ${
                          cell.isBreak
                            ? 'bg-amber-950/30 border border-amber-500/30 text-amber-300'
                            : 'bg-purple-900/30 border border-purple-500/30 text-slate-100'
                        }`}>
                          <div className="font-bold text-xs truncate">{cell.subject}</div>
                          {teacher && (
                            <div className="text-[10px] text-purple-300 truncate">{teacher.name}</div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 text-[10px] text-slate-500 hover:text-purple-300 border border-dashed border-purple-900/30 rounded-xl">
                          + Empty
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Configure Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowConfigModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" /> Configure Operating Days
            </h3>

            <div className="space-y-3 text-xs">
              <label className="block text-slate-300 font-semibold">Select Operating Days:</label>
              <div className="grid grid-cols-3 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => {
                  const isChecked = tempDays.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => handleToggleDay(d)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        isChecked
                          ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                          : 'bg-[#100d24] border-purple-900/30 text-slate-400'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={() => setShowConfigModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cell Subject Modal */}
      {showCellModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowCellModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">
              Edit Period ({activeDay})
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-[#100d24] rounded-xl border border-purple-900/30">
                <input
                  type="checkbox"
                  checked={isBreak}
                  onChange={(e) => setIsBreak(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600"
                />
                <span className="font-semibold text-amber-300">Mark as Break / Recess Period</span>
              </label>

              {!isBreak && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Subject Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mathematics"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Assigned Teacher</label>
                    <select
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="">-- Select Teacher --</option>
                      {teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={() => setShowCellModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleSaveCell}
                className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md"
              >
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
