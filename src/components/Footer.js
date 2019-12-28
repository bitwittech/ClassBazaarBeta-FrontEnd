import Grid from '@material-ui/core/Grid';
import Logo from '../assets/logo.png';
import React from 'react';

const Footer = ({ bgColor }) => {
  return (
    <>
      <div className="footer" style={{ background: `${bgColor}` }}>
        <div style={{ marginTop: '20px' }}>
          <img className="footer-logo" src={Logo} alt="classbazarLogo" />
        </div>
        <div className="footer-text-m no-desktop">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          ipsum dolor si conseq int sapiente obcaecati animi
        </div>
        <div className="footer-links no-mobile">
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
              <a href="/contact">Contact Us</a>
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
        <p className="footer-text mt-2">Phone: +1 234 567 9332</p>
        <p className="footer-text">
          Email: info@company.com | Fax: +1 342 422 5314
        </p>
        <p className="footer-text tsm">
          © Copyright 2019 <span className="bold">Class Bazaar</span>, All Right
          Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
