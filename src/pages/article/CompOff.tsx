import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

interface CompOffRecord {
  id: string;
  worked_date: string;
  comp_off_date?: string;
  status: 'pending' | 'approved' | 'used';
  reason?: string;
  created_at: string;
}

const CompOff: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('apply');
  const [dateWorked, setDateWorked] = useState('');
  const [reason, setReason] = useState('');
  const [days, setDays] = useState('1');
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [compOffData, setCompOffData] = useState<CompOffRecord[]>([]);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('ams_user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
      setUserRole(user.role);
      fetchCompOffData(user.id);
    }
  }, []);

  const fetchCompOffData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('comp_off')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompOffData(data || []);
    } catch (err) {
      console.error('Error fetching comp-off data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!dateWorked || !reason) return;

    setSubmitted(true);
    const userData = localStorage.getItem('ams_user');
    if (!userData) return;

    const user = JSON.parse(userData);

    try {
      const { error } = await supabase
        .from('comp_off')
        .insert([
          {
            user_id: user.id,
            worked_date: dateWorked,
            status: 'pending',
            reason: reason,
          }
        ]);

      if (error) throw error;

      setTimeout(() => {
        setSubmitted(false);
        setDateWorked('');
        setReason('');
        setRemarks('');
        setDays('1');
        setActiveTab('history');
        fetchCompOffData(user.id);
      }, 2000);
    } catch (err) {
      console.error('Error submitting comp-off request:', err);
      setSubmitted(false);
    }
  };

  const getCompOffStats = () => {
    const earned = compOffData.filter(c => c.status === 'approved').length;
    const used = compOffData.filter(c => c.status === 'used').length;
    const balance = earned - used;
    return { earned, used, balance };
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved') return '#16a34a';
    if (status === 'used') return '#1e3a5f';
    return '#d4a017';
  };

  const getStatusBg = (status: string) => {
    if (status === 'approved') return '#dcfce7';
    if (status === 'used') return '#e0e7ff';
    return '#fef3c7';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'approved') return 'Approved';
    if (status === 'used') return 'Used';
    return 'Pending';
  };

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
    { icon: '📄', label: 'Comp-Off', active: true, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
  ];

  const stats = getCompOffStats();

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
            <p className="text-white font-medium text-sm">{userName}</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>
              {userRole === 'article' ? 'Article Assistant' : userRole === 'senior' ? 'Senior' : 'Partner'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            {userName.charAt(0)}
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
            <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>📄 Comp-Off Management</h2>
            <p className="text-gray-500 text-sm">Request and track your compensatory off days</p>
          </div>

          {/* Comp-Off Wallet */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Comp-Off Earned', value: stats.earned.toString(), color: '#1e3a5f' },
              { label: 'Comp-Off Used', value: stats.used.toString(), color: '#d4a017' },
              { label: 'Available Balance', value: stats.balance.toString(), color: '#16a34a' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-md p-5 text-center">
                <p className="text-3xl font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs text-gray-500 mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Adjustment Logic Info */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="font-bold mb-3" style={{ color: '#0f1f35' }}>⚙️ Comp-Off Adjustment Priority</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { step: '1', title: 'Excess Leave Adjustment', desc: 'Comp-Off first adjusts against excess leaves', color: '#1e3a5f' },
                { step: '2', title: 'Articleship Reduction', desc: 'Reduces articleship extension days if applicable', color: '#d4a017' },
                { step: '3', title: 'Stipend Recovery', desc: 'Creates stipend recovery payable for next cycle', color: '#16a34a' },
              ].map((item) => (
                <div key={item.step} className="rounded-xl p-4" style={{ background: '#f0f4ff' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2" style={{ background: item.color }}>
                    {item.step}
                  </div>
                  <p className="font-medium text-sm" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-100">
              {[
                { key: 'apply', label: '📝 Apply' },
                { key: 'history', label: '📋 History' },
                { key: 'ledger', label: '📊 Ledger' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 px-6 py-4 font-medium transition-all"
                  style={{
                    color: activeTab === tab.key ? '#1e3a5f' : '#94a3b8',
                    borderBottom: activeTab === tab.key ? '3px solid #1e3a5f' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4">
              {/* Apply Tab */}
              {activeTab === 'apply' && (
                <>
                  {submitted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <p className="text-green-600 font-medium">✓ Comp-Off request submitted successfully!</p>
                    </div>
                  )}

                  {!submitted ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Worked</label>
                        <input
                          type="date"
                          value={dateWorked}
                          onChange={(e) => setDateWorked(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
                        <select
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                        >
                          <option value="1">1 Day</option>
                          <option value="0.5">Half Day</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Working</label>
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="e.g. Worked on Sunday for client audit at ABC Pvt Ltd..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Remarks (Optional)</label>
                        <input
                          type="text"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="Any additional notes..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                        <p className="text-xs" style={{ color: '#1e3a5f' }}>ℹ️ <strong>Note:</strong> Comp-Off can only be requested for Sundays, 2nd & 4th Saturdays, or Festival Holidays when you have worked.</p>
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={!dateWorked || !reason}
                        className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
                      >
                        Submit Comp-Off Request
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-green-600 font-medium">Submitting your request...</p>
                    </div>
                  )}
                </>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {loading ? (
                    <p className="text-gray-500">Loading comp-off history...</p>
                  ) : compOffData.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No comp-off requests yet</p>
                  ) : (
                    compOffData.map((item) => (
                      <div key={item.id} className="rounded-xl p-4 border border-gray-100" style={{ background: '#f9fafb' }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{item.reason}</p>
                            <p className="text-sm text-gray-500">Date Worked: {new Date(item.worked_date).toLocaleDateString('en-IN')}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: getStatusBg(item.status), color: getStatusColor(item.status) }}
                            >
                              {getStatusLabel(item.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Ledger Tab */}
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
                      {compOffData.map((item, i) => (
                        <tr key={item.id} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                          <td className="px-4 py-3 text-gray-500 text-xs">{new Date(item.created_at).toLocaleDateString('en-IN')}</td>
                          <td className="px-4 py-3 text-gray-700">Comp-Off {item.status === 'approved' ? 'Earned' : item.status === 'used' ? 'Adjusted' : 'Requested'}</td>
                          <td className="px-4 py-3 text-center font-bold" style={{ color: item.status === 'approved' ? '#16a34a' : '#94a3b8' }}>
                            {item.status === 'approved' ? '+1' : '-'}
                          </td>
                          <td className="px-4 py-3 text-center font-bold" style={{ color: item.status === 'used' ? '#dc2626' : '#94a3b8' }}>
                            {item.status === 'used' ? '-1' : '-'}
                          </td>
                          <td className="px-4 py-3 text-center font-bold" style={{ color: '#1e3a5f' }}>{stats.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: '#f0f4ff' }}>
                        <td colSpan={4} className="px-4 py-3 font-bold text-right" style={{ color: '#0f1f35' }}>Available Balance</td>
                        <td className="px-4 py-3 text-center font-bold text-lg" style={{ color: '#16a34a' }}>{stats.balance}</td>
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

export default CompOff;
