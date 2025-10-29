// src/components/Features/UniversalCmdLineFeature.jsx
import { useState, useEffect, useRef } from 'react'

const UniversalCmdLineFeature = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const historyEndRef = useRef(null)

  // Mock command mapping
  const commandMap = {
    'create directory': { command: 'mkdir', intent: 'mkdir', confidence: 0.92 },
    'make directory': { command: 'mkdir', intent: 'mkdir', confidence: 0.90 },
    'new directory': { command: 'mkdir', intent: 'mkdir', confidence: 0.88 },
    'list files': { command: 'ls', intent: 'ls', confidence: 0.85 },
    'show files': { command: 'ls', intent: 'ls', confidence: 0.82 },
    'display files': { command: 'ls', intent: 'ls', confidence: 0.80 },
    'list all pdf': { command: 'ls *.pdf', intent: 'ls', confidence: 0.78 },
    'find pdf files': { command: 'ls *.pdf', intent: 'ls', confidence: 0.76 },
    'show pdf files': { command: 'ls *.pdf', intent: 'ls', confidence: 0.75 },
    'ping': { command: 'ping', intent: 'ping', confidence: 0.95 },
    'ping server': { command: 'ping', intent: 'ping', confidence: 0.93 },
    'check connection': { command: 'ping', intent: 'ping', confidence: 0.85 },
    'copy file': { command: 'cp', intent: 'cp', confidence: 0.90 },
    'duplicate file': { command: 'cp', intent: 'cp', confidence: 0.88 },
    'move file': { command: 'mv', intent: 'mv', confidence: 0.92 },
    'rename file': { command: 'mv', intent: 'mv', confidence: 0.90 },
    'remove file': { command: 'rm', intent: 'rm', confidence: 0.94 },
    'delete file': { command: 'rm', intent: 'rm', confidence: 0.92 },
    'system info': { command: 'uname -a', intent: 'uname', confidence: 0.87 },
    'os version': { command: 'uname -a', intent: 'uname', confidence: 0.85 },
    'disk space': { command: 'df -h', intent: 'df', confidence: 0.89 },
    'memory usage': { command: 'free -h', intent: 'free', confidence: 0.91 },
    'running processes': { command: 'ps aux', intent: 'ps', confidence: 0.88 },
    'list processes': { command: 'ps aux', intent: 'ps', confidence: 0.86 },
  }

  // Common commands for suggestions
  const commonCommands = ['ls', 'mkdir', 'ping', 'cp', 'mv', 'rm', 'uname', 'df', 'free', 'ps']

  const processCommand = (text) => {
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const normalizedText = text.toLowerCase().trim()
      
      // Find matching command
      let matchedCommand = null
      let maxConfidence = 0
      
      for (const [key, value] of Object.entries(commandMap)) {
        if (normalizedText.includes(key) || key.includes(normalizedText)) {
          if (value.confidence > maxConfidence) {
            maxConfidence = value.confidence
            matchedCommand = value
          }
        }
      }
      
      if (matchedCommand) {
        setHistory(prev => [
          ...prev,
          { 
            input: text, 
            output: matchedCommand,
            type: 'success'
          }
        ])
      } else {
        // Generate random suggestions
        const shuffled = [...commonCommands].sort(() => 0.5 - Math.random())
        const selectedSuggestions = shuffled.slice(0, 3)
        
        setHistory(prev => [
          ...prev,
          { 
            input: text, 
            output: { suggestions: selectedSuggestions },
            type: 'unknown'
          }
        ])
      }
      
      setLoading(false)
      setInput('')
    }, 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      processCommand(input)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    processCommand(suggestion)
  }

  const clearHistory = () => {
    setHistory([])
  }

  // Auto-scroll to bottom of history
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  return (
    <div className="universal-cmd-feature">
      <div className="cmd-interface">
        <div className="cmd-history">
          <div className="history-header">
            <h3>Command History</h3>
            <button onClick={clearHistory} className="btn btn-outline">Clear</button>
          </div>
          
          <div className="history-container">
            {history.length === 0 ? (
              <div className="empty-history">
                <p>No commands yet. Try entering a natural language query below.</p>
              </div>
            ) : (
              <div className="history-items">
                {history.map((item, index) => (
                  <div key={index} className={`history-item ${item.type}`}>
                    <div className="user-input">
                      <span className="prompt">&gt;</span> {item.input}
                    </div>
                    
                    {item.type === 'success' ? (
                      <div className="command-result">
                        <div className="result-header">
                          <span className="result-label">Predicted:</span>
                          <span className="command">{item.output.command}</span>
                        </div>
                        <div className="result-details">
                          <span>Intent: {item.output.intent}</span>
                          <span className="confidence">Confidence: {(item.output.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="unknown-result">
                        <div className="result-header">
                          <span className="result-label">Unknown command</span>
                        </div>
                        <div className="suggestions">
                          <span>Suggestions: </span>
                          {item.output.suggestions.map((suggestion, i) => (
                            <button 
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="suggestion-btn"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={historyEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className="cmd-input-area">
          <form onSubmit={handleSubmit} className="cmd-form">
            <div className="input-container">
              <span className="input-prompt">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a command in plain English..."
                disabled={loading}
                autoFocus
              />
              {loading && <div className="input-loader"></div>}
            </div>
            <button type="submit" className="btn" disabled={loading || !input.trim()}>
              Convert
            </button>
          </form>

          <div className="examples">
            <h4>Try these examples:</h4>
            <div className="example-buttons">
              {['create directory', 'list files', 'list all pdf', 'ping'].map((example, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(example)}
                  className="example-btn"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversalCmdLineFeature