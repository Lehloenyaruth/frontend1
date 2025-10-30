import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AttendanceForm from './components/AttendanceForm';
import AttendanceDashboard from './components/AttendanceDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('form');

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="main">
        {currentPage === 'form' && <AttendanceForm />}
        {currentPage === 'dashboard' && <AttendanceDashboard />}
      </main>

      <footer className="footer">
        <p>© 2025 Attendance Tracker</p>
      </footer>
    </div>
  );
}