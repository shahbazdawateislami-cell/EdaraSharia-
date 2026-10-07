import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  Briefcase,
  FileText,
  Box,
  Plus,
  Printer,
  TrendingUp,
  TrendingDown,
  X,
  Check,
  Search,
  DollarSign
} from 'lucide-react';

export const InventoryFeesAccountsView: React.FC<{ subTab: 'inventory' | 'fees' | 'accounts' | 'salary-receipts' }> = ({ subTab }) => {
  const {
    inventory, addInventoryItem, deleteInventoryItem,
    students, feePayments, recordFeePayment,
    transactions, addTransaction,
    salaryReceipts, generateSalaryReceipt,
    teachers,
    settings,
    role
  } = useApp();

  // Fee modal state
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [feeStudentId, setFeeStudentId] = useState(students[0]?.id || '');
  const [feeAmount, setFeeAmount] = useState<number>(5000);
  const [feeNote, setFeeNote] = useState('Tuition Fee Payment');

  // Transaction modal state
  const [showTxModal, setShowTxModal] = useState(false);
  const [txType, setTxType] = useState<'Income' | 'Expense'>('Expense');
  const [txCategory, setTxCategory] = useState('Utilities');
  const [txAmount, setTxAmount] = useState<number>(1000);
  const [txDesc, setTxDesc] = useState('');

  // Salary modal state
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [salTeacherId, setSalTeacherId] = useState(teachers[0]?.id || '');
  const [salMonth, setSalMonth] = useState('October 2026');
  const [salBasic, setSalBasic] = useState<number>(35000);
  const [salAllowances, setSalAllowances] = useState<number>(2000);
  const [salDeductions, setSalDeductions] = useState<number>(500);

  // Inventory modal state
  const [showInvModal, setShowInvModal] = useState(false);
  const [invName, setInvName] = useState('');
  const [invCat, setInvCategory] = useState('Electronics');
  const [invQty, setInvQty] = useState<number>(10);

  // Printable receipt state
  const [printableReceipt, setPreviewReceipt] = useState<any | null>(null);

  const handleRecordPayment = () => {
    if (feeAmount <= 0) return;
    recordFeePayment({
      studentId: feeStudentId,
      amount: feeAmount,
      paymentDate: new Date().toISOString().split('T')[0],
      note: feeNote
    });
    setShowFeeModal(false);
  };

  const handleAddTx = () => {
    if (txAmount <= 0) return;
    addTransaction({
      type: txType,
      category: txCategory,
      amount: txAmount,
      description: txDesc || txCategory,
      date: new Date().toISOString().split('T')[0]
    });
    setShowTxModal(false);
  };

  const handleGenerateSalary = () => {
    const net = salBasic + salAllowances - salDeductions;
    generateSalaryReceipt({
      teacherId: salTeacherId,
      month: salMonth,
      basicSalary: salBasic,
      allowances: salAllowances,
      deductions: salDeductions,
      netSalary: net,
      paidDate: new Date().toISOString().split('T')[0]
    });
    setShowSalaryModal(false);
  };

  const handleAddInv = () => {
    if (!invName.trim()) return;
    addInventoryItem({
      name: invName,
      category: invCat,
      quantity: invQty,
      unit: 'Pcs',
      condition: 'Good'
    });
    setShowInvModal(false);
    setInvName('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Subtab Header */}
      {subTab === 'inventory' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-purple-400" /> School Assets & Inventory
            </h2>
            <p className="text-xs text-slate-400 mt-1">Track smart equipment, furniture, lab devices, and stock quantities</p>
          </div>
          {role === 'admin' && (
            <button onClick={() => setShowInvModal(true)} className="px-4 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Inventory Item
            </button>
          )}
        </div>
      )}

      {subTab === 'fees' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" /> Student Fees Collection & Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-1">Record student fee payments, generate vouchers, and monitor outstanding dues</p>
          </div>
          {role === 'admin' && (
            <button onClick={() => setShowFeeModal(true)} className="px-4 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> 💳 Record Payment
            </button>
          )}
        </div>
      )}

      {subTab === 'accounts' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-400" /> Income & Expense Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-1">Complete financial accounting log, teacher salaries auto-posting, and balance sheet</p>
          </div>
          {role === 'admin' && (
            <button onClick={() => setShowTxModal(true)} className="px-4 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Transaction
            </button>
          )}
        </div>
      )}

      {subTab === 'salary-receipts' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Teacher Salary Receipts
            </h2>
            <p className="text-xs text-slate-400 mt-1">Generate and print monthly teacher salary slips with allowances and deductions</p>
          </div>
          {role === 'admin' && (
            <button onClick={() => setShowSalaryModal(true)} className="px-4 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> 💼 Generate Salary Receipt
            </button>
          )}
        </div>
      )}

      {/* Render subTab views */}
      {subTab === 'inventory' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl overflow-x-auto shadow-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#100d24] text-purple-300 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Item Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Condition</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 text-slate-200">
              {inventory.map(item => (
                <tr key={item.id} className="hover:bg-[#1b1638]">
                  <td className="p-3 font-semibold text-white">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 font-mono font-bold text-purple-300">{item.quantity} {item.unit}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      {item.condition}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">{item.lastUpdated}</td>
                  <td className="p-3">
                    {role === 'admin' && (
                      <button onClick={() => deleteInventoryItem(item.id)} className="text-rose-400 hover:underline">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === 'fees' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Fee Payments History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#100d24] text-purple-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Receipt No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Amount Paid</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20 text-slate-200">
                {feePayments.map(fp => {
                  const st = students.find(s => s.id === fp.studentId);
                  return (
                    <tr key={fp.id} className="hover:bg-[#1b1638]">
                      <td className="p-3 font-mono text-amber-300 font-bold">{fp.receiptNo}</td>
                      <td className="p-3 font-semibold text-white">{st ? st.name : fp.studentId}</td>
                      <td className="p-3 font-mono text-emerald-400 font-bold">₹{fp.amount.toLocaleString()}</td>
                      <td className="p-3 font-mono text-slate-400">{fp.paymentDate}</td>
                      <td className="p-3 text-slate-300">{fp.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'accounts' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Transaction Ledger Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#100d24] text-purple-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20 text-slate-200">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-[#1b1638]">
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        tx.type === 'Income' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-white">{tx.category}</td>
                    <td className="p-3 text-slate-300">{tx.description}</td>
                    <td className={`p-3 font-mono font-bold ${tx.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ₹{tx.amount.toLocaleString()}
                    </td>
                    <td className="p-3 font-mono text-slate-400">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'salary-receipts' && (
        <div className="p-5 bg-[#16122d] border border-purple-900/30 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Teacher Monthly Salary Slips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salaryReceipts.map(sal => {
              const teacher = teachers.find(t => t.id === sal.teacherId);

              return (
                <div key={sal.id} className="p-4 bg-[#100d24] border border-purple-900/30 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-amber-300 font-bold text-xs">{sal.receiptNo}</span>
                    <span className="text-[10px] text-slate-400">{sal.paidDate}</span>
                  </div>

                  <div>
                    <div className="font-bold text-white text-sm">{teacher ? teacher.name : sal.teacherId}</div>
                    <div className="text-xs text-purple-300">{sal.month}</div>
                  </div>

                  <div className="p-3 bg-[#16122e] rounded-xl border border-purple-900/20 text-xs space-y-1 font-mono">
                    <div className="flex justify-between text-slate-400"><span>Basic Salary:</span><span>₹{sal.basicSalary.toLocaleString()}</span></div>
                    <div className="flex justify-between text-emerald-400"><span>Allowances:</span><span>+₹{sal.allowances.toLocaleString()}</span></div>
                    <div className="flex justify-between text-rose-400"><span>Deductions:</span><span>-₹{sal.deductions.toLocaleString()}</span></div>
                    <div className="flex justify-between text-white font-bold border-t border-purple-900/40 pt-1">
                      <span>Net Salary:</span>
                      <span className="text-emerald-400">₹{sal.netSalary.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPreviewReceipt({ ...sal, teacherName: teacher?.name || 'Teacher' })}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Salary Slip
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Record Fee Payment Modal */}
      {showFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowFeeModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white">Record Student Fee Payment</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student</label>
                <select value={feeStudentId} onChange={(e) => setFeeStudentId(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white">
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} (Roll: {s.rollNo})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Amount Paid (₹)</label>
                <input type="number" value={feeAmount} onChange={(e) => setFeeAmount(Number(e.target.value))} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Payment Note</label>
                <input type="text" value={feeNote} onChange={(e) => setFeeNote(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowFeeModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handleRecordPayment} className="px-4 py-2 text-xs font-bold bg-amber-600 text-white rounded-xl">Save Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* Salary Modal */}
      {showSalaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowSalaryModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white">Generate Teacher Salary Receipt</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Teacher</label>
                <select value={salTeacherId} onChange={(e) => {
                  setSalTeacherId(e.target.value);
                  const t = teachers.find(tr => tr.id === e.target.value);
                  if (t) setSalBasic(t.salary);
                }} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white">
                  {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Month</label>
                  <input type="text" value={salMonth} onChange={(e) => setSalMonth(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Basic Salary</label>
                  <input type="number" value={salBasic} onChange={(e) => setSalBasic(Number(e.target.value))} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Allowances (₹)</label>
                  <input type="number" value={salAllowances} onChange={(e) => setSalAllowances(Number(e.target.value))} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Deductions (₹)</label>
                  <input type="number" value={salDeductions} onChange={(e) => setSalDeductions(Number(e.target.value))} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowSalaryModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handleGenerateSalary} className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl">Generate & Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Modal */}
      {showTxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowTxModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white">Add Transaction</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Type</label>
                  <select value={txType} onChange={(e) => setTxType(e.target.value as any)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white">
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input type="text" value={txCategory} onChange={(e) => setTxCategory(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Amount (₹)</label>
                <input type="number" value={txAmount} onChange={(e) => setTxAmount(Number(e.target.value))} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <input type="text" value={txDesc} onChange={(e) => setTxDesc(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowTxModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handleAddTx} className="px-4 py-2 text-xs font-bold bg-teal-600 text-white rounded-xl">Save Transaction</button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#16122e] border border-purple-800/40 rounded-2xl p-6 shadow-2xl relative text-slate-100 space-y-4">
            <button onClick={() => setShowInvModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white">Add Inventory Item</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Item Name *</label>
                <input type="text" placeholder="e.g. Smart Projector" value={invName} onChange={(e) => setInvName(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input type="text" value={invCat} onChange={(e) => setInvCategory(e.target.value)} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantity</label>
                  <input type="number" value={invQty} onChange={(e) => setInvQty(Number(e.target.value))} className="w-full bg-[#100d24] border border-purple-900/40 rounded-xl px-3 py-2 text-white font-mono" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowInvModal(false)} className="px-4 py-2 text-xs bg-[#221c47] text-slate-300 rounded-xl">Cancel</button>
              <button onClick={handleAddInv} className="px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl">Save Item</button>
            </div>
          </div>
        </div>
      )}

      {/* Salary Slip Print Modal */}
      {printableReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl p-6 shadow-2xl relative space-y-4 border border-slate-300">
            <button onClick={() => setPreviewReceipt(null)} className="absolute right-4 top-4 text-slate-400 hover:text-black"><X className="w-5 h-5" /></button>

            <div className="text-center border-b pb-3">
              <h2 className="text-lg font-bold uppercase tracking-tight">{settings.name}</h2>
              <div className="text-xs text-slate-600">OFFICIAL SALARY RECEIPT SLIP</div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">Receipt No: {printableReceipt.receiptNo}</div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span>Teacher Name:</span><strong className="text-slate-900">{printableReceipt.teacherName}</strong></div>
              <div className="flex justify-between"><span>Month / Session:</span><span>{printableReceipt.month}</span></div>
              <div className="flex justify-between"><span>Paid Date:</span><span>{printableReceipt.paidDate}</span></div>

              <div className="p-3 bg-slate-100 rounded-xl space-y-1 font-mono pt-2 border border-slate-300">
                <div className="flex justify-between text-slate-700"><span>Basic Salary:</span><span>₹{printableReceipt.basicSalary.toLocaleString()}</span></div>
                <div className="flex justify-between text-emerald-700"><span>Allowances:</span><span>+₹{printableReceipt.allowances.toLocaleString()}</span></div>
                <div className="flex justify-between text-rose-700"><span>Deductions:</span><span>-₹{printableReceipt.deductions.toLocaleString()}</span></div>
                <div className="flex justify-between text-slate-900 font-extrabold border-t pt-1 text-sm">
                  <span>NET SALARY PAID:</span>
                  <span className="text-emerald-700">₹{printableReceipt.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <button onClick={() => window.print()} className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
