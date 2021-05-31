import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import React from 'react';
import { trackEvent } from 'react-with-analytics/lib/utils';
import FACEBOOK from '../assets/img/facebook.svg';
import LINKEDIN from '../assets/img/linkedin.svg';
import AICImage from '../assets/AIC_Logo_png.png';
import TWITTER from '../assets/img/twitter.svg';
import INSTAGRAM from '../assets/img/instagram.svg';
import BlackLOGO from '../assets/img/logo.png';

const Footer = ({ bgColor }) => {
  return (
    <>
      <div className={'landing-page-wrapper'} style={{ padding: '50px 0' }}>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <a href="/">
                  <img src={BlackLOGO} className="logo footer-logo"/>
                </a>
              </div>

              <div className="col-md-3 col-sm-12">
                <div className="footer-group">
                  <div className="footer-group-heading">Contact Us</div>
                  {/* <p>
                    Andheri West, <br/>
                    Mumbai - 400053
                  </p> */}
                  {/* <p>
                    <a href="tel:18008902909">Phone: 1800 890 2909</a>
                  </p>
                  <p>
                    Monday - Thursday <br/>
                    8:00 am - 6:00 pm
                  </p> */}
                  <p>
                    <a href="mailTo:info@classbazaar.com">Email: info@classbazaar.com</a>
                  </p>
                </div>
              </div>
              <div className="col-md-3 col-sm-12">
                <div className="footer-group">
                  <div className="footer-group-heading">Subjects</div>
                  <p><Link to={{
                    pathname: '/listing',
                    state: { subject: 'Computer Science' } 
                  }}>Computer Science</Link></p>
                  <p><Link to={{
                    pathname: '/listing',
                    state: { subject: 'Business' } 
                  }}>Business</Link></p>
                  <p><Link to={{
                    pathname: '/listing',
                    state: { subject: 'Arts & Design' } 
                  }}>Arts & Design</Link></p>
                  <p><Link to={{
                    pathname: '/listing',
                    state: { subject: 'Data Science' } 
                  }}>Data Science</Link></p>
                  <p><Link to={{
                    pathname: '/listing',
                    state: { subject: 'Health & Lifestyle' } 
                  }}>Health & Lifestyle</Link></p>
                </div>
              </div>
              <div className="col-md-3 col-sm-12">
                <div className="footer-group">
                  <div className="font-weight-bolder mb-2">
                    <a href="/privacypolicy">Privacy Policy</a>
                  </div>
                  <div className="font-weight-bolder">
                    <a href="/about">About Us</a>
                  </div>
                  <div className="font-weight-bolder">
                    <a href="https://blog.classbazaar.com/">Blog</a>
                  </div>
                  <img style={{ width: '100%' }} src={AICImage} alt=""/>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-3">
            <div className="row">
              <div className="col-8 mx-auto">
                <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0 social-list">
                  <li>
                    <a href="https://www.facebook.com/classbazaar/" target="_blank">
                      <img src={FACEBOOK} className="icon"/>
                      FACEBOOK
                    </a>
                  </li>

                  <li>
                    <a href="https://www.linkedin.com/company/class-bazaar/?originalSubdomain=in" target="_blank">
                      <img src={LINKEDIN} className="icon"/>
                      LINKEDIN
                    </a>
                  </li>

                  {/* <li>
                    <a href="#">
                      <img src={TWITTER} className="icon"/>
                      TWITTER
                    </a>
                  </li> */}
                  <li>
                    <a href="https://www.instagram.com/classbazaar/" target="_blank">
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
