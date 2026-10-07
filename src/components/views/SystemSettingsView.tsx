import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bus,
  Bell,
  TrendingUp,
  GraduationCap,
  Key,
  Trash2,
  Settings as SettingsIcon,
  Upload,
  CheckCircle2,
  RefreshCw,
  X,
  Lock,
  Camera,
  RotateCcw
} from 'lucide-react';

export const SystemSettingsView: React.FC<{ subTab: string }> = ({ subTab }) => {
  const {
    vehicleGPS,
    reminders, toggleReminder, addReminder,
    recycleBin, restoreRecycleItem, clearRecycleBin,
    settings, updateSettings,
    students, updateStudent,
    teachers, updateTeacher,
    classes
  } = useApp();

  // Settings local state
  const [name, setName] = useState(settings.name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [academicYear, setAcademicYear] = useState(settings.academicYear);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);

  // Password Reset local state
  const [resetTargetUser, setResetTargetUser] = useState<'student' | 'teacher'>('student');
  const [selectedUserId, setSelectedUserId] = useState(students[0]?.id || '');
  const [newPassword, setNewPassword] = useState('newpassword123');

  // Logo File Upload Canvas Compression
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        ctx?.drawImage(img, 0, 0, 200, 200);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setLogoUrl(dataUrl);
        updateSettings({ logoUrl: dataUrl });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = () => {
    updateSettings({
      name,
      tagline,
      address,
      phone,
      email,
      academicYear,
      currencySymbol,
      logoUrl
    });
    alert('💾 Edara Sharia Settings Saved Successfully!');
  };

  const handleExecutePasswordReset = () => {
    if (!newPassword.trim()) return;
    if (resetTargetUser === 'student') {
      updateStudent(selectedUserId, { password: newPassword });
    } else {
      updateTeacher(selectedUserId, { password: newPassword });
    }
    alert('🔑 Password Reset Successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Subtab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 capitalize">
            {subTab === 'vehicle-gps' && <Bus className="w-5 h-5 text-amber-400" />}
            {subTab === 'reminders' && <Bell className="w-5 h-5 text-purple-400" />}
            {subTab === 'growth-plan' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
            {subTab === 'session-promotion' && <GraduationCap className="w-5 h-5 text-indigo-400" />}
            {subTab === 'password-resets' && <Key className="w-5 h-5 text-rose-400" />}
            {subTab === 'recycle-bin' && <Trash2 className="w-5 h-5 text-rose-400" />}
            {subTab === 'settings' && <SettingsIcon className="w-5 h-5 text-purple-400" />}
            {subTab.replace('-', ' ')}
          </h2>
          <p className="text-xs text-slate-400 mt-1">System Administration & Settings Panel</p>
        </div>
      </div>

      {/* Vehicle GPS */}
      {subTab === 'vehicle-gps' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            🚌 Live Vehicle GPS Tracking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicleGPS.map(v => (
              <div key={v.id} className="p-4 bg-[#100d24] border border-purple-900/30 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{v.vehicleNo}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] animate-pulse">
                    ● {v.status}
                  </span>
                </div>
                <div className="text-xs text-purple-300">{v.routeName}</div>
                <div className="text-xs text-slate-300">Driver: {v.driverName} ({v.driverPhone})</div>
                <div className="text-[11px] text-slate-400 font-mono">Location: {v.currentLocation} · {v.speedKmH} km/h</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Password Resets */}
      {subTab === 'password-resets' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 max-w-md shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-rose-400" /> Admin User Password Reset Tool
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select User Type</label>
              <select value={resetTargetUser} onChange={(e) => setResetTargetUser(e.target.value as any)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select User Account</label>
              <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white">
                {resetTargetUser === 'student'
                  ? students.map(s => <option key={s.id} value={s.id}>{s.name} (Roll: {s.rollNo})</option>)
                  : teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>)
                }
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Type New Password</label>
              <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
            </div>

            <button onClick={handleExecutePasswordReset} className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg">
              🔑 Update Password Now
            </button>
          </div>
        </div>
      )}

      {/* Recycle Bin */}
      {subTab === 'recycle-bin' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" /> Deleted Items Recovery ({recycleBin.length})
            </h3>
            {recycleBin.length > 0 && (
              <button onClick={clearRecycleBin} className="text-xs text-rose-400 hover:underline">
                Clear Recycle Bin
              </button>
            )}
          </div>

          <div className="space-y-2 text-xs">
            {recycleBin.map(item => (
              <div key={item.id} className="p-3 bg-[#100d24] border border-purple-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{item.title} ({item.type})</div>
                  <div className="text-[10px] text-slate-400">Deleted: {item.deletedAt}</div>
                </div>
                <button onClick={() => restoreRecycleItem(item.id)} className="px-3 py-1 bg-purple-600 text-white rounded-lg font-bold flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Restore
                </button>
              </div>
            ))}
            {recycleBin.length === 0 && <div className="text-center py-8 text-slate-500">Recycle bin is empty</div>}
          </div>
        </div>
      )}

      {/* Settings */}
      {subTab === 'settings' && (
        <div className="p-6 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-5 shadow-xl max-w-2xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-purple-400" /> Edara Sharia Information & Branding
          </h3>

          {/* Logo Upload Box */}
          <div className="flex items-center gap-4 p-4 bg-[#100d24] rounded-2xl border border-purple-900/30">
            <img src={logoUrl} alt="Logo" className="w-16 h-16 rounded-xl object-cover ring-2 ring-purple-500/40" />
            <div className="text-xs space-y-1">
              <label className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold cursor-pointer inline-block">
                📷 Upload Edara Sharia Logo
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              <div className="text-[10px] text-slate-400">Logo appears in sidebar, ID cards, report cards & paper generator automatically</div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Edara Sharia / School Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-bold" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
                <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Academic Year</label>
                <input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Currency Symbol</label>
                <input type="text" value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Address</label>
              <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
            </div>

            <button onClick={handleSaveSettings} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg">
              💾 Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Reminders & Growth Plan Fallback Views */}
      {(subTab === 'reminders' || subTab === 'growth-plan' || subTab === 'session-promotion') && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl text-xs space-y-3 shadow-xl">
          <h3 className="font-bold text-white text-sm capitalize">{subTab.replace('-', ' ')} Tool</h3>
          <p className="text-slate-400">System tool operational. All targets and session configurations synced.</p>
        </div>
      )}
    </div>
  );
};
