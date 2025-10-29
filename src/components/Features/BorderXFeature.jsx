// src/components/Features/BorderXFeature.jsx
import React, { useState, useEffect, useRef } from 'react';
import './BorderXFeature.css';

const BorderXFeature = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [baseId, setBaseId] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [channelArmed, setChannelArmed] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [showPassphraseInput, setShowPassphraseInput] = useState(false);
  
  // Steganography state
  const [activeTab, setActiveTab] = useState('chat');
  const [coverImage, setCoverImage] = useState(null);
  const [secretText, setSecretText] = useState('');
  const [encodedImage, setEncodedImage] = useState(null);
  const [imageToDecode, setImageToDecode] = useState(null);
  const [decodedText, setDecodedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const decodeFileInputRef = useRef(null);

  // Initialize with demo messages
  useEffect(() => {
    setMessages([
      { id: 1, sender: 'ESP-ASHWIN', text: 'Channel secured. Ready for communication.', time: '14:32', isSelf: false },
      { id: 2, sender: 'ESP-ASHWIN', text: 'All units report status.', time: '14:33', isSelf: false },
    ]);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (baseId && password && secretCode) {
      setIsLoggedIn(true);
      setActiveTab('chat');
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: `ESP-${baseId.toUpperCase()}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate a reply after a delay
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: 'ESP-ASHWIN',
        text: 'Message received. Standing by.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  // Handle arming the channel
  const handleArmChannel = () => {
    if (passphrase.toLowerCase() === 'borderx') {
      setChannelArmed(true);
      setShowPassphraseInput(false);
      setPassphrase('');
      
      // Add system message
      const systemMsg = {
        id: messages.length + 1,
        sender: 'SYSTEM',
        text: 'Channel armed and secured. End-to-end encryption active.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
        isSystem: true
      };
      setMessages([...messages, systemMsg]);
    } else {
      alert('Incorrect passphrase. Channel not armed.');
    }
  };

  // Handle key press in message input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (channelArmed) {
        handleSendMessage();
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (e, isDecode = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isDecode) {
          setImageToDecode(event.target.result);
        } else {
          setCoverImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle encoding message in image
  const handleEncode = () => {
    if (!coverImage || !secretText) {
      alert('Please provide both a cover image and secret text');
      return;
    }

    setIsProcessing(true);
    
    // Simulate encoding process
    setTimeout(() => {
      setEncodedImage(coverImage);
      setIsProcessing(false);
    }, 1500);
  };

  // Handle decoding message from image
  const handleDecode = () => {
    if (!imageToDecode) {
      alert('Please upload an image to decode');
      return;
    }

    setIsProcessing(true);
    
    // Simulate decoding process
    setTimeout(() => {
      setDecodedText('Evac at grid 32B - Extraction point Alpha');
      setIsProcessing(false);
    }, 1500);
  };

  // Download encoded image
  const downloadEncodedImage = () => {
    if (!encodedImage) return;
    
    const link = document.createElement('a');
    link.href = encodedImage;
    link.download = 'encoded_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setBaseId('');
    setPassword('');
    setSecretCode('');
    setChannelArmed(false);
    setActiveTab('login');
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="borderx-feature">
        <div className="login-container">
          <div className="login-header">
            <h1>BorderX</h1>
            <p>Secure Communication System</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Base ID</label>
              <input
                type="text"
                value={baseId}
                onChange={(e) => setBaseId(e.target.value)}
                className="form-input"
                placeholder="Enter Base ID"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter Password"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Secret Code</label>
              <input
                type="text"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="form-input"
                placeholder="Enter Secret Code"
                required
              />
            </div>
            
            <button type="submit" className="arm-button">
              Arm Channel
            </button>
          </form>
          
          <div className="login-footer">
            <p>For demonstration purposes only</p>
            <p>Offline operation • End-to-end encryption</p>
          </div>
        </div>
      </div>
    );
  }

  // Main application
  return (
    <div className="borderx-feature">
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="navbar-title">BorderX</div>
        <div className="navbar-tabs">
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            StegnoChat
          </button>
          <button 
            className={`tab-btn ${activeTab === 'steg' ? 'active' : ''}`}
            onClick={() => setActiveTab('steg')}
          >
            StegEncrypt
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'chat' ? (
          <div className="chat-container">
            <div className="chat-header">
              <div className="channel-status">
                <div className={`status-indicator ${channelArmed ? 'armed' : 'disarmed'}`}></div>
                <span>Channel {channelArmed ? 'Armed' : 'Disarmed'}</span>
              </div>
            </div>
            
            <div className="messages-container">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.isSelf ? 'self' : 'other'} ${message.isSystem ? 'system' : ''}`}
                >
                  {!message.isSelf && !message.isSystem && (
                    <div className="sender">{message.sender}</div>
                  )}
                  <div className="text">{message.text}</div>
                  <div className="time">{message.time}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="input-area">
              {!channelArmed ? (
                <div className="arm-channel">
                  <p>Channel is disarmed. Arm the channel to send messages.</p>
                  <button 
                    onClick={() => setShowPassphraseInput(true)}
                    className="arm-btn"
                  >
                    Arm Channel
                  </button>
                  
                  {showPassphraseInput && (
                    <div className="passphrase-input">
                      <input
                        type="password"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        placeholder="Enter passphrase"
                        className="passphrase-field"
                      />
                      <div className="passphrase-buttons">
                        <button 
                          onClick={handleArmChannel}
                          className="confirm-btn"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => setShowPassphraseInput(false)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="message-input">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your secure message..."
                    className="input-field"
                    rows={2}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="send-btn"
                  >
                    Transmit
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="steg-container">
            <div className="steg-tabs">
              <button 
                className={`steg-tab-btn ${activeTab === 'steg' ? 'encode-active' : ''}`}
                onClick={() => setActiveTab('steg')}
              >
                Encode
              </button>
              <button 
                className={`steg-tab-btn ${activeTab === 'steg' ? 'decode-active' : ''}`}
                onClick={() => setActiveTab('steg')}
              >
                Decode
              </button>
            </div>
            
            <div className="steg-content">
              <div className="steg-section">
                <h3>Cover Image</h3>
                <div className="image-upload" onClick={() => fileInputRef.current.click()}>
                  {coverImage ? (
                    <div className="image-preview">
                      <img src={coverImage} alt="Cover" />
                      <p>Click to change image</p>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">📷</div>
                      <p>Click to upload image</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e)}
                  className="hidden"
                  accept="image/*"
                />
                
                <h3>Secret Message</h3>
                <textarea
                  value={secretText}
                  onChange={(e) => setSecretText(e.target.value)}
                  placeholder="Enter secret message to hide..."
                  className="secret-input"
                />
                
                <button
                  onClick={handleEncode}
                  disabled={isProcessing || !coverImage || !secretText}
                  className="encode-btn"
                >
                  {isProcessing ? 'Encoding...' : 'Encode Message'}
                </button>
              </div>
              
              <div className="steg-section">
                <h3>Encoded Image</h3>
                <div className="encoded-image">
                  {encodedImage ? (
                    <div className="image-result">
                      <img src={encodedImage} alt="Encoded" />
                      <p>Message successfully encoded</p>
                      <button
                        onClick={downloadEncodedImage}
                        className="download-btn"
                      >
                        Download Image
                      </button>
                    </div>
                  ) : (
                    <div className="result-placeholder">
                      <div className="result-icon">🔒</div>
                      <p>Encoded image will appear here</p>
                    </div>
                  )}
                </div>
                
                <div className="security-notice">
                  <p className="notice-title">Security Notice:</p>
                  <p>This demo encoder is for demonstration purposes only and does not implement a production-grade steganography algorithm.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="feature-footer">
        <p>BorderX Secure Communication System • Offline Operation • Local Processing Only</p>
        <p>Warning: Do not share passphrases or credentials</p>
      </div>
    </div>
  );
};

export default BorderXFeature;