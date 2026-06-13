import React, { useState } from 'react';

const AdminDashboard: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeMetric, setActiveMetric] = useState('all');

const sidebarItems = [
  { icon: '📊', label: 'Dashboard', active: true, page: 'admin-dashboard' },
  { icon: '👥', label: 'Articles', active: false, page: 'admin-articles' },
  { icon: '✅', label: 'Approvals', active: false, page: 'admin-approvals' },
  { icon: '📈', label: 'Reports', active: false, page: 'admin-reports' },
  { icon: '⚙️', label: 'Settings', active: false, page: 'admin-settings' },
  { icon: '👤', label: 'User Management', active: false, page: 'admin-users' },
];

  const articles = [
    { id: 1, name: 'Naresh Manoj Agrawal', joinDate: '01 Sep 2025', year: 1, progress: 38, status: 'Active', balance: { leaves: 4, compoff: 1 } },
    { id: 2, name: 'Priyanka Sharma', joinDate: '15 Sep 2025', year: 1, progress: 35, status: 'Active', balance: { leaves: 3, compoff: 0 } },
    { id: 3, name: 'Rohan Patel', joinDate: '01 Sep 2024', year: 2, progress: 85, status: 'Active', balance: { leaves: 6, compoff: 2 } },
    { id: 4, name: 'Isha Desai', joinDate: '10 Oct 2024', year: 2, progress: 78, status: 'Active', balance: { leaves: 7, compoff: 1 } },
    { id: 5, name: 'Vikram Singh', joinDate: '01 Sep 2023', year: 3, progress: 100, status: 'Completed', balance: { leaves: 0, compoff: 0 } },
  ];

  const pendingApprovals = [
    { id: 1, article: 'Naresh Manoj Agrawal', type: 'Leave', days: 2, reason: 'Family function', appliedOn: '07 Jun 2026', status: 'Pending - Senior', stage: 1 },
    { id: 2, article: 'Priyanka Sharma', type: 'Comp-Off', days: 1, reason: 'Worked Sunday', appliedOn: '06 Jun 2026', status: 'Pending - Partner', stage: 2 },
    { id: 3, article: 'Rohan Patel', type: 'Leave', days: 1, reason: 'Medical', appliedOn: '05 Jun 2026', status: 'Pending - Senior', stage: 1 },
    { id: 4, article: 'Isha Desai', type: 'Comp-Off', days: 1, reason: 'Worked 2nd Saturday', appliedOn: '04 Jun 2026', status: 'Pending - Partner', stage: 2 },
  ];

  const stats = [
    { label: 'Total Articles', value: 5, icon: '👥', color: '#1e3a5f', bg: '#f0f4ff' },
    { label: 'Active', value: 4, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
    { label: 'Completed', value: 1, icon: '🎓', color: '#7c3aed', bg: '#ede9fe' },
    { label: 'Pending Approvals', value: 4, icon: '⏳', color: '#d4a017', bg: '#fef3c7' },
    { label: 'Avg Attendance %', value: '94', icon: '📊', color: '#0891b2', bg: '#cffafe' },
    { label: 'Excess Leaves', value: 0, icon: '⚠️', color: '#dc2626', bg: '#fee2e2' },
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
  <button
    onClick={() => navigate && navigate('login')}
    className="px-4 py-2 rounded-lg text-white font-semibold transition-all hover:shadow-md"
    style={{ background: '#ef4444' }}
  >
    🚪 Logout
  </button>
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
              <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>📊 Admin Dashboard</h2>
              <p className="text-gray-500 text-sm">Complete overview of all articles and approvals</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                📥 Export Data
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-white" style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}>
                ⚙️ Settings
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl p-4 text-center shadow-md cursor-pointer transition-all hover:shadow-lg" style={{ background: stat.bg }}>
                <p className="text-2xl mb-2">{stat.icon}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Pending Approvals Alert */}
          <div className="rounded-xl p-4 border-l-4" style={{ background: '#fef3c7', borderColor: '#d97706' }}>
            <p className="font-bold text-amber-800">⚠️ 4 Pending Approvals Awaiting Action</p>
            <p className="text-amber-700 text-sm mt-1">2 leaves pending Senior recommendation, 2 comp-offs pending Partner approval</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f0f4ff' }}>
                <h3 className="font-bold text-lg" style={{ color: '#0f1f35' }}>⏳ Pending Approvals ({pendingApprovals.length})</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-4 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-800">{approval.article}</p>
                        <p className="text-xs text-gray-500">{approval.type} • {approval.days} day{approval.days > 1 ? 's' : ''}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: '#fef3c7', color: '#d4a017' }}>
                        {approval.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{approval.reason}</p>
                    <div className="flex items-center space-x-1 text-xs">
                      <span className="px-2 py-1 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>Article ✓</span>
                      <span className="text-gray-300">→</span>
                      <span className="px-2 py-1 rounded-full" style={{ background: approval.stage > 1 ? '#fef3c7' : '#f0f4ff', color: approval.stage > 1 ? '#d4a017' : '#94a3b8' }}>
                        {approval.stage > 1 ? 'Senior ✓' : 'Senior'}
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className="px-2 py-1 rounded-full" style={{ background: '#f0f4ff', color: '#94a3b8' }}>Partner</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-100 text-center">
                <button className="text-sm font-medium" style={{ color: '#1e3a5f' }}>View All →</button>
              </div>
            </div>

            {/* Articles Overview */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f0f4ff' }}>
                <h3 className="font-bold text-lg" style={{ color: '#0f1f35' }}>👥 Articles Overview ({articles.length})</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {articles.map((article) => (
                  <div key={article.id} className="p-4 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-800">{article.name}</p>
                        <p className="text-xs text-gray-500">Year {article.year} • Joined {article.joinDate}</p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: article.status === 'Active' ? '#dcfce7' : '#ede9fe',
                          color: article.status === 'Active' ? '#16a34a' : '#7c3aed'
                        }}
                      >
                        {article.status}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-bold" style={{ color: '#1e3a5f' }}>{article.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{
                            width: `${article.progress}%`,
                            background: 'linear-gradient(135deg, #d4a017, #f5c842)'
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-3 text-xs">
                      <span style={{ color: '#16a34a' }}>Leaves: {article.balance.leaves}</span>
                      <span style={{ color: '#0891b2' }}>Comp-Off: {article.balance.compoff}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-100 text-center">
                <button className="text-sm font-medium" style={{ color: '#1e3a5f' }}>View All →</button>
              </div>
            </div>

          </div>

          {/* Articles Table */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f0f4ff' }}>
              <h3 className="font-bold text-lg" style={{ color: '#0f1f35' }}>📋 Complete Articles List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">Article Name</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">Year</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700">Join Date</th>
                    <th className="text-center px-6 py-3 font-semibold text-gray-700">Progress</th>
                    <th className="text-center px-6 py-3 font-semibold text-gray-700">Leaves</th>
                    <th className="text-center px-6 py-3 font-semibold text-gray-700">Comp-Off</th>
                    <th className="text-center px-6 py-3 font-semibold text-gray-700">Status</th>
                    <th className="text-center px-6 py-3 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article, i) => (
                    <tr key={article.id} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{article.name}</td>
                      <td className="px-6 py-4 text-gray-600">Year {article.year}</td>
                      <td className="px-6 py-4 text-gray-600">{article.joinDate}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${article.progress}%`,
                                background: 'linear-gradient(135deg, #d4a017, #f5c842)'
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>{article.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold" style={{ color: '#16a34a' }}>{article.balance.leaves}</td>
                      <td className="px-6 py-4 text-center font-bold" style={{ color: '#0891b2' }}>{article.balance.compoff}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: article.status === 'Active' ? '#dcfce7' : '#ede9fe',
                            color: article.status === 'Active' ? '#16a34a' : '#7c3aed'
                          }}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-xs font-medium px-3 py-1 rounded-lg transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;