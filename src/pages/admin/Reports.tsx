import React, { useState } from 'react';

const AdminReports: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false, page: 'admin-dashboard' },
    { icon: '👥', label: 'Articles', active: false, page: 'admin-articles' },
    { icon: '✅', label: 'Approvals', active: false, page: 'admin-approvals' },
    { icon: '📈', label: 'Reports', active: true, page: 'admin-reports' },
    { icon: '⚙️', label: 'Settings', active: false, page: 'admin-settings' },
  ];

  const stats = [
    { label: 'Total Articles', value: 5, trend: '+0%', color: '#1e3a5f', bg: '#f0f4ff', icon: '👥' },
    { label: 'Avg Attendance', value: '94.4%', trend: '+2%', color: '#16a34a', bg: '#dcfce7', icon: '📊' },
    { label: 'Pending Approvals', value: 4, trend: '-1', color: '#d4a017', bg: '#fef3c7', icon: '⏳' },
    { label: 'Compliance Score', value: '92%', trend: '+5%', color: '#0891b2', bg: '#cffafe', icon: '✅' },
  ];

  const attendanceData = [
    { month: 'Jan', percentage: 92, target: 85 },
    { month: 'Feb', percentage: 93, target: 85 },
    { month: 'Mar', percentage: 94, target: 85 },
    { month: 'Apr', percentage: 95, target: 85 },
    { month: 'May', percentage: 96, target: 85 },
    { month: 'Jun', percentage: 94, target: 85 },
  ];

  const leaveAnalysis = [
    { name: 'Naresh Manoj Agrawal', earned: 4, used: 6, balance: 4, excess: 0, status: 'Good' },
    { name: 'Priyanka Sharma', earned: 3, used: 5, balance: 3, excess: 0, status: 'Good' },
    { name: 'Rohan Patel', earned: 12, used: 6, balance: 6, excess: 0, status: 'Good' },
    { name: 'Isha Desai', earned: 11, used: 4, balance: 7, excess: 0, status: 'Good' },
    { name: 'Vikram Singh', earned: 24, used: 22, balance: 2, excess: 0, status: 'At Risk' },
  ];

  const complianceReports = [
    { article: 'Naresh Manoj Agrawal', documents: '7/11', forms: '2/4', attendance: '94%', overall: '92%', status: 'On Track' },
    { article: 'Priyanka Sharma', documents: '6/11', forms: '2/4', attendance: '92%', overall: '88%', status: 'On Track' },
    { article: 'Rohan Patel', documents: '11/11', forms: '3/4', attendance: '96%', overall: '98%', status: 'Excellent' },
    { article: 'Isha Desai', documents: '10/11', forms: '3/4', attendance: '95%', overall: '96%', status: 'Excellent' },
    { article: 'Vikram Singh', documents: '11/11', forms: '4/4', attendance: '98%', overall: '100%', status: 'Completed' },
  ];

  const approvalMetrics = [
    { type: 'Leaves', total: 12, approved: 10, rejected: 1, pending: 1, avgTime: '2.1 days' },
    { type: 'Comp-Offs', total: 8, approved: 7, rejected: 0, pending: 1, avgTime: '1.5 days' },
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
            <p className="text-xs" style={{ color: '#f5c842' }}>Admin Portal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium text-sm">Admin User</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Dayal & Lohia, CA</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            AD
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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>📈 Analytics & Reports</h2>
              <p className="text-gray-500 text-sm">Comprehensive insights and compliance tracking</p>
            </div>
            <div className="flex space-x-2">
              {['week', 'month', 'quarter', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                  style={{
                    background: dateRange === range ? 'linear-gradient(135deg, #1e3a5f, #162d4a)' : '#f0f4ff',
                    color: dateRange === range ? 'white' : '#64748b',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl p-4 shadow-md" style={{ background: stat.bg }}>
                <p className="text-2xl mb-2">{stat.icon}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                <p className="text-xs mt-1" style={{ color: stat.trend.includes('+') ? '#16a34a' : '#dc2626' }}>
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 border-b border-gray-200">
            {[
              { key: 'overview', label: '📊 Overview' },
              { key: 'attendance', label: '📅 Attendance' },
              { key: 'leaves', label: '🌿 Leave Analysis' },
              { key: 'compliance', label: '✅ Compliance' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-6 py-3 text-sm font-medium transition-all border-b-2"
                style={{
                  borderColor: activeTab === tab.key ? '#d4a017' : 'transparent',
                  color: activeTab === tab.key ? '#d4a017' : '#64748b',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Approval Metrics */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>⏳ Approval Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {approvalMetrics.map((metric) => (
                      <div key={metric.type} className="rounded-xl p-4" style={{ background: '#f0f4ff' }}>
                        <p className="font-bold text-lg" style={{ color: '#1e3a5f' }}>{metric.type}</p>
                        <div className="grid grid-cols-4 gap-2 mt-3">
                          {[
                            { label: 'Total', value: metric.total, color: '#1e3a5f' },
                            { label: 'Approved', value: metric.approved, color: '#16a34a' },
                            { label: 'Rejected', value: metric.rejected, color: '#dc2626' },
                            { label: 'Pending', value: metric.pending, color: '#d4a017' },
                          ].map((item) => (
                            <div key={item.label} className="text-center">
                              <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}</p>
                              <p className="text-xs text-gray-500">{item.label}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">Avg Processing Time: {metric.avgTime}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Monthly Attendance Trend</h3>
                <div className="space-y-4">
                  {attendanceData.map((data) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <span className="w-12 font-bold text-gray-600">{data.month}</span>
                      <div className="flex-1">
                        <div className="flex space-x-2 mb-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-6" style={{ position: 'relative' }}>
                            <div
                              className="h-6 rounded-full transition-all flex items-center justify-end pr-2"
                              style={{
                                width: `${data.percentage}%`,
                                background: 'linear-gradient(135deg, #d4a017, #f5c842)',
                              }}
                            >
                              <span className="text-xs font-bold text-white">{data.percentage}%</span>
                            </div>
                          </div>
                          <span className="w-12 text-right text-sm text-gray-500">Target: {data.target}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leave Analysis Tab */}
            {activeTab === 'leaves' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4" style={{ background: '#f0f4ff' }}>
                  <h3 className="font-bold" style={{ color: '#0f1f35' }}>🌿 Leave Balance Analysis</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        <th className="text-left px-6 py-3 font-semibold text-gray-700">Article Name</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Earned</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Used</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Balance</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Excess</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveAnalysis.map((item, i) => (
                        <tr key={item.name} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                          <td className="px-6 py-4 text-gray-800 font-medium">{item.name}</td>
                          <td className="px-6 py-4 text-center font-bold" style={{ color: '#16a34a' }}>{item.earned}</td>
                          <td className="px-6 py-4 text-center font-bold" style={{ color: '#dc2626' }}>{item.used}</td>
                          <td className="px-6 py-4 text-center font-bold" style={{ color: '#1e3a5f' }}>{item.balance}</td>
                          <td className="px-6 py-4 text-center font-bold" style={{ color: '#f97316' }}>{item.excess}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{
                              background: item.status === 'Good' ? '#dcfce7' : '#fee2e2',
                              color: item.status === 'Good' ? '#16a34a' : '#dc2626'
                            }}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Compliance Tab */}
            {activeTab === 'compliance' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4" style={{ background: '#f0f4ff' }}>
                  <h3 className="font-bold" style={{ color: '#0f1f35' }}>✅ Compliance Status Report</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        <th className="text-left px-6 py-3 font-semibold text-gray-700">Article Name</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Documents</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">ICAI Forms</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Attendance</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Overall Score</th>
                        <th className="text-center px-6 py-3 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceReports.map((item, i) => (
                        <tr key={item.article} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                          <td className="px-6 py-4 text-gray-800 font-medium">{item.article}</td>
                          <td className="px-6 py-4 text-center text-gray-600">{item.documents}</td>
                          <td className="px-6 py-4 text-center text-gray-600">{item.forms}</td>
                          <td className="px-6 py-4 text-center font-bold" style={{ color: '#16a34a' }}>{item.attendance}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${parseInt(item.overall)}%`,
                                    background: 'linear-gradient(135deg, #d4a017, #f5c842)'
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>{item.overall}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{
                              background: item.status === 'Excellent' ? '#dcfce7' : item.status === 'On Track' ? '#cffafe' : '#ede9fe',
                              color: item.status === 'Excellent' ? '#16a34a' : item.status === 'On Track' ? '#0891b2' : '#7c3aed'
                            }}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminReports;