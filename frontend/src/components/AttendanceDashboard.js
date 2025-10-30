import React, { useEffect, useState } from 'react';

export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export default function AttendanceDashboard() {
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (dateFilter) params.append('date', dateFilter);
      if (query) params.append('q', query);

      const res = await fetch(`${API_BASE}/attendance?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setRecords(Array.isArray(data) ? data : data.records || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Could not fetch attendance records.');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    const handler = () => fetchRecords();
    window.addEventListener('attendance:added', handler);
    return () => window.removeEventListener('attendance:added', handler);
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [dateFilter, query]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      const res = await fetch(`${API_BASE}/attendance/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.error || `Failed to delete record. HTTP ${res.status}`);
        return;
      }
      fetchRecords();
    } catch (err) {
      console.error("Delete error:", err);
      alert('Network error while deleting.');
    }
  };

  return (
    <div>
      <div className="controls">
        <label>
          Filter by date
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
        </label>
        <label>
          Search (name or ID)
          <input placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        </label>
        <button onClick={() => { setDateFilter(''); setQuery(''); }} className="btn-outline">Clear</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table className="records-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && <tr><td colSpan="6">No records found.</td></tr>}
            {records.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.employeeName}</td>
                <td>{r.employeeID}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
                <td><button onClick={() => handleDelete(r.id)} className="btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
