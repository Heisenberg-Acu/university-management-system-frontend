import React from 'react';

// Import Font Awesome CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import '../../styles/components/common/Footer.css';
import Logo from '../../assets/common/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <img className="footer-logo"
              src={Logo}
              alt="ACU Logo"
              width="450px"
              style={{ marginLeft: '-170px', marginTop: '-80px' }}
            />
          </div>
          <div className="footer-col">
            <h4>ABOUT US</h4>
            <ul className="p-0">
              <li><a href="#">About ACU</a></li>
              <li><a href="#">History of ACU</a></li>
              <li><a href="#">About Faculty Of Engineering</a></li>
              <li><a href="#">Mission</a></li>
              <li><a href="#">Objectives</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Engineering Departments</h4>
            <ul className="p-0">
              <li><a href="#">electrical engineering</a></li>
              <li><a href="#">mechanical engineering</a></li>
              <li><a href="#">civil engineering</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
