import React, { useState } from 'react';
import { API_BASE } from '../api';

export default function AttendanceForm() {
  const today = new Date().toISOString().slice(0, 10);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [date, setDate] = useState(today);
  const [status, setStatus] = useState('Present');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!employeeName.trim() || !employeeID.trim() || !date || !status) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const payload = { 
      employeeName: employeeName.trim(), 
      employeeID: employeeID.trim(), 
      date, 
      status 
    };

    try {
      console.log('Submitting to:', `${API_BASE}/attendance`);
      
      const res = await fetch(`${API_BASE}/attendance`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json();
      if (!res.ok) {
        setError(body.error || 'Failed to submit attendance');
        setLoading(false);
        return;
      }

      setSuccess('Attendance recorded successfully!');
      setEmployeeName('');
      setEmployeeID('');
      setDate(today);
      setStatus('Present');
      
      window.dispatchEvent(new CustomEvent('attendance:added', { detail: body }));
    } catch (err) {
      console.error(err);
      setError('Network error. Could not reach backend. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Employee Name
        <input 
          value={employeeName} 
          onChange={e => setEmployeeName(e.target.value)} 
          placeholder="e.g. Ms Lehloenya" 
          disabled={loading}
        />
      </label>

      <label>
        Employee ID
        <input 
          value={employeeID} 
          onChange={e => setEmployeeID(e.target.value)} 
          placeholder="e.g. EMP001" 
          disabled={loading}
        />
      </label>

      <label>
        Date
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
          disabled={loading}
        />
      </label>

      <label>
        Status
        <select 
          value={status} 
          onChange={e => setStatus(e.target.value)}
          disabled={loading}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
      </label>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button 
          type="button" 
          onClick={() => { 
            setEmployeeName(''); 
            setEmployeeID(''); 
            setDate(today); 
            setStatus('Present'); 
          }} 
          className="btn-outline"
          disabled={loading}
        >
          Reset
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
}
