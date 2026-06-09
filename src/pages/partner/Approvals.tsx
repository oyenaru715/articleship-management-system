import React, { useState } from 'react';

const PartnerApprovals: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false, page: 'partner-dashboard' },
    { icon: '✅', label: 'Approvals', active: true, page: 'partner-approvals' },
    { icon: '📈', label: 'Reports', active: false, page: 'partner-reports' },
  ];

  const [approvals, setApprovals] = useState([
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
      stage: 1,
      articleApproved: true,
      seniorStatus: 'Pending',
      partnerStatus: 'Pending',
      remarks: '',
    },
    {
      id: 2,
      article: 'Priyanka Sharma',
      type: 'Comp-Off',
      startDate: '01 Jun 2026',
      endDate: null,
      days: 1,
      reason: 'Worked on Sunday - Client Audit',
      appliedOn: '06 Jun 2026',
      status: 'Pending - Partner',
      stage: 2,
      articleApproved: true,
      seniorStatus: 'Approved',
      partnerStatus: 'Pending',
      remarks: 'Senior: Approved on 06 Jun 2026',
    },
    {
      id: 3,
      article: 'Rohan Patel',
      type: 'Leave',
      startDate: '15 Jun 2026',
      endDate: null,
      days: 1,
      reason: 'Medical appointment',
      appliedOn: '05 Jun 2026',
      status: 'Pending - Senior',
      stage: 1,
      articleApproved: true,
      seniorStatus: 'Pending',
      partnerStatus: 'Pending',
      remarks: '',
    },
    {
      id: 4,
      article: 'Isha Desai',
      type: 'Comp-Off',
      startDate: '04 Jun 2026',
      endDate: null,
      days: 1,
      reason: 'Worked on 2nd Saturday',
      appliedOn: '04 Jun 2026',
      status: 'Pending - Partner',
      stage: 2,
      articleApproved: true,
      seniorStatus: 'Approved',
      partnerStatus: 'Pending',
      remarks: 'Senior: Approved on 04 Jun 2026',
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
      stage: 3,
      articleApproved: true,
      seniorStatus: 'Approved',
      partnerStatus: 'Approved',
      remarks: 'Partner: Approved on 19 May 2026',
    },
    {
      id: 6,
      article: 'Rohan Patel',
      type: 'Leave',
      startDate: '10 May 2026',
      endDate: null,
      days: 1,
      reason: 'Festival Holiday Work',
      appliedOn: '08 May 2026',
      status: 'Rejected',
      stage: 2,
      articleApproved: true,
      seniorStatus: 'Approved',
      partnerStatus: 'Rejected',
      remarks: 'Partner: Rejected - Insufficient leave balance',
    },
  ]);

  const filteredApprovals = approvals.filter(a => {
    if (activeTab === 'pending') return a.status.includes('Pending');
    if (activeTab === 'approved') return a.status === 'Approved';
    if (activeTab === 'rejected') return a.status === 'Rejected';
    return true;
  });

  const selected = selectedRequest ? approvals.find(a => a.id === selectedRequest) : null;

  const handleApprove = () => {
    if (selected) {
      setApprovals(approvals.map(a => 
        a.id === selected.id 
          ? { ...a, status: 'Approved', partnerStatus: 'Approved' }
          : a
      ));
      setSelectedRequest(null);
    }
  };

  const handleReject = () => {
    if (selected && rejectReason) {
      setApprovals(approvals.map(a => 
        a.id === selected.id 
          ? { ...a, status: 'Rejected', partnerStatus: 'Rejected', remarks: `Partner: Rejected - ${rejectReason}` }
          : a
      ));
      setShowRejectModal(false);
      setRejectReason('');
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
            <p className="text-xs" style={{ color: '#f5c842' }}>Partner Portal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium text-sm">Partner</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Dayal & Lohia, CA</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            PA
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
            <h2 className="text-3xl font-bold" style={{ color: '#0f1f35' }}>✅ Final Approval Authority</h2>
            <p className="text-gray-500 text-sm">Review and approve all pending leave & comp-off requests</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Pending', value: approvals.filter(a => a.status.includes('Pending')).length, color: '#d4a017', bg: '#fef3c7', icon: '⏳' },
              { label: 'Approved', value: approvals.filter(a => a.status === 'Approved').length, color: '#16a34a', bg: '#dcfce7', icon: '✅' },
              { label: 'Rejected', value: approvals.filter(a => a.status === 'Rejected').length, color: '#dc2626', bg: '#fee2e2', icon: '❌' },
              { label: 'Total', value: approvals.length, color: '#1e3a5f', bg: '#f0f4ff', icon: '📊' },
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
              { key: 'approved', label: '✅ Approved' },
              { key: 'rejected', label: '❌ Rejected' },
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
                  <h3 className="font-bold" style={{ color: '#0f1f35' }}>Requests ({filteredApprovals.length})</h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {filteredApprovals.map((approval) => (
                    <div
                      key={approval.id}
                      onClick={() => setSelectedRequest(approval.id)}
                      className="p-4 cursor-pointer transition-all hover:bg-blue-50"
                      style={{
                        background: selectedRequest === approval.id ? '#f0f4ff' : 'white',
                        borderLeft: selectedRequest === approval.id ? '4px solid #d4a017' : 'none',
                      }}
                    >
                      <p className="font-medium text-gray-800 text-sm">{approval.article}</p>
                      <p className="text-xs text-gray-500 mt-1">{approval.type} • {approval.days} day{approval.days > 1 ? 's' : ''}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 rounded-full text-xs font-bold" style={{
                          background: approval.status === 'Approved' ? '#dcfce7' : approval.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                          color: approval.status === 'Approved' ? '#16a34a' : approval.status === 'Rejected' ? '#dc2626' : '#d4a017'
                        }}>
                          {approval.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Request Details & Approval */}
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
                        background: selected.status === 'Approved' ? '#dcfce7' : selected.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                        color: selected.status === 'Approved' ? '#16a34a' : selected.status === 'Rejected' ? '#dc2626' : '#d4a017'
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

                  {/* Approval Workflow */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>📋 Approval Journey</h4>
                    <div className="space-y-3">
                      {[
                        { stage: 'Article', status: selected.articleApproved ? 'Approved' : 'Pending', icon: '📝', color: selected.articleApproved ? '#16a34a' : '#d4a017' },
                        { stage: 'Senior Recommendation', status: selected.seniorStatus, icon: '👔', color: selected.seniorStatus === 'Approved' ? '#16a34a' : selected.seniorStatus === 'Rejected' ? '#dc2626' : '#d4a017' },
                        { stage: 'Your Approval (Partner)', status: selected.partnerStatus, icon: '👨‍💼', color: selected.partnerStatus === 'Approved' ? '#16a34a' : selected.partnerStatus === 'Rejected' ? '#dc2626' : '#d4a017' },
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

                  {/* Approval Buttons - Partner's Final Decision */}
                  {selected.status.includes('Pending') && selected.stage === 2 && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h4 className="font-bold mb-4" style={{ color: '#0f1f35' }}>🎯 Your Final Decision</h4>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleApprove}
                          className="flex-1 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md"
                          style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
                        >
                          ✅ Approve Request
                        </button>
                        <button
                          onClick={() => setShowRejectModal(true)}
                          className="flex-1 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-md"
                          style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}
                        >
                          ❌ Reject Request
                        </button>
                      </div>
                    </div>
                  )}

                  {selected.stage < 2 && (
                    <div className="bg-blue-50 rounded-2xl shadow-md p-6 border-l-4" style={{ borderColor: '#d4a017' }}>
                      <p className="font-bold text-amber-800">⏳ Awaiting Senior Recommendation</p>
                      <p className="text-sm text-amber-700 mt-2">This request is still pending Senior's recommendation. It will appear for your approval once the Senior approves it.</p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <p className="text-gray-500 text-lg">👈 Select a request to review</p>
                </div>
              )}
            </div>

          </div>

        </main>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f35' }}>❌ Reject Request</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Provide reason for rejection..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none mb-4 resize-none"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2 rounded-lg font-medium transition-all"
                style={{ background: '#f0f4ff', color: '#1e3a5f' }}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason}
                className="flex-1 py-2 rounded-lg text-white font-medium transition-all"
                style={{ background: rejectReason ? 'linear-gradient(135deg, #dc2626, #ef4444)' : '#94a3b8' }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PartnerApprovals;