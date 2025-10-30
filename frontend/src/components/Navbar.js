import React from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <button 
        onClick={() => setCurrentPage('form')}
        style={{ 
          marginRight: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: currentPage === 'form' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Attendance Form
      </button>
      <button 
        onClick={() => setCurrentPage('dashboard')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: currentPage === 'dashboard' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Dashboard
      </button>
    </nav>
  );
}