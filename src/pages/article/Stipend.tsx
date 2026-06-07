import React, { useState } from 'react';

const Stipend: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('current');

  const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: true, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
  ];

  const currentMonth = {
    month: 'June 2026',
    year: 1,
    baseStipend: 10000,
    meritBonus: 0,
    laptopDeduction: 750,
    leaveDeduction: 0,
    compOffRecovery: 0,
    netPayable: 9250,
    daysInMonth: 30,
    workingDays: 25,
    excessLeaves: 0,
    status: 'Processing',
  };

  const stipendHistory = [
    { month: 'May 2026', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Apr 2026', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Mar 2026', base: 10000, merit: 0, laptop: 750, leave: 323, recovery: 0, net: 8927, status: 'Paid' },
    { month: 'Feb 2026', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Jan 2026', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Dec 2025', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Nov 2025', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Oct 2025', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
    { month: 'Sep 2025', base: 10000, merit: 0, laptop: 750, leave: 0, recovery: 0, net: 9250, status: 'Paid' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f0f4ff' }}>

      {/* Top Navigation */}
      <nav style={{ background: 'linear-gradient(135deg, #0f1f35, #1e3a5f)' }} className="px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            <span className="text-white font-bold text-sm">D&L</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Dayal & Lohia</h1>
            <p className="text-xs" style={{ color: '#f5c842' }}>Articleship Management System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium text-sm">Naresh Agrawal</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Article Assistant</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            NA
          </div>
        </div>
      </nav>

      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 min-h-screen shadow-lg" style={{ background: '#0f1f35' }}>
          <div className="p-4 space-y-1 mt-4">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                onClick={() => navigate && navigate(item.page)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all"
                style={{
                  background: item.active ? 'linear-gradient(135deg, #d4a017, #f5c842)' : 'transparent',
                  color: item.active ? '#0f1f35' : '#94a3b8',
                }}
              >
                <span>{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">

          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>💰 Stipend Management</h2>
            <p className="text-gray-500 text-sm">View your monthly stipend details and history</p>
          </div>

          {/* Stipend Structure Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Stipend Structure — Dayal & Lohia</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Year 1 Base', value: '₹10,000', color: '#1e3a5f', note: 'Sep 2025 - Aug 2026' },
                { label: 'Year 2 Base', value: '₹13,000', color: '#7c3aed', note: 'Sep 2026 - Aug 2027' },
                { label: 'Merit Bonus', value: '₹1,500', color: '#16a34a', note: 'Both groups same attempt' },
                { label: 'Laptop Deduction', value: '₹750', color: '#dc2626', note: 'Fixed monthly deduction' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: '#f0f4ff' }}>
                  <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs font-medium text-gray-700 mt-1">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-100">
              {[
                { key: 'current', label: '📅 Current Month' },
                { key: 'history', label: '📋 Stipend History' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 py-4 text-sm font-medium transition-all"
                  style={{
                    background: activeTab === tab.key ? 'linear-gradient(135deg, #d4a017, #f5c842)' : 'white',
                    color: activeTab === tab.key ? '#0f1f35' : '#94a3b8',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">

              {/* Current Month Tab */}
              {activeTab === 'current' && (
                <div className="space-y-6">

                  {/* Month Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: '#0f1f35' }}>{currentMonth.month}</h3>
                      <p className="text-sm text-gray-500">Articleship Year {currentMonth.year}</p>
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: '#fef3c7', color: '#d4a017' }}>
                      ⏳ {currentMonth.status}
                    </span>
                  </div>

                  {/* Stipend Breakdown */}
                  <div className="rounded-xl overflow-hidden border border-gray-100">

                    {/* Earnings */}
                    <div className="p-4" style={{ background: '#f0f9ff' }}>
                      <p className="font-bold text-sm mb-3" style={{ color: '#1e3a5f' }}>💚 Earnings</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-blue-100">
                          <span className="text-sm text-gray-600">Base Stipend (Year 1)</span>
                          <span className="font-bold" style={{ color: '#16a34a' }}>+ ₹{currentMonth.baseStipend.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-600">Merit Bonus (Both Groups Same Attempt)</span>
                          <span className="font-medium text-gray-400">+ ₹{currentMonth.meritBonus}</span>
                        </div>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div className="p-4" style={{ background: '#fff5f5' }}>
                      <p className="font-bold text-sm mb-3" style={{ color: '#dc2626' }}>❌ Deductions</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-red-100">
                          <span className="text-sm text-gray-600">Laptop Deduction (Fixed)</span>
                          <span className="font-bold" style={{ color: '#dc2626' }}>- ₹{currentMonth.laptopDeduction}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-red-100">
                          <div>
                            <span className="text-sm text-gray-600">Leave Deduction</span>
                            <p className="text-xs text-gray-400">Excess leaves: {currentMonth.excessLeaves} days</p>
                          </div>
                          <span className="font-bold" style={{ color: currentMonth.leaveDeduction > 0 ? '#dc2626' : '#94a3b8' }}>
                            - ₹{currentMonth.leaveDeduction}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-600">Comp-Off Recovery</span>
                          <span className="font-bold" style={{ color: currentMonth.compOffRecovery > 0 ? '#dc2626' : '#94a3b8' }}>
                            - ₹{currentMonth.compOffRecovery}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Net Payable */}
                    <div className="p-5" style={{ background: 'linear-gradient(135deg, #0f1f35, #1e3a5f)' }}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-bold text-lg">Net Payable</p>
                          <p className="text-xs" style={{ color: '#f5c842' }}>After all deductions</p>
                        </div>
                        <p className="text-3xl font-bold" style={{ color: '#f5c842' }}>
                          ₹{currentMonth.netPayable.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Note */}
                  <div className="rounded-xl p-4" style={{ background: '#f0f4ff' }}>
                    <p className="font-bold text-sm mb-2" style={{ color: '#0f1f35' }}>📌 Calculation Notes</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• Daily rate = ₹{currentMonth.baseStipend} ÷ {currentMonth.daysInMonth} days = ₹{(currentMonth.baseStipend / currentMonth.daysInMonth).toFixed(2)}/day</p>
                      <p>• Laptop deduction of ₹750 is fixed every month regardless of working days</p>
                      <p>• Leave deduction applies only on excess leaves beyond your earned leave balance</p>
                      <p>• Merit bonus of ₹1,500 applies when both CA Inter groups are cleared in same attempt</p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
                  >
                    ⬇️ Download Stipend Statement
                  </button>

                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#0f1f35' }}>
                        <th className="text-left px-4 py-3 text-white rounded-tl-lg">Month</th>
                        <th className="text-right px-4 py-3 text-white" style={{ color: '#86efac' }}>Base</th>
                        <th className="text-right px-4 py-3 text-white" style={{ color: '#c4b5fd' }}>Merit</th>
                        <th className="text-right px-4 py-3 text-white" style={{ color: '#fca5a5' }}>Laptop</th>
                        <th className="text-right px-4 py-3 text-white" style={{ color: '#fca5a5' }}>Leave</th>
                        <th className="text-right px-4 py-3 text-white" style={{ color: '#fca5a5' }}>Recovery</th>
                        <th className="text-right px-4 py-3 text-white" style={{ color: '#f5c842' }}>Net</th>
                        <th className="text-center px-4 py-3 text-white rounded-tr-lg">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stipendHistory.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-blue-50 transition-all" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                          <td className="px-4 py-3 font-medium text-gray-700">{row.month}</td>
                          <td className="px-4 py-3 text-right text-gray-600">₹{row.base.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right" style={{ color: row.merit > 0 ? '#7c3aed' : '#94a3b8' }}>
                            {row.merit > 0 ? `₹${row.merit}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-right" style={{ color: '#dc2626' }}>-₹{row.laptop}</td>
                          <td className="px-4 py-3 text-right" style={{ color: row.leave > 0 ? '#dc2626' : '#94a3b8' }}>
                            {row.leave > 0 ? `-₹${row.leave}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-right" style={{ color: row.recovery > 0 ? '#dc2626' : '#94a3b8' }}>
                            {row.recovery > 0 ? `-₹${row.recovery}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-right font-bold" style={{ color: '#1e3a5f' }}>₹{row.net.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#dcfce7', color: '#16a34a' }}>
                              ✓ {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: '#f0f4ff' }}>
                        <td className="px-4 py-3 font-bold" style={{ color: '#0f1f35' }}>Total Paid (9 months)</td>
                        <td colSpan={5}></td>
                        <td className="px-4 py-3 text-right font-bold text-lg" style={{ color: '#1e3a5f' }}>
                          ₹{stipendHistory.reduce((sum, r) => sum + r.net, 0).toLocaleString()}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Stipend;