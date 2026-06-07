import React, { useState, useEffect } from 'react';

const Attendance: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceType, setAttendanceType] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showClientLocation, setShowClientLocation] = useState(false);
  const [clientAddress, setClientAddress] = useState('');
  const [locationChecking, setLocationChecking] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedYear, setSelectedYear] = useState(2026);

  const CUTOFF_HOUR = 11;
  const isHalfDayZone = currentTime.getHours() >= CUTOFF_HOUR;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleMarkPresent = () => {
    setShowQR(true);
  };

  const handleQRScanned = () => {
    setAttendanceMarked(true);
    setAttendanceType(isHalfDayZone ? 'Half Day (Pending Approval)' : 'Present');
    setShowQR(false);
    if (isHalfDayZone) {
      alert('⚠️ You have marked attendance after 11:00 AM. This has been recorded as Half Day and sent to Partner/Admin for approval.');
    }
  };

  const handleClientLocation = () => {
    setShowClientLocation(true);
  };

  const handleGPSCheck = () => {
    setLocationChecking(true);
    setLocationStatus('Checking your location...');
    setTimeout(() => {
      setLocationStatus('✅ Location verified! Within 100 meters of client site.');
      setTimeout(() => {
        setAttendanceMarked(true);
        setAttendanceType('Client Visit');
        setShowClientLocation(false);
        setLocationChecking(false);
        setLocationStatus('');
      }, 1500);
    }, 2000);
  };

  // Calendar Data
  const attendanceData: { [key: number]: { status: string; color: string } } = {
    1: { status: 'P', color: '#16a34a' },
    2: { status: 'P', color: '#16a34a' },
    3: { status: 'P', color: '#16a34a' },
    4: { status: 'WO', color: '#94a3b8' },
    5: { status: 'P', color: '#16a34a' },
    6: { status: 'P', color: '#16a34a' },
    7: { status: 'L', color: '#d4a017' },
    8: { status: 'P', color: '#16a34a' },
    9: { status: 'P', color: '#16a34a' },
    10: { status: 'P', color: '#16a34a' },
    11: { status: 'WO', color: '#94a3b8' },
    12: { status: 'P', color: '#16a34a' },
    13: { status: 'P', color: '#16a34a' },
    14: { status: 'CV', color: '#1e3a5f' },
    15: { status: 'CV', color: '#1e3a5f' },
    16: { status: 'P', color: '#16a34a' },
    17: { status: 'P', color: '#16a34a' },
    18: { status: 'WO', color: '#94a3b8' },
    19: { status: 'P', color: '#16a34a' },
    20: { status: 'P', color: '#16a34a' },
    21: { status: 'P', color: '#16a34a' },
    22: { status: 'P', color: '#16a34a' },
    23: { status: 'P', color: '#16a34a' },
    24: { status: 'P', color: '#16a34a' },
    25: { status: 'WO', color: '#94a3b8' },
    26: { status: 'P', color: '#16a34a' },
    27: { status: 'P', color: '#16a34a' },
    28: { status: 'P', color: '#16a34a' },
    29: { status: 'P', color: '#16a34a' },
    30: { status: 'P', color: '#16a34a' },
  };

  const daysInMonth = 30;
  const firstDay = 0; // June 2026 starts on Monday

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
            {[
              { icon: '🏠', label: 'Dashboard', active: false },
              { icon: '📅', label: 'Attendance', active: true },
              { icon: '🌿', label: 'Leave', active: false },
              { icon: '🔄', label: 'Comp-Off', active: false },
              { icon: '📄', label: 'Documents', active: false },
              { icon: '💰', label: 'Stipend', active: false },
              { icon: '👤', label: 'My Profile', active: false },
            ].map((item) => (
              <div
                key={item.label}
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>Attendance</h2>
              <p className="text-gray-500 text-sm">{formatDate(currentTime)}</p>
            </div>
            <div className="text-right bg-white rounded-xl px-6 py-3 shadow-md">
              <p className="text-3xl font-bold" style={{ color: '#1e3a5f' }}>{formatTime(currentTime)}</p>
              <p className="text-xs mt-1" style={{ color: isHalfDayZone ? '#dc2626' : '#16a34a' }}>
                {isHalfDayZone ? '⚠️ After Cut-off Time (Half Day Zone)' : '✅ Within Check-in Time'}
              </p>
            </div>
          </div>

          {/* Cut-off Warning */}
          {isHalfDayZone && !attendanceMarked && (
            <div className="rounded-xl p-4 border-l-4" style={{ background: '#fef3c7', borderColor: '#d97706' }}>
              <p className="font-bold text-amber-800">⚠️ Cut-off Time Passed</p>
              <p className="text-amber-700 text-sm mt-1">It is past 11:00 AM. Marking attendance now will be recorded as <strong>Half Day</strong> and sent to Partner/Admin for approval.</p>
            </div>
          )}

          {/* Mark Attendance Card */}
          {!attendanceMarked ? (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>📍 Mark Today's Attendance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Office QR */}
                <button
                  onClick={handleMarkPresent}
                  className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2"
                  style={{ borderColor: '#1e3a5f', background: '#f0f4ff' }}
                >
                  <p className="text-4xl mb-3">📷</p>
                  <p className="font-bold" style={{ color: '#1e3a5f' }}>Scan Office QR</p>
                  <p className="text-xs text-gray-500 mt-1">For office attendance</p>
                </button>

                {/* Client Location */}
                <button
                  onClick={handleClientLocation}
                  className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2"
                  style={{ borderColor: '#d4a017', background: '#fffbeb' }}
                >
                  <p className="text-4xl mb-3">📍</p>
                  <p className="font-bold" style={{ color: '#d4a017' }}>Client Location</p>
                  <p className="text-xs text-gray-500 mt-1">GPS within 100m radius</p>
                </button>

                {/* Work From Home */}
                <button
                  onClick={() => { setAttendanceMarked(true); setAttendanceType('Work From Home'); }}
                  className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2"
                  style={{ borderColor: '#7c3aed', background: '#f5f3ff' }}
                >
                  <p className="text-4xl mb-3">🏠</p>
                  <p className="font-bold" style={{ color: '#7c3aed' }}>Work From Home</p>
                  <p className="text-xs text-gray-500 mt-1">Remote work attendance</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#dcfce7' }}>
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#16a34a' }}>Attendance Marked!</h3>
                <p className="text-gray-500 mt-2">Type: <strong>{attendanceType}</strong></p>
                <p className="text-gray-400 text-sm mt-1">Marked at {formatTime(currentTime)}</p>
                {attendanceType.includes('Half Day') && (
                  <div className="mt-4 p-3 rounded-lg" style={{ background: '#fef3c7' }}>
                    <p className="text-amber-700 text-sm">⏳ Awaiting Partner/Admin approval for Half Day override</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QR Code Modal */}
          {showQR && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f35' }}>Scan Office QR Code</h3>
                <div className="w-48 h-48 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: '#f0f4ff', border: '3px dashed #1e3a5f' }}>
                  <div className="text-center">
                    <p className="text-6xl">📷</p>
                    <p className="text-xs text-gray-500 mt-2">Point camera at QR</p>
                  </div>
                </div>
                {/* Simulated QR */}
                <div className="grid grid-cols-8 gap-1 w-32 mx-auto mb-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm" style={{ background: Math.random() > 0.5 ? '#0f1f35' : 'white' }}></div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-4">Dayal & Lohia Office — Mumbai</p>
                <div className="flex space-x-3">
                  <button onClick={() => setShowQR(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600">Cancel</button>
                  <button onClick={handleQRScanned} className="flex-1 py-2 rounded-lg text-white font-bold" style={{ background: '#1e3a5f' }}>Simulate Scan ✓</button>
                </div>
              </div>
            </div>
          )}

          {/* Client Location Modal */}
          {showClientLocation && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f35' }}>📍 Client Location Attendance</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name / Location</label>
                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="e.g. ABC Pvt Ltd, Andheri"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  />
                </div>
                {locationStatus && (
                  <div className="mb-4 p-3 rounded-lg" style={{ background: '#f0f4ff' }}>
                    <p className="text-sm" style={{ color: '#1e3a5f' }}>{locationStatus}</p>
                  </div>
                )}
                <div className="flex space-x-3">
                  <button onClick={() => setShowClientLocation(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600">Cancel</button>
                  <button
                    onClick={handleGPSCheck}
                    disabled={locationChecking || !clientAddress}
                    className="flex-1 py-2 rounded-lg text-white font-bold disabled:opacity-50"
                    style={{ background: '#d4a017' }}
                  >
                    {locationChecking ? 'Checking...' : '📍 Verify Location'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Calendar */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#0f1f35' }}>📅 June 2026 Attendance Calendar</h3>
              <div className="flex space-x-2">
                {[
                  { label: 'P Present', color: '#16a34a' },
                  { label: 'L Leave', color: '#d4a017' },
                  { label: 'CV Client', color: '#1e3a5f' },
                  { label: 'WO Week Off', color: '#94a3b8' },
                  { label: 'A Absent', color: '#dc2626' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const data = attendanceData[day];
                const isToday = day === 7;
                return (
                  <div
                    key={day}
                    className="h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all hover:shadow-md cursor-pointer"
                    style={{
                      background: data ? `${data.color}20` : '#f9fafb',
                      border: isToday ? `2px solid ${data?.color || '#1e3a5f'}` : '1px solid #e5e7eb',
                    }}
                  >
                    <span className="text-gray-600">{day}</span>
                    {data && <span style={{ color: data.color }} className="font-bold">{data.status}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Monthly Summary — June 2026</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: 'Present', value: '22', color: '#16a34a' },
                { label: 'Leave', value: '1', color: '#d4a017' },
                { label: 'Client Visit', value: '2', color: '#1e3a5f' },
                { label: 'Week Off', value: '5', color: '#94a3b8' },
                { label: 'Absent', value: '0', color: '#dc2626' },
                { label: 'Working Days', value: '25', color: '#7c3aed' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: '#f0f4ff' }}>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Attendance;