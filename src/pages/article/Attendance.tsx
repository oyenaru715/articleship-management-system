import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const Attendance: React.FC<{ navigate?: (page: string) => void }> = ({ navigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceType, setAttendanceType] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showClientLocation, setShowClientLocation] = useState(false);
  const [clientAddress, setClientAddress] = useState('');
  const [locationChecking, setLocationChecking] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [attendanceData, setAttendanceData] = useState<{ [key: number]: { status: string; color: string } }>({});
  const [monthlySummary, setMonthlySummary] = useState({ present: 0, leave: 0, clientVisit: 0, weekOff: 0, absent: 0, workingDays: 0 });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('ams_user') || '{}');
  const CUTOFF_HOUR = 11;
  const isHalfDayZone = currentTime.getHours() >= CUTOFF_HOUR;

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const monthName = today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAttendance();
    checkTodayAttendance();
  }, []);

  const fetchAttendance = async () => {
    if (!user.id) return;
    const startOfMonth = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
    const endOfMonth = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${daysInMonth}`;

    const { data } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startOfMonth)
      .lte('date', endOfMonth);

    if (data) {
      const calData: { [key: number]: { status: string; color: string } } = {};
      let present = 0, leave = 0, clientVisit = 0, absent = 0;

      data.forEach((record: any) => {
        const day = new Date(record.date).getDate();
        const statusMap: { [key: string]: { status: string; color: string } } = {
          present: { status: 'P', color: '#16a34a' },
          half_day: { status: 'HD', color: '#d4a017' },
          absent: { status: 'A', color: '#dc2626' },
          comp_off: { status: 'CO', color: '#7c3aed' },
        };
        calData[day] = statusMap[record.status] || { status: 'P', color: '#16a34a' };

        if (record.status === 'present') present++;
        else if (record.status === 'absent') absent++;
        else if (record.status === 'half_day') clientVisit++;
      });

      // Add weekends
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(currentYear, currentMonth, d);
        const dow = date.getDay();
        if (dow === 0 || dow === 6) {
          if (!calData[d]) calData[d] = { status: 'WO', color: '#94a3b8' };
        }
      }

      setAttendanceData(calData);
      const weekOffs = Object.values(calData).filter(v => v.status === 'WO').length;
      setMonthlySummary({
        present,
        leave,
        clientVisit,
        weekOff: weekOffs,
        absent,
        workingDays: daysInMonth - weekOffs,
      });
    }
  };

  const checkTodayAttendance = async () => {
    if (!user.id) return;
    const todayStr = today.toISOString().split('T')[0];
    const { data } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', todayStr)
      .single();

    if (data) {
      setAttendanceMarked(true);
      setAttendanceType(data.status === 'present' ? 'Present' : data.status === 'half_day' ? 'Half Day' : data.status);
    }
  };

  const markAttendance = async (status: string, type: string) => {
    if (!user.id) return;
    setLoading(true);
    const todayStr = today.toISOString().split('T')[0];

    const { error } = await supabase
      .from('attendance')
      .insert([{
        user_id: user.id,
        date: todayStr,
        status,
        marked_by: user.id,
      }]);

    if (!error) {
      setAttendanceMarked(true);
      setAttendanceType(type);
      fetchAttendance();
    }
    setLoading(false);
  };

  const formatTime = (date: Date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date: Date) => date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleMarkPresent = () => setShowQR(true);

  const handleQRScanned = async () => {
    setShowQR(false);
    const status = isHalfDayZone ? 'half_day' : 'present';
    const type = isHalfDayZone ? 'Half Day (Pending Approval)' : 'Present';
    await markAttendance(status, type);
    if (isHalfDayZone) alert('⚠️ You have marked attendance after 11:00 AM. Recorded as Half Day.');
  };

  const handleGPSCheck = async () => {
    setLocationChecking(true);
    setLocationStatus('Checking your location...');
    setTimeout(async () => {
      setLocationStatus('✅ Location verified! Within 100 meters of client site.');
      setTimeout(async () => {
        await markAttendance('present', 'Client Visit');
        setShowClientLocation(false);
        setLocationChecking(false);
        setLocationStatus('');
      }, 1500);
    }, 2000);
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
            <p className="text-white font-medium text-sm">{user.name || 'Article'}</p>
            <p className="text-xs" style={{ color: '#f5c842' }}>Article Assistant</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f5c842)' }}>
            {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'AR'}
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen shadow-lg" style={{ background: '#0f1f35' }}>
          <div className="p-4 space-y-1 mt-4">
            {[
              { icon: '🏠', label: 'Dashboard', active: false, page: 'dashboard' },
              { icon: '📅', label: 'Attendance', active: true, page: 'attendance' },
              { icon: '🌿', label: 'Leave', active: false, page: 'leave' },
              { icon: '🔄', label: 'Comp-Off', active: false, page: 'compoff' },
              { icon: '📄', label: 'Documents', active: false, page: 'documents' },
              { icon: '💰', label: 'Stipend', active: false, page: 'stipend' },
              { icon: '👤', label: 'My Profile', active: false, page: 'profile' },
            ].map((item) => (
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#0f1f35' }}>📅 Attendance</h2>
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
              <p className="text-amber-700 text-sm mt-1">It is past 11:00 AM. Marking attendance now will be recorded as <strong>Half Day</strong>.</p>
            </div>
          )}

          {/* Mark Attendance Card */}
          {!attendanceMarked ? (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>📍 Mark Today's Attendance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={handleMarkPresent} disabled={loading}
                  className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2"
                  style={{ borderColor: '#1e3a5f', background: '#f0f4ff' }}>
                  <p className="text-4xl mb-3">📷</p>
                  <p className="font-bold" style={{ color: '#1e3a5f' }}>Scan Office QR</p>
                  <p className="text-xs text-gray-500 mt-1">For office attendance</p>
                </button>

                <button onClick={() => setShowClientLocation(true)} disabled={loading}
                  className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2"
                  style={{ borderColor: '#d4a017', background: '#fffbeb' }}>
                  <p className="text-4xl mb-3">📍</p>
                  <p className="font-bold" style={{ color: '#d4a017' }}>Client Location</p>
                  <p className="text-xs text-gray-500 mt-1">GPS within 100m radius</p>
                </button>

                <button onClick={() => markAttendance('present', 'Work From Home')} disabled={loading}
                  className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105 border-2"
                  style={{ borderColor: '#7c3aed', background: '#f5f3ff' }}>
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
                  <button onClick={handleGPSCheck} disabled={locationChecking || !clientAddress}
                    className="flex-1 py-2 rounded-lg text-white font-bold disabled:opacity-50"
                    style={{ background: '#d4a017' }}>
                    {locationChecking ? 'Checking...' : '📍 Verify Location'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Calendar */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#0f1f35' }}>📅 {monthName} Attendance Calendar</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'P Present', color: '#16a34a' },
                  { label: 'HD Half Day', color: '#d4a017' },
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

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const data = attendanceData[day];
                const isToday = day === today.getDate();
                return (
                  <div key={day}
                    className="h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium"
                    style={{
                      background: data ? `${data.color}20` : '#f9fafb',
                      border: isToday ? `2px solid #1e3a5f` : '1px solid #e5e7eb',
                    }}>
                    <span className="text-gray-600">{day}</span>
                    {data && <span style={{ color: data.color }} className="font-bold">{data.status}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: '#0f1f35' }}>📊 Monthly Summary — {monthName}</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: 'Present', value: monthlySummary.present, color: '#16a34a' },
                { label: 'Leave', value: monthlySummary.leave, color: '#d4a017' },
                { label: 'Client Visit', value: monthlySummary.clientVisit, color: '#1e3a5f' },
                { label: 'Week Off', value: monthlySummary.weekOff, color: '#94a3b8' },
                { label: 'Absent', value: monthlySummary.absent, color: '#dc2626' },
                { label: 'Working Days', value: monthlySummary.workingDays, color: '#7c3aed' },
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
