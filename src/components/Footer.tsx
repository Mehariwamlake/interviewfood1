import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Company */}
        <div className="footer-column">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><a href="#">About us</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Column 2 - Contact */}
        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-links">
            <li><a href="#">Help & Support</a></li>
            <li><a href="#">Partner with us</a></li>
            <li><a href="#">Ride with us</a></li>
          </ul>
        </div>

        {/* Column 3 - Legal */}
        <div className="footer-column">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-links">
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Refund & Cancellation</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="footer-column">
          <h3 className="footer-heading">FOLLOW US</h3>
          <div className="footer-socials">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
          </div>
          <p className="footer-newsletter-text">Receive exclusive offers in your mailbox</p>
          <form className="footer-form">
            <input type="email" placeholder="Enter Your email" className="footer-input" />
            <button type="submit" className="footer-button">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <p>All rights Reserved © <span className="footer-company">Your Company</span>, 2021</p>
        <p>Made with <span className="footer-heart">♥</span> by <span className="footer-brand">Themewagon</span></p>
      </div>
    </footer>
  );
};

export default Footer;
