import AppBar from './AppBar';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { trackEvent } from 'react-with-analytics/lib/utils';

const data = {
  section: [
    {
      heading: 'About Us',
      body: `Class Bazaar is a search engine and reviews website for massive open online courses (MOOCs). Class Bazaar aggregates thousands of courses from multiple providers so that you find the best courses on almost any topic or subject. Our aim is to help you Stop Searching & Start Learning!
        Our catalog has courses from world’ s leading universities and organizations.
        `,
    },
    {
      heading: 'We are a Learner Supported Community',
      body:
        'Class Bazaar is a learner supported community and we make money through affiliate marketing links. Basically, we may earn a commission when someone clicks through to a course provider and does a paid course or a certificate. For a major portion of our catalog we do NOT have any affiliate partnerships and do not stand to earn a commission however those courses are still very relevant in their respective domains so we show them in search results. We NEVER let the affiliate relationship influence the course listing.The most important thing for us is that you fast track your search of any MOOCs.',
    },
    {
      heading: 'Our Team',
      body: `${'We are a small team currently working in roles of the business which we have never done before. However, we share a common passion for online learning and the impact it can have in elevating lives. If you too think you feel similarly and want to help people find the next jump in their careers, there may be a role for you on our growing team. We would love to hear from you. Drop us an email at info@classbazaar.com'}
    `,
    },
  ],
};

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#f15a29',
    marginTop: '10px',
    height: 'auto',
    color: '#FFF',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '200',
  },
}));

const About = () => {
  const classes = styles();
  return (
    <div>
      <AppBar noHome={true}/>
      <div className={classes.root}>
        <Grid container spacing={3} className="ab-t">
          <Grid item xs={12}>
            <Container maxWidth={'md'}
                       style={{ display: 'flex', backgroundColor: '#fff3ef', padding: '30px', marginTop: '80px' }}>
             <span style={{
               color: '#f15a29',
               width: '80px',
               marginTop: '-50px',
               fontSize: '160px',
             }}>"</span>
              <h1 style={{ display: 'inline-block', fontWeight: 600 }}>

                Elevate lives by assisting people find what to <br/> learn in
                the fastest and most convenient way.
              </h1>
            </Container>
          </Grid>
        </Grid>
        <br/>
        <Container>
          <div style={{ display: 'flex', marginTop: '100px' }} className={'container p-0'}>
            <Section
              body={data.section[0].body}
              heading={data.section[0].heading}
            />
            <div className={'px-5'}>
              <Typography
                variant="h2"
                align="center"
                marginTop="3"
                style={{color: '#0d9ca4', fontWeight: 600}}
                component="h2"
              >
                1,50,000+
              </Typography>
              <Typography
                variant="h6"
                align="center"
                component="h2"
                style={{fontSize:"16px"}}
              >
                Courses from world’s leading universities and organisations
              </Typography>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <Section
            body={data.section[1].body}
            heading={data.section[1].heading}
          />
          <Section
            body={data.section[2].body}
            heading={data.section[2].heading}
          />
          <Section body={''} heading={''}/>
        </Container>
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
      <Footer/>
    </div>
  );
};

const Section = ({ heading, body }) => {
  return (
    <div className={'container mt-2'}>
      <Typography variant="h6" style={{ color: '#000', fontWeight: 600 }} component="h2">
        {heading}
      </Typography>
      <Typography variant="body1" color="" component="span" paragraph="true">
        {body}
      </Typography>
      <br/>
      <br/>
    </div>
  );
};
export default About;
