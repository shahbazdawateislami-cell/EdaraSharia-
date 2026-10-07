import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building, Plus, Trash2, Edit2, Users, GraduationCap, X, Check } from 'lucide-react';

export const ClassesView: React.FC = () => {
  const { classes, addClass, updateClass, deleteClass, teachers, students, role } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [section, setSection] = useState('A');
  const [grade, setGrade] = useState('1');
  const [classTeacherId, setClassTeacherId] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingId) {
      updateClass(editingId, { name, section, grade, classTeacherId });
    } else {
      addClass({ name, section, grade, classTeacherId, studentCount: 0 });
    }
    resetForm();
  };

  const handleEdit = (cls: any) => {
    setEditingId(cls.id);
    setName(cls.name);
    setSection(cls.section);
    setGrade(cls.grade);
    setClassTeacherId(cls.classTeacherId || '');
    setShowAddModal(true);
  };

  const resetForm = () => {
    setName('');
    setSection('A');
    setGrade('1');
    setClassTeacherId('');
    setEditingId(null);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-purple-400" /> Darjaat (Classes & Sections)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Create Darjaat, assign Nighran Asatiza (In-Charge Teachers), and organize sections
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Naya Darja Add Karein
          </button>
        )}
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => {
          const assignedTeacher = teachers.find(t => t.id === cls.classTeacherId);
          const studentCount = students.filter(s => s.classId === cls.id).length;

          return (
            <div
              key={cls.id}
              className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 transition-all space-y-4 relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{cls.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-purple-300/80 mt-0.5">
                    <span>Shoba: {cls.section}</span>
                    <span>·</span>
                    <span>Grade Level: {cls.grade}</span>
                  </div>
                </div>

                {role === 'admin' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(cls)}
                      className="p-1.5 text-slate-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-900/20 text-xs">
                <div className="p-2.5 bg-[#100d24] rounded-xl border border-purple-900/20 space-y-1">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-purple-400" /> Total Tulaba
                  </div>
                  <div className="font-bold text-slate-100 font-mono text-sm">{studentCount} Tulaba</div>
                </div>

                <div className="p-2.5 bg-[#100d24] rounded-xl border border-purple-900/20 space-y-1">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-indigo-400" /> Nighran Ustadh
                  </div>
                  <div className="font-semibold text-purple-200 text-xs truncate">
                    {assignedTeacher ? assignedTeacher.name : 'Ghyr Muqarrar'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={resetForm} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">
              {editingId ? 'Edit Darja Details' : 'Add Naya Darja'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Darja Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Darja Hifz-ul-Quran or Darja Ula"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Section / Shoba *</label>
                  <input
                    type="text"
                    placeholder="e.g. A, B"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Grade Level</label>
                  <input
                    type="text"
                    placeholder="e.g. 1, 2, Hifz"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assign Nighran Ustadh</label>
                <select
                  value={classTeacherId}
                  onChange={(e) => setClassTeacherId(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">-- Select Nighran Ustadh --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>
                  ))}
                </select>
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
                <Check className="w-4 h-4" /> Save Darja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
