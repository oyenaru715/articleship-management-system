import React, { useState } from 'react';

const SeniorRecommendations: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [remarks, setRemarks] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject'>('approve');

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false, page: 'senior-dashboard' },
    { icon: '👤', label: 'Recommendations', active: true, page: 'senior-recommendations' },
  ];

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      article: 'Naresh Manoj Agrawal',
      type: 'Leave',
      startDate: '10 Jun 2026',
      endDate: '11 Jun 2026',
      days: 2,
      reason: 'Family function',
      appliedOn: '07 Jun 2026',
      status: 'Pending - Senior',
      articleApproved: true,
      seniorStatus: 'Pending',
      partnerStatus: 'Pending',
      remarks: '',
      attendance: '94%',
      leaveBalance: 4,
    },
    {
      id: 2,
      article: 'Rohan Patel',
      type: 'Leave',
      startDate: '15 Jun 2026',
      endDate: null,
      days: 1,
      reason: 'Medical appointment',
      appliedOn: '05 Jun 2026',
      status: 'Pending - Senior',
      articleApproved: true,
      seniorStatus: 'Pending',
      partnerStatus: 'Pending',
      remarks: '',
      attendance: '96%',
      leaveBalance: 6,
    },
    {
      id: 3,
      article: 'Isha Desai',
      type: 'Comp-Off',
      startDate: '04 Jun 2026',
      endDate: null,
      days: 1,
      reason: 'Worked on 2nd Saturday',
      appliedOn: '04 Jun 2026',
      status: 'Pending - Senior',
      articleApproved: true,
      seniorStatus: 'Pending',
      partnerStatus: 'Pending',
      remarks: '',
      attendance: '95%',
      leaveBalance: 7,
    },
    {
      id: 4,
      article: 'Priyanka Sharma',
      type: 'Leave',
      startDate: '12 May 2026',
      endDate: '14 May 2026',
      days: 3,
      reason: 'Family travel',
      appliedOn: '10 May 2026',
      status: 'Recommended',
      articleApproved: true,
      seniorStatus: 'Approved',
      partnerStatus: 'Approved',
      remarks: 'Good attendance record. Recommended for approval.',
      attendance: '92%',
      leaveBalance: 3,
    },
    {
      id: 5,
      article: 'Vikram Singh',
      type: 'Leave',
      startDate: '20 May 2026',
      endDate: '22 May 2026',
      days: 3,
      reason: 'Travel - Personal',
      appliedOn: '18 May 2026',
      status: 'Approved',
      articleApproved: true,
      seniorStatus: 'Approved',
      partnerStatus: 'Approved',
      remarks: 'Senior: Approved on 19 May - Exemplary attendance. Partner: Approved on 19 May',
      attendance: '98%',
      leaveBalance: 2,
    },
  ]);

  const filteredRecommendations = recommendations.filter(r => {
    if (activeTab === 'pending') return r.status === 'Pending - Senior';
    if (activeTab === 'recommended') return r.status === 'Recommended';
    if (activeTab === 'approved') return r.status === 'Approved';
    return true;
  });

  const selected = selectedRequest ? recommendations.find(r => r.id === selectedRequest) : null;

  const handleRecommendation = (action: 'approve' | 'reject') => {
    if (selected && remarks) {
      setRecommendations(recommendations.map(r => 
        r.id === selected.id 
          ? { 
              ...r, 
              status: action === 'approve' ? 'Recommended' : 'Rejected',
              seniorStatus: action === 'approve' ? 'Approved' : 'Rejected',
              remarks: remarks
            }
          : r
      ));
      setShowModal(false);
      setRemarks('');
      setSelectedRequest(null);
    }
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
            <p className="text-xs" style={{ color: '#f5c842' }}>Senior Portal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium text-sm">Senior</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Dayal & Lohia, CA</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            SR
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
            <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>👤 Recommendations Authority</h2>
            <p className="text-gray-500 text-sm">Review and recommend on pending leave & comp-off requests</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Pending', value: recommendations.filter(r => r.status === 'Pending - Senior').length, color: '#d4a017', bg: '#fef3c7', icon: '⏳' },
              { label: 'Recommended', value: recommendations.filter(r => r.status === 'Recommended').length, color: '#0891b2', bg: '#cffafe', icon: '✅' },
              { label: 'Approved', value: recommendations.filter(r => r.status === 'Approved').length, color: '#16a34a', bg: '#dcfce7', icon: '👍' },
              { label: 'Total', value: recommendations.length, color: '#1e3a5f', bg: '#f0f4ff', icon: '📊' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-4 text-center shadow-md" style={{ background: stat.bg }}>
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex space-x-2">
            {[
              { key: 'pending', label: '⏳ Pending' },
              { key: 'recommended', label: '✅ Recommended' },
              { key: 'approved', label: '👍 Approved' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #1e3a5f, #162d4a)' : 'white',
                  color: activeTab === tab.key ? 'white' : '#64748b',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Requests List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f0f4ff' }}>
                  <h3 className="font-bold" style={{ color: '#0f1f35' }}>Requests ({filteredRecommendations.length})</h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {filteredRecommendations.map((recommendation) => (
                    <div
                      key={recommendation.id}
                      onClick={() => setSelectedRequest(recommendation.id)}
                      className="p-4 cursor-pointer transition-all hover:bg-blue-50"
                      style={{
                        background: selectedRequest === recommendation.id ? '#f0f4ff' : 'white',
                        borderLeft: selectedRequest === recommendation.id ? '4px solid #d4a017' : 'none',
                      }}
                    >
                      <p className="font-medium text-gray-800 text-sm">{recommendation.article}</p>
                      <p className="text-xs text-gray-500 mt-1">{recommendation.type} • {recommendation.days} day{recommendation.days > 1 ? 's' : ''}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 rounded-full text-xs font-bold" style={{
                          background: recommendation.status === 'Approved' ? '#dcfce7' : recommendation.status === 'Recommended' ? '#cffafe' : '#fef3c7',
                          color: recommendation.status === 'Approved' ? '#16a34a' : recommendation.status === 'Recommended' ? '#0891b2' : '#d4a017'
                        }}>
                          {recommendation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Request Details & Recommendation */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="space-y-4">

                  {/* Header Card */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>{selected.article}</h3>
                        <p className="text-gray-500 text-sm">{selected.type} Request</p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-bold" style={{
                        background: selected.status === 'Approved' ? '#dcfce7' : selected.status === 'Recommended' ? '#cffafe' : '#fef3c7',
                        color: selected.status === 'Approved' ? '#16a34a' : selected.status === 'Recommended' ? '#0891b2' : '#d4a017'
                      }}>
                        {selected.status}
                      </span>
                    </div>

                    {/* Request Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: 'Request Type', value: selected.type },
                        { label: 'Days Requested', value: selected.days },
                        { label: 'Start Date', value: selected.startDate },
                        { label: 'End Date', value: selected.endDate || 'N/A' },
                        { label: 'Applied On', value: selected.appliedOn },
                        { label: 'Reason', value: selected.reason },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                          <p className="text-xs text-gray-500">{item.label}</p>
                          <p className="text-sm font-bold" style={{ color: '#1e3a5f' }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Article Performance */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Article Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg p-4" style={{ background: '#f0f4ff' }}>
                        <p className="text-xs text-gray-500">Attendance Record</p>
                        <p className="text-2xl font-bold" style={{ color: '#16a34a' }}>{selected.attendance}</p>
                        <p className="text-xs text-gray-600 mt-1">Above 85% target</p>
                      </div>
                      <div className="rounded-lg p-4" style={{ background: '#f0f4ff' }}>
                        <p className="text-xs text-gray-500">Leave Balance</p>
                        <p className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>{selected.leaveBalance}</p>
                        <p className="text-xs text-gray-600 mt-1">Days remaining</p>
                      </div>
                    </div>
                  </div>

                  {/* Approval Workflow */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📋 Approval Workflow</h4>
                    <div className="space-y-3">
                      {[
                        { stage: 'Article', status: selected.articleApproved ? 'Approved' : 'Pending', icon: '📝', color: selected.articleApproved ? '#16a34a' : '#d4a017' },
                        { stage: 'Your Recommendation (Senior)', status: selected.seniorStatus, icon: '👤', color: selected.seniorStatus === 'Approved' ? '#16a34a' : selected.seniorStatus === 'Rejected' ? '#dc2626' : '#d4a017' },
                        { stage: 'Partner Final Approval', status: selected.partnerStatus, icon: '👨‍💼', color: selected.partnerStatus === 'Approved' ? '#16a34a' : selected.partnerStatus === 'Rejected' ? '#dc2626' : '#d4a017' },
                      ].map((item, i) => (
                        <div key={item.stage}>
                          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{item.icon}</span>
                              <span className="font-medium text-gray-700">{item.stage}</span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: item.color === '#16a34a' ? '#dcfce7' : item.color === '#dc2626' ? '#fee2e2' : '#fef3c7', color: item.color }}>
                              {item.status}
                            </span>
                          </div>
                          {i < 2 && <div className="text-center py-1" style={{ color: '#94a3b8' }}>↓</div>}
                        </div>
                      ))}
                    </div>
                    {selected.remarks && (
                      <div className="mt-4 p-3 rounded-lg" style={{ background: '#f9fafb' }}>
                        <p className="text-xs text-gray-500">Previous Remarks</p>
                        <p className="text-sm text-gray-700">{selected.remarks}</p>
                      </div>
                    )}
                  </div>

                  {/* Recommendation Buttons - Senior's Decision */}
                  {selected.status === 'Pending - Senior' && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>🎯 Your Recommendation</h4>
                      <p className="text-sm text-gray-600 mb-3">Provide remarks for your recommendation (visible to Partner):</p>
                      <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="E.g., Good attendance record. Recommended for approval."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none mb-4 resize-none text-sm"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setModalAction('approve');
                            setShowModal(true);
                          }}
                          disabled={!remarks}
                          className="flex-1 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md"
                          style={{ background: remarks ? 'linear-gradient(135deg, #16a34a, #22c55e)' : '#94a3b8' }}
                        >
                          ✅ Recommend Approval
                        </button>
                        <button
                          onClick={() => {
                            setModalAction('reject');
                            setShowModal(true);
                          }}
                          disabled={!remarks}
                          className="flex-1 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md"
                          style={{ background: remarks ? 'linear-gradient(135deg, #dc2626, #ef4444)' : '#94a3b8' }}
                        >
                          ❌ Recommend Rejection
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <p className="text-gray-500 text-lg">👈 Select a request to provide recommendation</p>
                </div>
              )}
            </div>

          </div>

        </main>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f35' }}>
              {modalAction === 'approve' ? '✅ Confirm Recommendation' : '❌ Confirm Recommendation'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Are you sure you want to recommend <strong>{modalAction === 'approve' ? 'approval' : 'rejection'}</strong> for this request?
            </p>
            <p className="text-sm text-gray-500 mb-4 p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
              <strong>Your Remarks:</strong><br />
              {remarks}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg font-medium transition-all"
                style={{ background: '#f0f4ff', color: '#1e3a5f' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRecommendation(modalAction)}
                className="flex-1 py-2 rounded-lg text-white font-medium transition-all"
                style={{ background: modalAction === 'approve' ? 'linear-gradient(135deg, #16a34a, #22c55e)' : 'linear-gradient(135deg, #dc2626, #ef4444)' }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeniorRecommendations;