import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  assigned_to?: string;
}

const Dashboard: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Read logged-in user from localStorage
    const storedUser = localStorage.getItem('ams_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: true, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
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
            <p className="text-white font-medium text-sm">{user?.name || 'Loading...'}</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Article Assistant</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            {user ? getInitials(user.name) : 'NA'}
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

          {/* Section 1 - Articleship Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>📋 Articleship Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'ICAI Reg. No.', value: 'WRO0123456' },
                { label: 'Start Date', value: '01 Sep 2025' },
                { label: 'Original End Date', value: '31 Aug 2027' },
                { label: 'Revised End Date', value: '31 Aug 2027' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-3" style={{ background: '#f0f4ff' }}>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="font-bold text-sm mt-1" style={{ color: '#0f1f35' }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Articleship Progress</span>
                <span className="text-sm font-bold" style={{ color: '#d4a017' }}>38% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="h-4 rounded-full" style={{ width: '38%', background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Year 1 of 2</span>
                <span className="text-xs text-gray-500">548 days remaining</span>
              </div>
            </div>
          </div>

          {/* Section 2 & 3 - Leave & Comp-Off Wallet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>🌿 Leave Wallet</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Earned Till Date', value: '9', color: '#1e3a5f' },
                  { label: 'Leave Used', value: '3', color: '#d4a017' },
                  { label: 'Balance', value: '6', color: '#16a34a' },
                  { label: 'Excess Leave', value: '0', color: '#dc2626' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: '#f0f4ff' }}>
                    <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>🔄 Comp-Off Wallet</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Earned', value: '2', color: '#1e3a5f' },
                  { label: 'Used', value: '1', color: '#d4a017' },
                  { label: 'Available', value: '1', color: '#16a34a' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: '#f0f4ff' }}>
                    <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4 - Attendance Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>📅 June 2026 Attendance</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: 'Present', value: '18', color: '#16a34a' },
                { label: 'Leave', value: '1', color: '#d4a017' },
                { label: 'Absent', value: '0', color: '#dc2626' },
                { label: 'Client Visit', value: '2', color: '#1e3a5f' },
                { label: 'Festival', value: '1', color: '#7c3aed' },
                { label: 'Weekly Off', value: '6', color: '#94a3b8' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: '#f0f4ff' }}>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5 - Stipend */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>💰 Current Month Stipend</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Base Stipend', value: '₹10,000', color: '#1e3a5f' },
                { label: 'Merit Bonus', value: '₹0', color: '#7c3aed' },
                { label: 'Leave Deduction', value: '₹0', color: '#dc2626' },
                { label: 'Recovery', value: '₹0', color: '#ea580c' },
                { label: 'Net Payable', value: '₹10,000', color: '#16a34a' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: '#f0f4ff' }}>
                  <p className="text-lg font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6 - Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>⚡ Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[
                { icon: '🌿', label: 'Apply Leave', page: 'leave' },
                { icon: '🔄', label: 'Request Comp-Off', page: 'compoff' },
                { icon: '✅', label: 'Mark Attendance', page: 'attendance' },
                { icon: '📄', label: 'Upload Documents', page: 'documents' },
                { icon: '💰', label: 'View Stipend', page: 'stipend' },
                { icon: '👤', label: 'My Profile', page: 'profile' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate && navigate(item.page)}
                  className="rounded-xl p-4 text-center transition-all hover:shadow-md hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0f1f35, #1e3a5f)', color: 'white' }}
                >
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="text-xs font-medium">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 7 & 8 - Recent Activity & Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>🕐 Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { text: 'Leave Approved for 2 Jun 2026', time: '2 days ago', color: '#16a34a' },
                  { text: 'Comp-Off Request Submitted', time: '5 days ago', color: '#d4a017' },
                  { text: 'Attendance Marked - Present', time: 'Today', color: '#1e3a5f' },
                  { text: 'Stipend Generated for May 2026', time: '1 week ago', color: '#7c3aed' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.text}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>🔔 Upcoming Alerts</h2>
              <div className="space-y-3">
                {[
                  { text: 'Group 2 Marksheet pending upload', color: '#dc2626', icon: '⚠️' },
                  { text: 'Comp-Off approval pending from Partner', color: '#d4a017', icon: '⏳' },
                  { text: 'Form 103 submission due next month', color: '#ea580c', icon: '📋' },
                  { text: 'Articleship Year 2 starts Sep 2026', color: '#1e3a5f', icon: '📅' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-sm font-medium" style={{ color: item.color }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
