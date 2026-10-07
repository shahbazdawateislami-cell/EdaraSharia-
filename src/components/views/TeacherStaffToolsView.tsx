import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, CheckSquare, Plus, Clock, CheckCircle2, Trash2 } from 'lucide-react';

export const TeacherStaffToolsView: React.FC<{ subTab: 'teacher-attendance' | 'teacher-tasks' }> = ({ subTab }) => {
  const { teacherAttendance, saveTeacherAttendance, teacherTasks, addTeacherTask, updateTaskStatus, teachers, role } = useApp();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTeacherId, setTaskTeacherId] = useState(teachers[0]?.id || '');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleCreateTask = () => {
    if (!taskTitle.trim()) return;
    addTeacherTask({
      teacherId: taskTeacherId,
      title: taskTitle,
      dueDate: taskDueDate,
      status: 'Pending',
      priority: 'High'
    });
    setShowTaskModal(false);
    setTaskTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {subTab === 'teacher-attendance' ? <UserCheck className="w-5 h-5 text-purple-400" /> : <CheckSquare className="w-5 h-5 text-indigo-400" />}
            {subTab === 'teacher-attendance' ? 'Teacher Attendance Log' : 'Teacher Tasks & Duties'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {subTab === 'teacher-attendance' ? 'Daily check-in, check-out times and attendance status' : 'Assign administrative duties, syllabus targets, and deadlined tasks'}
          </p>
        </div>

        {subTab === 'teacher-tasks' && role === 'admin' && (
          <button onClick={() => setShowTaskModal(true)} className="px-4 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Assign Teacher Task
          </button>
        )}
      </div>

      {subTab === 'teacher-attendance' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl overflow-x-auto shadow-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#100d24] text-purple-300 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Teacher Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Check-In</th>
                <th className="p-3">Check-Out</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 text-slate-200">
              {teachers.map(t => {
                const rec = teacherAttendance.find(ta => ta.teacherId === t.id);
                return (
                  <tr key={t.id} className="hover:bg-[#1b1638]">
                    <td className="p-3 font-semibold text-white">{t.name}</td>
                    <td className="p-3 text-purple-300">{t.subject}</td>
                    <td className="p-3 font-mono text-emerald-400">{rec?.checkIn || '07:55 AM'}</td>
                    <td className="p-3 font-mono text-indigo-300">{rec?.checkOut || '02:30 PM'}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        PRESENT
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {subTab === 'teacher-tasks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherTasks.map(task => {
            const teacher = teachers.find(t => t.id === task.teacherId);
            return (
              <div key={task.id} className="p-4 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 text-[10px] font-bold uppercase">
                    {teacher ? teacher.name : 'Teacher'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {task.status}
                  </span>
                </div>

                <div className="font-bold text-white text-sm">{task.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">Due Date: {task.dueDate}</div>

                <div className="pt-2 border-t border-purple-900/20 flex gap-2">
                  <button
                    onClick={() => updateTaskStatus(task.id, task.status === 'Completed' ? 'Pending' : 'Completed')}
                    className="w-full py-1.5 bg-[#100d24] hover:bg-purple-900/40 border border-purple-900/30 text-purple-300 rounded-lg text-xs font-semibold"
                  >
                    Mark as {task.status === 'Completed' ? 'Pending' : 'Completed'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <h3 className="text-base font-bold text-white">Assign Duty / Task to Teacher</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Teacher</label>
                <select value={taskTeacherId} onChange={(e) => setTaskTeacherId(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white">
                  {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Task Title *</label>
                <input type="text" placeholder="e.g. Upload Mid Term Marks" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
                <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowTaskModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handleCreateTask} className="px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl">Save Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
