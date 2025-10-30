import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConvulenceAI.css';

const LoginScreen = () => {
  const [selectedRole, setSelectedRole] = useState('Viewer');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/feature/4');
  };

  return (
    <div className="convulenceai-container">
      <div className="feature-header">
        <div className="feature-icon">🚀</div>
        <h1>ConvulenceAI Login</h1>
        <p className="feature-subtitle">Select your role to access the platform</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Select Your Role</h3>
        
        <div className="role-selector" style={{ flexDirection: 'column', gap: '1rem' }}>
          <label>
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={selectedRole === 'Admin'}
              onChange={() => setSelectedRole('Admin')}
            />
            <span>Admin - Full access to all features and settings</span>
          </label>
          
          <label>
            <input
              type="radio"
              name="role"
              value="Analyst"
              checked={selectedRole === 'Analyst'}
              onChange={() => setSelectedRole('Analyst')}
            />
            <span>Analyst - Access to analytics and data tools</span>
          </label>
          
          <label>
            <input
              type="radio"
              name="role"
              value="Viewer"
              checked={selectedRole === 'Viewer'}
              onChange={() => setSelectedRole('Viewer')}
            />
            <span>Viewer - Read-only access to dashboards and reports</span>
          </label>
        </div>
        
        <button 
          className="encode-btn" 
          style={{ width: '100%', marginTop: '1.5rem' }}
          onClick={handleLogin}
        >
          Login to ConvulenceAI
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;