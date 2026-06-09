import React, { useState } from 'react';

const AdminSettings: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('firm');
  const [savedMessage, setSavedMessage] = useState(false);

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false, page: 'admin-dashboard' },
    { icon: '👥', label: 'Articles', active: false, page: 'admin-articles' },
    { icon: '✅', label: 'Approvals', active: false, page: 'admin-approvals' },
    { icon: '📈', label: 'Reports', active: false, page: 'admin-reports' },
    { icon: '⚙️', label: 'Settings', active: true, page: 'admin-settings' },
  ];

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
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
          <div>
            <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>⚙️ System Settings</h2>
            <p className="text-gray-500 text-sm">Manage firm configuration and system preferences</p>
          </div>

          {/* Success Message */}
          {savedMessage && (
            <div className="rounded-xl p-4 flex items-center space-x-3" style={{ background: '#dcfce7', borderLeft: '4px solid #16a34a' }}>
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold" style={{ color: '#16a34a' }}>Settings Saved Successfully</p>
                <p className="text-sm text-gray-600">Your changes have been saved and will take effect immediately.</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-2 border-b border-gray-200">
            {[
              { key: 'firm', label: '🏢 Firm Settings' },
              { key: 'articleship', label: '📚 Articleship Rules' },
              { key: 'stipend', label: '💰 Stipend Config' },
              { key: 'system', label: '🔐 System' },
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

            {/* Firm Settings */}
            {activeTab === 'firm' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-6" style={{ color: '#0f1f35' }}>📋 Firm Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Firm Name', value: 'Dayal & Lohia' },
                      { label: 'Registration Number', value: 'CA/ABC/123456' },
                      { label: 'Head Office', value: 'Mumbai, Maharashtra' },
                      { label: 'Contact Email', value: 'admin@dayallohia.com' },
                      { label: 'Contact Phone', value: '+91 22 1234 5678' },
                      { label: 'Financial Year', value: 'April - March' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-6" style={{ color: '#0f1f35' }}>🎨 System Theme</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Primary Color', value: '#1e3a5f' },
                      { name: 'Accent Color', value: '#d4a017' },
                    ].map((color) => (
                      <div key={color.name} className="flex items-center space-x-4">
                        <label className="w-40 text-sm font-medium text-gray-700">{color.name}</label>
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                            style={{ background: color.value }}
                          ></div>
                          <input
                            type="text"
                            defaultValue={color.value}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm w-24"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Articleship Rules */}
            {activeTab === 'articleship' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-6" style={{ color: '#0f1f35' }}>📚 Articleship Duration & Rules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Standard Articleship Duration (months)', value: '24' },
                      { label: 'Minimum Attendance %', value: '75' },
                      { label: 'Maximum Extension Period (months)', value: '6' },
                      { label: 'Leave Entitlement per Month', value: '1' },
                      { label: 'Maximum Leave Carryover', value: '3' },
                      { label: 'Sandwich Leave Policy', value: 'Enabled' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📋 ICAI Forms Configuration</h3>
                  <div className="space-y-3">
                    {[
                      { form: 'Form 102', required: true, dueMonth: 'September' },
                      { form: 'Form 103', required: true, dueMonth: '6th Month' },
                      { form: 'Form 109', required: true, dueMonth: '18th Month' },
                      { form: 'Form 112', required: true, dueMonth: '24th Month' },
                    ].map((item) => (
                      <div key={item.form} className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#f0f4ff' }}>
                        <div>
                          <p className="font-medium text-gray-800">{item.form}</p>
                          <p className="text-xs text-gray-500">Due: {item.dueMonth}</p>
                        </div>
                        <input type="checkbox" defaultChecked={item.required} className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stipend Configuration */}
            {activeTab === 'stipend' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-6" style={{ color: '#0f1f35' }}>💰 Stipend Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Year 1 Monthly Stipend (₹)', value: '10000' },
                      { label: 'Year 2 Monthly Stipend (₹)', value: '13000' },
                      { label: 'Merit Bonus - Both Groups Same Attempt (₹)', value: '1500' },
                      { label: 'Laptop Deduction (₹/month)', value: '750' },
                      { label: 'Leave Deduction Rate (₹/day)', value: '416.67' },
                      { label: 'Payment Day (of month)', value: '1' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Stipend Deduction Rules</h3>
                  <div className="space-y-3">
                    {[
                      { rule: 'Deduct for Excess Leaves', enabled: true },
                      { rule: 'Deduct for Comp-Off Recovery', enabled: true },
                      { rule: 'Apply Merit Bonus Automatically', enabled: true },
                      { rule: 'Round Down Deductions', enabled: false },
                    ].map((item) => (
                      <div key={item.rule} className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#f0f4ff' }}>
                        <span className="text-gray-800">{item.rule}</span>
                        <input type="checkbox" defaultChecked={item.enabled} className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-6" style={{ color: '#0f1f35' }}>🔐 Security Settings</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Session Timeout (minutes)', value: '30' },
                      { label: 'Password Expiry (days)', value: '90' },
                      { label: 'Minimum Password Length', value: '8' },
                      { label: 'Login Attempts Before Lockout', value: '5' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📧 Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { notification: 'Send Email on Leave Approval', enabled: true },
                      { notification: 'Send Email on Comp-Off Approval', enabled: true },
                      { notification: 'Monthly Compliance Report', enabled: true },
                      { notification: 'Weekly Attendance Summary', enabled: false },
                    ].map((item) => (
                      <div key={item.notification} className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#f0f4ff' }}>
                        <span className="text-gray-800">{item.notification}</span>
                        <input type="checkbox" defaultChecked={item.enabled} className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold mb-4" style={{ color: '#0f1f35' }}>🗂️ Data Management</h3>
                  <div className="space-y-3">
                    <button className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                      📥 Export All Data
                    </button>
                    <button className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
                      📊 Generate Audit Report
                    </button>
                    <button className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                      🗑️ Clear Old Records
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-3">
            <button className="px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-md" style={{ background: '#f0f4ff', color: '#1e3a5f' }}>
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #1e3a5f, #162d4a)' }}
            >
              ✅ Save Changes
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminSettings;