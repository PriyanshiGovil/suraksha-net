import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import featuresData from '../../data/featuresData.js'
import useFeatureActions from '../../hooks/useFeatureActions.js'
import Loader from '../Common/Loader.jsx'
import UniversalCmdLineFeature from './UniversalCmdLineFeature.jsx'
import BorderXFeature from './BorderXFeature.jsx'
import NetworkSecurity from './NetworkSecurity.jsx'
import LegalEase from './LegalEase.jsx'
import ConvulenceAI from './ConvulenceAI.jsx'

const FeaturePage = () => {
  const { featureId } = useParams()
  const [feature, setFeature] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const { 
    actionLoading, 
    actionResult, 
    executeAction 
  } = useFeatureActions()

  useEffect(() => {
    const foundFeature = featuresData.find(f => f.id === parseInt(featureId))
    setFeature(foundFeature)
    setIsVisible(true)
  }, [featureId])

  if (!feature) {
    return (
      <div className="not-found section-padding">
        <div className="container">
          <h2>Feature Not Found</h2>
          <Link to="/services" className="btn">Back to Services</Link>
        </div>
      </div>
    )
  }

  // Special handling for Universal Command Line feature (ID: 1)
  if (feature.id === 1) {
    return (
      <div className="feature-page section-padding">
        <div className="container">
          <div className={`feature-header ${isVisible ? 'fade-in' : ''}`}>
            <Link to="/services" className="back-link">
              <i className="bi bi-arrow-left"></i> Back to Services
            </Link>
            
            <div className="feature-icon-large">
              <i className={`bi ${feature.icon}`}></i>
            </div>
            
            <h1 className="feature-title">{feature.title}</h1>
            <p className="feature-description">{feature.description}</p>
          </div>
          
          <div className={`feature-content ${isVisible ? 'slide-up' : ''}`}>
            <UniversalCmdLineFeature />
          </div>
        </div>
      </div>
    )
  }

  // Special handling for BorderX feature (ID: 2)
  if (feature.id === 2) {
    return (
      <div className="feature-page section-padding">
        <div className="container">
          <div className={`feature-header ${isVisible ? 'fade-in' : ''}`}>
            <Link to="/services" className="back-link">
              <i className="bi bi-arrow-left"></i> Back to Services
            </Link>
            
            <div className="feature-icon-large">
              <i className={`bi ${feature.icon}`}></i>
            </div>
            
            <h1 className="feature-title">{feature.title}</h1>
            <p className="feature-description">{feature.description}</p>
          </div>
          
          <div className={`feature-content ${isVisible ? 'slide-up' : ''}`}>
            <BorderXFeature />
          </div>
        </div>
      </div>
    )
  }

  // Special handling for LegalEase feature (ID: 3)
  if (feature.id === 3) {
    return (
      <div className="feature-page section-padding">
        <div className="container">
          <div className={`feature-header ${isVisible ? 'fade-in' : ''}`}>
            <Link to="/services" className="back-link">
              <i className="bi bi-arrow-left"></i> Back to Services
            </Link>
            
            <div className="feature-icon-large">
              <i className={`bi ${feature.icon}`}></i>
            </div>
            
            <h1 className="feature-title">{feature.title}</h1>
            <p className="feature-description">{feature.description}</p>
          </div>
          
          <div className={`feature-content ${isVisible ? 'slide-up' : ''}`}>
            <LegalEase />
          </div>
        </div>
      </div>
    )
  }

  // Special handling for ConvulenceAI feature (ID: 4)
  if (feature.id === 4) {
    return (
      <div className="feature-page section-padding">
        <div className="container">
          <div className={`feature-content ${isVisible ? 'slide-up' : ''}`}>
            <ConvulenceAI inFeaturePage={true} />
          </div>
        </div>
      </div>
    )
  }

  // Default rendering for other features
  return (
    <div className="feature-page section-padding">
      <div className="container">
        <div className={`feature-header ${isVisible ? 'fade-in' : ''}`}>
          <Link to="/services" className="back-link">
            <i className="bi bi-arrow-left"></i> Back to Services
          </Link>
          
          <div className="feature-icon-large">
            <i className={`bi ${feature.icon}`}></i>
          </div>
          
          <h1 className="feature-title">{feature.title}</h1>
          <p className="feature-description">{feature.description}</p>
        </div>
        
        <div className={`feature-content ${isVisible ? 'slide-up' : ''}`}>
          <div className="feature-details">
            <h2>Overview</h2>
            <p>{feature.fullDescription}</p>
          </div>
          
          <div className="feature-actions">
            <h2>Actions</h2>
            <div className="action-buttons">
              {feature.actions.map((action, index) => (
                <button 
                  key={index}
                  className={`btn ${actionLoading === action ? 'loading' : ''}`}
                  onClick={() => executeAction(feature.title, action)}
                  disabled={!!actionLoading}
                >
                  {actionLoading === action ? <Loader small /> : action}
                </button>
              ))}
            </div>
            
            {actionResult && (
              <div className="action-result">
                <h3>Result:</h3>
                <div className="result-content">
                  {actionResult}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturePage