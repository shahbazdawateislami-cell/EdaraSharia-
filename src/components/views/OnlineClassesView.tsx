import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, Plus, ExternalLink, Trash2, Calendar, Clock, X, Check } from 'lucide-react';

export const OnlineClassesView: React.FC = () => {
  const { onlineClasses, addOnlineClass, deleteOnlineClass, classes, teachers, role } = useApp();
  const [showModal, setShowModal] = useState(false);

  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/abc-defg-hij');
  const [platform, setPlatform] = useState<'Google Meet' | 'Zoom' | 'Microsoft Teams' | 'In-App Live'>('Google Meet');

  const handleSave = () => {
    if (!subject.trim() || !meetingLink.trim()) return;
    addOnlineClass({
      classId,
      subject,
      topic,
      teacherId,
      date,
      startTime,
      endTime,
      meetingLink,
      platform
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" /> Virtual & Online Live Classes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Schedule live virtual interactive sessions, Google Meet / Zoom class links, and time schedules
          </p>
        </div>

        {(role === 'admin' || role === 'teacher') && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Schedule Online Class
          </button>
        )}
      </div>

      {/* Online Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {onlineClasses.map(oc => {
          const cls = classes.find(c => c.id === oc.classId);
          const teacher = teachers.find(t => t.id === oc.teacherId);

          return (
            <div
              key={oc.id}
              className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 transition-all space-y-4 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 font-bold text-[10px] uppercase border border-indigo-700/40">
                      {oc.platform}
                    </span>
                    <h3 className="font-bold text-white text-base mt-1">{oc.subject}</h3>
                    <div className="text-xs text-purple-300">{oc.topic}</div>
                  </div>

                  {(role === 'admin' || role === 'teacher') && (
                    <button
                      onClick={() => deleteOnlineClass(oc.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="p-3 bg-[#100d24] rounded-xl border border-purple-900/20 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Class:</span>
                    <span className="font-semibold">{cls ? cls.name : 'All Classes'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Instructor:</span>
                    <span className="font-semibold text-purple-200">{teacher ? teacher.name : 'Teacher'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Time:</span>
                    <span className="font-mono text-purple-300 font-semibold">{oc.startTime} - {oc.endTime}</span>
                  </div>
                </div>
              </div>

              <a
                href={oc.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Join Live Meeting Now
              </a>
            </div>
          );
        })}
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">Schedule Online Class</h3>

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
                  <label className="block text-slate-300 font-semibold mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="In-App Live">In-App Live</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Topic Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Algebra Ch 4"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Time</label>
                  <input
                    type="text"
                    placeholder="10:00 AM"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">End Time</label>
                  <input
                    type="text"
                    placeholder="11:00 AM"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Meeting Link *</label>
                <input
                  type="text"
                  placeholder="https://meet.google.com/..."
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
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
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
