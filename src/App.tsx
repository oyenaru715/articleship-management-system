import React, { useState } from 'react';
import Login from './pages/auth/Login';
import Dashboard from './pages/article/Dashboard';
import Attendance from './pages/article/Attendance';
import Leave from './pages/article/Leave';
import CompOff from './pages/article/CompOff';
import Documents from './pages/article/Documents';
import Stipend from './pages/article/Stipend';
import Profile from './pages/article/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
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
    </div>
  );
}

export default App;