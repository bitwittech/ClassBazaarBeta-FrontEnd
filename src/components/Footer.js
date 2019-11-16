import React from 'react';
import Grid from '@material-ui/core/Grid';

import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div>
          <img className="footer-logo" src={Logo} alt="classbazarLogo" />
        </div>
        <div className="footer-links">
          <div>
            <p>
              <a href="#">About Us</a>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <a href="#">Contact Us</a>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
        <p class="footer-text"> Email: info@company.com </p>
        <p class="footer-text tsm">
          © Copyright 2018 <strong>Class Bazaar</strong>, All Right Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
