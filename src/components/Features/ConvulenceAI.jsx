import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ConvulenceAI.css';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConvulenceAI = ({ inFeaturePage = false }) => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return (
      <div className="convulenceai-container">
        <div className="glass-card" style={{ textAlign: "center", padding: "2rem" }}>
          <h3>Authentication Required</h3>
          <p>Please log in to access ConvulenceAI</p>
          <a href="/login" className="tab-btn" style={{ display: "inline-block", marginTop: "1rem" }}>
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState(() => {
    // Simulate getting user role from localStorage or context
    const savedRole = localStorage.getItem("userRole");
    return savedRole || "Viewer";
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [query, setQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState(null);
  const [files, setFiles] = useState([]);
  const [secretMessage, setSecretMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [logs, setLogs] = useState([
    { id: 1, user: 'User123', action: 'Accessed Q3 Report', time: '10:30 AM', status: 'safe' },
    { id: 2, user: 'Analyst42', action: 'Unauthorized attempt', time: '10:34 PM', status: 'alert' },
    { id: 3, user: 'Viewer7', action: 'Downloaded dataset', time: '09:15 AM', status: 'warning' },
  ]);

  // Save role to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);

  // Mock data for charts
  const departmentData = [
    { name: 'Finance', users: 120 },
    { name: 'HR', users: 85 },
    { name: 'IT', users: 200 },
    { name: 'Operations', users: 150 },
  ];

  const queryTrends = [
    { day: 'Mon', queries: 45 },
    { day: 'Tue', queries: 52 },
    { day: 'Wed', queries: 48 },
    { day: 'Thu', queries: 60 },
    { day: 'Fri', queries: 75 },
    { day: 'Sat', queries: 35 },
    { day: 'Sun', queries: 20 },
  ];

  const dataTypeData = [
    { name: 'PDFs', value: 35 },
    { name: 'Spreadsheets', value: 25 },
    { name: 'Emails', value: 20 },
    { name: 'Databases', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#D600FF', '#00CFFF', '#FF9E00', '#00FF88', '#FF5555'];

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const encryptedMessage = btoa(newMessage);
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      encrypted: encryptedMessage,
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        text: 'This is a secure reply message.',
        encrypted: btoa('This is a secure reply message.'),
        sender: 'Colleague',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleQuerySubmit = () => {
    if (query.trim() === '') return;
    
    setQueryResponse({
      summary: 'Based on the Q3 financial data, revenue increased by 12% compared to Q2. The main growth drivers were the new product line and expansion into Asian markets.',
      sources: ['Q3 Financial Report.pdf', 'Sales Dashboard.xlsx', 'Market Analysis.pptx'],
      chartData: [
        { month: 'Jul', revenue: 42000 },
        { month: 'Aug', revenue: 48000 },
        { month: 'Sep', revenue: 52000 },
      ]
    });
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map(file => ({
      id: files.length + 1,
      name: file.name,
      type: file.type.split('/')[0] || 'document',
      size: (file.size / 1024).toFixed(2) + ' KB',
      date: new Date().toLocaleDateString(),
    }));
    
    setFiles([...files, ...newFiles]);
  };

  const handleEncodeImage = () => {
    if (!imageFile || !secretMessage) return;
    
    alert(`Message "${secretMessage}" has been encoded in ${imageFile.name}`);
    setSecretMessage('');
    setImageFile(null);
  };

  const renderDashboard = () => (
    <div className="dashboard-grid">
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>System Status</h3>
        <div className="status-indicators">
          <div className="status-item">
            <span className="status-dot safe"></span>
            <span>Security: Normal</span>
          </div>
          <div className="status-item">
            <span className="status-dot safe"></span>
            <span>Network: Stable</span>
          </div>
          <div className="status-item">
            <span className="status-dot warning"></span>
            <span>Storage: 78% used</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3>User Activity by Department</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#B0B0B0" />
            <YAxis stroke="#B0B0B0" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1B1E27', borderColor: '#D600FF' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Bar dataKey="users" fill="#D600FF" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3>Query Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={queryTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#B0B0B0" />
            <YAxis stroke="#B0B0B0" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1B1E27', borderColor: '#D600FF' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Line type="monotone" dataKey="queries" stroke="#00CFFF" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3>Data Type Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={dataTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {dataTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1B1E27', borderColor: '#D600FF' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );

  const renderDataAssistant = () => (
    <div className="data-assistant-container">
      <div className="query-section">
        <h3>Ask a Question</h3>
        <div className="query-input">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Summarize Q3 Report"
          />
          <button onClick={handleQuerySubmit}>Submit</button>
        </div>
      </div>

      {queryResponse && (
        <motion.div 
          className="response-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>Response</h3>
          <div className="response-summary">
            <p>{queryResponse.summary}</p>
          </div>
          
          <div className="response-chart">
            <h4>Revenue Trend</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={queryResponse.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#B0B0B0" />
                <YAxis stroke="#B0B0B0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1E27', borderColor: '#D600FF' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Bar dataKey="revenue" fill="#00CFFF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="response-sources">
            <h4>Sources</h4>
            <div className="source-cards">
              {queryResponse.sources.map((source, index) => (
                <div key={index} className="source-card">
                  <span>📄</span>
                  <span>{source}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderUploadCenter = () => (
    <div className="upload-center-container">
      <div className="upload-section">
        <h3>Upload Files</h3>
        <div className="upload-area">
          <input 
            type="file" 
            id="file-upload" 
            multiple 
            onChange={handleFileUpload}
            className="file-input"
          />
          <label htmlFor="file-upload" className="upload-label">
            <span>📁</span>
            <p>Drag & drop files here or click to browse</p>
            <span>Supports PDF, Excel, DOCX</span>
          </label>
        </div>
        
        <div className="data-sources">
          <h3>Connect Data Sources</h3>
          <div className="source-buttons">
            <button className="source-btn">
              <span>🔗</span> Google Drive
            </button>
            <button className="source-btn">
              <span>🔗</span> Dropbox
            </button>
            <button className="source-btn">
              <span>🔗</span> Local Server
            </button>
          </div>
        </div>
      </div>
      
      <div className="file-list-section">
        <h3>Uploaded Files</h3>
        <div className="file-list">
          {files.length > 0 ? (
            files.map(file => (
              <div key={file.id} className="file-item">
                <span className="file-icon">
                  {file.type === 'image' ? '🖼️' : 
                   file.type === 'application' ? '📄' : '📁'}
                </span>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-meta">{file.size} • {file.date}</div>
                </div>
                <button className="file-action">Analyze</button>
              </div>
            ))
          ) : (
            <p className="no-files">No files uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSecureChat = () => (
    <div className="secure-chat-container">
      <div className="chat-header">
        <h3>Secure Communication</h3>
        <div className="encryption-indicator">
          <span className="encryption-status">🔒 End-to-End Encrypted</span>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
          >
            <div className="message-sender">{message.sender}</div>
            <div className="message-text">{message.text}</div>
            <div className="message-encrypted">Encrypted: {message.encrypted}</div>
            <div className="message-time">{message.time}</div>
          </div>
        ))}
      </div>
      
      <div className="chat-input">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a secure message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );

  const renderStegEncrypt = () => (
    <div className="steg-encrypt-container">
      <div className="steg-section">
        <h3>Encode Message in Image</h3>
        <div className="steg-upload">
          <input 
            type="file" 
            id="image-upload" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input"
          />
          <label htmlFor="image-upload" className="upload-label">
            <span>🖼️</span>
            <p>Select an image</p>
            <span>Supports JPG, PNG</span>
          </label>
          {imageFile && (
            <div className="selected-image">
              <span>Selected: {imageFile.name}</span>
            </div>
          )}
        </div>
        
        <div className="secret-message">
          <h4>Secret Message</h4>
          <textarea 
            value={secretMessage}
            onChange={(e) => setSecretMessage(e.target.value)}
            placeholder="Enter your secret message here..."
          />
        </div>
        
        <button 
          className="encode-btn" 
          onClick={handleEncodeImage}
          disabled={!imageFile || !secretMessage}
        >
          Encode Message
        </button>
      </div>
      
      <div className="steg-section">
        <h3>Decode Message from Image</h3>
        <div className="steg-upload">
          <input 
            type="file" 
            id="decode-upload" 
            accept="image/*"
            className="file-input"
          />
          <label htmlFor="decode-upload" className="upload-label">
            <span>🔍</span>
            <p>Select an image with hidden message</p>
          </label>
        </div>
        
        <button className="decode-btn">
          Decode Message
        </button>
        
        <div className="decoded-message">
          <h4>Decoded Message:</h4>
          <div className="message-output">
            <p>No message decoded yet</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => {
    // Admin and Analyst can access monitoring
    if (userRole === "Viewer") {
      return (
        <div className="glass-card">
          <h3>Access Denied</h3>
          <p>You need Analyst or Admin privileges to access Monitoring.</p>
        </div>
      );
    }
    
    return (
      <div className="monitoring-container">
        <h3>Security Monitoring</h3>
        <div className="logs-container">
          <div className="logs-header">
            <div className="log-col">User</div>
            <div className="log-col">Action</div>
            <div className="log-col">Time</div>
            <div className="log-col">Status</div>
          </div>
          
          <div className="logs-list">
            {logs.map(log => (
              <div key={log.id} className="log-item">
                <div className="log-col">{log.user}</div>
                <div className="log-col">{log.action}</div>
                <div className="log-col">{log.time}</div>
                <div className="log-col">
                  <span className={`status-badge ${log.status}`}>
                    {log.status === 'safe' ? 'Safe' : 
                     log.status === 'warning' ? 'Warning' : 'Alert'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="anomaly-stats">
          <div className="stat-card">
            <h4>Total Events</h4>
            <div className="stat-value">1,248</div>
          </div>
          <div className="stat-card">
            <h4>Alerts Today</h4>
            <div className="stat-value alert">3</div>
          </div>
          <div className="stat-card">
            <h4>Resolved</h4>
            <div className="stat-value safe">98%</div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    // Only Admin can access settings
    if (userRole !== "Admin") {
      return (
        <div className="glass-card">
          <h3>Access Denied</h3>
          <p>You need Admin privileges to access Settings.</p>
        </div>
      );
    }
    
    return (
      <div className="settings-container">
        <h3>User Settings</h3>
        
        <div className="settings-section">
          <h4>Role Management</h4>
          <div className="role-selector">
            <span>Current Role:</span>
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <p className="role-description">
            {userRole === 'Admin' ? 'Full access to all features and settings' :
             userRole === 'Analyst' ? 'Access to analytics and data tools' :
             'Read-only access to dashboards and reports'}
          </p>
        </div>
        
        <div className="settings-section">
          <h4>Appearance</h4>
          <div className="theme-toggle">
            <span>Dark Mode</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <h4>API Configuration</h4>
          <div className="api-key">
            <span>API Key:</span>
            <input type="text" defaultValue="sk-convulence-ai-2023-xxxx" readOnly />
            <button>Regenerate</button>
          </div>
        </div>
        
        <div className="settings-section">
          <h4>Profile Information</h4>
          <div className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" defaultValue="Alex Johnson" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue="alex.johnson@company.com" />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input type="text" defaultValue="Data Analytics" />
            </div>
            <button className="save-profile">Save Changes</button>
            <button 
              className="save-profile" 
              style={{ background: "linear-gradient(45deg, #FF5555, #FF9E00)" }}
              onClick={() => {
                localStorage.removeItem("userRole");
                localStorage.removeItem("isLoggedIn");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="convulenceai-container">
      {inFeaturePage && (
        <Link to="/services" className="back-link-top">
          <i className="bi bi-arrow-left"></i> Back to Services
        </Link>
      )}
      
      <div className="feature-header">
        <motion.div 
          className="feature-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🚀
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ConvulenceAI
        </motion.h1>
        <motion.p 
          className="feature-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Enterprise Data Intelligence & Secure Communication Platform
        </motion.p>
      </div>

      <div className="feature-tabs">
        {['dashboard', 'assistant', 'upload', 'chat', 'steg', 'monitor', 'settings'].map(tab => (
          <button 
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'dashboard' && 'Dashboard'}
            {tab === 'assistant' && 'AI Assistant'}
            {tab === 'upload' && 'Upload Center'}
            {tab === 'chat' && 'Secure Chat'}
            {tab === 'steg' && 'StegEncrypt'}
            {tab === 'monitor' && 'Monitoring'}
            {tab === 'settings' && 'Settings'}
          </button>
        ))}
      </div>

      <div className="feature-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'assistant' && renderDataAssistant()}
        {activeTab === 'upload' && renderUploadCenter()}
        {activeTab === 'chat' && renderSecureChat()}
        {activeTab === 'steg' && renderStegEncrypt()}
        {activeTab === 'monitor' && renderMonitoring()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default ConvulenceAI;