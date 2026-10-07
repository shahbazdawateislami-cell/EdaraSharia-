import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge, FileSpreadsheet, Award, Printer, Edit2, Eye, X } from 'lucide-react';

export const IDCardsReportCardsView: React.FC<{ subTab: 'id-cards' | 'report-cards' | 'exam-insights' | 'certificates' }> = ({ subTab }) => {
  const {
    students,
    teachers,
    classes,
    examSubjects,
    studentMarks,
    attendance,
    settings,
    role,
    currentUserId
  } = useApp();

  const [idTheme, setIdTheme] = useState<'Royal' | 'Ocean' | 'Forest' | 'Sunset'>('Royal');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedExamType, setSelectedExamType] = useState<string>('Mid Term');
  const [publishParentsExam, setPublishParentsExam] = useState<string>('Mid Term');

  // Preview Modal
  const [previewStudent, setPreviewStudent] = useState<any | null>(null);

  // Certificate Modal State
  const [showCertModal, setShowModalCert] = useState(false);
  const [certType, setCertType] = useState<'Merit' | 'Transfer'>('Merit');
  const [certStudentId, setCertStudentId] = useState(students[0]?.id || '');
  const [previewCertData, setPreviewCert] = useState<any | null>(null);

  const themeGradients = {
    Royal: 'from-purple-900 via-indigo-900 to-[#120f26] border-purple-500/50 text-white',
    Ocean: 'from-teal-900 via-emerald-900 to-[#0f2420] border-teal-500/50 text-white',
    Forest: 'from-emerald-900 via-green-950 to-[#0a1e12] border-emerald-500/50 text-white',
    Sunset: 'from-rose-900 via-orange-950 to-[#230f14] border-rose-500/50 text-white'
  };

  const filteredStudents = students.filter(s => role === 'student' ? s.id === currentUserId : (selectedClassId === 'all' || s.classId === selectedClassId));

  const handleGenerateCertificate = () => {
    const st = students.find(s => s.id === certStudentId);
    if (!st) return;
    const cls = classes.find(c => c.id === st.classId);

    setPreviewCert({
      type: certType,
      studentName: st.name,
      rollNo: st.rollNo,
      className: cls ? cls.name : 'Class 6A',
      fatherName: st.fatherName,
      schoolName: settings.name,
      logoUrl: settings.logoUrl,
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    });
    setShowModalCert(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      {subTab === 'id-cards' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#181335] border border-purple-900/30 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Badge className="w-5 h-5 text-purple-400" /> Digital ID Cards Generator
            </h2>
            <p className="text-xs text-slate-400 mt-1">Generate professional student & teacher ID cards with 4 visual themes</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#110e28] border border-purple-900/40 rounded-xl">
              {(['Royal', 'Ocean', 'Forest', 'Sunset'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setIdTheme(t)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    idTheme === t ? 'bg-purple-600 text-white' : 'text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button onClick={() => window.print()} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg">
              <Printer className="w-4 h-4" /> 🖨️ Print All Cards
            </button>
          </div>
        </div>
      )}

      {subTab === 'report-cards' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#181335] border border-purple-900/30 rounded-2xl shadow-xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-400" /> Academic Report Cards
              </h2>
              <p className="text-xs text-slate-400 mt-1">Student progress cards, performance metrics, and printable terminal mark sheets</p>
            </div>
          </div>

          {/* Report Card Filter Bar (Exact Match to Screenshot 1) */}
          <div className="p-4 bg-[#181335] border border-purple-900/30 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Class</label>
                <select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)} className="bg-[#110e28] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 font-semibold min-w-[120px]">
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Exam Type</label>
                <select value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)} className="bg-[#110e28] border border-purple-900/40 text-purple-300 text-xs rounded-xl px-3 py-2 font-bold min-w-[120px]">
                  <option value="Mid Term">Mid Term</option>
                  <option value="Unit Test 1">Unit Test 1</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Publish to Parents</label>
                <select value={publishParentsExam} onChange={(e) => setPublishParentsExam(e.target.value)} className="bg-[#110e28] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2 min-w-[120px]">
                  <option value="Mid Term">Mid Term</option>
                  <option value="Unit Test 1">Unit Test 1</option>
                </select>
              </div>
            </div>

            <div className="px-3 py-1.5 bg-[#211b47] border border-purple-800/40 text-purple-300 rounded-xl text-xs font-mono font-semibold">
              3 subject(s) · Max 300 marks
            </div>
          </div>
        </div>
      )}

      {/* ID Cards View */}
      {subTab === 'id-cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStudents.map(student => {
            const cls = classes.find(c => c.id === student.classId);

            return (
              <div
                key={student.id}
                className={`p-5 rounded-2xl border bg-gradient-to-br shadow-2xl space-y-4 relative overflow-hidden ${themeGradients[idTheme]}`}
              >
                <div className="flex items-center gap-3 border-b border-white/20 pb-3">
                  {settings.logoUrl && (
                    <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/50" />
                  )}
                  <div>
                    <h4 className="font-extrabold text-sm tracking-tight uppercase">{settings.name}</h4>
                    <div className="text-[10px] text-white/80">{settings.tagline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {student.photoUrl ? (
                    <img src={student.photoUrl} alt={student.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/40 shadow-md" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-black/30 border border-white/30 flex items-center justify-center font-bold text-lg">
                      {student.name.slice(0, 2)}
                    </div>
                  )}

                  <div className="text-xs space-y-0.5">
                    <div className="font-extrabold text-base leading-tight">{student.name}</div>
                    <div className="text-purple-200 font-medium">Roll No: <span className="font-mono font-bold text-white">{student.rollNo}</span></div>
                    <div className="text-[11px] text-white/90">Class: <strong>{cls ? cls.name : 'N/A'}</strong></div>
                    <div className="text-[10px] text-white/70">Phone: {student.phone}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/20 flex justify-between text-[10px] text-white/80 font-mono">
                  <span>Blood: {student.bloodGroup}</span>
                  <span>Session: {settings.session}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Report Cards Grid (Exact Match to Screenshot 1) */}
      {subTab === 'report-cards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStudents.map(student => {
            const cls = classes.find(c => c.id === student.classId);
            const examSubs = examSubjects.filter(e => e.classId === student.classId && e.examName === selectedExamType);

            let totalObtained = 0;
            let totalMax = 0;

            examSubs.forEach(sub => {
              const markObj = studentMarks.find(m => m.studentId === student.id && m.examSubjectId === sub.id);
              totalObtained += markObj ? markObj.marksObtained : 0;
              totalMax += sub.maxMarks;
            });

            if (totalMax === 0) totalMax = 300;

            const pct = Math.round((totalObtained / totalMax) * 100);
            const gradeLetter = pct >= 90 ? 'A+' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'F';
            const gradeSub = pct >= 90 ? 'Outstanding' : pct >= 75 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Average' : 'Needs Improvement';
            const gradeColor = pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-cyan-400' : 'text-amber-400';

            const studentRecords = attendance.filter(a => a.studentId === student.id);
            const totalAttDays = Math.max(1, studentRecords.length);
            const presentDays = studentRecords.filter(a => a.status === 'Present' || a.status === 'Late').length;
            const attPct = Math.round((presentDays / totalAttDays) * 100);

            return (
              <div
                key={student.id}
                className="p-6 bg-[#181335] border border-purple-900/30 rounded-3xl space-y-4 text-center shadow-xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Circular Student Avatar Top Center */}
                <div className="space-y-3">
                  <div className="relative w-20 h-20 mx-auto">
                    {student.photoUrl ? (
                      <img src={student.photoUrl} alt={student.name} className="w-full h-full rounded-full object-cover ring-2 ring-purple-500/50 shadow-xl" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-purple-900/50 border border-purple-600 flex items-center justify-center font-bold text-xl text-purple-200">
                        {student.name.slice(0, 2)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-white text-base">{student.name}</h3>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      Roll: {student.rollNo}
                    </div>
                    <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-900/40 text-purple-300 text-[10px] font-semibold border border-purple-800/40">
                      🏷️ {selectedExamType}
                    </div>
                  </div>

                  {/* Big Grade Badge */}
                  <div className="py-2 space-y-0.5">
                    <div className={`text-4xl font-black ${gradeColor} font-mono tracking-tight`}>
                      {gradeLetter}
                    </div>
                    <div className={`text-xs font-bold ${gradeColor}`}>
                      {gradeSub}
                    </div>
                    <div className="text-xs text-slate-400 font-mono pt-1">
                      {pct}% │ {totalObtained}/{totalMax} marks
                    </div>
                    <div className="text-xs text-rose-400 font-semibold font-mono pt-0.5">
                      🎒 Attendance: {attPct}%
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-[#110e28] rounded-full overflow-hidden">
                    <div className={`h-full ${pct >= 75 ? 'bg-teal-400' : 'bg-amber-400'} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {/* Bottom Action Buttons (Matching Screenshot 1) */}
                <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-purple-900/20 text-xs">
                  <button
                    onClick={() => setPreviewStudent(student)}
                    className="py-2 bg-[#2c1a63] hover:bg-purple-600 text-purple-200 hover:text-white rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => setPreviewStudent(student)}
                    className="py-2 bg-[#2c1a63] hover:bg-purple-600 text-purple-200 hover:text-white rounded-xl font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                  <button
                    onClick={() => setPreviewStudent(student)}
                    className="py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-1 transition-all shadow-md"
                  >
                    <Printer className="w-3 h-3" /> Print
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Report Card Sheet Modal */}
      {previewStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl p-8 shadow-2xl relative space-y-6 border border-slate-300 my-8">
            <button onClick={() => setPreviewStudent(null)} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-black">
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              {settings.logoUrl && (
                <img src={settings.logoUrl} alt="Logo" className="w-12 h-12 mx-auto rounded-full object-cover mb-1" />
              )}
              <h1 className="text-2xl font-extrabold uppercase tracking-tight">{settings.name}</h1>
              <div className="text-xs text-slate-600 font-semibold">{settings.tagline} · {settings.academicYear}</div>
              <div className="text-sm font-bold text-purple-900 pt-1 uppercase">Academic Progress Report ({selectedExamType})</div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold p-3 bg-slate-100 rounded-xl border border-slate-300">
              <div>Student Name: <span className="font-bold text-slate-900">{previewStudent.name}</span></div>
              <div>Roll Number: <span className="font-mono font-bold text-slate-900">{previewStudent.rollNo}</span></div>
              <div>Class & Section: <span className="text-slate-900">{classes.find(c => c.id === previewStudent.classId)?.name || 'Class 6A'}</span></div>
              <div>Attendance Rate: <span className="text-emerald-700 font-bold">100%</span></div>
            </div>

            {/* Marks Table */}
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead className="bg-slate-900 text-white font-bold uppercase">
                <tr>
                  <th className="p-2.5 border">Subject</th>
                  <th className="p-2.5 border text-center">Max Marks</th>
                  <th className="p-2.5 border text-center">Marks Obtained</th>
                  <th className="p-2.5 border text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {examSubjects.filter(e => e.classId === previewStudent.classId && e.examName === selectedExamType).map(sub => {
                  const markObj = studentMarks.find(m => m.studentId === previewStudent.id && m.examSubjectId === sub.id);
                  const mark = markObj ? markObj.marksObtained : 90;
                  return (
                    <tr key={sub.id}>
                      <td className="p-2.5 border font-semibold">{sub.subject}</td>
                      <td className="p-2.5 border text-center font-mono">{sub.maxMarks}</td>
                      <td className="p-2.5 border text-center font-mono font-bold">{mark}</td>
                      <td className="p-2.5 border text-center font-mono font-bold text-purple-900">A+</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Signature */}
            <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs font-semibold text-slate-700">
              <div className="border-t border-slate-400 pt-1">Class Teacher Signature</div>
              <div className="border-t border-slate-400 pt-1">Principal / Admin Seal</div>
            </div>

            <div className="pt-2 text-right">
              <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 ml-auto">
                <Printer className="w-4 h-4" /> 🖨️ Print Report Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificates View */}
      {subTab === 'certificates' && (
        <div className="p-5 bg-[#181335] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Issued Certificates Directory</h3>
          {previewCertData ? (
            <div className="bg-white text-slate-900 p-8 rounded-2xl border-4 border-amber-500 shadow-2xl max-w-2xl mx-auto space-y-6 text-center">
              <h1 className="text-2xl font-extrabold uppercase text-amber-700 tracking-wider">{previewCertData.schoolName}</h1>
              <div className="text-lg font-extrabold uppercase tracking-widest text-slate-900 border-b pb-2">
                {previewCertData.type === 'Merit' ? '🎖️ CERTIFICATE OF ACADEMIC MERIT' : '📜 TRANSFER CERTIFICATE (TC)'}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-serif">
                This is to proudly certify that <strong className="text-slate-900 text-base">{previewCertData.studentName}</strong>, Son/Daughter of <strong>{previewCertData.fatherName}</strong>, Roll No <strong>{previewCertData.rollNo}</strong> of Class <strong>{previewCertData.className}</strong> has successfully completed the required academic standard with exemplary conduct.
              </p>
              <div className="flex justify-between items-end pt-8 text-xs font-semibold text-slate-700">
                <div>Date: {previewCertData.issueDate}</div>
                <div className="border-t border-slate-400 px-6 pt-1">Principal Signature</div>
              </div>
              <button onClick={() => window.print()} className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 mx-auto">
                <Printer className="w-4 h-4" /> Print Official Certificate
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Click "Issue Certificate" above to generate Merit or Transfer Certificates
            </div>
          )}
        </div>
      )}
    </div>
  );
};
