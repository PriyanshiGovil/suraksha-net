// src/components/Services.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import featuresData from '../data/featuresData.js'
import FeatureCard from './Features/FeatureCard.jsx'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="services section-padding">
      <div className="container">
        <div className={`section-header ${isVisible ? 'fade-in' : ''}`}>
          <h2 className="section-title">Our Security Services</h2>
          <p className="section-subtitle">
            Comprehensive cybersecurity solutions to protect your digital assets
          </p>
        </div>
        
        <div className={`services-grid ${isVisible ? 'slide-up' : ''}`}>
          {featuresData.map(feature => (
            <Link 
              key={feature.id} 
              to={`/feature/${feature.id}`}
              className="service-link"
            >
              <FeatureCard feature={feature} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services