import React, { useState } from 'react';

function AdminLoginForm({ onLogin }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!adminId || !password) {
      setError('All fields are required.');
      return;
    }

    onLogin(); // Call the onLogin function to display the PredictionForm
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="Admin ID" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Admin Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default AdminLoginForm;
