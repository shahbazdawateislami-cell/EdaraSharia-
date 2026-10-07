import {
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

import schoolLogoImg from '../assets/images/school_logo_1791349925593.jpg';
import studentMaleImg from '../assets/images/student_avatar_male_1791349939059.jpg';
import studentFemaleImg from '../assets/images/student_avatar_female_1791349949867.jpg';
import blackboardImg from '../assets/images/blackboard_homework_1791349961053.jpg';

export const initialSettings: SchoolSettings = {
  name: 'Edara Sharia ERP',
  tagline: 'Markaz-e-Uloom-e-Islamia wa Asriya',
  address: 'Edara Sharia Complex, Jamia Nagar, Knowledge City',
  phone: '+91 98765 43210',
  email: 'admin@edarasharia.edu',
  academicYear: '1448 Hijri / 2026-27',
  currencySymbol: '₹',
  logoUrl: schoolLogoImg,
  session: 'Session 1448 Hijri'
};

export const initialClasses: ClassItem[] = [
  { id: 'c1', name: 'Darja Hifz-ul-Quran', section: 'A', grade: 'Hifz', classTeacherId: 't1', studentCount: 28 },
  { id: 'c2', name: 'Darja Nazra & Tajweed', section: 'B', grade: 'Nazra', classTeacherId: 't2', studentCount: 32 },
  { id: 'c3', name: 'Darja Ula (Alimiyyat 1st Year)', section: 'A', grade: '1', classTeacherId: 't3', studentCount: 25 },
  { id: 'c4', name: 'Darja Saniyya (Alimiyyat 2nd Year)', section: 'B', grade: '2', classTeacherId: 't1', studentCount: 30 },
  { id: 'c5', name: 'Darja Rabia (Aalima Course)', section: 'A', grade: '4', classTeacherId: 't2', studentCount: 26 }
];

export const initialTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Maulana Mohammad Zaid',
    subject: 'Al-Quran, Tajweed & Sarf-Nahw',
    phone: '+91 98111 22334',
    email: 'zaid@edarasharia.edu',
    qualification: 'Fazil-e-Deoband, M.A. Arabic',
    salary: 35000,
    assignedClassId: 'c1',
    username: 'teacher1',
    password: 'password123',
    access: {
      attendance: true,
      homework: true,
      timetable: true,
      exams: true,
      studyMaterial: true,
      questionPapers: true,
      notices: true,
      leaves: true,
      leaderboard: true
    }
  },
  {
    id: 't2',
    name: 'Mufti Shahbaz Ahmad',
    subject: 'Fiqh-e-Islami & Hadeesh Sharif',
    phone: '+91 98222 33445',
    email: 'shahbaz@edarasharia.edu',
    qualification: 'Ifta, M.A. Islamic Studies',
    salary: 42000,
    assignedClassId: 'c2',
    username: 'teacher2',
    password: 'password123',
    access: {
      attendance: true,
      homework: true,
      timetable: true,
      exams: true,
      studyMaterial: true,
      questionPapers: true,
      notices: true,
      leaves: true,
      leaderboard: true
    }
  },
  {
    id: 't3',
    name: 'Qari Mohammad Tariq',
    subject: 'Hifz & Qiraat-e-Sabaa',
    phone: '+91 98333 44556',
    email: 'tariq@edarasharia.edu',
    qualification: 'Qari-e-Quran, Hafiz',
    salary: 38000,
    assignedClassId: 'c3',
    username: 'teacher3',
    password: 'password123',
    access: {
      attendance: true,
      homework: true,
      timetable: true,
      exams: true,
      studyMaterial: true,
      questionPapers: true,
      notices: true,
      leaves: true,
      leaderboard: true
    }
  }
];

export const initialStudents: Student[] = [
  {
    id: 's1',
    name: 'Mohammad Anas',
    rollNo: '001',
    classId: 'c1',
    fatherName: 'Mohammad Usman',
    motherName: 'Amina Begum',
    phone: '+91 99100 11223',
    dob: '2014-05-12',
    gender: 'Male',
    address: 'Block A, Jamia Nagar, New Delhi',
    bloodGroup: 'B+',
    photoUrl: studentMaleImg,
    totalFee: 24000,
    paidFee: 24000,
    username: '001'
  },
  {
    id: 's2',
    name: 'Mohammad Bilal',
    rollNo: '002',
    classId: 'c1',
    fatherName: 'Hafiz Ghulam Mustafa',
    motherName: 'Zainab Bibi',
    phone: '+91 99200 22334',
    dob: '2014-08-20',
    gender: 'Male',
    address: 'House 45, Batla House, Delhi',
    bloodGroup: 'O+',
    photoUrl: studentMaleImg,
    totalFee: 24000,
    paidFee: 14000,
    username: '002'
  },
  {
    id: 's3',
    name: 'Mohammad Huzaifa',
    rollNo: '003',
    classId: 'c1',
    fatherName: 'Tariq Hussain',
    motherName: 'Farida Khatoon',
    phone: '+91 99300 33445',
    dob: '2014-02-15',
    gender: 'Male',
    address: 'Abul Fazal Enclave, Delhi',
    bloodGroup: 'A+',
    photoUrl: studentMaleImg,
    totalFee: 24000,
    paidFee: 18000,
    username: '003'
  },
  {
    id: 's4',
    name: 'Fatima-tuz-Zahra',
    rollNo: '004',
    classId: 'c1',
    fatherName: 'Mohammad Zaki',
    motherName: 'Ruqayya Begum',
    phone: '+91 99400 44556',
    dob: '2014-11-03',
    gender: 'Female',
    address: 'Shaheen Bagh, New Delhi',
    bloodGroup: 'AB+',
    photoUrl: studentFemaleImg,
    totalFee: 24000,
    paidFee: 24000,
    username: '004'
  },
  {
    id: 's5',
    name: 'Mohammad Hammad',
    rollNo: '005',
    classId: 'c2',
    fatherName: 'Abdul Rehman',
    motherName: 'Khadija Bibi',
    phone: '+91 99500 55667',
    dob: '2013-09-18',
    gender: 'Male',
    address: 'Okhla Vihar, New Delhi',
    bloodGroup: 'B+',
    photoUrl: studentMaleImg,
    totalFee: 26000,
    paidFee: 20000,
    username: '005'
  }
];

export const initialAttendance: AttendanceRecord[] = [
  { id: 'att1', date: '2026-10-06', classId: 'c1', studentId: 's1', status: 'Present' },
  { id: 'att2', date: '2026-10-06', classId: 'c1', studentId: 's2', status: 'Absent' },
  { id: 'att3', date: '2026-10-06', classId: 'c1', studentId: 's3', status: 'Present' },
  { id: 'att4', date: '2026-10-06', classId: 'c1', studentId: 's4', status: 'Present' },
  { id: 'att5', date: '2026-10-05', classId: 'c1', studentId: 's1', status: 'Present' },
  { id: 'att6', date: '2026-10-05', classId: 'c1', studentId: 's2', status: 'Late' },
  { id: 'att7', date: '2026-10-05', classId: 'c1', studentId: 's3', status: 'Present' },
  { id: 'att8', date: '2026-10-05', classId: 'c1', studentId: 's4', status: 'Present' }
];

export const initialTeacherAttendance: TeacherAttendanceRecord[] = [
  { id: 'tatt1', date: '2026-10-06', teacherId: 't1', status: 'Present', checkIn: '07:50 AM', checkOut: '02:30 PM' },
  { id: 'tatt2', date: '2026-10-06', teacherId: 't2', status: 'Present', checkIn: '08:00 AM', checkOut: '02:30 PM' },
  { id: 'tatt3', date: '2026-10-06', teacherId: 't3', status: 'Present', checkIn: '07:55 AM', checkOut: '02:25 PM' }
];

export const initialHomework: Homework[] = [
  {
    id: 'hw1',
    classId: 'c1',
    subject: 'Tajweed-ul-Quran',
    description: 'Memorize Surah Al-Mulk verses 1 to 10 with Makharij & Tajweed rules.',
    dueDate: '2026-10-08',
    boardPhotoUrl: blackboardImg,
    createdByTeacherId: 't1',
    createdAt: '2026-10-06',
    status: 'Pending'
  },
  {
    id: 'hw2',
    classId: 'c1',
    subject: 'Fiqh-e-Maysar',
    description: 'Revise Wuzu & Ghusl Arkaan and write key masail in notebook.',
    dueDate: '2026-10-07',
    createdByTeacherId: 't2',
    createdAt: '2026-10-06',
    status: 'Pending'
  }
];

export const initialOnlineClasses: OnlineClass[] = [
  {
    id: 'oc1',
    classId: 'c1',
    subject: 'Sarf-o-Nahw',
    topic: 'Abwab-e-Sulasay-e-Majeed Fih',
    teacherId: 't1',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    date: '2026-10-07',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    platform: 'Google Meet'
  }
];

export const initialTimetableConfig: TimetableConfig = {
  operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  timeSlots: [
    { id: 'slot1', name: 'Nishat 1 (Morning)', start: '08:00 AM', end: '08:45 AM' },
    { id: 'slot2', name: 'Nishat 2', start: '08:45 AM', end: '09:30 AM' },
    { id: 'slot3', name: 'Tafreeh (Break)', start: '09:30 AM', end: '09:50 AM' },
    { id: 'slot4', name: 'Nishat 3', start: '09:50 AM', end: '10:35 AM' },
    { id: 'slot5', name: 'Nishat 4', start: '10:35 AM', end: '11:20 AM' },
    { id: 'slot6', name: 'Nishat 5', start: '11:20 AM', end: '12:05 PM' }
  ]
};

export const initialTimetableCells: TimetableCell[] = [
  { id: 'tt1', classId: 'c1', day: 'Mon', slotId: 'slot1', subject: 'Al-Quran & Tajweed', teacherId: 't1' },
  { id: 'tt2', classId: 'c1', day: 'Mon', slotId: 'slot2', subject: 'Fiqh-e-Islami', teacherId: 't2' },
  { id: 'tt3', classId: 'c1', day: 'Mon', slotId: 'slot3', subject: 'Tafreeh (Break)', isBreak: true },
  { id: 'tt4', classId: 'c1', day: 'Mon', slotId: 'slot4', subject: 'Sarf & Nahw', teacherId: 't1' },
  { id: 'tt5', classId: 'c1', day: 'Mon', slotId: 'slot5', subject: 'Urdu & Mathematics', teacherId: 't3' }
];

export const initialExamSubjects: ExamSubject[] = [
  { id: 'es1', examName: 'Imtehan Shashmahi (Mid Term)', classId: 'c1', subject: 'Al-Quran & Tajweed', maxMarks: 100, date: '2026-09-20' },
  { id: 'es2', examName: 'Imtehan Shashmahi (Mid Term)', classId: 'c1', subject: 'Fiqh & Hadeesh', maxMarks: 100, date: '2026-09-22' },
  { id: 'es3', examName: 'Imtehan Shashmahi (Mid Term)', classId: 'c1', subject: 'Arabic Grammar (Sarf-Nahw)', maxMarks: 100, date: '2026-09-24' },
  { id: 'es4', examName: 'Imtehan Sehmahi (Quarterly)', classId: 'c1', subject: 'Al-Quran & Tajweed', maxMarks: 50, date: '2026-08-10' }
];

export const initialStudentMarks: StudentMark[] = [
  { id: 'm1', studentId: 's1', examSubjectId: 'es1', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 98 },
  { id: 'm2', studentId: 's1', examSubjectId: 'es2', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 95 },
  { id: 'm3', studentId: 's1', examSubjectId: 'es3', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 92 },

  { id: 'm4', studentId: 's2', examSubjectId: 'es1', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 75 },
  { id: 'm5', studentId: 's2', examSubjectId: 'es2', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 70 },
  { id: 'm6', studentId: 's2', examSubjectId: 'es3', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 68 },

  { id: 'm7', studentId: 's3', examSubjectId: 'es1', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 85 },
  { id: 'm8', studentId: 's3', examSubjectId: 'es2', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 82 },
  { id: 'm9', studentId: 's3', examSubjectId: 'es3', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 80 },

  { id: 'm10', studentId: 's4', examSubjectId: 'es1', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 96 },
  { id: 'm11', studentId: 's4', examSubjectId: 'es2', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 94 },
  { id: 'm12', studentId: 's4', examSubjectId: 'es3', examName: 'Imtehan Shashmahi (Mid Term)', marksObtained: 90 }
];

export const initialCurriculum: CurriculumChapter[] = [
  { id: 'cur1', classId: 'c1', subject: 'Tajweed-ul-Quran', chapterNo: 1, title: 'Makharij-ul-Huroof (Articulation Points)', description: 'Pronunciation rules of throat and tongue letters.', isCompleted: true },
  { id: 'cur2', classId: 'c1', subject: 'Tajweed-ul-Quran', chapterNo: 2, title: 'Ahkam Noon Sakin & Tanween', description: 'Izhar, Idgham, Iqlab, and Ikhfa rules with examples.', isCompleted: true },
  { id: 'cur3', classId: 'c1', subject: 'Tajweed-ul-Quran', chapterNo: 3, title: 'Ahkam Madd & Waqf', description: 'Types of Madd and stop signs in Qiraat.', isCompleted: false },
  { id: 'cur4', classId: 'c1', subject: 'Fiqh-e-Islami', chapterNo: 1, title: 'Kitab-ut-Taharah (Purity Rules)', description: 'Wuzu, Ghusl, Tayammum, and Najasat cleanings.', isCompleted: true }
];

export const initialStudyMaterial: StudyMaterial[] = [
  {
    id: 'sm1',
    classId: 'c1',
    subject: 'Tajweed-ul-Quran',
    title: 'Makharij & Tajweed Rules Pronunciation Chart PDF',
    fileUrl: '#',
    fileType: 'PDF',
    uploadDate: '2026-10-02',
    uploadedBy: 'Maulana Mohammad Zaid'
  },
  {
    id: 'sm2',
    classId: 'c1',
    subject: 'Fiqh-e-Islami',
    title: 'Kitab-ut-Taharah Summary Notes & Masail Guide',
    fileUrl: '#',
    fileType: 'PDF',
    uploadDate: '2026-10-04',
    uploadedBy: 'Mufti Shahbaz Ahmad'
  }
];

export const initialQuestionPapers: QuestionPaper[] = [
  {
    id: 'qp1',
    classId: 'c1',
    subject: 'Tajweed-ul-Quran',
    examType: 'Imtehan Shashmahi',
    title: 'Darja Hifz Tajweed Shashmahi Imtehan Parchi 1448H',
    fileUrl: '#',
    isAutoGenerated: true,
    uploadDate: '2026-09-18'
  }
];

export const initialQuestionBank: Question[] = [
  {
    id: 'q1',
    classId: 'c1',
    subject: 'Tajweed-ul-Quran',
    chapter: 'Ahkam Noon Sakin',
    type: 'MCQ',
    questionText: 'How many letters are there in Izhar-e-Halqi?',
    marks: 1,
    mcqOptions: ['6 Letters (Hamza, Ha, Ain, Ha, Ghain, Kha)', '4 Letters', '2 Letters', '15 Letters'],
    correctOptionIndex: 0
  },
  {
    id: 'q2',
    classId: 'c1',
    subject: 'Fiqh-e-Islami',
    chapter: 'Kitab-ut-Taharah',
    type: 'Short Answer',
    questionText: 'Write the 4 Faraiz (mandatory acts) of Wuzu in detail.',
    marks: 3
  },
  {
    id: 'q3',
    classId: 'c1',
    subject: 'Arabic Grammar (Sarf)',
    chapter: 'Abwab-e-Sulasay',
    type: 'MCQ',
    questionText: 'Which pattern corresponds to "Fa-A-La / Yaf-U-Lu"?',
    marks: 1,
    mcqOptions: ['Bāb Nasara Yansuru', 'Bāb Daraba Yadribu', 'Bāb Fataha Yaftahu', 'Bāb Karuma Yakrumu'],
    correctOptionIndex: 0
  }
];

export const initialInventory: InventoryItem[] = [
  { id: 'inv1', name: 'Digital Rehal & Quran Racks', category: 'Madrasa Furniture', quantity: 150, unit: 'Pcs', condition: 'Good', lastUpdated: '2026-09-15' },
  { id: 'inv2', name: 'Classroom Carpets (Saffs)', category: 'Flooring', quantity: 45, unit: 'Saffs', condition: 'Good', lastUpdated: '2026-08-10' },
  { id: 'inv3', name: 'Audio PA Speakers for Tilawat', category: 'Electronics', quantity: 12, unit: 'Pcs', condition: 'Good', lastUpdated: '2026-09-01' }
];

export const initialFeePayments: FeePayment[] = [
  { id: 'fp1', studentId: 's1', amount: 12000, paymentDate: '2026-04-10', note: 'Shashmahi Taleemi Hadiya', receiptNo: 'REC-1448-001' },
  { id: 'fp2', studentId: 's1', amount: 12000, paymentDate: '2026-09-05', note: 'Salana Taleemi Hadiya', receiptNo: 'REC-1448-042' },
  { id: 'fp3', studentId: 's2', amount: 14000, paymentDate: '2026-04-12', note: 'Partial Taleemi Hadiya', receiptNo: 'REC-1448-005' }
];

export const initialTransactions: Transaction[] = [
  { id: 'tr1', type: 'Income', category: 'Fee Collection', amount: 76000, description: 'Student Taleemi Hadiya Collection', date: '2026-10-01' },
  { id: 'tr2', type: 'Expense', category: 'Teacher Salaries', amount: 115000, description: 'Wazeefa / Salary Payouts to Asatiza-e-Kiram', date: '2026-10-01' },
  { id: 'tr3', type: 'Expense', category: 'Utilities', amount: 8500, description: 'Electricity & Internet Maintenance Bills', date: '2026-10-04' }
];

export const initialSalaryReceipts: SalaryReceipt[] = [
  {
    id: 'sal1',
    teacherId: 't1',
    month: 'Rabi-ul-Awwal 1448H / Sept 2026',
    basicSalary: 35000,
    allowances: 3000,
    deductions: 1000,
    netSalary: 37000,
    paidDate: '2026-10-01',
    receiptNo: 'WAZEEFA-1448-091'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'not1',
    title: 'Imtehan Shashmahi & Asatiza-o-Sarparast Mulaqat (PTM)',
    content: 'All parents & guardians are requested to attend the Shashmahi PTM on Saturday, October 15th at 09:00 AM in Madrasa Complex.',
    type: 'Urgent',
    audience: 'All',
    postedBy: 'Nazim-e-Aala Office',
    date: '2026-10-05'
  },
  {
    id: 'not2',
    title: 'Annual Husn-e-Qiraat & Hifz Competition Guidelines',
    content: 'Tulaba willing to participate in the Annual Quran Recitation & Islamic Quiz Competition must submit names to Ustadh Zaid by Oct 10.',
    type: 'General',
    audience: 'Students',
    postedBy: 'Edara Office',
    date: '2026-10-03'
  }
];

export const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 'lr1',
    applicantType: 'Teacher',
    applicantId: 't3',
    applicantName: 'Qari Mohammad Tariq',
    classOrSubject: 'Hifz & Qiraat',
    leaveType: 'Casual Leave',
    startDate: '2026-10-12',
    endDate: '2026-10-13',
    reason: 'Family function in hometown.',
    status: 'Pending',
    appliedDate: '2026-10-06'
  }
];

export const initialMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 't1',
    senderName: 'Maulana Mohammad Zaid',
    senderRole: 'teacher',
    receiverId: 'admin',
    content: 'Assalamu Alaikum Nazim Sahib, please review the Darja Hifz exam syllabus draft.',
    timestamp: '2026-10-06 09:30 AM',
    isRead: false
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  { id: 'ev1', title: 'Imtehan Shashmahi PTM', date: '2026-10-15', type: 'Event', description: 'Parent teacher meeting' },
  { id: 'ev2', title: 'Shashmahi Nayeja Declaration', date: '2026-10-20', type: 'Exam', description: 'Result day' },
  { id: 'ev3', title: 'Tateel-e-Khareefi (Autumn Break)', date: '2026-10-28', type: 'Holiday', description: 'Madrasa closed for 5 days' }
];

export const initialGalleryImages: SchoolGalleryImage[] = [
  { id: 'gal1', title: 'Annual Husn-e-Qiraat Competition 1448H', imageUrl: schoolLogoImg, category: 'Competitions', date: '2026-09-25' }
];

export const initialVehicleGPS: VehicleGPS[] = [
  {
    id: 'v1',
    vehicleNo: 'DL-01-AB-1234',
    driverName: 'Rashid Khan',
    driverPhone: '+91 98888 77766',
    routeName: 'Route 1: Jamia Nagar - Sukhdev Vihar - Okhla',
    speedKmH: 34,
    currentLocation: 'Near Jamia Metro Station, Ring Road',
    lat: 28.5612,
    lng: 77.2801,
    status: 'On Route'
  }
];

export const initialTeacherTasks: TeacherTask[] = [
  { id: 'task1', teacherId: 't1', title: 'Prepare Darja Hifz Tajweed Shashmahi Marks Sheet', dueDate: '2026-10-10', status: 'In Progress', priority: 'High' },
  { id: 'task2', teacherId: 't2', title: 'Upload Fiqh Chapter 4 Worksheets & Masail', dueDate: '2026-10-12', status: 'Pending', priority: 'Medium' }
];

export const initialReminders: Reminder[] = [
  { id: 'rem1', title: 'Verify Taleemi Hadiya Collection for Current Month', date: '2026-10-08', priority: 'High', isCompleted: false },
  { id: 'rem2', title: 'Publish Monthly Hazri Summary for Tulaba', date: '2026-10-10', priority: 'Medium', isCompleted: false }
];
