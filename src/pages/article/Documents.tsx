import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Documents: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
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
    { icon: '📄', label: 'Documents', active: true, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
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

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f1f35' }}>📄 Document Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'CA Intermediate Group 1 Marksheet', status: 'Uploaded', date: '15 May 2026', icon: '✅' },
              { name: 'CA Intermediate Group 2 Marksheet', status: 'Pending', date: '-', icon: '⏳' },
              { name: 'Form 3CD (Year 1)', status: 'Uploaded', date: '01 Jun 2026', icon: '✅' },
              { name: 'Articleship Agreement', status: 'Uploaded', date: '01 Sep 2025', icon: '✅' },
              { name: 'Identity Proof', status: 'Uploaded', date: '01 Sep 2025', icon: '✅' },
              { name: 'Address Proof', status: 'Uploaded', date: '01 Sep 2025', icon: '✅' },
            ].map((doc, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#0f1f35' }}>{doc.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{doc.date}</p>
                  </div>
                  <span className="text-2xl">{doc.icon}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className={`text-sm font-semibold ${doc.status === 'Uploaded' ? 'text-green-600' : 'text-orange-600'}`}>
                    {doc.status}
                  </span>
                  {doc.status === 'Pending' && (
                    <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:shadow-md" style={{ background: '#d4a017' }}>
                      Upload
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documents;
