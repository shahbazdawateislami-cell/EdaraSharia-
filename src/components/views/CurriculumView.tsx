import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scroll, Zap, Plus, CheckCircle2, Circle, Trash2, X } from 'lucide-react';

export const CurriculumView: React.FC = () => {
  const { curriculum, addCurriculumChapter, toggleChapterCompleted, deleteCurriculumChapter, seedClassCurriculum, classes, role } = useApp();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapterNo, setChapterNo] = useState<number>(1);

  const filteredChapters = curriculum.filter(c => c.classId === selectedClassId && c.subject === selectedSubject);

  const handleSave = () => {
    if (!title.trim()) return;
    addCurriculumChapter({
      classId: selectedClassId,
      subject: selectedSubject,
      chapterNo,
      title,
      description,
      isCompleted: false
    });
    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  const completedCount = filteredChapters.filter(c => c.isCompleted).length;
  const progressPct = filteredChapters.length > 0 ? Math.round((completedCount / filteredChapters.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scroll className="w-5 h-5 text-purple-400" /> Syllabus & Curriculum Tracker
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Chapter completion progress, syllabus library generator, and topic tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => seedClassCurriculum(selectedClassId, selectedSubject)}
            className="px-3.5 py-2.5 bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-amber-600/50 transition-all shrink-0"
            title="Auto-populate full class syllabus from built-in curriculum library"
          >
            <Zap className="w-4 h-4 text-amber-400" /> ⚡ Add All Chapters
          </button>

          {(role === 'admin' || role === 'teacher') && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-purple-500 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Syllabus
            </button>
          )}
        </div>
      </div>

      {/* Selector & Progress Bar */}
      <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Class</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Subject</label>
              <input
                type="text"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 font-semibold"
              />
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Completion Status</div>
            <div className="text-lg font-bold text-purple-300 font-mono">{completedCount} / {filteredChapters.length} Chapters ({progressPct}%)</div>
          </div>
        </div>

        <div className="w-full h-2.5 bg-[#100d24] rounded-full overflow-hidden p-0.5 border border-purple-900/30">
          <div className="h-full bg-gradient-to-r from-purple-600 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {filteredChapters.map(ch => (
          <div
            key={ch.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
              ch.isCompleted
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-[#16122d] border-purple-900/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleChapterCompleted(ch.id)}
                className="text-emerald-400 hover:scale-110 transition-transform shrink-0"
              >
                {ch.isCompleted ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Circle className="w-6 h-6 text-slate-500" />}
              </button>

              <div>
                <div className="font-bold text-slate-100 text-sm">Chapter {ch.chapterNo}: {ch.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{ch.description}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                ch.isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-900/40 text-purple-300'
              }`}>
                {ch.isCompleted ? 'Completed' : 'In Progress'}
              </span>

              {(role === 'admin' || role === 'teacher') && (
                <button
                  onClick={() => deleteCurriculumChapter(ch.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Chapter Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">Add Curriculum Chapter</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Chapter Number</label>
                <input
                  type="number"
                  value={chapterNo}
                  onChange={(e) => setChapterNo(Number(e.target.value))}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Chapter Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Quadratic Equations"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  placeholder="Key topics covered..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md"
              >
                Save Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
