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
      <AppBar noHome={true} />
      <div
        style={{
          padding: 50,
          width: '100%',
          margin: 'auto',
          marginTop: '0px',
          marginBottom: 20,
          background: '#FAFAFA',
        }}
        className="contact-container"
      >
        <Typography
          style={{
            fontWeight: '900',
            fontSize: '2.2rem',
            marginBottom: '0px',
          }}
          color="primary"
          variant="h6"
          gutterBottom
        >
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          className="contact-cont"
          style={{ fontWeight: '300' }}
          gutterBottom
        >
          You can leave us a message below and our team will get back to you or
          you can directly email us at{' '}
          <a href="mailto:info@classbazaar.com?">info@classbazaar.com</a>
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid style={{ marginTop: '20px' }} container>
            <Grid item xs={12} sm={1}>
              <Typography
                variant="h6"
                style={{ fontSize: '1.2rem', fontWeight: '500' }}
                gutterBottom
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <input
                style={{ background: 'white', border: 'none' }}
                name="name"
                value={data.name}
                onChange={e => handleChange(e)}
                type="text"
                className="text-field w-m"
                placeholder="Name"
                required
              />
            </Grid>
          </Grid>
          <Grid style={{ marginTop: '20px' }} container>
            <Grid item xs={12} sm={1}>
              <Typography
                variant="h6"
                style={{ fontSize: '1.2rem', fontWeight: '500' }}
                gutterBottom
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <input
                style={{ background: 'white', border: 'none' }}
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
              <Grid item xs={12} sm={1}>
                <Typography
                  variant="h6"
                  style={{ fontSize: '1.2rem', fontWeight: '500' }}
                  gutterBottom
                >
                  Subject
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <input
                  style={{ background: 'white', border: 'none' }}
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
              <Grid item xs={12} sm={1}>
                <Typography
                  variant="h6"
                  style={{ fontSize: '1.2rem', fontWeight: '500' }}
                  gutterBottom
                >
                  Message
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <textarea
                  style={{
                    background: 'white',
                    border: 'none',
                    height: '100px',
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

      <Footer bgColor={'#FAFAFA'} />
    </>
  );
};

export default Contactus;
