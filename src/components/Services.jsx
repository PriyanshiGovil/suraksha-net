import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import featuresData from '../data/featuresData.js'
import FeatureCard from './Features/FeatureCard.jsx'
// Import your video
import bgVideo from '../assets/bgvideo.mp4'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="services section-padding">

      {/* --- Video Background --- */}
      <div className="services-video-background">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* ------------------------ */}

      {/* Container stays on top */}
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

export default Services;