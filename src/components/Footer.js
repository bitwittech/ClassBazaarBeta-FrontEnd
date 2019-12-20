import Grid from '@material-ui/core/Grid';
import Logo from '../assets/logo.png';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="footer" style={{ background: 'white' }}>
        <div style={{ marginTop: '20px' }}>
          <img className="footer-logo" src={Logo} alt="classbazarLogo" />
        </div>
        <div className="footer-links">
          <div>
            <p>
              <a href="/about">About Us</a>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <a href="/about">Contact Us</a>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <a href="/privacypolicy">Privacy Policy</a>
            </p>
          </div>
        </div>
        <p class="footer-text"> Email: info@classbazaar.com </p>
        <p class="footer-text tsm">
          © Copyright 2019 <strong>Class Bazaar</strong>, All Right Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
