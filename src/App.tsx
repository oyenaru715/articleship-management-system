import React, { useState } from 'react';
import Login from './pages/auth/Login';
import Dashboard from './pages/article/Dashboard';
import Attendance from './pages/article/Attendance';
import Leave from './pages/article/Leave';
import CompOff from './pages/article/CompOff';
import Documents from './pages/article/Documents';
import Stipend from './pages/article/Stipend';
import Profile from './pages/article/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import AdminApprovals from './pages/admin/Approvals';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import AdminUserManagement from './pages/admin/UserManagement';
import PartnerDashboard from './pages/partner/Dashboard';
import PartnerApprovals from './pages/partner/Approvals';
import PartnerReports from './pages/partner/Reports';
import SeniorDashboard from './pages/senior/Dashboard';
import SeniorRecommendations from './pages/senior/Recommendations';

function App() {
const [currentPage, setCurrentPage] = useState('login');
const [userRole, setUserRole] = useState('');
const navigate = (page: string) => setCurrentPage(page);

const handleLogin = (role: string) => {
  setUserRole(role);
  if (role === 'senior') {
    setCurrentPage('senior-dashboard');
  } else if (role === 'partner') {
    setCurrentPage('partner-dashboard');
  } else if (role === 'admin') {
    setCurrentPage('admin-dashboard');
  } else {
    setCurrentPage('dashboard');
  }
};

if (currentPage === 'login') {
  return <Login onLogin={handleLogin} />;
}

  return (
    <div>
      {currentPage === 'dashboard' && <Dashboard navigate={navigate} />}
      {currentPage === 'attendance' && <Attendance navigate={navigate} />}
      {currentPage === 'leave' && <Leave navigate={navigate} />}
      {currentPage === 'compoff' && <CompOff navigate={navigate} />}
      {currentPage === 'documents' && <Documents navigate={navigate} />}
      {currentPage === 'stipend' && <Stipend navigate={navigate} />}
      {currentPage === 'profile' && <Profile navigate={navigate} />}
      {currentPage === 'admin-dashboard' && <AdminDashboard navigate={navigate} />}
      {currentPage === 'admin-articles' && <AdminArticles navigate={navigate} />}
      {currentPage === 'admin-approvals' && <AdminApprovals navigate={navigate} />}
      {currentPage === 'admin-reports' && <AdminReports navigate={navigate} />}
      {currentPage === 'admin-settings' && <AdminSettings navigate={navigate} />}
      {currentPage === 'admin-users' && <AdminUserManagement navigate={navigate} />}
      {currentPage === 'partner-dashboard' && <PartnerDashboard navigate={navigate} />}
      {currentPage === 'partner-approvals' && <PartnerApprovals navigate={navigate} />}
      {currentPage === 'partner-reports' && <PartnerReports navigate={navigate} />}
      {currentPage === 'senior-dashboard' && <SeniorDashboard navigate={navigate} />}
      {currentPage === 'senior-recommendations' && <SeniorRecommendations navigate={navigate} />}
    </div>
  );
}

export default App;