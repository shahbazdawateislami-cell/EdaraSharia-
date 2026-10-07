import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit3, Plus, Save, Trash2, X, FileSpreadsheet, CheckCircle2, Award } from 'lucide-react';

export const ExamsView: React.FC = () => {
  const {
    examSubjects,
    addExamSubject,
    deleteExamSubject,
    studentMarks,
    saveStudentMarks,
    classes,
    students,
    role
  } = useApp();

  const [activeTab, setActiveTab] = useState<'manage' | 'marks'>('marks');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedExamName, setSelectedExamName] = useState<string>('Mid Term');

  // New Exam Subject Form State
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [examNameInput, setExamNameInput] = useState('Mid Term');
  const [subjectInput, setSubjectInput] = useState('');
  const [maxMarksInput, setMaxMarksInput] = useState<number>(100);
  const [examDateInput, setExamDateInput] = useState(new Date().toISOString().split('T')[0]);

  // Marks Spreadsheet Local Matrix State
  const currentClassStudents = students.filter(s => s.classId === selectedClassId);
  const currentExamSubjects = examSubjects.filter(
    e => e.classId === selectedClassId && e.examName === selectedExamName
  );

  const [localMarksMatrix, setLocalMarksMatrix] = useState<{ [key: string]: number }>({});

  const getMarkValue = (studentId: string, examSubjectId: string): number => {
    const key = `${studentId}_${examSubjectId}`;
    if (localMarksMatrix[key] !== undefined) return localMarksMatrix[key];

    const existing = studentMarks.find(
      m => m.studentId === studentId && m.examSubjectId === examSubjectId
    );
    return existing ? existing.marksObtained : 0;
  };

  const handleMarkChange = (studentId: string, examSubjectId: string, val: number) => {
    const key = `${studentId}_${examSubjectId}`;
    setLocalMarksMatrix(prev => ({ ...prev, [key]: val }));
  };

  const handleSaveAllMarks = () => {
    const marksToSave: { studentId: string; examSubjectId: string; examName: string; marksObtained: number }[] = [];

    currentClassStudents.forEach(st => {
      currentExamSubjects.forEach(es => {
        const val = getMarkValue(st.id, es.id);
        marksToSave.push({
          studentId: st.id,
          examSubjectId: es.id,
          examName: selectedExamName,
          marksObtained: val
        });
      });
    });

    saveStudentMarks(marksToSave);
    alert('💾 All Exam Marks Saved Successfully!');
  };

  const handleAddSubject = () => {
    if (!subjectInput.trim()) return;
    addExamSubject({
      examName: examNameInput.trim() || 'Mid Term',
      classId: selectedClassId,
      subject: subjectInput,
      maxMarks: maxMarksInput,
      date: examDateInput
    });
    setShowSubjectModal(false);
    setSubjectInput('');
  };

  // Get distinct exam names
  const uniqueExamNames = Array.from(new Set(examSubjects.map(e => e.examName)));
  if (!uniqueExamNames.includes('Mid Term')) uniqueExamNames.push('Mid Term');
  if (!uniqueExamNames.includes('Unit Test 1')) uniqueExamNames.push('Unit Test 1');

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-purple-400" /> Exam Structure & Marks Sheet
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Define exam sessions, subjects, and enter student grades in spreadsheet matrix
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#100d24] border border-purple-900/40 rounded-xl">
          <button
            onClick={() => setActiveTab('marks')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'marks'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> 📝 Enter Marks
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'manage'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> 📋 Manage Exams
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-[#16122d] border border-purple-900/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 font-semibold"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Select Exam Session</label>
            <select
              value={selectedExamName}
              onChange={(e) => setSelectedExamName(e.target.value)}
              className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 font-semibold text-purple-300"
            >
              {uniqueExamNames.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        {activeTab === 'marks' ? (
          <button
            onClick={handleSaveAllMarks}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all shrink-0"
          >
            <Save className="w-4 h-4" /> 💾 Save All Marks
          </button>
        ) : (
          <button
            onClick={() => setShowSubjectModal(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Exam Subject
          </button>
        )}
      </div>

      {activeTab === 'marks' ? (
        /* Enter Marks Spreadsheet Matrix */
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl overflow-x-auto shadow-xl space-y-4">
          {currentExamSubjects.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-slate-400 text-sm">
                No exam subjects found for <strong className="text-white">{selectedExamName}</strong> in this class.
              </div>
              <button
                onClick={() => {
                  setExamNameInput(selectedExamName);
                  setShowSubjectModal(true);
                }}
                className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
              >
                + Add First Exam Subject
              </button>
            </div>
          ) : (
            <table className="w-full text-xs text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#100d24] text-purple-300 font-bold border-b border-purple-900/30">
                  <th className="p-3 w-16">Roll</th>
                  <th className="p-3 w-44">Student Name</th>
                  {currentExamSubjects.map(es => (
                    <th key={es.id} className="p-3 text-center">
                      <div>{es.subject}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Max: {es.maxMarks}</div>
                    </th>
                  ))}
                  <th className="p-3 text-center w-20">Total</th>
                  <th className="p-3 text-center w-20">Percentage</th>
                  <th className="p-3 text-center w-20">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20 text-slate-200">
                {currentClassStudents.map(student => {
                  let studentTotal = 0;
                  let studentMaxTotal = 0;

                  currentExamSubjects.forEach(es => {
                    const val = getMarkValue(student.id, es.id);
                    studentTotal += val;
                    studentMaxTotal += es.maxMarks;
                  });

                  const pct = studentMaxTotal > 0 ? Math.round((studentTotal / studentMaxTotal) * 100) : 0;
                  const isPass = pct >= 40;

                  return (
                    <tr key={student.id} className="hover:bg-[#1b1638]">
                      <td className="p-3 font-mono font-bold text-purple-300">{student.rollNo}</td>
                      <td className="p-3 font-semibold text-slate-100">{student.name}</td>

                      {currentExamSubjects.map(es => {
                        const val = getMarkValue(student.id, es.id);
                        return (
                          <td key={es.id} className="p-2 text-center">
                            <input
                              type="number"
                              min={0}
                              max={es.maxMarks}
                              value={val}
                              onChange={(e) => handleMarkChange(student.id, es.id, Number(e.target.value))}
                              className="w-16 bg-[#100d24] border border-purple-900/40 text-center font-mono font-bold text-white rounded-lg py-1 focus:outline-none focus:border-purple-500"
                            />
                          </td>
                        );
                      })}

                      <td className="p-3 text-center font-mono font-bold text-purple-200">
                        {studentTotal} / {studentMaxTotal}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-purple-300">
                        {pct}%
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isPass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {isPass ? 'PASS' : 'FAIL'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        /* Manage Exam Subjects Tab */
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white">Configured Exam Subjects ({selectedExamName})</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentExamSubjects.map(es => (
              <div key={es.id} className="p-4 bg-[#100d24] border border-purple-900/30 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{es.subject}</div>
                  <div className="text-xs text-purple-300">Max Marks: {es.maxMarks}</div>
                  <div className="text-[10px] text-slate-400">Date: {es.date}</div>
                </div>

                {role === 'admin' && (
                  <button
                    onClick={() => deleteExamSubject(es.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Exam Subject Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowSubjectModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">Add Exam Subject</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Exam Session Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Mid Term"
                  value={examNameInput}
                  onChange={(e) => setExamNameInput(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarksInput}
                    onChange={(e) => setMaxMarksInput(Number(e.target.value))}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Exam Date</label>
                  <input
                    type="date"
                    value={examDateInput}
                    onChange={(e) => setExamDateInput(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-900/30">
              <button onClick={() => setShowSubjectModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md"
              >
                Save Exam Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
