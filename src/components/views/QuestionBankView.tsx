import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderArchive, Plus, Trash2, Check, Sparkles } from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { questionBank, addQuestion, deleteQuestion, classes, role } = useApp();

  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [selectedChapter, setSelectedChapter] = useState<string>('Algebraic Expressions');

  // Form
  const [type, setType] = useState<'MCQ' | 'Short Answer' | 'Long Answer' | 'True/False' | 'Fill in Blank'>('MCQ');
  const [questionText, setQuestionText] = useState('');
  const [marks, setMarks] = useState<number>(1);

  // MCQ Options
  const [mcqOptions, setMcqOptions] = useState<string[]>(['Option A', 'Option B', 'Option C', 'Option D']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);

  const handleSaveQuestion = () => {
    if (!questionText.trim()) return;

    addQuestion({
      classId: selectedClassId,
      subject: selectedSubject,
      chapter: selectedChapter,
      type,
      questionText,
      marks,
      mcqOptions: type === 'MCQ' ? mcqOptions : undefined,
      correctOptionIndex: type === 'MCQ' ? correctOptionIndex : undefined
    });

    // Reset only question text so fast bulk entry keeps class/subject/chapter!
    setQuestionText('');
    alert('✅ Question Saved to Bank! (Class/Subject retained for fast bulk entry)');
  };

  const filteredQuestions = questionBank.filter(
    q => q.classId === selectedClassId && q.subject.toLowerCase() === selectedSubject.toLowerCase()
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-purple-400" /> Exam Question Bank Repository
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build a comprehensive repository of MCQs, short/long questions to auto-generate exam papers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Panel: Add Question */}
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 h-fit">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-purple-400" /> Add Question to Bank
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Class *</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject *</label>
                <input
                  type="text"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Chapter Name</label>
                <input
                  type="text"
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-semibold"
                >
                  <option value="MCQ">MCQ (Multiple Choice)</option>
                  <option value="Short Answer">Short Answer</option>
                  <option value="Long Answer">Long Answer</option>
                  <option value="True/False">True / False</option>
                  <option value="Fill in Blank">Fill in the Blank</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Marks</label>
                <input
                  type="number"
                  min={1}
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Question Statement *</label>
              <textarea
                rows={3}
                placeholder="Type question wording clearly..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* MCQ Options Fields */}
            {type === 'MCQ' && (
              <div className="p-3 bg-[#100d24] rounded-xl border border-purple-900/30 space-y-2">
                <div className="text-[11px] font-bold text-purple-300">MCQ Options & Correct Answer Selection:</div>
                {mcqOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOpt"
                      checked={correctOptionIndex === idx}
                      onChange={() => setCorrectOptionIndex(idx)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...mcqOptions];
                        newOpts[idx] = e.target.value;
                        setMcqOptions(newOpts);
                      }}
                      className="flex-1 bg-[#16122e] border border-purple-900/40 rounded-lg px-2.5 py-1 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleSaveQuestion}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> ➕ Add Question
            </button>
          </div>
        </div>

        {/* Right List Panel: Questions in Repository */}
        <div className="lg:col-span-2 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Questions in Repository ({filteredQuestions.length})
            </h3>
            <span className="text-xs text-purple-300 font-mono">
              {selectedSubject} · Class {classes.find(c => c.id === selectedClassId)?.name}
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-[#100d24] border border-purple-900/30 rounded-2xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-bold text-[10px]">
                      Q{idx + 1} · {q.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">[{q.marks} Marks]</span>
                  </div>

                  {(role === 'admin' || role === 'teacher') && (
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="font-semibold text-slate-100 text-xs">{q.questionText}</div>

                {q.mcqOptions && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-mono text-slate-300">
                    {q.mcqOptions.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-1.5 rounded-lg border ${
                          q.correctOptionIndex === oIdx
                            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 font-bold'
                            : 'bg-[#16122e] border-purple-900/20'
                        }`}
                      >
                        ({String.fromCharCode(65 + oIdx)}) {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12 text-xs text-slate-500">
                No questions added to repository yet for this class & subject
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
