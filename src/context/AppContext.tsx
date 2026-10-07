import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  SchoolSettings,
  ClassItem,
  Student,
  Teacher,
  AttendanceRecord,
  TeacherAttendanceRecord,
  Homework,
  OnlineClass,
  TimetableConfig,
  TimetableCell,
  ExamSubject,
  StudentMark,
  CurriculumChapter,
  StudyMaterial,
  QuestionPaper,
  Question,
  InventoryItem,
  FeePayment,
  Transaction,
  SalaryReceipt,
  Notice,
  LeaveRequest,
  Message,
  CalendarEvent,
  SchoolGalleryImage,
  VehicleGPS,
  TeacherTask,
  Reminder
} from '../types';

import {
  initialSettings,
  initialClasses,
  initialTeachers,
  initialStudents,
  initialAttendance,
  initialTeacherAttendance,
  initialHomework,
  initialOnlineClasses,
  initialTimetableConfig,
  initialTimetableCells,
  initialExamSubjects,
  initialStudentMarks,
  initialCurriculum,
  initialStudyMaterial,
  initialQuestionPapers,
  initialQuestionBank,
  initialInventory,
  initialFeePayments,
  initialTransactions,
  initialSalaryReceipts,
  initialNotices,
  initialLeaveRequests,
  initialMessages,
  initialCalendarEvents,
  initialGalleryImages,
  initialVehicleGPS,
  initialTeacherTasks,
  initialReminders
} from '../data/initialData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  settings: SchoolSettings;
  updateSettings: (newSettings: Partial<SchoolSettings>) => void;

  classes: ClassItem[];
  addClass: (item: Omit<ClassItem, 'id'>) => void;
  updateClass: (id: string, item: Partial<ClassItem>) => void;
  deleteClass: (id: string) => void;

  teachers: Teacher[];
  addTeacher: (item: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, item: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  students: Student[];
  addStudent: (item: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, item: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  attendance: AttendanceRecord[];
  saveAttendance: (records: AttendanceRecord[]) => void;

  teacherAttendance: TeacherAttendanceRecord[];
  saveTeacherAttendance: (records: TeacherAttendanceRecord[]) => void;

  homework: Homework[];
  addHomework: (item: Omit<Homework, 'id' | 'createdAt'>) => void;
  deleteHomework: (id: string) => void;

  onlineClasses: OnlineClass[];
  addOnlineClass: (item: Omit<OnlineClass, 'id'>) => void;
  deleteOnlineClass: (id: string) => void;

  timetableConfig: TimetableConfig;
  updateTimetableConfig: (config: TimetableConfig) => void;
  timetableCells: TimetableCell[];
  saveTimetableCell: (cell: Omit<TimetableCell, 'id'>) => void;
  deleteTimetableCell: (id: string) => void;

  examSubjects: ExamSubject[];
  addExamSubject: (item: Omit<ExamSubject, 'id'>) => void;
  deleteExamSubject: (id: string) => void;

  studentMarks: StudentMark[];
  saveStudentMarks: (marks: { studentId: string; examSubjectId: string; examName: string; marksObtained: number }[]) => void;

  curriculum: CurriculumChapter[];
  addCurriculumChapter: (item: Omit<CurriculumChapter, 'id'>) => void;
  toggleChapterCompleted: (id: string) => void;
  deleteCurriculumChapter: (id: string) => void;
  seedClassCurriculum: (classId: string, subject: string) => void;

  studyMaterial: StudyMaterial[];
  addStudyMaterial: (item: Omit<StudyMaterial, 'id' | 'uploadDate'>) => void;
  deleteStudyMaterial: (id: string) => void;

  questionPapers: QuestionPaper[];
  addQuestionPaper: (item: Omit<QuestionPaper, 'id' | 'uploadDate'>) => void;
  deleteQuestionPaper: (id: string) => void;

  questionBank: Question[];
  addQuestion: (item: Omit<Question, 'id'>) => void;
  deleteQuestion: (id: string) => void;

  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  deleteInventoryItem: (id: string) => void;

  feePayments: FeePayment[];
  recordFeePayment: (payment: Omit<FeePayment, 'id' | 'receiptNo'>) => void;

  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;

  salaryReceipts: SalaryReceipt[];
  generateSalaryReceipt: (receipt: Omit<SalaryReceipt, 'id' | 'receiptNo'>) => void;

  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;

  leaveRequests: LeaveRequest[];
  addLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;

  messages: Message[];
  sendMessage: (receiverId: string, content: string) => void;

  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;

  galleryImages: SchoolGalleryImage[];
  addGalleryImage: (img: Omit<SchoolGalleryImage, 'id' | 'date'>) => void;

  vehicleGPS: VehicleGPS[];
  updateVehicleGPS: (id: string, updates: Partial<VehicleGPS>) => void;

  teacherTasks: TeacherTask[];
  addTeacherTask: (task: Omit<TeacherTask, 'id'>) => void;
  updateTaskStatus: (id: string, status: 'Pending' | 'In Progress' | 'Completed') => void;

  reminders: Reminder[];
  addReminder: (rem: Omit<Reminder, 'id' | 'isCompleted'>) => void;
  toggleReminder: (id: string) => void;

  recycleBin: { id: string; title: string; type: string; deletedAt: string; data: any }[];
  restoreRecycleItem: (id: string) => void;
  clearRecycleBin: () => void;

  resetDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('admin');
  const [currentUserId, setCurrentUserId] = useState<string>('admin');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [settings, setSettings] = useState<SchoolSettings>(() => {
    const saved = localStorage.getItem('es_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.name || !parsed.name.includes('ERP')) {
        parsed.name = 'Edara Sharia ERP';
        parsed.email = 'admin@edarasharia.edu';
      }
      return parsed;
    }
    return initialSettings;
  });

  const [classes, setClasses] = useState<ClassItem[]>(() => {
    const saved = localStorage.getItem('es_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('es_teachers');
    return saved ? JSON.parse(saved) : initialTeachers;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('es_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('es_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [teacherAttendance, setTeacherAttendance] = useState<TeacherAttendanceRecord[]>(() => {
    const saved = localStorage.getItem('es_teacher_attendance');
    return saved ? JSON.parse(saved) : initialTeacherAttendance;
  });

  const [homework, setHomework] = useState<Homework[]>(() => {
    const saved = localStorage.getItem('es_homework');
    return saved ? JSON.parse(saved) : initialHomework;
  });

  const [onlineClasses, setOnlineClasses] = useState<OnlineClass[]>(() => {
    const saved = localStorage.getItem('es_online_classes');
    return saved ? JSON.parse(saved) : initialOnlineClasses;
  });

  const [timetableConfig, setTimetableConfig] = useState<TimetableConfig>(() => {
    const saved = localStorage.getItem('es_timetable_config');
    return saved ? JSON.parse(saved) : initialTimetableConfig;
  });

  const [timetableCells, setTimetableCells] = useState<TimetableCell[]>(() => {
    const saved = localStorage.getItem('es_timetable_cells');
    return saved ? JSON.parse(saved) : initialTimetableCells;
  });

  const [examSubjects, setExamSubjects] = useState<ExamSubject[]>(() => {
    const saved = localStorage.getItem('es_exam_subjects');
    return saved ? JSON.parse(saved) : initialExamSubjects;
  });

  const [studentMarks, setStudentMarks] = useState<StudentMark[]>(() => {
    const saved = localStorage.getItem('es_student_marks');
    return saved ? JSON.parse(saved) : initialStudentMarks;
  });

  const [curriculum, setCurriculum] = useState<CurriculumChapter[]>(() => {
    const saved = localStorage.getItem('es_curriculum');
    return saved ? JSON.parse(saved) : initialCurriculum;
  });

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('es_study_material');
    return saved ? JSON.parse(saved) : initialStudyMaterial;
  });

  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>(() => {
    const saved = localStorage.getItem('es_question_papers');
    return saved ? JSON.parse(saved) : initialQuestionPapers;
  });

  const [questionBank, setQuestionBank] = useState<Question[]>(() => {
    const saved = localStorage.getItem('es_question_bank');
    return saved ? JSON.parse(saved) : initialQuestionBank;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('es_inventory');
    return saved ? JSON.parse(saved) : initialInventory;
  });

  const [feePayments, setFeePayments] = useState<FeePayment[]>(() => {
    const saved = localStorage.getItem('es_fee_payments');
    return saved ? JSON.parse(saved) : initialFeePayments;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('es_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [salaryReceipts, setSalaryReceipts] = useState<SalaryReceipt[]>(() => {
    const saved = localStorage.getItem('es_salary_receipts');
    return saved ? JSON.parse(saved) : initialSalaryReceipts;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('es_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('es_leave_requests');
    return saved ? JSON.parse(saved) : initialLeaveRequests;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('es_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('es_calendar_events');
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  });

  const [galleryImages, setGalleryImages] = useState<SchoolGalleryImage[]>(() => {
    const saved = localStorage.getItem('es_gallery_images');
    return saved ? JSON.parse(saved) : initialGalleryImages;
  });

  const [vehicleGPS, setVehicleGPS] = useState<VehicleGPS[]>(() => {
    const saved = localStorage.getItem('es_vehicle_gps');
    return saved ? JSON.parse(saved) : initialVehicleGPS;
  });

  const [teacherTasks, setTeacherTasks] = useState<TeacherTask[]>(() => {
    const saved = localStorage.getItem('es_teacher_tasks');
    return saved ? JSON.parse(saved) : initialTeacherTasks;
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('es_reminders');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  const [recycleBin, setRecycleBin] = useState<{ id: string; title: string; type: string; deletedAt: string; data: any }[]>(() => {
    const saved = localStorage.getItem('es_recycle_bin');
    return saved ? JSON.parse(saved) : [];
  });

  // Save changes to localStorage
  useEffect(() => { localStorage.setItem('es_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('es_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('es_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('es_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('es_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('es_teacher_attendance', JSON.stringify(teacherAttendance)); }, [teacherAttendance]);
  useEffect(() => { localStorage.setItem('es_homework', JSON.stringify(homework)); }, [homework]);
  useEffect(() => { localStorage.setItem('es_online_classes', JSON.stringify(onlineClasses)); }, [onlineClasses]);
  useEffect(() => { localStorage.setItem('es_timetable_config', JSON.stringify(timetableConfig)); }, [timetableConfig]);
  useEffect(() => { localStorage.setItem('es_timetable_cells', JSON.stringify(timetableCells)); }, [timetableCells]);
  useEffect(() => { localStorage.setItem('es_exam_subjects', JSON.stringify(examSubjects)); }, [examSubjects]);
  useEffect(() => { localStorage.setItem('es_student_marks', JSON.stringify(studentMarks)); }, [studentMarks]);
  useEffect(() => { localStorage.setItem('es_curriculum', JSON.stringify(curriculum)); }, [curriculum]);
  useEffect(() => { localStorage.setItem('es_study_material', JSON.stringify(studyMaterial)); }, [studyMaterial]);
  useEffect(() => { localStorage.setItem('es_question_papers', JSON.stringify(questionPapers)); }, [questionPapers]);
  useEffect(() => { localStorage.setItem('es_question_bank', JSON.stringify(questionBank)); }, [questionBank]);
  useEffect(() => { localStorage.setItem('es_inventory', JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem('es_fee_payments', JSON.stringify(feePayments)); }, [feePayments]);
  useEffect(() => { localStorage.setItem('es_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('es_salary_receipts', JSON.stringify(salaryReceipts)); }, [salaryReceipts]);
  useEffect(() => { localStorage.setItem('es_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('es_leave_requests', JSON.stringify(leaveRequests)); }, [leaveRequests]);
  useEffect(() => { localStorage.setItem('es_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('es_calendar_events', JSON.stringify(calendarEvents)); }, [calendarEvents]);
  useEffect(() => { localStorage.setItem('es_gallery_images', JSON.stringify(galleryImages)); }, [galleryImages]);
  useEffect(() => { localStorage.setItem('es_vehicle_gps', JSON.stringify(vehicleGPS)); }, [vehicleGPS]);
  useEffect(() => { localStorage.setItem('es_teacher_tasks', JSON.stringify(teacherTasks)); }, [teacherTasks]);
  useEffect(() => { localStorage.setItem('es_reminders', JSON.stringify(reminders)); }, [reminders]);
  useEffect(() => { localStorage.setItem('es_recycle_bin', JSON.stringify(recycleBin)); }, [recycleBin]);

  const updateSettings = (newSettings: Partial<SchoolSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addClass = (item: Omit<ClassItem, 'id'>) => {
    const id = 'c_' + Date.now();
    setClasses(prev => [...prev, { ...item, id }]);
  };

  const updateClass = (id: string, item: Partial<ClassItem>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...item } : c));
  };

  const deleteClass = (id: string) => {
    const cls = classes.find(c => c.id === id);
    if (cls) {
      setRecycleBin(prev => [...prev, { id: 'rc_' + Date.now(), title: cls.name, type: 'Class', deletedAt: new Date().toLocaleDateString(), data: cls }]);
    }
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const addTeacher = (item: Omit<Teacher, 'id'>) => {
    const id = 't_' + Date.now();
    setTeachers(prev => [...prev, { ...item, id }]);
  };

  const updateTeacher = (id: string, item: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...item } : t));
  };

  const deleteTeacher = (id: string) => {
    const t = teachers.find(t => t.id === id);
    if (t) {
      setRecycleBin(prev => [...prev, { id: 'rc_' + Date.now(), title: t.name, type: 'Teacher', deletedAt: new Date().toLocaleDateString(), data: t }]);
    }
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const addStudent = (item: Omit<Student, 'id'>) => {
    const id = 's_' + Date.now();
    setStudents(prev => [...prev, { ...item, id }]);
  };

  const updateStudent = (id: string, item: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...item } : s));
  };

  const deleteStudent = (id: string) => {
    const st = students.find(s => s.id === id);
    if (st) {
      setRecycleBin(prev => [...prev, { id: 'rc_' + Date.now(), title: st.name, type: 'Student', deletedAt: new Date().toLocaleDateString(), data: st }]);
    }
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const saveAttendance = (records: AttendanceRecord[]) => {
    setAttendance(prev => {
      const remaining = prev.filter(p => !records.some(r => r.date === p.date && r.studentId === p.studentId));
      return [...remaining, ...records];
    });
  };

  const saveTeacherAttendance = (records: TeacherAttendanceRecord[]) => {
    setTeacherAttendance(prev => {
      const remaining = prev.filter(p => !records.some(r => r.date === p.date && r.teacherId === p.teacherId));
      return [...remaining, ...records];
    });
  };

  const addHomework = (item: Omit<Homework, 'id' | 'createdAt'>) => {
    const id = 'hw_' + Date.now();
    const createdAt = new Date().toISOString().split('T')[0];
    setHomework(prev => [ { ...item, id, createdAt, status: 'Pending' }, ...prev ]);
  };

  const deleteHomework = (id: string) => {
    setHomework(prev => prev.filter(h => h.id !== id));
  };

  const addOnlineClass = (item: Omit<OnlineClass, 'id'>) => {
    const id = 'oc_' + Date.now();
    setOnlineClasses(prev => [ { ...item, id }, ...prev ]);
  };

  const deleteOnlineClass = (id: string) => {
    setOnlineClasses(prev => prev.filter(o => o.id !== id));
  };

  const updateTimetableConfig = (config: TimetableConfig) => {
    setTimetableConfig(config);
  };

  const saveTimetableCell = (cell: Omit<TimetableCell, 'id'>) => {
    setTimetableCells(prev => {
      const filtered = prev.filter(c => !(c.classId === cell.classId && c.day === cell.day && c.slotId === cell.slotId));
      return [...filtered, { ...cell, id: 'tt_' + Date.now() }];
    });
  };

  const deleteTimetableCell = (id: string) => {
    setTimetableCells(prev => prev.filter(c => c.id !== id));
  };

  const addExamSubject = (item: Omit<ExamSubject, 'id'>) => {
    const id = 'es_' + Date.now();
    setExamSubjects(prev => [...prev, { ...item, id }]);
  };

  const deleteExamSubject = (id: string) => {
    setExamSubjects(prev => prev.filter(e => e.id !== id));
  };

  const saveStudentMarks = (marks: { studentId: string; examSubjectId: string; examName: string; marksObtained: number }[]) => {
    setStudentMarks(prev => {
      const filtered = prev.filter(m => !marks.some(nm => nm.studentId === m.studentId && nm.examSubjectId === m.examSubjectId));
      const newEntries = marks.map((m, idx) => ({ ...m, id: 'mark_' + Date.now() + '_' + idx }));
      return [...filtered, ...newEntries];
    });
  };

  const addCurriculumChapter = (item: Omit<CurriculumChapter, 'id'>) => {
    const id = 'cur_' + Date.now();
    setCurriculum(prev => [...prev, { ...item, id }]);
  };

  const toggleChapterCompleted = (id: string) => {
    setCurriculum(prev => prev.map(c => c.id === id ? { ...c, isCompleted: !c.isCompleted } : c));
  };

  const deleteCurriculumChapter = (id: string) => {
    setCurriculum(prev => prev.filter(c => c.id !== id));
  };

  const seedClassCurriculum = (classId: string, subject: string) => {
    const libraryChapters = [
      { chapterNo: 1, title: 'Introduction & Core Principles', description: 'Fundamental concepts, definitions, and rules.', isCompleted: true },
      { chapterNo: 2, title: 'Advanced Topics & Practice', description: 'Step-by-step exercises and application.', isCompleted: true },
      { chapterNo: 3, title: 'Analytical & Theoretical Applications', description: 'Detailed analysis, examples, and problem solving.', isCompleted: false },
      { chapterNo: 4, title: 'Comprehensive Evaluation & Revision', description: 'Summary notes, past papers, and review quiz.', isCompleted: false }
    ];
    const newChapters = libraryChapters.map((c, idx) => ({
      id: 'cur_seed_' + Date.now() + '_' + idx,
      classId,
      subject,
      chapterNo: c.chapterNo,
      title: c.title,
      description: c.description,
      isCompleted: c.isCompleted
    }));
    setCurriculum(prev => [...prev.filter(x => !(x.classId === classId && x.subject === subject)), ...newChapters]);
  };

  const addStudyMaterial = (item: Omit<StudyMaterial, 'id' | 'uploadDate'>) => {
    const id = 'sm_' + Date.now();
    const uploadDate = new Date().toISOString().split('T')[0];
    setStudyMaterial(prev => [{ ...item, id, uploadDate }, ...prev]);
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterial(prev => prev.filter(s => s.id !== id));
  };

  const addQuestionPaper = (item: Omit<QuestionPaper, 'id' | 'uploadDate'>) => {
    const id = 'qp_' + Date.now();
    const uploadDate = new Date().toISOString().split('T')[0];
    setQuestionPapers(prev => [{ ...item, id, uploadDate }, ...prev]);
  };

  const deleteQuestionPaper = (id: string) => {
    setQuestionPapers(prev => prev.filter(q => q.id !== id));
  };

  const addQuestion = (item: Omit<Question, 'id'>) => {
    const id = 'q_' + Date.now();
    setQuestionBank(prev => [...prev, { ...item, id }]);
  };

  const deleteQuestion = (id: string) => {
    setQuestionBank(prev => prev.filter(q => q.id !== id));
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const id = 'inv_' + Date.now();
    const lastUpdated = new Date().toISOString().split('T')[0];
    setInventory(prev => [...prev, { ...item, id, lastUpdated }]);
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  const recordFeePayment = (payment: Omit<FeePayment, 'id' | 'receiptNo'>) => {
    const id = 'fp_' + Date.now();
    const receiptNo = 'REC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    setFeePayments(prev => [{ ...payment, id, receiptNo }, ...prev]);

    // Update student's paidFee
    setStudents(prev => prev.map(s => s.id === payment.studentId ? { ...s, paidFee: s.paidFee + payment.amount } : s));

    // Post to transactions
    const st = students.find(s => s.id === payment.studentId);
    addTransaction({
      type: 'Income',
      category: 'Fee Collection',
      amount: payment.amount,
      description: `Fee payment receipt ${receiptNo} for student ${st ? st.name : payment.studentId}`,
      date: payment.paymentDate
    });
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const id = 'tr_' + Date.now();
    setTransactions(prev => [{ ...tx, id }, ...prev]);
  };

  const generateSalaryReceipt = (receipt: Omit<SalaryReceipt, 'id' | 'receiptNo'>) => {
    const id = 'sal_' + Date.now();
    const receiptNo = 'SAL-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newReceipt = { ...receipt, id, receiptNo };
    setSalaryReceipts(prev => [newReceipt, ...prev]);

    const t = teachers.find(tr => tr.id === receipt.teacherId);
    addTransaction({
      type: 'Expense',
      category: 'Teacher Salaries',
      amount: receipt.netSalary,
      description: `Salary payout (${receipt.month}) to ${t ? t.name : receipt.teacherId}`,
      date: receipt.paidDate
    });
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const id = 'not_' + Date.now();
    const date = new Date().toISOString().split('T')[0];
    setNotices(prev => [{ ...notice, id, date }, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const addLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
    const id = 'lr_' + Date.now();
    const appliedDate = new Date().toISOString().split('T')[0];
    setLeaveRequests(prev => [{ ...req, id, status: 'Pending', appliedDate }, ...prev]);
  };

  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const sendMessage = (receiverId: string, content: string) => {
    const id = 'msg_' + Date.now();
    let senderName = 'Admin Office';
    if (role === 'teacher') {
      const t = teachers.find(x => x.id === currentUserId);
      if (t) senderName = t.name;
    } else if (role === 'student') {
      const s = students.find(x => x.id === currentUserId);
      if (s) senderName = s.name;
    }
    const newMessage: Message = {
      id,
      senderId: currentUserId,
      senderName,
      senderRole: role,
      receiverId,
      content,
      timestamp: new Date().toLocaleString(),
      isRead: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const id = 'ev_' + Date.now();
    setCalendarEvents(prev => [...prev, { ...event, id }]);
  };

  const addGalleryImage = (img: Omit<SchoolGalleryImage, 'id' | 'date'>) => {
    const id = 'gal_' + Date.now();
    const date = new Date().toISOString().split('T')[0];
    setGalleryImages(prev => [{ ...img, id, date }, ...prev]);
  };

  const updateVehicleGPS = (id: string, updates: Partial<VehicleGPS>) => {
    setVehicleGPS(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const addTeacherTask = (task: Omit<TeacherTask, 'id'>) => {
    const id = 'task_' + Date.now();
    setTeacherTasks(prev => [{ ...task, id }, ...prev]);
  };

  const updateTaskStatus = (id: string, status: 'Pending' | 'In Progress' | 'Completed') => {
    setTeacherTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const addReminder = (rem: Omit<Reminder, 'id' | 'isCompleted'>) => {
    const id = 'rem_' + Date.now();
    setReminders(prev => [{ ...rem, id, isCompleted: false }, ...prev]);
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isCompleted: !r.isCompleted } : r));
  };

  const restoreRecycleItem = (id: string) => {
    const item = recycleBin.find(r => r.id === id);
    if (!item) return;
    if (item.type === 'Class') setClasses(prev => [...prev, item.data]);
    if (item.type === 'Teacher') setTeachers(prev => [...prev, item.data]);
    if (item.type === 'Student') setStudents(prev => [...prev, item.data]);
    setRecycleBin(prev => prev.filter(r => r.id !== id));
  };

  const clearRecycleBin = () => {
    setRecycleBin([]);
  };

  const resetDataToDefault = () => {
    localStorage.clear();
    setSettings(initialSettings);
    setClasses(initialClasses);
    setTeachers(initialTeachers);
    setStudents(initialStudents);
    setAttendance(initialAttendance);
    setTeacherAttendance(initialTeacherAttendance);
    setHomework(initialHomework);
    setOnlineClasses(initialOnlineClasses);
    setTimetableConfig(initialTimetableConfig);
    setTimetableCells(initialTimetableCells);
    setExamSubjects(initialExamSubjects);
    setStudentMarks(initialStudentMarks);
    setCurriculum(initialCurriculum);
    setStudyMaterial(initialStudyMaterial);
    setQuestionPapers(initialQuestionPapers);
    setQuestionBank(initialQuestionBank);
    setInventory(initialInventory);
    setFeePayments(initialFeePayments);
    setTransactions(initialTransactions);
    setSalaryReceipts(initialSalaryReceipts);
    setNotices(initialNotices);
    setLeaveRequests(initialLeaveRequests);
    setMessages(initialMessages);
    setCalendarEvents(initialCalendarEvents);
    setGalleryImages(initialGalleryImages);
    setVehicleGPS(initialVehicleGPS);
    setTeacherTasks(initialTeacherTasks);
    setReminders(initialReminders);
    setRecycleBin([]);
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      currentUserId, setCurrentUserId,
      activeTab, setActiveTab,
      searchQuery, setSearchQuery,
      settings, updateSettings,
      classes, addClass, updateClass, deleteClass,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      students, addStudent, updateStudent, deleteStudent,
      attendance, saveAttendance,
      teacherAttendance, saveTeacherAttendance,
      homework, addHomework, deleteHomework,
      onlineClasses, addOnlineClass, deleteOnlineClass,
      timetableConfig, updateTimetableConfig, timetableCells, saveTimetableCell, deleteTimetableCell,
      examSubjects, addExamSubject, deleteExamSubject,
      studentMarks, saveStudentMarks,
      curriculum, addCurriculumChapter, toggleChapterCompleted, deleteCurriculumChapter, seedClassCurriculum,
      studyMaterial, addStudyMaterial, deleteStudyMaterial,
      questionPapers, addQuestionPaper, deleteQuestionPaper,
      questionBank, addQuestion, deleteQuestion,
      inventory, addInventoryItem, deleteInventoryItem,
      feePayments, recordFeePayment,
      transactions, addTransaction,
      salaryReceipts, generateSalaryReceipt,
      notices, addNotice, deleteNotice,
      leaveRequests, addLeaveRequest, updateLeaveStatus,
      messages, sendMessage,
      calendarEvents, addCalendarEvent,
      galleryImages, addGalleryImage,
      vehicleGPS, updateVehicleGPS,
      teacherTasks, addTeacherTask, updateTaskStatus,
      reminders, addReminder, toggleReminder,
      recycleBin, restoreRecycleItem, clearRecycleBin,
      resetDataToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
