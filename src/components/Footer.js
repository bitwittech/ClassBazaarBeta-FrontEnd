import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import React from 'react';
import { trackEvent } from 'react-with-analytics/lib/utils';
const Footer = ({ bgColor }) => {
  return (
    <>
      <div className="footer" style={{ background: `${bgColor}` }}>
        <div style={{ marginTop: '20px' }}>
          <img
            className="footer-logo click-h"
            src={Logo}
            alt="classbazarLogo"
          />
        </div>
        <div className="footer-links">
          <div>
            <p>
              <Link
                onClick={() => {
                  trackEvent('About Us', 'click', 'footer');
                }}
                to="/about"
              >
                About Us
              </Link>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <Link to="/contact">Contact Us</Link>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </p>
          </div>
        </div>
        {/* <p className="footer-text mt-2">Phone: +1 234 567 9332</p> */}
        <p className="footer-text">Email: info@classbazaar.com</p>
        <p className="footer-text tsm">
          © Copyright 2019 <span className="bold">Class Bazaar</span>, All Right
          Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
