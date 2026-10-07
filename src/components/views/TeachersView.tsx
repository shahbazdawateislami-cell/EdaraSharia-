import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Plus, Edit2, Trash2, Shield, X, Check, Lock, Phone, Mail, DollarSign } from 'lucide-react';
import { TeacherAccess } from '../../types';

export const TeachersView: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, classes, role } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [accessTeacherId, setAccessTeacherId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('');
  const [salary, setSalary] = useState<number>(35000);
  const [assignedClassId, setAssignedClassId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('password123');

  // Permissions state for Access Modal
  const [tempAccess, setTempAccess] = useState<TeacherAccess>({
    attendance: true,
    homework: true,
    timetable: true,
    exams: true,
    studyMaterial: true,
    questionPapers: true,
    notices: true,
    leaves: true,
    leaderboard: true
  });

  const resetForm = () => {
    setName('');
    setSubject('');
    setPhone('');
    setEmail('');
    setQualification('');
    setSalary(35000);
    setAssignedClassId('');
    setUsername('');
    setPassword('password123');
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (t: any) => {
    setEditingId(t.id);
    setName(t.name);
    setSubject(t.subject);
    setPhone(t.phone);
    setEmail(t.email);
    setQualification(t.qualification);
    setSalary(t.salary);
    setAssignedClassId(t.assignedClassId || '');
    setUsername(t.username);
    setPassword(t.password || 'password123');
    setShowModal(true);
  };

  const openAccessModal = (t: any) => {
    setAccessTeacherId(t.id);
    setTempAccess(t.access || {
      attendance: true,
      homework: true,
      timetable: true,
      exams: true,
      studyMaterial: true,
      questionPapers: true,
      notices: true,
      leaves: true,
      leaderboard: true
    });
    setShowAccessModal(true);
  };

  const saveAccessPermissions = () => {
    if (accessTeacherId) {
      updateTeacher(accessTeacherId, { access: tempAccess });
    }
    setShowAccessModal(false);
    setAccessTeacherId(null);
  };

  const handleSave = () => {
    if (!name.trim() || !subject.trim()) return;
    const finalUsername = username.trim() || name.toLowerCase().replace(/\s+/g, '');

    if (editingId) {
      updateTeacher(editingId, {
        name,
        subject,
        phone,
        email,
        qualification,
        salary,
        assignedClassId,
        username: finalUsername,
        password
      });
    } else {
      addTeacher({
        name,
        subject,
        phone,
        email,
        qualification,
        salary,
        assignedClassId,
        username: finalUsername,
        password,
        access: {
          attendance: true,
          homework: true,
          timetable: true,
          exams: true,
          studyMaterial: true,
          questionPapers: true,
          notices: true,
          leaves: true,
          leaderboard: true
        }
      });
    }
    resetForm();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-400" /> Teaching Staff Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage teacher profiles, subject assignments, salary packages, and granular panel feature access
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Teacher
          </button>
        )}
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(teacher => {
          const assignedClass = classes.find(c => c.id === teacher.assignedClassId);

          return (
            <div
              key={teacher.id}
              className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 transition-all space-y-4 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-900/40 border border-indigo-700/40 flex items-center justify-center font-bold text-indigo-200 text-base">
                    👩‍🏫
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{teacher.name}</h3>
                    <div className="text-xs text-purple-300 font-medium">{teacher.subject}</div>
                    <div className="text-[10px] text-slate-400">{teacher.qualification}</div>
                  </div>
                </div>

                {role === 'admin' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openAccessModal(teacher)}
                      className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-amber-900/30 rounded-lg transition-all"
                      title="Manage Feature Access"
                    >
                      <Shield className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="p-1.5 text-slate-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTeacher(teacher.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Class & Salary Details */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-900/20 text-xs">
                <div className="p-2.5 bg-[#100d24] rounded-xl border border-purple-900/20 space-y-0.5">
                  <div className="text-[10px] text-slate-400">Class In-Charge</div>
                  <div className="font-bold text-purple-200">
                    {assignedClass ? assignedClass.name : 'None'}
                  </div>
                </div>

                <div className="p-2.5 bg-[#100d24] rounded-xl border border-purple-900/20 space-y-0.5">
                  <div className="text-[10px] text-slate-400">Basic Salary</div>
                  <div className="font-bold text-emerald-400 font-mono">
                    ₹{teacher.salary.toLocaleString()}/mo
                  </div>
                </div>
              </div>

              {/* Contact Pills */}
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-purple-400" /> {teacher.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-indigo-400" /> {teacher.email}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4 my-8">
            <button onClick={resetForm} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">
              {editingId ? 'Edit Teacher Details' : 'Add New Teacher'}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Teacher Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Maulana Zaid"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. Arabic & Quran"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="teacher@school.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Qualifications</label>
                  <input
                    type="text"
                    placeholder="e.g. M.Sc, Fazil"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Basic Salary (₹)</label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assigned Class Teacher</label>
                <select
                  value={assignedClassId}
                  onChange={(e) => setAssignedClassId(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">-- None (Subject Teacher Only) --</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-[#100d24] rounded-xl border border-purple-900/30 space-y-2">
                <div className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Portal Credentials
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Username</label>
                    <input
                      type="text"
                      placeholder="e.g. teacher1"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#16122e] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Password</label>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#16122e] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={resetForm} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Save Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Access Permissions Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowAccessModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" /> Teacher Feature Access Control
            </h3>
            <p className="text-xs text-slate-400">
              Enable or disable specific sections in the teacher's portal panel:
            </p>

            <div className="space-y-2 text-xs max-h-64 overflow-y-auto pr-1">
              {[
                { key: 'attendance', label: 'Attendance Marking' },
                { key: 'homework', label: 'Assign Homework & Board Photo' },
                { key: 'timetable', label: 'View & Edit Timetable' },
                { key: 'exams', label: 'Exams & Marks Entry' },
                { key: 'studyMaterial', label: 'Upload Study Material' },
                { key: 'questionPapers', label: 'Manage Question Papers' },
                { key: 'notices', label: 'Post Notices to Class' },
                { key: 'leaves', label: 'Apply Leave Requests' },
                { key: 'leaderboard', label: 'View Class Leaderboard' }
              ].map(item => (
                <label
                  key={item.key}
                  className="flex items-center justify-between p-3 bg-[#100d24] border border-purple-900/30 rounded-xl cursor-pointer hover:border-purple-500/40 transition-all"
                >
                  <span className="font-medium text-slate-200">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={(tempAccess as any)[item.key]}
                    onChange={(e) => setTempAccess(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-[#16122e] border-purple-700"
                  />
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={() => setShowAccessModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={saveAccessPermissions}
                className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-md flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Save Access Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
