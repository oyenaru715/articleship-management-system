import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const Leave: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('apply');
  const [leaveType, setLeaveType] = useState('single');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leaveHistory, setLeaveHistory] = useState<any[]>([]);
  const [leaveStats, setLeaveStats] = useState({ earned: 0, used: 0, balance: 0, excess: 0 });
  const [historyLoading, setHistoryLoading] = useState(false);

  // Get logged in user from localStorage
  const user = JSON.parse(localStorage.getItem('ams_user') || '{}');

  const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: true, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
  ];

  // Calculate days between two dates
  const calculateDays = (start: string, end: string) => {
    if (!start) return 0;
    const s = new Date(start);
    const e = end ? new Date(end) : new Date(start);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 1;
  };

  // Fetch leave history from Supabase
  const fetchLeaveHistory = async () => {
    if (!user.id) return;
    setHistoryLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('leave_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!dbError && data) {
        setLeaveHistory(data);
        // Calculate stats
        const used = data.filter(l => l.status === 'approved').reduce((sum: number, l: any) => sum + l.days, 0);
        const earned = 10; // Fixed for now — will be dynamic later
        setLeaveStats({
          earned,
          used,
          balance: Math.max(0, earned - used),
          excess: Math.max(0, used - earned),
        });
      }
    } catch (err) {
      console.error('Error fetching leave history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  // Submit leave request to Supabase
  const handleSubmit = async () => {
    if (!startDate || !reason) return;
    setLoading(true);
    setError('');

    try {
      const days = leaveType === 'halfday' ? 0.5 : calculateDays(startDate, endDate || startDate);

      const { error: dbError } = await supabase
        .from('leave_requests')
        .insert([{
          user_id: user.id,
          leave_type: leaveType === 'single' ? 'Casual Leave' : leaveType === 'multiple' ? 'Casual Leave' : 'Half Day Leave',
          from_date: startDate,
          to_date: endDate || startDate,
          days,
          reason,
          status: 'pending',
        }]);

      if (dbError) {
        setError('Failed to submit leave request. Please try again.');
      } else {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStartDate('');
          setEndDate('');
          setReason('');
          setActiveTab('history');
          fetchLeaveHistory();
        }, 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved') return '#16a34a';
    if (status === 'rejected') return '#dc2626';
    return '#d4a017';
  };

  const getStatusBg = (status: string) => {
    if (status === 'approved') return '#dcfce7';
    if (status === 'rejected') return '#fee2e2';
    return '#fef3c7';
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
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
            <p className="text-white font-medium text-sm">{user.name || 'Article'}</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Article Assistant</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'AR'}
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
              { label: 'Earned Till Date', value: leaveStats.earned, color: '#1e3a5f' },
              { label: 'Leave Used', value: leaveStats.used, color: '#d4a017' },
              { label: 'Balance', value: leaveStats.balance, color: '#16a34a' },
              { label: 'Excess Leave', value: leaveStats.excess, color: '#dc2626' },
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
                { key: 'ledger', label: '📊 Leave Ledger' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 py-4 text-sm font-medium transition-all"
                  style={{
                    borderBottom: activeTab === tab.key ? '2px solid #1e3a5f' : '2px solid transparent',
                    color: activeTab === tab.key ? '#1e3a5f' : '#94a3b8',
                    background: activeTab === tab.key ? '#f0f4ff' : 'white',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">

              {/* Apply Leave Tab */}
              {activeTab === 'apply' && (
                <div className="space-y-5 max-w-lg">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">✅</div>
                      <h3 className="text-xl font-bold text-green-600">Leave Request Submitted!</h3>
                      <p className="text-gray-500 mt-2">Your request has been sent for approval.</p>
                    </div>
                  ) : (
                    <>
                      {/* Approval Flow */}
                      <div className="p-4 rounded-xl" style={{ background: '#f0f4ff' }}>
                        <p className="text-xs font-medium text-gray-500 mb-3">APPROVAL WORKFLOW</p>
                        <div className="flex items-center space-x-3 text-sm">
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

                      {/* Days Preview */}
                      {startDate && (
                        <div className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                          📅 {leaveType === 'halfday' ? '0.5' : calculateDays(startDate, endDate || startDate)} day(s) will be deducted
                        </div>
                      )}

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

                      {/* Sandwich Policy Notice */}
                      <div className="p-3 rounded-lg" style={{ background: '#fef3c7' }}>
                        <p className="text-xs text-amber-700">⚠️ <strong>Sandwich Policy Active:</strong> If your leave includes weekends or holidays in between, those days will also be counted as leave days.</p>
                      </div>

                      {/* Error */}
                      {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                          ⚠️ {error}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={!startDate || !reason || loading}
                        className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
                      >
                        {loading ? 'Submitting...' : 'Submit Leave Request'}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Leave History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {historyLoading ? (
                    <div className="text-center py-8 text-gray-400">Loading leave history...</div>
                  ) : leaveHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-4xl mb-3">📋</p>
                      <p className="text-gray-500">No leave requests found.</p>
                      <button onClick={() => setActiveTab('apply')} className="mt-3 text-sm font-medium" style={{ color: '#1e3a5f' }}>Apply for leave →</button>
                    </div>
                  ) : (
                    leaveHistory.map((leave) => (
                      <div key={leave.id} className="rounded-xl p-4 border border-gray-100" style={{ background: '#f9fafb' }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{leave.leave_type}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(leave.from_date)}
                              {leave.to_date !== leave.from_date ? ` → ${formatDate(leave.to_date)}` : ''}
                              {' • '}{leave.days} day{leave.days > 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{leave.reason}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold capitalize"
                              style={{ background: getStatusBg(leave.status), color: getStatusColor(leave.status) }}
                            >
                              {leave.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-2 text-xs">
                          <span className="px-2 py-1 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>✓ Article</span>
                          <span className="text-gray-300">→</span>
                          <span className="px-2 py-1 rounded-full" style={{
                            background: leave.status !== 'pending' ? '#dcfce7' : '#fef3c7',
                            color: leave.status !== 'pending' ? '#16a34a' : '#d4a017'
                          }}>
                            {leave.status !== 'pending' ? '✓' : '⏳'} Senior
                          </span>
                          <span className="text-gray-300">→</span>
                          <span className="px-2 py-1 rounded-full" style={{ background: getStatusBg(leave.status), color: getStatusColor(leave.status) }}>
                            {leave.status === 'approved' ? '✓' : leave.status === 'rejected' ? '✗' : '⏳'} Partner
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Leave Ledger Tab */}
              {activeTab === 'ledger' && (
                <div className="overflow-x-auto">
                  {leaveHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No ledger entries yet.</div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: '#0f1f35' }}>
                          <th className="text-left px-4 py-3 text-white rounded-tl-lg">Date</th>
                          <th className="text-left px-4 py-3 text-white">Particulars</th>
                          <th className="text-center px-4 py-3 text-white" style={{ color: '#fca5a5' }}>Debit</th>
                          <th className="text-center px-4 py-3 text-white rounded-tr-lg">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveHistory.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                            <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(row.from_date)}</td>
                            <td className="px-4 py-3 text-gray-700">{row.leave_type} — {row.reason}</td>
                            <td className="px-4 py-3 text-center font-bold" style={{ color: '#dc2626' }}>-{row.days}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2 py-1 rounded-full text-xs font-bold capitalize"
                                style={{ background: getStatusBg(row.status), color: getStatusColor(row.status) }}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ background: '#f0f4ff' }}>
                          <td colSpan={3} className="px-4 py-3 font-bold text-right" style={{ color: '#0f1f35' }}>Current Balance</td>
                          <td className="px-4 py-3 text-center font-bold text-lg" style={{ color: '#16a34a' }}>{leaveStats.balance}</td>
                        </tr>
                      </tfoot>
                    </table>
                  )}
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
