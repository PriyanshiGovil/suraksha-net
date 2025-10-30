import { Link } from "react-router-dom";
import logo from "@/assets/logo.png"; // update path if needed
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left-aligned logo */}
        <div className="logo-container">
          <img src={logo} alt="SurakshaNet Logo" className="logo" />
          <span className="logo-text">SurakshaNet</span>
        </div>

        {/* Right-aligned navigation */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/services" className="nav-link">Services</Link></li>
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
