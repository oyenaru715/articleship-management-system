import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Stipend: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
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
    { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: true, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f0f4ff' }}>
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

        <main className="flex-1 p-6 space-y-6">
          <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>💰 Stipend & Payroll</h2>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0f1f35' }}>June 2026 Stipend Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Base Stipend', value: '₹10,000', color: '#1e3a5f' },
                { label: 'Merit Bonus', value: '₹0', color: '#7c3aed' },
                { label: 'Leave Deduction (1 day)', value: '₹500', color: '#dc2626' },
                { label: 'Recovery', value: '₹0', color: '#ea580c' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-4 mt-4 pt-4 border-t-2 border-gray-300">
                <span className="text-lg font-bold" style={{ color: '#0f1f35' }}>Net Payable</span>
                <span className="text-2xl font-bold text-green-600">₹9,500</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0f1f35' }}>Previous Stipends</h3>
            <div className="space-y-3">
              {[
                { month: 'May 2026', net: '₹10,000', status: 'Paid' },
                { month: 'April 2026', net: '₹10,000', status: 'Paid' },
                { month: 'March 2026', net: '₹9,800', status: 'Paid' },
                { month: 'February 2026', net: '₹10,000', status: 'Paid' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                  <div>
                    <p className="font-bold" style={{ color: '#0f1f35' }}>{item.month}</p>
                    <p className="text-sm text-gray-500">{item.net}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: '#16a34a', color: 'white' }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stipend;
