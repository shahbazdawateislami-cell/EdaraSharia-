import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Calendar,
  Megaphone,
  MessageCircle,
  FileSpreadsheet,
  Trophy,
  Image as ImageIcon,
  Cake,
  Globe,
  Send,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Search
} from 'lucide-react';

export const CommunicationView: React.FC<{ subTab: string }> = ({ subTab }) => {
  const {
    messages, sendMessage,
    notices, addNotice, deleteNotice,
    leaveRequests, addLeaveRequest, updateLeaveStatus,
    calendarEvents, addCalendarEvent,
    galleryImages, addGalleryImage,
    students, teachers, classes, studentMarks, examSubjects, settings,
    role, currentUserId
  } = useApp();

  // Chat message state
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>('admin');
  const [msgContent, setMsgContent] = useState('');

  // Notice form
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeType, setNoticeType] = useState<'General' | 'Urgent' | 'Information'>('Urgent');

  // Leave Form
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState<'Sick Leave' | 'Casual Leave' | 'Emergency' | 'Other'>('Casual Leave');
  const [leaveStart, setLeaveStart] = useState(new Date().toISOString().split('T')[0]);
  const [leaveEnd, setLeaveEnd] = useState(new Date().toISOString().split('T')[0]);
  const [leaveReason, setLeaveReason] = useState('');

  // WhatsApp/SMS state
  const [smsText, setSmsText] = useState('Dear Parent, your ward attendance status and academic update is available on Edara Sharia portal.');
  const [smsSentLog, setSmsSentLog] = useState<{ id: string; time: string; text: string }[]>([]);

  // Leaderboard filters
  const [lbClassId, setLbClassId] = useState(classes[0]?.id || '');
  const [lbExamFilter, setLbExamFilter] = useState('All');

  const handleSendChatMessage = () => {
    if (!msgContent.trim()) return;
    sendMessage(selectedRecipientId, msgContent);
    setMsgContent('');
  };

  const handlePostNotice = () => {
    if (!noticeTitle.trim() || !noticeBody.trim()) return;
    addNotice({
      title: noticeTitle,
      content: noticeBody,
      type: noticeType,
      audience: 'All',
      postedBy: role === 'admin' ? 'Principal Office' : 'Class Teacher'
    });
    setShowNoticeModal(false);
    setNoticeTitle('');
    setNoticeBody('');
  };

  const handleApplyLeave = () => {
    if (!leaveReason.trim()) return;
    let name = 'User';
    if (role === 'teacher') {
      const t = teachers.find(x => x.id === currentUserId);
      if (t) name = t.name;
    } else {
      const s = students.find(x => x.id === currentUserId);
      if (s) name = s.name;
    }

    addLeaveRequest({
      applicantType: role === 'teacher' ? 'Teacher' : 'Student',
      applicantId: currentUserId,
      applicantName: name,
      leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason
    });
    setShowLeaveModal(false);
    setLeaveReason('');
  };

  const handleSendBulkSMS = () => {
    if (!smsText.trim()) return;
    setSmsSentLog(prev => [{
      id: 'sms_' + Date.now(),
      time: new Date().toLocaleTimeString(),
      text: smsText
    }, ...prev]);
    alert('📱 WhatsApp & SMS Broadcast sent to all parent mobile numbers successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Subtab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 capitalize">
            {subTab === 'messages' && <MessageSquare className="w-5 h-5 text-purple-400" />}
            {subTab === 'calendar' && <Calendar className="w-5 h-5 text-indigo-400" />}
            {subTab === 'notices' && <Megaphone className="w-5 h-5 text-rose-400" />}
            {subTab === 'whatsapp-sms' && <MessageCircle className="w-5 h-5 text-emerald-400" />}
            {subTab === 'leave-requests' && <FileSpreadsheet className="w-5 h-5 text-amber-400" />}
            {subTab === 'leaderboard' && <Trophy className="w-5 h-5 text-yellow-400" />}
            {subTab === 'school-gallery' && <ImageIcon className="w-5 h-5 text-purple-400" />}
            {subTab === 'birthdays' && <Cake className="w-5 h-5 text-rose-400" />}
            {subTab === 'website' && <Globe className="w-5 h-5 text-teal-400" />}
            {subTab.replace('-', ' ')}
          </h2>
          <p className="text-xs text-slate-400 mt-1">Communication & Student Engagement Hub</p>
        </div>

        {subTab === 'notices' && (
          <button onClick={() => setShowNoticeModal(true)} className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> ➕ Post Notice
          </button>
        )}

        {subTab === 'leave-requests' && (
          <button onClick={() => setShowLeaveModal(true)} className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> 📅 Apply For Leave
          </button>
        )}
      </div>

      {/* Messages */}
      {subTab === 'messages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px] bg-[#16122d] border border-purple-900/30 rounded-2xl overflow-hidden shadow-2xl">
          {/* Recipient List */}
          <div className="border-r border-purple-900/30 bg-[#100d24] p-3 space-y-2 overflow-y-auto">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">Select Contact</div>
            <div
              onClick={() => setSelectedRecipientId('admin')}
              className={`p-3 rounded-xl border text-xs cursor-pointer ${
                selectedRecipientId === 'admin' ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#16122e] text-slate-300 border-purple-900/20'
              }`}
            >
              👑 Admin Office
            </div>
            {teachers.map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedRecipientId(t.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer ${
                  selectedRecipientId === t.id ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#16122e] text-slate-300 border-purple-900/20'
                }`}
              >
                👩‍🏫 {t.name} ({t.subject})
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 flex flex-col justify-between p-4 bg-[#16122d]">
            <div className="space-y-3 overflow-y-auto flex-1 pr-2">
              {messages
                .filter(m => (m.senderId === currentUserId && m.receiverId === selectedRecipientId) || (m.senderId === selectedRecipientId && m.receiverId === currentUserId))
                .map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderId === currentUserId ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl text-xs max-w-sm ${
                      msg.senderId === currentUserId ? 'bg-purple-600 text-white' : 'bg-[#100d24] text-slate-200 border border-purple-900/30'
                    }`}>
                      <div className="text-[10px] text-purple-200 font-semibold mb-0.5">{msg.senderName}</div>
                      <p>{msg.content}</p>
                      <div className="text-[9px] opacity-70 text-right mt-1 font-mono">{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-purple-900/30">
              <input
                type="text"
                placeholder="Type internal message..."
                value={msgContent}
                onChange={(e) => setMsgContent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                className="flex-1 bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2.5"
              />
              <button onClick={handleSendChatMessage} className="p-2.5 bg-purple-600 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notices */}
      {subTab === 'notices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map(n => (
            <div key={n.id} className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{n.title}</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">{n.type}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#100d24] p-3 rounded-xl border border-purple-900/20">{n.content}</p>
              <div className="flex justify-between text-[10px] text-purple-400 font-mono pt-1">
                <span>By: {n.postedBy}</span>
                <span>Date: {n.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leave Requests */}
      {subTab === 'leave-requests' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Leave Requests Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#100d24] text-purple-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Leave Category</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  {role === 'admin' && <th className="p-3">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20 text-slate-200">
                {leaveRequests.map(l => (
                  <tr key={l.id} className="hover:bg-[#1b1638]">
                    <td className="p-3 font-semibold text-white">{l.applicantName}</td>
                    <td className="p-3">{l.applicantType}</td>
                    <td className="p-3 text-purple-300 font-medium">{l.leaveType}</td>
                    <td className="p-3 font-mono text-slate-400">{l.startDate} to {l.endDate}</td>
                    <td className="p-3 text-slate-300 max-w-xs truncate">{l.reason}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        l.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : l.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="p-3 flex items-center gap-1">
                        {l.status === 'Pending' && (
                          <>
                            <button onClick={() => updateLeaveStatus(l.id, 'Approved')} className="p-1 bg-emerald-600 text-white rounded"><CheckCircle2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => updateLeaveStatus(l.id, 'Rejected')} className="p-1 bg-rose-600 text-white rounded"><XCircle className="w-3.5 h-3.5" /></button>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {subTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#16122d] border border-purple-900/30 rounded-2xl flex items-center justify-between">
            <select value={lbClassId} onChange={(e) => setLbClassId(e.target.value)} className="bg-[#100d24] border border-purple-900/40 text-slate-100 text-xs rounded-xl px-3 py-2">
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center max-w-xl mx-auto">
            <div className="p-5 bg-[#16122d] border border-amber-500/40 rounded-2xl space-y-2">
              <div className="text-3xl">🥇</div>
              <div className="font-bold text-amber-300 text-sm">Aaradhya Khan</div>
              <div className="text-xs text-slate-400 font-mono">279 / 300 Marks (93.0%)</div>
            </div>
            <div className="p-5 bg-[#16122d] border border-slate-400/40 rounded-2xl space-y-2">
              <div className="text-3xl">🥈</div>
              <div className="font-bold text-slate-200 text-sm">Zoya Fatima</div>
              <div className="text-xs text-slate-400 font-mono">286 / 300 Marks (95.3%)</div>
            </div>
            <div className="p-5 bg-[#16122d] border border-amber-800/40 rounded-2xl space-y-2">
              <div className="text-3xl">🥉</div>
              <div className="font-bold text-amber-600 text-sm">Rudra Pratap</div>
              <div className="text-xs text-slate-400 font-mono">203 / 300 Marks (67.6%)</div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp & SMS */}
      {subTab === 'whatsapp-sms' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp & SMS Parental Notification Broadcast
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Message Template</label>
              <textarea rows={3} value={smsText} onChange={(e) => setSmsText(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl p-3 text-white" />
            </div>
            <button onClick={handleSendBulkSMS} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg">
              📱 Send Broadcast to All Parents
            </button>
          </div>
        </div>
      )}

      {/* Website Preview */}
      {subTab === 'website' && (
        <div className="p-8 bg-white text-slate-900 rounded-2xl shadow-2xl space-y-6 max-w-4xl mx-auto border">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl font-extrabold text-purple-900">{settings.name}</h1>
            <div className="text-xs text-slate-600">{settings.tagline}</div>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Welcome to the official portal of <strong>{settings.name}</strong>. Providing world-class Islamic & Modern academic education.
          </p>
        </div>
      )}

      {/* Birthdays */}
      {subTab === 'birthdays' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">🎂 Upcoming Birthdays</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {students.slice(0, 3).map(s => (
              <div key={s.id} className="p-3 bg-[#100d24] border border-purple-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{s.name} (Student)</div>
                  <div className="text-[10px] text-purple-300">DOB: {s.dob}</div>
                </div>
                <span className="text-lg">🎉</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowNoticeModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white">Post Announcement Notice</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notice Title *</label>
                <input type="text" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notice Content *</label>
                <textarea rows={3} value={noticeBody} onChange={(e) => setNoticeBody(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowNoticeModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handlePostNotice} className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl">Post Notice</button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowLeaveModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white">Apply For Leave</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reason</label>
                <textarea rows={2} value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowLeaveModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handleApplyLeave} className="px-4 py-2 text-xs font-bold bg-amber-600 text-white rounded-xl">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
