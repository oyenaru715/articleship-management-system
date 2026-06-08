import React, { useState } from 'react';

const AdminArticles: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false, page: 'admin-dashboard' },
    { icon: '👥', label: 'Articles', active: true, page: 'admin-articles' },
    { icon: '✅', label: 'Approvals', active: false, page: 'admin-approvals' },
    { icon: '📈', label: 'Reports', active: false, page: 'admin-reports' },
    { icon: '⚙️', label: 'Settings', active: false, page: 'admin-settings' },
  ];

  const articles = [
    {
      id: 1,
      name: 'Naresh Manoj Agrawal',
      icaiReg: 'WRO0123456',
      joinDate: '01 Sep 2025',
      endDate: '31 Aug 2027',
      revisedEnd: '31 Aug 2027',
      year: 1,
      progress: 38,
      status: 'Active',
      dob: '15 Jan 2001',
      email: 'naresh@dayallohia.com',
      mobile: '+91 98765 43210',
      transferCase: false,
      previousFirm: null,
      leaves: { earned: 4, used: 6, balance: 4, excess: 0 },
      compoff: { earned: 2, used: 1, balance: 1 },
      attendance: 94,
      exemptions: [],
    },
    {
      id: 2,
      name: 'Priyanka Sharma',
      icaiReg: 'WRO0123457',
      joinDate: '15 Sep 2025',
      endDate: '14 Sep 2027',
      revisedEnd: '14 Sep 2027',
      year: 1,
      progress: 35,
      status: 'Active',
      dob: '22 Mar 2000',
      email: 'priyanka@dayallohia.com',
      mobile: '+91 98765 54321',
      transferCase: false,
      previousFirm: null,
      leaves: { earned: 3, used: 5, balance: 3, excess: 0 },
      compoff: { earned: 1, used: 0, balance: 1 },
      attendance: 92,
      exemptions: [],
    },
    {
      id: 3,
      name: 'Rohan Patel',
      icaiReg: 'WRO0123458',
      joinDate: '01 Sep 2024',
      endDate: '31 Aug 2026',
      revisedEnd: '30 Nov 2026',
      year: 2,
      progress: 85,
      status: 'Active',
      dob: '10 Jul 1999',
      email: 'rohan@dayallohia.com',
      mobile: '+91 98765 65432',
      transferCase: false,
      previousFirm: null,
      leaves: { earned: 12, used: 6, balance: 6, excess: 0 },
      compoff: { earned: 3, used: 1, balance: 2 },
      attendance: 96,
      exemptions: ['Form 102'],
    },
    {
      id: 4,
      name: 'Isha Desai',
      icaiReg: 'WRO0123459',
      joinDate: '10 Oct 2024',
      endDate: '09 Oct 2026',
      revisedEnd: '09 Oct 2026',
      year: 2,
      progress: 78,
      status: 'Active',
      dob: '05 Jun 1999',
      email: 'isha@dayallohia.com',
      mobile: '+91 98765 76543',
      transferCase: false,
      previousFirm: null,
      leaves: { earned: 11, used: 4, balance: 7, excess: 0 },
      compoff: { earned: 2, used: 1, balance: 1 },
      attendance: 95,
      exemptions: [],
    },
    {
      id: 5,
      name: 'Vikram Singh',
      icaiReg: 'WRO0123460',
      joinDate: '01 Sep 2023',
      endDate: '31 Aug 2025',
      revisedEnd: '31 Aug 2025',
      year: 3,
      progress: 100,
      status: 'Completed',
      dob: '12 Apr 1998',
      email: 'vikram@dayallohia.com',
      mobile: '+91 98765 87654',
      transferCase: true,
      previousFirm: 'XYZ & Associates',
      leaves: { earned: 24, used: 22, balance: 2, excess: 0 },
      compoff: { earned: 4, used: 4, balance: 0 },
      attendance: 98,
      exemptions: [],
    },
  ];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         a.icaiReg.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || a.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const selected = selectedArticle ? articles.find(a => a.id === selectedArticle) : null;

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
              <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>👥 Manage Articles</h2>
              <p className="text-gray-500 text-sm">View and manage all articleship cases</p>
            </div>
            <button className="px-5 py-2 rounded-xl text-white font-medium transition-all hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}>
              ➕ Add New Article
            </button>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                placeholder="Search by name or ICAI registration..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
              />
              <div className="flex space-x-2">
                {['All', 'Active', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: activeTab === tab.toLowerCase() ? 'linear-gradient(135deg, #1e3a5f, #162d4a)' : '#f0f4ff',
                      color: activeTab === tab.toLowerCase() ? 'white' : '#64748b',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Articles List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f0f4ff' }}>
                  <h3 className="font-bold" style={{ color: '#0f1f35' }}>All Articles ({filteredArticles.length})</h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article.id)}
                      className="p-4 cursor-pointer transition-all hover:bg-blue-50"
                      style={{
                        background: selectedArticle === article.id ? '#f0f4ff' : 'white',
                        borderLeft: selectedArticle === article.id ? '4px solid #d4a017' : 'none',
                      }}
                    >
                      <p className="font-medium text-gray-800 text-sm">{article.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{article.icaiReg}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 rounded-full text-xs font-bold" style={{
                          background: article.status === 'Active' ? '#dcfce7' : '#ede9fe',
                          color: article.status === 'Active' ? '#16a34a' : '#7c3aed'
                        }}>
                          {article.status}
                        </span>
                        <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>Year {article.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Article Details */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="space-y-4">

                  {/* Header Card */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>{selected.name}</h3>
                        <p className="text-gray-500 text-sm">{selected.icaiReg}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-bold" style={{
                        background: selected.status === 'Active' ? '#dcfce7' : '#ede9fe',
                        color: selected.status === 'Active' ? '#16a34a' : '#7c3aed'
                      }}>
                        {selected.status}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Year {selected.year} Progress</span>
                        <span className="font-bold" style={{ color: '#1e3a5f' }}>{selected.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${selected.progress}%`,
                            background: 'linear-gradient(135deg, #d4a017, #f5c842)'
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Join Date', value: selected.joinDate },
                        { label: 'Completion Date', value: selected.endDate },
                        { label: 'Revised Date', value: selected.revisedEnd },
                        { label: 'Transfer Case', value: selected.transferCase ? 'Yes' : 'No' },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                          <p className="text-xs text-gray-500">{item.label}</p>
                          <p className="text-sm font-bold" style={{ color: '#1e3a5f' }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal & Contact Info */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📋 Personal Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Date of Birth', value: selected.dob },
                        { label: 'Email', value: selected.email },
                        { label: 'Mobile', value: selected.mobile },
                        { label: 'Previous Firm', value: selected.previousFirm || 'N/A' },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                          <p className="text-sm font-medium text-gray-700">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leave & Comp-Off Balance */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        title: '🌿 Leave Balance',
                        items: [
                          { label: 'Earned', value: selected.leaves.earned, color: '#16a34a' },
                          { label: 'Used', value: selected.leaves.used, color: '#dc2626' },
                          { label: 'Balance', value: selected.leaves.balance, color: '#1e3a5f' },
                          { label: 'Excess', value: selected.leaves.excess, color: '#f97316' },
                        ]
                      },
                      {
                        title: '🔄 Comp-Off Balance',
                        items: [
                          { label: 'Earned', value: selected.compoff.earned, color: '#16a34a' },
                          { label: 'Used', value: selected.compoff.used, color: '#dc2626' },
                          { label: 'Balance', value: selected.compoff.balance, color: '#1e3a5f' },
                        ]
                      }
                    ].map((section) => (
                      <div key={section.title} className="bg-white rounded-2xl shadow-md p-5">
                        <h4 className="font-bold mb-3" style={{ color: '#0f1f35' }}>{section.title}</h4>
                        <div className="space-y-2">
                          {section.items.map((item) => (
                            <div key={item.label} className="flex justify-between items-center p-2 rounded-lg" style={{ background: '#f0f4ff' }}>
                              <span className="text-sm text-gray-600">{item.label}</span>
                              <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="bg-white rounded-2xl shadow-md p-6 flex space-x-3">
                    <button className="flex-1 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md" style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}>
                      ✏️ Edit Details
                    </button>
                    <button className="flex-1 py-3 rounded-lg font-semibold transition-all hover:shadow-md" style={{ background: '#fef3c7', color: '#d4a017' }}>
                      📅 Extend Period
                    </button>
                    <button className="flex-1 py-3 rounded-lg font-semibold transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                      📄 View Documents
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <p className="text-gray-500 text-lg">👈 Select an article to view details</p>
                </div>
              )}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminArticles;