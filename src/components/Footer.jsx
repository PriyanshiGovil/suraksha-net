import { Link } from 'react-router-dom'
import { 
  BiLogoFacebook, 
  BiLogoTwitter, 
  BiLogoLinkedin, 
  BiLogoInstagram, 
  BiLogoYoutube 
} from 'react-icons/bi'
import logo from '../assets/logo.svg'

const Footer = () => {
  const socialLinks = [
    { icon: <BiLogoFacebook size={20} />, url: '#' },
    { icon: <BiLogoTwitter size={20} />, url: '#' },
    { icon: <BiLogoLinkedin size={20} />, url: '#' },
    { icon: <BiLogoInstagram size={20} />, url: '#' },
    { icon: <BiLogoYoutube size={20} />, url: '#' },
  ]

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container">
              <img src={logo} alt="SurakshaNet Logo" className="logo" />
              <span className="logo-text">SurakshaNet</span>
            </div>
            <p className="slogan">Har Click Pe Suraksha, Har Insaan Ki Raksha.</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  className="social-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-nav">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading">Contact Us</h3>
            <p>Email: contact@surakshanet.com</p>
            <p>Phone: +91 12345 67890</p>
            <p>Address: 123 Cyber Street, Tech City, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 SurakshaNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer