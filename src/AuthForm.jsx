import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const endpoint = isSignup ? 'signup' : 'login';
    const payload = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        if (isSignup) {
          setMessage('Signup successful! You can now login.');
          setFormData({ username: '', email: '', password: '' });
        } else {
          setMessage(`Welcome back, ${data.username}!`);

          // Redirect to home page after successful login
          navigate('/home');  // Or '/' depending on your route setup
        }
      } else {
        setMessage(data.message || `${endpoint} failed`);
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isSignup && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required={isSignup}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.7rem', fontSize: '1rem', cursor: 'pointer' }}>
          {isSignup ? 'Signup' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => {
            setIsSignup(!isSignup);
            setMessage('');
            setFormData({ username: '', email: '', password: '' });
          }}
          style={{ cursor: 'pointer', color: 'blue', border: 'none', background: 'none', textDecoration: 'underline', padding: 0, fontSize: '1rem' }}
        >
          {isSignup ? 'Login' : 'Signup'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
