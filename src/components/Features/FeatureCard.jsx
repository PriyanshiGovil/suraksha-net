import { useState } from 'react'

const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="feature-card card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="feature-icon">
        <i className={`bi ${feature.icon}`}></i>
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
      <div className={`feature-arrow ${isHovered ? 'visible' : ''}`}>
        <i className="bi bi-arrow-right"></i>
      </div>
    </div>
  )
}

export default FeatureCard