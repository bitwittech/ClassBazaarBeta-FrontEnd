import React from 'react';
import AppBar from './appBar';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Contactus = () => {
  return (
    <>
      <AppBar />
      <div style={{ width: '90%', margin: 'auto', marginTop: '20px' }}>
        <Typography
          style={{ fontWeight: '900', fontSize: '2.2rem', marginBottom: '0px' }}
          color="primary"
          variant="h6"
          gutterBottom
        >
          Contact Us
        </Typography>
        <Typography variant="h6" style={{ fontWeight: '300' }} gutterBottom>
          You can leave us a message below and our team will get back to you or
          you can directly email us at <a href="#">info@classbazaar.com</a>
        </Typography>
        <br />
        <form>
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
                type="text"
                className="text-field"
                placeholder="Name"
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
                type="text"
                className="text-field"
                placeholder="Email"
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
                  type="text"
                  className="text-field"
                  placeholder="Subject"
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
                  type="text"
                  className="text-field"
                  placeholder="Write your message here."
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
      <Footer />
    </>
  );
};

export default Contactus;
