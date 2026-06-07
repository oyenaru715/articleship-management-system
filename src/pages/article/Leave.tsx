import React, { useState } from 'react';

const Leave: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('apply');
  const [leaveType, setLeaveType] = useState('single');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: true, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
  ];

  const leaveHistory = [
    { id: 1, type: 'Casual Leave', from: '02 Jun 2026', to: '02 Jun 2026', days: 1, reason: 'Personal work', status: 'Approved', approver: 'Partner' },
    { id: 2, type: 'Casual Leave', from: '15 Apr 2026', to: '16 Apr 2026', days: 2, reason: 'Family function', status: 'Approved', approver: 'Partner' },
    { id: 3, type: 'Casual Leave', from: '10 Mar 2026', to: '10 Mar 2026', days: 1, reason: 'Medical appointment', status: 'Approved', approver: 'Partner' },
    { id: 4, type: 'Casual Leave', from: '20 Feb 2026', to: '21 Feb 2026', days: 2, reason: 'Travel', status: 'Rejected', approver: 'Partner' },
  ];

  const leaveLedger = [
    { date: '01 Sep 2025', particulars: 'Leave Earned - Month 1', credit: 1, debit: 0, balance: 1 },
    { date: '01 Oct 2025', particulars: 'Leave Earned - Month 2', credit: 1, debit: 0, balance: 2 },
    { date: '01 Nov 2025', particulars: 'Leave Earned - Month 3', credit: 1, debit: 0, balance: 3 },
    { date: '01 Dec 2025', particulars: 'Leave Earned - Month 4', credit: 1, debit: 0, balance: 4 },
    { date: '01 Jan 2026', particulars: 'Leave Earned - Month 5', credit: 1, debit: 0, balance: 5 },
    { date: '10 Feb 2026', particulars: 'Leave Utilized', credit: 0, debit: 2, balance: 3 },
    { date: '01 Feb 2026', particulars: 'Leave Earned - Month 6', credit: 1, debit: 0, balance: 4 },
    { date: '01 Mar 2026', particulars: 'Leave Earned - Month 7', credit: 1, debit: 0, balance: 5 },
    { date: '10 Mar 2026', particulars: 'Leave Utilized', credit: 0, debit: 1, balance: 4 },
    { date: '01 Apr 2026', particulars: 'Leave Earned - Month 8', credit: 1, debit: 0, balance: 5 },
    { date: '15 Apr 2026', particulars: 'Leave Utilized', credit: 0, debit: 2, balance: 3 },
    { date: '01 May 2026', particulars: 'Leave Earned - Month 9', credit: 1, debit: 0, balance: 4 },
    { date: '02 Jun 2026', particulars: 'Leave Utilized', credit: 0, debit: 1, balance: 3 },
    { date: '01 Jun 2026', particulars: 'Leave Earned - Month 10', credit: 1, debit: 0, balance: 4 },
  ];

  const handleSubmit = () => {
    if (!startDate || !reason) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStartDate('');
      setEndDate('');
      setReason('');
      setActiveTab('history');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Approved') return '#16a34a';
    if (status === 'Rejected') return '#dc2626';
    return '#d4a017';
  };

  const getStatusBg = (status: string) => {
    if (status === 'Approved') return '#dcfce7';
    if (status === 'Rejected') return '#fee2e2';
    return '#fef3c7';
  };

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
            <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>🌿 Leave Management</h2>
            <p className="text-gray-500 text-sm">Apply, track and manage your leaves</p>
          </div>

          {/* Leave Wallet */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Earned Till Date', value: '10', color: '#1e3a5f' },
              { label: 'Leave Used', value: '6', color: '#d4a017' },
              { label: 'Balance', value: '4', color: '#16a34a' },
              { label: 'Excess Leave', value: '0', color: '#dc2626' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-md p-5 text-center">
                <p className="text-3xl font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs text-gray-500 mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-100">
              {[
                { key: 'apply', label: '📝 Apply Leave' },
                { key: 'history', label: '📋 Leave History' },
                { key: 'ledger', label: '📒 Leave Ledger' },
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

              {/* Apply Leave Tab */}
              {activeTab === 'apply' && (
                <div className="space-y-5 max-w-xl">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#dcfce7' }}>
                        <span className="text-3xl">✅</span>
                      </div>
                      <h3 className="text-lg font-bold" style={{ color: '#16a34a' }}>Leave Request Submitted!</h3>
                      <p className="text-gray-500 text-sm mt-2">Your request has been sent to Senior for recommendation.</p>
                      <div className="mt-4 flex justify-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#16a34a' }}>●</span>
                          <span className="text-gray-600">Article (You)</span>
                        </div>
                        <span className="text-gray-300">→</span>
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#d4a017' }}>●</span>
                          <span className="text-gray-600">Senior</span>
                        </div>
                        <span className="text-gray-300">→</span>
                        <div className="flex items-center space-x-2">
                          <span style={{ color: '#94a3b8' }}>●</span>
                          <span className="text-gray-600">Partner</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Leave Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['single', 'multiple', 'halfday'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setLeaveType(type)}
                              className="py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all"
                              style={{
                                background: leaveType === type ? 'linear-gradient(135deg, #1e3a5f, #162d4a)' : '#f0f4ff',
                                color: leaveType === type ? 'white' : '#1e3a5f',
                              }}
                            >
                              {type === 'single' ? 'Single Day' : type === 'multiple' ? 'Multiple Days' : 'Half Day'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                          />
                        </div>
                        {leaveType === 'multiple' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                        )}
                      </div>

                      {/* Reason */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Please provide reason for leave..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                        />
                      </div>

                      {/* Attachment */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400">
                          <p className="text-2xl mb-1">📎</p>
                          <p className="text-sm text-gray-500">Click to upload document</p>
                        </div>
                      </div>

                      {/* Sandwich Policy Notice */}
                      <div className="p-3 rounded-lg" style={{ background: '#fef3c7' }}>
                        <p className="text-xs text-amber-700">⚠️ <strong>Sandwich Policy Active:</strong> If your leave includes weekends or holidays in between, those days will also be counted as leave days.</p>
                      </div>

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={!startDate || !reason}
                        className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
                      >
                        Submit Leave Request
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Leave History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {leaveHistory.map((leave) => (
                    <div key={leave.id} className="rounded-xl p-4 border border-gray-100" style={{ background: '#f9fafb' }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{leave.type}</p>
                          <p className="text-sm text-gray-500">{leave.from} {leave.to !== leave.from ? `→ ${leave.to}` : ''} • {leave.days} day{leave.days > 1 ? 's' : ''}</p>
                          <p className="text-xs text-gray-400 mt-1">{leave.reason}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{ background: getStatusBg(leave.status), color: getStatusColor(leave.status) }}
                          >
                            {leave.status}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">by {leave.approver}</p>
                        </div>
                      </div>

                      {/* Approval Flow */}
                      <div className="mt-3 flex items-center space-x-2 text-xs">
                        <span className="px-2 py-1 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>✓ Article</span>
                        <span className="text-gray-300">→</span>
                        <span className="px-2 py-1 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>✓ Senior</span>
                        <span className="text-gray-300">→</span>
                        <span className="px-2 py-1 rounded-full" style={{ background: getStatusBg(leave.status), color: getStatusColor(leave.status) }}>{leave.status === 'Approved' ? '✓' : '✗'} Partner</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Leave Ledger Tab */}
              {activeTab === 'ledger' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#0f1f35' }}>
                        <th className="text-left px-4 py-3 text-white rounded-tl-lg">Date</th>
                        <th className="text-left px-4 py-3 text-white">Particulars</th>
                        <th className="text-center px-4 py-3 text-white" style={{ color: '#f5c842' }}>Credit</th>
                        <th className="text-center px-4 py-3 text-white" style={{ color: '#fca5a5' }}>Debit</th>
                        <th className="text-center px-4 py-3 text-white rounded-tr-lg">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveLedger.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                          <td className="px-4 py-3 text-gray-500 text-xs">{row.date}</td>
                          <td className="px-4 py-3 text-gray-700">{row.particulars}</td>
                          <td className="px-4 py-3 text-center font-bold" style={{ color: row.credit > 0 ? '#16a34a' : '#94a3b8' }}>
                            {row.credit > 0 ? `+${row.credit}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-center font-bold" style={{ color: row.debit > 0 ? '#dc2626' : '#94a3b8' }}>
                            {row.debit > 0 ? `-${row.debit}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-center font-bold" style={{ color: '#1e3a5f' }}>{row.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: '#f0f4ff' }}>
                        <td colSpan={4} className="px-4 py-3 font-bold text-right" style={{ color: '#0f1f35' }}>Current Balance</td>
                        <td className="px-4 py-3 text-center font-bold text-lg" style={{ color: '#16a34a' }}>4</td>
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

export default Leave;