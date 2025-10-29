import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiMenu, BiX } from 'react-icons/bi'
import logo from '../assets/logo.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo and website name on the left */}
          <div className="logo-section">
            <Link to="/" className="logo-container">
              <img src={logo} alt="SurakshaNet Logo" className="logo" />
              <span className="logo-text">SurakshaNet</span>
            </Link>
          </div>

          {/* Navigation links on the right */}
          <div className="nav-section">
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
              {navLinks.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    to={link.path} 
                    className="nav-link" 
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className={`menu-icon ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
              {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar