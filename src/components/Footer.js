import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import React from 'react';
import { trackEvent } from 'react-with-analytics/lib/utils';
import FACEBOOK from '../assets/img/facebook.svg';
import LINKEDIN from '../assets/img/linkedin.svg';
import TWITTER from '../assets/img/twitter.svg';
import INSTAGRAM from '../assets/img/instagram.svg';
import LOGO from '../assets/img/logo.png';

const Footer = ({ bgColor }) => {
  return (
    <>
      <div className={'landing-page-wrapper'} style={{ padding: '50px 0' }}>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <a href="/">
                  <img src={LOGO} className="logo footer-logo"/>
                </a>
              </div>

              <div className="col-3">
                <div className="footer-group">
                  <div className="footer-group-heading">Contact Us</div>
                  <p>
                    Andheri West, <br/>
                    Mumbai - 400053
                  </p>
                  <p>
                    <a href="tel:18008902909">Phone: 1800 890 2909</a>
                  </p>
                  <p>
                    Monday - Thursday <br/>
                    8:00 am - 6:00 pm
                  </p>
                  <p>
                    <a href="mailTo:info@classbazaar.com">Email: info@classbazaar.com</a>
                  </p>
                </div>
              </div>
              <div className="col-3">
                <div className="footer-group">
                  <div className="footer-group-heading">Subjects</div>
                  <p><a href="#">Computer Science</a></p>
                  <p><a href="#">Business</a></p>
                  <p><a href="#">Arts & Design</a></p>
                  <p><a href="#">Data Science</a></p>
                  <p><a href="#">Health & Lifestyle</a></p>
                </div>
              </div>
              <div className="col-3">
                <div className="footer-group">
                  <div className="font-weight-bolder mb-2">
                    <a href="#">Privacy Policy</a>
                  </div>
                  <div className="font-weight-bolder">
                    <a href="#">About Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-3">
            <div className="row">
              <div className="col-8 mx-auto">
                <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0 social-list">
                  <li>
                    <a href="#">
                      <img src={FACEBOOK} className="icon"/>
                      FACEBOOK
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img src={LINKEDIN} className="icon"/>
                      LINKEDIN
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img src={TWITTER} className="icon"/>
                      TWITTER
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={INSTAGRAM} className="icon"/>
                      INSTAGRAM
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
