import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Search, Edit2, Trash2, X, Check, Camera, Key, CreditCard } from 'lucide-react';

export const StudentsView: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent, classes, role } = useApp();
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [photoUrl, setPhotoUrl] = useState('');
  const [totalFee, setTotalFee] = useState<number>(24000);
  const [paidFee, setPaidFee] = useState<number>(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('123456');

  // Handle Photo File Upload with Canvas Compression
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
        const maxDim = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height *= maxDim / width;
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width *= maxDim / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPhotoUrl(compressedDataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setName('');
    setRollNo('');
    setClassId(classes[0]?.id || '');
    setFatherName('');
    setMotherName('');
    setPhone('');
    setDob('');
    setGender('Male');
    setAddress('');
    setBloodGroup('B+');
    setPhotoUrl('');
    setTotalFee(24000);
    setPaidFee(0);
    setUsername('');
    setPassword('123456');
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (s: any) => {
    setEditingId(s.id);
    setName(s.name);
    setRollNo(s.rollNo);
    setClassId(s.classId);
    setFatherName(s.fatherName);
    setMotherName(s.motherName);
    setPhone(s.phone);
    setDob(s.dob);
    setGender(s.gender);
    setAddress(s.address);
    setBloodGroup(s.bloodGroup);
    setPhotoUrl(s.photoUrl || '');
    setTotalFee(s.totalFee);
    setPaidFee(s.paidFee);
    setUsername(s.username);
    setPassword(s.password || '123456');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!name.trim() || !rollNo.trim()) return;
    const finalUsername = username.trim() || rollNo.trim();

    if (editingId) {
      updateStudent(editingId, {
        name,
        rollNo,
        classId,
        fatherName,
        motherName,
        phone,
        dob,
        gender,
        address,
        bloodGroup,
        photoUrl,
        totalFee,
        paidFee,
        username: finalUsername,
        password
      });
    } else {
      addStudent({
        name,
        rollNo,
        classId,
        fatherName,
        motherName,
        phone,
        dob,
        gender,
        address,
        bloodGroup,
        photoUrl,
        totalFee,
        paidFee,
        username: finalUsername,
        password
      });
    }
    resetForm();
  };

  const filteredStudents = students.filter(s => {
    if (selectedClassId !== 'all' && s.classId !== selectedClassId) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.fatherName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Students Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Student directory, roll numbers, photo upload, parents contact & fee profiles
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Class Selector Dropdown */}
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-[#100d24] border border-purple-900/40 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Classes ({students.length})</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({students.filter(s => s.classId === c.id).length})
              </option>
            ))}
          </select>

          {role === 'admin' && (
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Student
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-purple-400/60" />
        <input
          type="text"
          placeholder="Filter students by name, roll number, or father's name..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full bg-[#16122d] border border-purple-900/40 text-slate-100 text-xs rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map(student => {
          const cls = classes.find(c => c.id === student.classId);
          const isFeeFullyPaid = student.paidFee >= student.totalFee;

          return (
            <div
              key={student.id}
              className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl hover:border-purple-500/50 transition-all space-y-4 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {student.photoUrl ? (
                    <img
                      src={student.photoUrl}
                      alt={student.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/30 shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center font-bold text-purple-200 text-base">
                      {student.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{student.name}</h3>
                    <div className="text-xs text-purple-300/80">
                      Roll: <span className="font-mono font-bold text-purple-300">{student.rollNo}</span> · {cls ? cls.name : 'Class N/A'}
                    </div>
                    <div className="text-[10px] text-slate-400">Father: {student.fatherName || 'N/A'}</div>
                  </div>
                </div>

                {role === 'admin' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(student)}
                      className="p-1.5 text-slate-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Fee Progress Badge */}
              <div className="p-3 bg-[#100d24] rounded-xl border border-purple-900/20 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1 font-medium text-[11px]">
                    <CreditCard className="w-3 h-3 text-purple-400" /> Fee Balance
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isFeeFullyPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {isFeeFullyPaid ? 'Fully Paid' : 'Due Balance'}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Paid: ₹{student.paidFee.toLocaleString()}</span>
                  <span className="text-purple-300 font-bold">Total: ₹{student.totalFee.toLocaleString()}</span>
                </div>
              </div>

              {/* Contact & Info Pills */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-purple-900/20">
                <span>Phone: {student.phone || 'N/A'}</span>
                <span>Blood: <strong className="text-purple-300">{student.bloodGroup}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4 my-8">
            <button onClick={resetForm} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">
              {editingId ? 'Edit Student Profile' : 'Add New Student'}
            </h3>

            {/* Photo Upload Area */}
            <div className="flex items-center gap-4 p-3 bg-[#100d24] rounded-xl border border-purple-900/30">
              <div className="relative w-16 h-16 rounded-xl bg-purple-900/30 border border-purple-700/40 flex items-center justify-center overflow-hidden shrink-0">
                {photoUrl ? (
                  <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-purple-400" />
                )}
              </div>
              <div className="text-xs space-y-1">
                <label className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold cursor-pointer inline-block">
                  Upload Student Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <div className="text-[10px] text-slate-400">Photo is compressed automatically to &lt;200KB</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Student Name *</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Roll Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. 001"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Class *</label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Father's Name</label>
                  <input
                    type="text"
                    placeholder="Father's Name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mother's Name</label>
                  <input
                    type="text"
                    placeholder="Mother's Name"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Blood Group</label>
                  <input
                    type="text"
                    placeholder="e.g. B+"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Residential Address</label>
                <textarea
                  rows={2}
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#100d24] rounded-xl border border-purple-900/30">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Total Fee (Annual ₹)</label>
                  <input
                    type="number"
                    value={totalFee}
                    onChange={(e) => setTotalFee(Number(e.target.value))}
                    className="w-full bg-[#16122e] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount Paid So Far (₹)</label>
                  <input
                    type="number"
                    value={paidFee}
                    onChange={(e) => setPaidFee(Number(e.target.value))}
                    className="w-full bg-[#16122e] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#100d24] rounded-xl border border-purple-900/30 space-y-2">
                <div className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5" /> Login Credentials
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Username (Default: Roll No)</label>
                    <input
                      type="text"
                      placeholder={rollNo || '001'}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#16122e] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Password</label>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#16122e] border border-purple-900/40 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>
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
                <Check className="w-4 h-4" /> Save Student Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
