import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Signup successful! You can now login.');
        setFormData({ username: '', email: '', password: '' });
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Signup</button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.7rem',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default Signup;
