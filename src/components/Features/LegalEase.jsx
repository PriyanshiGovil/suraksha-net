// src/components/Features/LegalEase.jsx
import { useState } from 'react'

const LegalEase = () => {
  const [activeTab, setActiveTab] = useState('analyzer')
  const [documentText, setDocumentText] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeDocument = () => {
    if (!documentText.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      const text = documentText.toLowerCase()
      
      // Simple keyword detection
      const positiveKeywords = ['consent', 'transparency', 'right', 'delete', 'modify', 'access', 'control', 'opt-out', 'choice']
      const negativeKeywords = ['collect', 'share', 'retain', 'track', 'monitor', 'sell', 'disclose', 'third-party', 'advertising']
      
      const positiveMatches = []
      const negativeMatches = []
      const issues = []
      
      positiveKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
          positiveMatches.push(keyword)
        }
      })
      
      negativeKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
          negativeMatches.push(keyword)
          
          // Find sentences containing the keyword for issues section
          const sentences = documentText.split(/[.!?]+/).filter(s => s.trim())
          sentences.forEach(sentence => {
            if (sentence.toLowerCase().includes(keyword)) {
              issues.push({
                sentence: sentence.trim(),
                keyword: keyword
              })
            }
          })
        }
      })
      
      // Calculate grade based on positive/negative ratio
      const totalKeywords = positiveMatches.length + negativeMatches.length
      const positiveRatio = totalKeywords > 0 ? positiveMatches.length / totalKeywords : 0.5
      
      let grade = 'C'
      if (positiveRatio >= 0.8) grade = 'A'
      else if (positiveRatio >= 0.6) grade = 'B'
      else if (positiveRatio >= 0.4) grade = 'C'
      else if (positiveRatio >= 0.2) grade = 'D'
      else grade = 'F'
      
      const result = {
        grade,
        highlights: {
          positive: positiveMatches,
          negative: negativeMatches
        },
        issues: issues.slice(0, 5) // Limit to 5 issues for display
      }
      
      setAnalysisResult(result)
      setIsAnalyzing(false)
    }, 1500)
  }

  const loadSampleDocument = () => {
    const sampleText = `Privacy Policy

Last Updated: January 1, 2023

Information We Collect
We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, and other contact information.

We also collect information automatically as you navigate through our Services. This includes your IP address, browser type, device information, and usage data. We may use cookies and similar tracking technologies to collect this information.

How We Share Your Information
We may share your information with third-party service providers who perform services on our behalf, such as data analysis and hosting. We may also share your information if required by law or to protect our rights.

Your Rights
You have the right to access, update, or delete your personal information. You can also opt out of receiving marketing communications from us.

Changes to This Policy
We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.`

    setDocumentText(sampleText)
  }

  const clearDocument = () => {
    setDocumentText('')
    setAnalysisResult(null)
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#28a745'
      case 'B': return '#5cb85c'
      case 'C': return '#ffc107'
      case 'D': return '#fd7e14'
      case 'F': return '#dc3545'
      default: return '#6c757d'
    }
  }

  return (
    <div className="legalease-feature">
      <div className="feature-tabs">
        <button 
          className={`tab-btn ${activeTab === 'analyzer' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyzer')}
        >
          <i className="bi bi-file-earmark-text"></i> Analyzer
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <i className="bi bi-clock-history"></i> History
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="bi bi-gear"></i> Settings
        </button>
      </div>

      {activeTab === 'analyzer' && (
        <div className="analyzer-tab">
          <div className="document-input">
            <div className="input-header">
              <h3>Document Text</h3>
              <div className="input-actions">
                <button className="btn btn-outline" onClick={loadSampleDocument}>
                  <i className="bi bi-file-earmark-text"></i> Load Sample
                </button>
                <button className="btn btn-outline" onClick={clearDocument}>
                  <i className="bi bi-trash"></i> Clear
                </button>
              </div>
            </div>
            
            <textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Paste the legal document text here..."
              rows={12}
            />
            
            <div className="analyze-actions">
              <button 
                className="btn" 
                onClick={analyzeDocument}
                disabled={!documentText.trim() || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
              </button>
            </div>
          </div>

          {analysisResult && (
            <div className="analysis-result">
              <div className="result-header">
                <h3>Analysis Results</h3>
                <div className="document-grade" style={{ backgroundColor: getGradeColor(analysisResult.grade) }}>
                  Grade: {analysisResult.grade}
                </div>
              </div>
              
              <div className="result-sections">
                <div className="result-section highlights">
                  <h4>Highlights</h4>
                  <div className="highlight-cards">
                    <div className="highlight-card positive">
                      <div className="card-header">
                        <i className="bi bi-check-circle"></i>
                        <span>Positive Aspects</span>
                      </div>
                      <div className="card-content">
                        {analysisResult.highlights.positive.length > 0 ? (
                          <ul>
                            {analysisResult.highlights.positive.map((item, index) => (
                              <li key={index}>Mentions {item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No positive aspects detected</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="highlight-card negative">
                      <div className="card-header">
                        <i className="bi bi-exclamation-triangle"></i>
                        <span>Negative Aspects</span>
                      </div>
                      <div className="card-content">
                        {analysisResult.highlights.negative.length > 0 ? (
                          <ul>
                            {analysisResult.highlights.negative.map((item, index) => (
                              <li key={index}>Contains term '{item}'</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No negative aspects detected</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="result-section issues">
                  <h4>Issues</h4>
                  {analysisResult.issues.length > 0 ? (
                    <div className="issues-list">
                      {analysisResult.issues.map((issue, index) => (
                        <div key={index} className="issue-item">
                          <div className="issue-keyword">{issue.keyword}</div>
                          <div className="issue-text">{issue.sentence}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No issues detected in this document</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-tab">
          <div className="history-header">
            <h3>Analysis History</h3>
            <span className="history-count">0 documents</span>
          </div>
          
          <div className="empty-history">
            <i className="bi bi-file-earmark-text"></i>
            <p>No analysis history yet. Analyze a document to see it here.</p>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-tab">
          <div className="settings-section">
            <h3>Analysis Settings</h3>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Highlight Sensitivity</h4>
                  <p>Adjust how sensitive the keyword detection is</p>
                </div>
                <select className="setting-select">
                  <option>Standard</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Auto-save Analysis</h4>
                  <p>Automatically save analysis results to history</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>About LegalEase</h3>
            <div className="about-info">
              <p>LegalEase helps you understand complex legal documents by analyzing them for key terms and potential issues.</p>
              <p>Version 1.0.0</p>
              <button className="btn btn-outline">Check for Updates</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LegalEase