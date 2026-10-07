import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Camera, Trash2, Calendar, CheckCircle2, Clock, X, Image as ImageIcon } from 'lucide-react';

export const HomeworkView: React.FC = () => {
  const { homework, addHomework, deleteHomework, classes, role } = useApp();
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [expandedPhotoUrl, setExpandedPhotoUrl] = useState<string | null>(null);

  // Form
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [boardPhotoUrl, setBoardPhotoUrl] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height *= maxDim / width;
            width = maxDim;
          } else {
            width *= maxDim / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.8);
        setBoardPhotoUrl(compressed);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!subject.trim() || !description.trim() || !dueDate) return;
    addHomework({
      classId,
      subject,
      description,
      dueDate,
      boardPhotoUrl: boardPhotoUrl || undefined
    });
    resetForm();
  };

  const resetForm = () => {
    setSubject('');
    setDescription('');
    setDueDate('');
    setBoardPhotoUrl('');
    setShowModal(false);
  };

  const filteredHomework = homework.filter(h => selectedClassId === 'all' || h.classId === selectedClassId);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Homework & Assignments
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Assign class homework, attach blackboard photos, and track due dates
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-[#100d24] border border-purple-900/40 text-slate-200 text-xs rounded-xl px-3 py-2.5"
          >
            <option value="all">All Classes ({homework.length})</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {(role === 'admin' || role === 'teacher') && (
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> ➕ Assign Homework
            </button>
          )}
        </div>
      </div>

      {/* Homework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHomework.map(item => {
          const cls = classes.find(c => c.id === item.classId);

          return (
            <div
              key={item.id}
              className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 transition-all space-y-3 relative flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-bold text-[10px] uppercase border border-purple-700/40">
                      {cls ? cls.name : 'Class'}
                    </span>
                    <h3 className="font-bold text-white text-base mt-1">{item.subject}</h3>
                  </div>

                  {(role === 'admin' || role === 'teacher') && (
                    <button
                      onClick={() => deleteHomework(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#100d24] p-3 rounded-xl border border-purple-900/20">
                  {item.description}
                </p>

                {/* Blackboard Photo if available */}
                {item.boardPhotoUrl && (
                  <div className="relative group rounded-xl overflow-hidden border border-purple-900/40">
                    <img
                      src={item.boardPhotoUrl}
                      alt="Board Photo"
                      className="w-full h-32 object-cover cursor-pointer group-hover:scale-105 transition-transform"
                      onClick={() => setExpandedPhotoUrl(item.boardPhotoUrl || null)}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="text-[11px] font-semibold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        Tap to Expand Blackboard Photo
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-purple-900/20">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Due: <strong className="text-amber-300">{item.dueDate}</strong>
                </span>
                <span className="text-[10px] text-purple-400 font-mono">Assigned: {item.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assign Homework Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={resetForm} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">Assign Class Homework</h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Class *</label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Due Date *</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Homework Description & Instructions *</label>
                <textarea
                  rows={3}
                  placeholder="Describe exercise numbers, page numbers, or topics..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              {/* Board Photo Upload */}
              <div className="p-3 bg-[#100d24] rounded-xl border border-purple-900/30 space-y-2">
                <div className="text-xs font-semibold text-purple-300 flex items-center justify-between">
                  <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" /> Upload Blackboard Photo (Optional)</span>
                  {boardPhotoUrl && (
                    <button
                      onClick={() => setBoardPhotoUrl('')}
                      className="text-[10px] text-rose-400 hover:underline flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" /> Delete Photo
                    </button>
                  )}
                </div>

                {boardPhotoUrl ? (
                  <img src={boardPhotoUrl} alt="Board Preview" className="w-full h-32 object-cover rounded-lg border border-purple-900/40" />
                ) : (
                  <label className="block w-full py-3 border border-dashed border-purple-800 rounded-xl text-center cursor-pointer hover:border-purple-500 transition-colors">
                    <span className="text-xs text-purple-300 font-medium">📷 Take / Upload Blackboard Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={resetForm} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md"
              >
                Save Homework
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Photo Lightbox */}
      {expandedPhotoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4" onClick={() => setExpandedPhotoUrl(null)}>
          <div className="relative max-w-3xl max-h-[90vh]">
            <img src={expandedPhotoUrl} alt="Expanded Board" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button className="absolute -top-10 right-0 text-white p-2 bg-black/60 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
