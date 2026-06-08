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

function App() {
  const [currentPage, setCurrentPage] = useState('admin-approvals');
  const navigate = (page: string) => setCurrentPage(page);

  if (currentPage === 'login') {
    return <Login onLogin={() => setCurrentPage('dashboard')} />;
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
    </div>
  );
}

export default App;