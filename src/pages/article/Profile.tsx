import React, { useState } from 'react';

const Profile: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);

  const sidebarItems = [
    { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
    { icon: '📅', label: 'Attendance', active: false, page: 'attendance' },
    { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
    { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
    { icon: '📄', label: 'Documents', active: false, page: 'documents' },
    { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
    { icon: '👤', label: 'My Profile', active: true, page: 'profile' },
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

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
                  NA
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>Naresh Manoj Agrawal</h2>
                  <p className="text-gray-500">Article Assistant — Dayal & Lohia, CA</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#dcfce7', color: '#16a34a' }}>● Active</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>Year 1</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#fef3c7', color: '#d4a017' }}>ICAI: WRO0123456</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-5 py-2 rounded-xl text-sm font-medium transition-all hover:shadow-md"
                style={{ background: editMode ? '#dcfce7' : 'linear-gradient(135deg, #1e3a5f, #162d4a)', color: editMode ? '#16a34a' : 'white' }}
              >
                {editMode ? '✅ Save Changes' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          {/* Articleship Progress */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Articleship Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              {[
                { label: 'Start Date', value: '01 Sep 2025' },
                { label: 'End Date', value: '31 Aug 2027' },
                { label: 'Revised End', value: '31 Aug 2027' },
                { label: 'Days Remaining', value: '548' },
                { label: 'Progress', value: '38%' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: '#f0f4ff' }}>
                  <p className="text-sm font-bold" style={{ color: '#1e3a5f' }}>{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="h-3 rounded-full" style={{ width: '38%', background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-100">
              {[
                { key: 'personal', label: '👤 Personal Info' },
                { key: 'icai', label: '🎓 ICAI & Education' },
                { key: 'banking', label: '🏦 Banking' },
                { key: 'emergency', label: '🆘 Emergency Contact' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 py-4 text-xs font-medium transition-all"
                  style={{
                    background: activeTab === tab.key ? 'linear-gradient(135deg, #d4a017, #f5c842)' : 'white',
                    color: activeTab === tab.key ? '#0f1f35' : '#94a3b8',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">

              {/* Personal Info */}
              {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', value: 'Naresh Manoj Agrawal' },
                    { label: 'Date of Birth', value: '15 Jan 2001' },
                    { label: 'Mobile Number', value: '+91 98765 43210' },
                    { label: 'Email Address', value: 'naresh@dayallohia.com' },
                    { label: 'Address', value: 'Mumbai, Maharashtra' },
                    { label: 'Article Code', value: 'DL/ART/2025/001' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                      {editMode ? (
                        <input
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      ) : (
                        <div className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700" style={{ background: '#f0f4ff' }}>
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ICAI & Education */}
              {activeTab === 'icai' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: 'ICAI Registration Number', value: 'WRO0123456' },
                      { label: 'Articleship Start Date', value: '01 Sep 2025' },
                      { label: 'Original Completion Date', value: '31 Aug 2027' },
                      { label: 'Revised Completion Date', value: '31 Aug 2027' },
                      { label: 'Transfer Case', value: 'No' },
                      { label: 'Previous Firm', value: 'N/A' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                        <div className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700" style={{ background: '#f0f4ff' }}>
                          {field.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📚 CA Exam Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'CA Inter Group 1', value: 'Cleared', color: '#16a34a', bg: '#dcfce7' },
                        { label: 'CA Inter Group 2', value: 'Cleared', color: '#16a34a', bg: '#dcfce7' },
                        { label: 'Both Groups Same Attempt', value: 'No', color: '#dc2626', bg: '#fee2e2' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: item.bg }}>
                          <p className="font-bold" style={{ color: item.color }}>{item.value}</p>
                          <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-3 rounded-lg" style={{ background: '#fef3c7' }}>
                      <p className="text-xs text-amber-700">⚠️ Since both groups were not cleared in the same attempt, the Merit Bonus of ₹1,500/month is not applicable.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Banking */}
              {activeTab === 'banking' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Bank Name', value: 'State Bank of India' },
                    { label: 'Account Number', value: 'XXXX XXXX 4521' },
                    { label: 'IFSC Code', value: 'SBIN0001234' },
                    { label: 'Account Type', value: 'Savings' },
                    { label: 'Branch Name', value: 'Mumbai Main Branch' },
                    { label: 'UPI ID', value: 'naresh@sbi' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                      {editMode ? (
                        <input
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      ) : (
                        <div className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700" style={{ background: '#f0f4ff' }}>
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Emergency Contact */}
              {activeTab === 'emergency' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Contact Name', value: 'Manoj Agrawal' },
                    { label: 'Relationship', value: 'Father' },
                    { label: 'Mobile Number', value: '+91 98765 11111' },
                    { label: 'Alternate Number', value: '+91 98765 22222' },
                    { label: 'Email', value: 'manoj@email.com' },
                    { label: 'Address', value: 'Shirpur, Maharashtra' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                      {editMode ? (
                        <input
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      ) : (
                        <div className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700" style={{ background: '#f0f4ff' }}>
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Profile;