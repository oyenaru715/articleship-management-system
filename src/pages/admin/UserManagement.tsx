import React, { useState } from 'react';

const AdminUserManagement: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'article',
    department: '',
    password: '',
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Naresh Manoj Agrawal', email: 'naresh@dayallohia.com', role: 'super_admin', status: 'active', createdAt: '01 Sep 2025', department: 'Management' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@dayallohia.com', role: 'admin', status: 'active', createdAt: '15 Aug 2025', department: 'Operations' },
    { id: 3, name: 'Dr. Priya Sharma', email: 'priya@dayallohia.com', role: 'senior', status: 'active', createdAt: '01 Jul 2025', department: 'Audit' },
    { id: 4, name: 'Vikram Desai', email: 'vikram@dayallohia.com', role: 'senior', status: 'active', createdAt: '15 Jun 2025', department: 'Tax' },
    { id: 5, name: 'Meera Patel', email: 'meera@dayallohia.com', role: 'senior', status: 'active', createdAt: '01 Jun 2025', department: 'Compliance' },
    { id: 6, name: 'Dinesh Dayal', email: 'dinesh@dayallohia.com', role: 'partner', status: 'active', createdAt: '01 Jan 2020', department: 'Management' },
    { id: 7, name: 'Arjun Lohia', email: 'arjun@dayallohia.com', role: 'partner', status: 'active', createdAt: '01 Jan 2020', department: 'Management' },
    { id: 8, name: 'Neha Singh', email: 'neha@dayallohia.com', role: 'partner', status: 'active', createdAt: '01 Mar 2021', department: 'Audit' },
    { id: 9, name: 'Anil Gupta', email: 'anil@dayallohia.com', role: 'partner', status: 'active', createdAt: '15 Jun 2022', department: 'Tax' },
    { id: 10, name: 'Suresh Rao', email: 'suresh@dayallohia.com', role: 'partner', status: 'active', createdAt: '01 Jan 2023', department: 'Compliance' },
    { id: 11, name: 'Naresh Manoj Agrawal', email: 'article1@dayallohia.com', role: 'article', status: 'active', createdAt: '01 Sep 2025', department: 'Articleship' },
    { id: 12, name: 'Priyanka Sharma', email: 'article2@dayallohia.com', role: 'article', status: 'active', createdAt: '15 Sep 2025', department: 'Articleship' },
    { id: 13, name: 'Rohan Patel', email: 'article3@dayallohia.com', role: 'article', status: 'active', createdAt: '01 Sep 2024', department: 'Articleship' },
    { id: 14, name: 'Isha Desai', email: 'article4@dayallohia.com', role: 'article', status: 'active', createdAt: '10 Oct 2024', department: 'Articleship' },
    { id: 15, name: 'Amit Kumar', email: 'amit@dayallohia.com', role: 'article', status: 'pending_approval', createdAt: '08 Jun 2026', department: 'Articleship', registrationType: 'self_registration' },
    { id: 16, name: 'Shruti Singh', email: 'shruti@dayallohia.com', role: 'article', status: 'pending_approval', createdAt: '09 Jun 2026', department: 'Articleship', registrationType: 'self_registration' },
  ]);

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', page: 'admin-dashboard' },
    { icon: '👥', label: 'Articles', page: 'admin-articles' },
    { icon: '✅', label: 'Approvals', page: 'admin-approvals' },
    { icon: '📈', label: 'Reports', page: 'admin-reports' },
    { icon: '⚙️', label: 'Settings', page: 'admin-settings' },
    { icon: '👤', label: 'User Management', page: 'admin-users', active: true },
  ];

  const roleColors = {
    super_admin: { bg: '#1e3a5f', text: 'white', label: 'Super Admin' },
    admin: { bg: '#1e3a5f', text: 'white', label: 'Admin' },
    partner: { bg: '#d4a017', text: 'white', label: 'Partner' },
    senior: { bg: '#7c3aed', text: 'white', label: 'Senior' },
    article: { bg: '#0891b2', text: 'white', label: 'Article' },
  };

  const filteredUsers = users.filter(u => {
    if (activeTab === 'active') return u.status === 'active';
    if (activeTab === 'pending') return u.status === 'pending_approval';
    return true;
  }).filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, {
        id: users.length + 1,
        ...newUser,
        status: 'active',
        createdAt: new Date().toLocaleDateString('en-GB'),
      }]);
      setNewUser({ name: '', email: '', role: 'article', department: '', password: '' });
      setShowAddModal(false);
    }
  };

  const handleApproveUser = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'active' } : u
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <div className="min-h-screen" style={{ background: '#f0f4ff' }}>
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
            <p className="text-white font-medium text-sm">Super Admin</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Dayal & Lohia, CA</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            NMA
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 min-h-screen shadow-lg" style={{ background: '#0f1f35' }}>
          <div className="p-4 space-y-1 mt-4">
            {sidebarItems.map((item) => (
              <div key={item.label} onClick={() => navigate && navigate(item.page)} className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all" style={{ background: item.active ? 'linear-gradient(135deg, #d4a017, #f5c842)' : 'transparent', color: item.active ? '#0f1f35' : '#94a3b8', }}>
                <span>{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>👤 User Management</h2>
              <p className="text-gray-500 text-sm">Add, edit, delete, and manage all system users</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md" style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
              ➕ Add New User
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {[
              { label: 'Total Users', value: users.length, icon: '👥', color: '#1e3a5f', bg: '#f0f4ff' },
              { label: 'Active', value: users.filter(u => u.status === 'active').length, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
              { label: 'Pending Approval', value: users.filter(u => u.status === 'pending_approval').length, icon: '⏳', color: '#d4a017', bg: '#fef3c7' },
              { label: 'Articles', value: users.filter(u => u.role === 'article').length, icon: '📚', color: '#0891b2', bg: '#cffafe' },
              { label: 'Partners', value: users.filter(u => u.role === 'partner').length, icon: '👨‍💼', color: '#d4a017', bg: '#fef3c7' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-4 text-center shadow-md" style={{ background: stat.bg }}>
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {[
                { key: 'active', label: 'Active Users' },
                { key: 'pending', label: 'Pending Approval' },
                { key: 'all', label: 'All Users' },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="px-6 py-2 rounded-lg text-sm font-medium transition-all" style={{ background: activeTab === tab.key ? 'linear-gradient(135deg, #1e3a5f, #162d4a)' : 'white', color: activeTab === tab.key ? 'white' : '#64748b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', }}>
                  {tab.label}
                </button>
              ))}
            </div>
            <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm" />
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Role</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Department</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Status</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Created</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <tr key={user.id} className="border-b border-gray-100" style={{ background: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                      <td className="px-6 py-4"><p className="font-bold text-gray-800">{user.name}</p></td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{user.email}</td>
                      <td className="px-6 py-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: roleColors[user.role as keyof typeof roleColors].bg }}>{roleColors[user.role as keyof typeof roleColors].label}</span></td>
                      <td className="px-6 py-4 text-center text-gray-600">{user.department}</td>
                      <td className="px-6 py-4 text-center"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: user.status === 'active' ? '#dcfce7' : '#fef3c7', color: user.status === 'active' ? '#16a34a' : '#d4a017' }}>{user.status === 'active' ? 'Active' : 'Pending'}</span></td>
                      <td className="px-6 py-4 text-center text-gray-500 text-xs">{user.createdAt}</td>
                      <td className="px-6 py-4 text-center space-x-2 flex justify-center">
                        {user.status === 'pending_approval' && (<button onClick={() => handleApproveUser(user.id)} className="px-3 py-1 rounded text-xs font-bold text-white bg-green-500 hover:bg-green-600">Approve</button>)}
                        <button onClick={() => { setSelectedUser(user); setShowEditModal(true); }} className="px-3 py-1 rounded text-xs font-bold text-white" style={{ background: '#0891b2' }}>Edit</button>
                        {user.role !== 'super_admin' && (<button onClick={() => handleDeleteUser(user.id)} className="px-3 py-1 rounded text-xs font-bold text-white bg-red-500 hover:bg-red-600">Delete</button>)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f35' }}>Add New User</h3>
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label><input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm" placeholder="Full Name" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email</label><input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm" placeholder="email@dayallohia.com" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Role</label><select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm"><option value="article">Article Assistant</option><option value="senior">Senior</option><option value="partner">Partner</option><option value="admin">Admin</option></select></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Department</label><input type="text" value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm" placeholder="e.g., Audit, Tax, Compliance" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Temporary Password</label><input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm" placeholder="Temporary password" /></div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 rounded-lg font-medium transition-all" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>Cancel</button>
              <button onClick={handleAddUser} className="flex-1 py-2 rounded-lg text-white font-medium transition-all" style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;