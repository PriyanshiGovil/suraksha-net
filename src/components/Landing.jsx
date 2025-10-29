import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import './Landing.css'; 
import { gData } from '../lib/utils.js'; 

// --- 1. YOUR COMMAND CENTER SVG (Unchanged) ---
const DashboardPreview = () => (
  <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <rect width="600" height="400" fill="#0f0f1e" rx="8" ry="8"/>
    <rect x="20" y="20" width="560" height="360" fill="#1a1a2e" rx="4" ry="4"/>
    <rect x="40" y="40" width="520" height="40" fill="#088395" rx="4" ry="4"/>
    <text x="50" y="65" fill="#00ffc8" fontFamily="monospace" fontSize="16">SurakshaNet Command Center</text>
    <rect x="40" y="100" width="250" height="120" fill="#0a4d68" rx="4" ry="4"/>
    <text x="50" y="125" fill="#eaeaea" fontFamily="monospace" fontSize="14">System Status</text>
    <text x="50" y="150" fill="#05bfdb" fontFamily="monospace" fontSize="12">Network: Protected</text>
    <text x="50" y="170" fill="#05bfdb" fontFamily="monospace" fontSize="12">Endpoints: Active</text>
    <text x="50" y="190" fill="#05bfdb" fontFamily="monospace" fontSize="12">Threats: 0 detected</text>
    <text x="50" y="210" fill="#ffc107" fontFamily="monospace" fontSize="12">Updates: Pending</text>
    <rect x="310" y="100" width="250" height="120" fill="#0a4d68" rx="4" ry="4"/>
    <text x="320" y="125" fill="#eaeaea" fontFamily="monospace" fontSize="14">Recent Alerts</text>
    <text x="320" y="150" fill="#ffc107" fontFamily="monospace" fontSize="12">[MEDIUM] Suspicious login</text>
    <text x="320" y="170" fill="#dc3545" fontFamily="monospace" fontSize="12">[HIGH] Malware detected</text>
    <text x="320" y="190" fill="#17a2b8" fontFamily="monospace" fontSize="12">[LOW] Update available</text>
    <text x="320" y="210" fill="#28a745" fontFamily="monospace" fontSize="12">[INFO] Scan completed</text>
    <rect x="40" y="240" width="520" height="120" fill="#0a4d68" rx="4" ry="4"/>
    <text x="50" y="265" fill="#eaeaea" fontFamily="monospace" fontSize="14">Terminal</text>
    <text x="50" y="290" fill="#00ffc8" fontFamily="monospace" fontSize="12">$ scan</text>
    <text x="50" y="310" fill="#00ffc8" fontFamily="monospace" fontSize="12">Initializing security scan...</text>
    <text x="50" y="330" fill="#00ffc8" fontFamily="monospace" fontSize="12">Scanning network infrastructure...</text>
    <text x="50" y="350" fill="#28a745" fontFamily="monospace" fontSize="12">Network scan complete. No threats detected.</text>
  </svg>
)

// --- 2. YOUR GLOBE COMPONENT (Unchanged) ---
const GlobeComponent = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [hoveredPolygon, setHoveredPolygon] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const globeContainerRef = useRef(null);
  const globeEl = useRef(null);

  useEffect(() => {
    fetch('//cdn.jsdelivr.net/npm/three-globe@2.44.1/example/country-polygons/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  // Set up auto-rotation
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;
      controls.enablePan = false;
    }
  }, [globeEl.current]);

  // Set up responsive dimensions
  useEffect(() => {
    if (globeContainerRef.current) {
      const { width, height } = globeContainerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      const resizeObserver = new ResizeObserver(entries => {
        if (entries[0]) {
          const { width, height } = entries[0].contentRect;
          setDimensions({ width, height });
        }
      });
      resizeObserver.observe(globeContainerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div 
      ref={globeContainerRef} 
      style={{ width: '100%', height: '100%' }}
    >
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)" 
        showGlobe={false}
        showAtmosphere={false}
        
        // --- Hexagon Country Polygons ---
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonDotResolution={6} 
        hexPolygonMargin={0.2}
        hexAltitude={0}
        hexPolygonColor={({ properties: d }) =>
          hoveredPolygon === d ? "#ff4040" : "#00bcd4"
        }
        hexPolygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b>`}
        onHexPolygonHover={(polygon) => setHoveredPolygon(polygon?.properties || null)}
        
        // --- ARCS DATA ---
        arcsData={gData}
        arcColor={(d) => d.color}
        arcStartLat={(d) => d.startLat}
        arcStartLng={(d) => d.startLng}
        arcEndLat={(d) => d.endLat}
        arcEndLng={(d) => d.endLng}
        arcDashLength={0.9}
        arcDashGap={0.5} 
        arcDashAnimateTime={2000}
        arcStroke={(d) => d.stroke}
      />
    </div>
  );
}


// --- 3. YOUR LANDING PAGE COMPONENT (Fixed) ---
const Landing = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="landing">
      <section className="hero section-padding">
        
        <div className="container">

          {/* LEFT COLUMN: THE GLOBE */}
          <div className={`hero-image ${isVisible ? 'slide-up' : ''}`}>
            <div className="globe-container">
              <GlobeComponent />
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT + COMMAND CENTER */}
          <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">SurakshaNet</span>
            </h1>
            <p className="hero-slogan gradient-text">
              Har Click Pe Suraksha, Har Insaan Ki Raksha.
            </p>
            <p className="hero-description">
              SurakshaNet is your comprehensive cybersecurity solution...
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn">
                Explore Services
              </Link>
              <Link to="/dashboard" className="btn btn-outline">
                View Dashboard
              </Link> {/* <--- THIS IS THE FIX */}
            </div>
            
            <div className="dashboard-preview glow">
              <DashboardPreview />
            </div>
          </div>
          
        </div>
      </section>

      {/* --- FEATURES/SERVICES SECTION --- */}
      <section className="features section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose SurakshaNet?</h2>
            <p className="section-subtitle">
              Advanced cybersecurity solutions powered by AI and machine learning
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Advanced Protection</h3>
              <p>State-of-the-art security protocols to safeguard your digital assets from evolving threats.</p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">
                <i className="bi bi-cpu"></i>
              </div>
              <h3>AI-Powered Detection</h3>
              <p>Machine learning algorithms that detect and neutralize threats in real-time.</p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">
                <i className="bi bi-graph-up"></i>
              </div>
              <h3>Real-time Monitoring</h3>
              <p>24/7 surveillance of your systems with instant alerts and actionable insights.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing