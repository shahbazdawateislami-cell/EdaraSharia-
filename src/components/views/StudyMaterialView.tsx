import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Folder, Upload, Download, Trash2, X, FileText } from 'lucide-react';

export const StudyMaterialView: React.FC = () => {
  const { studyMaterial, addStudyMaterial, deleteStudyMaterial, classes, role } = useApp();
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [fileType, setFileType] = useState('PDF');

  const handleSave = () => {
    if (!title.trim() || !subject.trim()) return;
    addStudyMaterial({
      classId,
      subject,
      title,
      fileUrl: '#',
      fileType,
      uploadedBy: role === 'teacher' ? 'Class Teacher' : 'Admin Office'
    });
    setShowModal(false);
    setTitle('');
    setSubject('');
  };

  const filteredMaterials = studyMaterial.filter(s => selectedClassId === 'all' || s.classId === selectedClassId);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Folder className="w-5 h-5 text-purple-400" /> Study Material & Notes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload revision notes, PDF worksheets, and study guides for students to download
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-[#100d24] border border-purple-900/40 text-slate-200 text-xs rounded-xl px-3 py-2.5"
          >
            <option value="all">All Classes ({studyMaterial.length})</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {(role === 'admin' || role === 'teacher') && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shrink-0"
            >
              <Upload className="w-4 h-4" /> 📤 Upload Material
            </button>
          )}
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map(mat => {
          const cls = classes.find(c => c.id === mat.classId);

          return (
            <div
              key={mat.id}
              className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-purple-900/30 rounded-xl text-purple-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  {(role === 'admin' || role === 'teacher') && (
                    <button
                      onClick={() => deleteStudyMaterial(mat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-bold text-[10px]">
                    {cls ? cls.name : 'Class'} · {mat.subject}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1">{mat.title}</h3>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-900/20 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>By: {mat.uploadedBy}</span>
                  <span>{mat.uploadDate}</span>
                </div>

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`⬇ Downloading study material: ${mat.title}`); }}
                  className="w-full py-2 bg-[#100d24] hover:bg-purple-900/30 border border-purple-900/40 text-purple-300 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download File ({mat.fileType})
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">Upload Study Material</h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Class *</label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">File Format</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="Word">Word Document</option>
                    <option value="Image">Image / Chart</option>
                  </select>
                </div>
              </div>

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
                <label className="block text-slate-300 font-semibold mb-1">Document Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 4 Practice Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="p-4 border border-dashed border-purple-800 rounded-xl text-center bg-[#100d24] cursor-pointer hover:border-purple-500">
                <Upload className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <span className="text-xs text-slate-300 font-semibold">Choose File (PDF, DOCX, PNG)</span>
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
                Save Material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
