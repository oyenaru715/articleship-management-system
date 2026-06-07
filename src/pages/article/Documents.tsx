import React, { useState } from 'react';

const Documents: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: true, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
  ];

  const documents = [
    { id: 1, name: 'PAN Card', category: 'personal', status: 'Uploaded', date: '01 Sep 2025', size: '245 KB', icon: '🪪' },
    { id: 2, name: 'Aadhaar Card', category: 'personal', status: 'Uploaded', date: '01 Sep 2025', size: '312 KB', icon: '🪪' },
    { id: 3, name: 'Bank Passbook', category: 'banking', status: 'Uploaded', date: '01 Sep 2025', size: '189 KB', icon: '🏦' },
    { id: 4, name: 'Cancelled Cheque', category: 'banking', status: 'Uploaded', date: '01 Sep 2025', size: '156 KB', icon: '🏦' },
    { id: 5, name: 'Form 102', category: 'icai', status: 'Uploaded', date: '05 Sep 2025', size: '421 KB', icon: '📋' },
    { id: 6, name: 'Form 103', category: 'icai', status: 'Pending', date: '-', size: '-', icon: '📋' },
    { id: 7, name: 'Form 109', category: 'icai', status: 'N/A', date: '-', size: '-', icon: '📋' },
    { id: 8, name: 'Form 112', category: 'icai', status: 'N/A', date: '-', size: '-', icon: '📋' },
    { id: 9, name: 'CA Inter Group 1 Marksheet', category: 'education', status: 'Uploaded', date: '01 Sep 2025', size: '534 KB', icon: '🎓' },
    { id: 10, name: 'CA Inter Group 2 Marksheet', category: 'education', status: 'Pending', date: '-', size: '-', icon: '🎓' },
    { id: 11, name: 'IT OC Completion Certificate', category: 'education', status: 'Uploaded', date: '01 Sep 2025', size: '298 KB', icon: '🎓' },
  ];

  const categories = [
    { key: 'all', label: 'All Documents' },
    { key: 'personal', label: '🪪 Personal' },
    { key: 'banking', label: '🏦 Banking' },
    { key: 'icai', label: '📋 ICAI Forms' },
    { key: 'education', label: '🎓 Education' },
  ];

  const filteredDocs = activeCategory === 'all' ? documents : documents.filter(d => d.category === activeCategory);

  const uploaded = documents.filter(d => d.status === 'Uploaded').length;
  const pending = documents.filter(d => d.status === 'Pending').length;
  const na = documents.filter(d => d.status === 'N/A').length;
  const total = documents.filter(d => d.status !== 'N/A').length;
  const complianceScore = Math.round((uploaded / total) * 100);

  const getStatusColor = (status: string) => {
    if (status === 'Uploaded') return '#16a34a';
    if (status === 'Pending') return '#dc2626';
    if (status === 'N/A') return '#94a3b8';
    return '#d4a017';
  };

  const getStatusBg = (status: string) => {
    if (status === 'Uploaded') return '#dcfce7';
    if (status === 'Pending') return '#fee2e2';
    if (status === 'N/A') return '#f1f5f9';
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
            <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>📄 Document Vault</h2>
            <p className="text-gray-500 text-sm">Manage and track all your articleship documents</p>
          </div>

          {/* Compliance Score + Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Compliance Score */}
            <div className="bg-white rounded-2xl shadow-md p-5 md:col-span-1">
              <h3 className="font-bold text-sm mb-3" style={{ color: '#0f1f35' }}>Document Compliance</h3>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f4ff" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#16a34a" strokeWidth="10"
                      strokeDasharray={`${complianceScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold" style={{ color: '#16a34a' }}>{complianceScore}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{uploaded} of {total} documents uploaded</p>
              </div>
            </div>

            {/* Stats */}
            <div className="md:col-span-3 grid grid-cols-3 gap-4">
              {[
                { label: 'Uploaded', value: uploaded, color: '#16a34a', bg: '#dcfce7', icon: '✅' },
                { label: 'Pending', value: pending, color: '#dc2626', bg: '#fee2e2', icon: '⚠️' },
                { label: 'Not Applicable', value: na, color: '#94a3b8', bg: '#f1f5f9', icon: 'ℹ️' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl shadow-md p-5 text-center">
                  <p className="text-2xl mb-1">{item.icon}</p>
                  <p className="text-3xl font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Alert */}
          {pending > 0 && (
            <div className="rounded-xl p-4 border-l-4" style={{ background: '#fef3c7', borderColor: '#d97706' }}>
              <p className="font-bold text-amber-800">⚠️ {pending} Document{pending > 1 ? 's' : ''} Pending</p>
              <p className="text-amber-700 text-sm mt-1">Please upload pending documents to complete your articleship compliance.</p>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeCategory === cat.key ? 'linear-gradient(135deg, #1e3a5f, #162d4a)' : 'white',
                  color: activeCategory === cat.key ? 'white' : '#64748b',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl shadow-md p-5 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: '#f0f4ff' }}>
                      {doc.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{doc.name}</p>
                      {doc.date !== '-' && <p className="text-xs text-gray-400">{doc.date}</p>}
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: getStatusBg(doc.status), color: getStatusColor(doc.status) }}
                  >
                    {doc.status}
                  </span>
                </div>

                {doc.size !== '-' && (
                  <p className="text-xs text-gray-400 mb-3">Size: {doc.size}</p>
                )}

                <div className="flex space-x-2">
                  {doc.status === 'Uploaded' && (
                    <>
                      <button className="flex-1 py-2 rounded-lg text-xs font-medium transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                        👁️ Preview
                      </button>
                      <button className="flex-1 py-2 rounded-lg text-xs font-medium transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                        ⬇️ Download
                      </button>
                      <button className="flex-1 py-2 rounded-lg text-xs font-medium transition-all hover:shadow-md" style={{ background: '#fef3c7', color: '#d4a017' }}>
                        🔄 Replace
                      </button>
                    </>
                  )}
                  {doc.status === 'Pending' && (
                    <button className="w-full py-2 rounded-lg text-xs font-medium text-white transition-all hover:shadow-md" style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}>
                      ⬆️ Upload Document
                    </button>
                  )}
                  {doc.status === 'N/A' && (
                    <p className="text-xs text-gray-400 text-center w-full py-2">Not applicable for your case</p>
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