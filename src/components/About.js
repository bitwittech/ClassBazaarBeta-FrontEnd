import AppBar from './appBar';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    background: '#FFA502',
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
      <AppBar noHome={true} />
      <div className={classes.root}>
        <Grid container spacing={3} className="ab-t">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Container maxWidth={'md'}>
                <h1>
                  Elevate lives by assisting people find what to <br /> learn in
                  the fastest and most convenient way.
                </h1>
              </Container>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Container>
          <Section
            body={data.section[0].body}
            heading={data.section[0].heading}
          />
          <br />
          <br />
          <br />
          <br />
          <Typography
            variant="h2"
            align="center"
            marginTop="3"
            color="primary"
            component="h2"
          >
            1,50,000+
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="primary"
            component="h2"
          >
            Courses from world’s leading universities and organisations
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <Section
            body={data.section[1].body}
            heading={data.section[1].heading}
          />
          <Section
            body={data.section[2].body}
            heading={data.section[2].heading}
          />
          <Section body={''} heading={''} />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const Section = ({ heading, body }) => {
  return (
    <>
      <Typography variant="h6" color="primary" component="h2">
        {heading}
      </Typography>
      <Typography variant="body1" color="" component="span" paragraph="true">
        {body}
      </Typography>
      <br />
      <br />
    </>
  );
};
export default About;
