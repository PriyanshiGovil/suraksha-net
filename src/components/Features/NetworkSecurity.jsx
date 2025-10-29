// src/components/Features/NetworkSecurity.jsx
import { useState } from 'react'

const NetworkSecurity = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  return (
    <div className="network-security-feature">
      <div className="feature-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="bi bi-speedometer2"></i> Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'threats' ? 'active' : ''}`}
          onClick={() => setActiveTab('threats')}
        >
          <i className="bi bi-shield-exclamation"></i> Threats
        </button>
        <button 
          className={`tab-btn ${activeTab === 'firewall' ? 'active' : ''}`}
          onClick={() => setActiveTab('firewall')}
        >
          <i className="bi bi-fire"></i> Firewall
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="dashboard-tab">
          <h3>Network Security Dashboard</h3>
          <p>This is a simplified version of the Network Security feature. The full implementation would include interactive network monitoring tools, threat detection, and firewall management.</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#05bfdb' }}>
                <i className="bi bi-router"></i>
              </div>
              <div className="stat-content">
                <div className="stat-value">127</div>
                <div className="stat-title">Connected Devices</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#088395' }}>
                <i className="bi bi-activity"></i>
              </div>
              <div className="stat-content">
                <div className="stat-value">2.4 GB</div>
                <div className="stat-title">Network Traffic</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#dc3545' }}>
                <i className="bi bi-bug"></i>
              </div>
              <div className="stat-content">
                <div className="stat-value">3</div>
                <div className="stat-title">Threats Detected</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ color: '#28a745' }}>
                <i className="bi bi-clock-history"></i>
              </div>
              <div className="stat-content">
                <div className="stat-value">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'threats' && (
        <div className="threats-tab">
          <h3>Recent Threats</h3>
          <div className="threats-list">
            <div className="threat-item">
              <div className="threat-info">
                <div className="threat-type">Malware</div>
                <div className="threat-source">Source: 192.168.1.105</div>
              </div>
              <div className="threat-meta">
                <span className="threat-severity" style={{ backgroundColor: '#fd7e14' }}>
                  High
                </span>
                <span className="threat-status blocked">
                  Blocked
                </span>
              </div>
            </div>
            
            <div className="threat-item">
              <div className="threat-info">
                <div className="threat-type">Suspicious Activity</div>
                <div className="threat-source">Source: 10.0.0.15</div>
              </div>
              <div className="threat-meta">
                <span className="threat-severity" style={{ backgroundColor: '#ffc107' }}>
                  Medium
                </span>
                <span className="threat-status monitoring">
                  Monitoring
                </span>
              </div>
            </div>
            
            <div className="threat-item">
              <div className="threat-info">
                <div className="threat-type">Unauthorized Access</div>
                <div className="threat-source">Source: 203.0.113.45</div>
              </div>
              <div className="threat-meta">
                <span className="threat-severity" style={{ backgroundColor: '#dc3545' }}>
                  Critical
                </span>
                <span className="threat-status blocked">
                  Blocked
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'firewall' && (
        <div className="firewall-tab">
          <div className="firewall-status">
            <div className="status-indicator active">
              <i className="bi bi-shield-fill-check"></i>
              <span>Firewall Active</span>
            </div>
            <div className="firewall-rules">
              <h4>Active Rules: 24</h4>
              <div className="rules-list">
                <div className="rule-item">
                  <span className="rule-action">BLOCK</span>
                  <span className="rule-detail">Incoming traffic from suspicious IPs</span>
                </div>
                <div className="rule-item">
                  <span className="rule-action">ALLOW</span>
                  <span className="rule-detail">HTTPS traffic on port 443</span>
                </div>
                <div className="rule-item">
                  <span className="rule-action">BLOCK</span>
                  <span className="rule-detail">Known malware domains</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NetworkSecurity