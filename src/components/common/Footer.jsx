import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-brand">
              <img src="/perfect_symmetry-removebg.png" alt="Perfect Symmetry" className="footer-logo" />
              <h3>Perfect Symmetry</h3>
            </div>
            <p>Your one-stop destination for premium cosmetic products.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/login">Admin</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: info@perfectsymmetry.com</p>
            <p>Phone: +91 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Perfect Symmetry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 