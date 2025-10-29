import { useState, useRef, useEffect } from 'react'
import Terminal from './Terminal.jsx'

const Dashboard = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const terminalRef = useRef(null)

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen)
  }

  useEffect(() => {
    if (isTerminalOpen && terminalRef.current) {
      terminalRef.current.focusInput()
    }
  }, [isTerminalOpen])

  return (
    <div className="dashboard section-padding">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">SurakshaNet Command Center</h1>
          <p className="dashboard-subtitle">
            AI-powered cybersecurity management and monitoring
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card card">
            <div className="card-header">
              <h3>System Status</h3>
              <span className="status-badge online">Online</span>
            </div>
            <div className="card-content">
              <div className="status-item">
                <span>Network Security</span>
                <span className="status-good">Protected</span>
              </div>
              <div className="status-item">
                <span>Endpoint Protection</span>
                <span className="status-good">Active</span>
              </div>
              <div className="status-item">
                <span>Threat Detection</span>
                <span className="status-good">Monitoring</span>
              </div>
              <div className="status-item">
                <span>System Updates</span>
                <span className="status-warning">Pending</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Recent Alerts</h3>
              <span className="alert-count">3</span>
            </div>
            <div className="card-content">
              <div className="alert-item medium">
                <div className="alert-icon">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <div className="alert-details">
                  <h4>Suspicious Login Attempt</h4>
                  <p>Failed login from unknown IP: 192.168.1.105</p>
                  <span className="alert-time">2 hours ago</span>
                </div>
              </div>
              <div className="alert-item low">
                <div className="alert-icon">
                  <i className="bi bi-info-circle"></i>
                </div>
                <div className="alert-details">
                  <h4>System Update Available</h4>
                  <p>Security patch version 2.3.1 is ready to install</p>
                  <span className="alert-time">5 hours ago</span>
                </div>
              </div>
              <div className="alert-item high">
                <div className="alert-icon">
                  <i className="bi bi-shield-exclamation"></i>
                </div>
                <div className="alert-details">
                  <h4>Malware Detected</h4>
                  <p>Trojan.GenericKD.41254342 quarantined on device WKST-0042</p>
                  <span className="alert-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card card">
            <div className="card-header">
              <h3>Threat Statistics</h3>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">24</div>
                  <div className="stat-label">Threats Blocked</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Active Alerts</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">98.7%</div>
                  <div className="stat-label">System Health</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">127</div>
                  <div className="stat-label">Devices Protected</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card card terminal-card">
            <div className="card-header">
              <h3>AI Command Terminal</h3>
              <button 
                className={`btn btn-outline terminal-toggle ${isTerminalOpen ? 'active' : ''}`}
                onClick={toggleTerminal}
              >
                {isTerminalOpen ? 'Close Terminal' : 'Open Terminal'}
              </button>
            </div>
            <div className={`terminal-container ${isTerminalOpen ? 'open' : ''}`}>
              <Terminal ref={terminalRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard