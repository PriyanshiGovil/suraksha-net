// src/components/App.jsx
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './components/Landing.jsx'
import Services from './components/Services.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import FeaturePage from './components/Features/FeaturePage.jsx'
import './App.css'
import './components/Navbar.css'
import './components/Footer.css'
import './components/Landing.css'
import './components/Services.css'
import './components/Features/FeaturePage.css'
import './components/Common/Loader.css'
import './components/Dashboard/Dashboard.css'
import './components/Dashboard/Terminal.css'
import './components/Features/UniversalCmdLineFeature.css'
// Removed problematic imports
// import './components/Features/BorderXFeature.css'
// import "./components/Features/NetworkSecurityFeature.css"
// import "./components/Features/LegalEaseFeature.css"

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feature/:featureId" element={<FeaturePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App