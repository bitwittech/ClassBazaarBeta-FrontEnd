import AppBar from './AppBar';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Store from '../store/Context';
import axios from 'axios';
import { trackEvent } from 'react-with-analytics/lib/utils';
import bannerImage from '../assets/contact-image.jpg';

const Contactus = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const { state, dispatch } = useContext(Store);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = 'https://api.classbazaar.in/api/contact';
    const res = await axios.post(url, data);
    setData({
      ...data,
      name: '',
      email: '',
      message: '',
      subject: '',
    });
    if (res.status === 200) {
      dispatch({
        type: 'ALERT',
        payload: {
          varient: 'success',
          message: 'Message sent',
        },
      });
    } else {
      dispatch({
        type: 'ALERT',
        payload: {
          varient: 'info',
          message: 'Unable to deliver your message',
        },
      });
    }
  };
  return (
    <>
      <AppBar noHome={true}/>
      <div style={{
        height: '70vh', backgroundPosition: 'center', backgroundImage: `url(${bannerImage})`, paddingTop: '150px',
      }} className={'contact-banner'}>
        <div className="container">
          <Typography
            style={{
              fontWeight: '900',
              fontSize: '2.2rem',
              marginBottom: '0px',
              color: 'white',
            }}
            variant="h6"
            gutterBottom
          >
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            className="contact-cont"
            style={{
              color: 'white', fontWeight: '300',
              maxWidth: '500px'
            }}
            gutterBottom
          >
            You can leave us a message below and our team will get back to you or
            you can directly email us at{' '}
            <a href="mailto:info@classbazaar.com?" style={{ color: 'white !important' }}>info@classbazaar.com</a>
          </Typography>
        </div>
      </div>
      <div
        style={{
          padding: 20,
          width: '100%',
          margin: 'auto',
          marginTop: '0px !important',
          marginBottom: 20,
          background: '#FAFAFA',
        }}
        className="contact-container"
      >

        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
          <Grid style={{ marginTop: '20px' }} container>
            <Grid item xs={12} sm={12}>
              <input
                style={{
                  background: '#fff3ef',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left !important',
                  padding: '10px 20px',
                }}
                name="name"
                value={data.name}
                onChange={e => handleChange(e)}
                type="text"
                className="text-field"
                placeholder="Name"
                required
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <input
                style={{
                  background: '#fff3ef',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left !important',
                  padding: '10px 20px',
                }}
                name="email"
                type="email"
                value={data.email}
                onChange={e => handleChange(e)}
                className="text-field w-m"
                placeholder="Email"
                required
              />
            </Grid>
            <Grid style={{ marginTop: '20px' }} container>
              <Grid item xs={12} sm={12}>
                <input
                  style={{
                    background: '#fff3ef',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left !important',
                    padding: '10px 20px',
                  }}
                  name="subject"
                  value={data.subject}
                  onChange={e => handleChange(e)}
                  type="text"
                  className="text-field w-m"
                  placeholder="Subject"
                  required
                />
              </Grid>
            </Grid>
            <Grid style={{ marginTop: '20px' }} container>

              <Grid item xs={12} sm={12}>
                <textarea
                  style={{
                    height: '100px',
                    background: '#fff3ef',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left !important',
                    padding: '10px 20px',
                  }}
                  name="message"
                  value={data.message}
                  onChange={e => handleChange(e)}
                  type="text"
                  className="text-field w-m"
                  placeholder="Write your message here."
                  required
                />
                <div style={{ marginTop: '15px' }}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: '600',
                      margin: 'auto',
                      backgroundColor: '#f15a29',
                      padding: '8px 50px',
                    }}
                    className="enroll-btn"
                  >
                    Submit
                  </button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="orange-band" style={{ padding: '50px 20px' }}>
        <div className="inner-orange">
          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontWeight: '500',
              marginBottom: '20px',
            }}
          >
            Never stop learning. Subscribe to our newsletter
          </Typography>
          <div style={{ marginTop: '10px', width: '90%', margin: 'auto' }}>
            <input
              type="email"
              placeholder="Your email"
              className="ns-input"
            />
            <button
              onClick={() => {
                if (this.state.nsEmail !== '') {
                  trackEvent('Newsletter', 'click', 'Newsletter Email');
                }
              }}
              className="ns-submit click-h"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer bgColor={'#FAFAFA'}/>
    </>
  );
};

export default Contactus;
