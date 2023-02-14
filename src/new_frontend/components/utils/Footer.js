import { Box, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';

// icons
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';

//css
import '../../assets/css/footer.css';

export default function Footer() {
  const allObj = {
    Subjects: ['Computer Science', 'Arts & Carft', 'Maths', 'Social Science'],
    Provider: ['Udemy', 'Coursera', 'edX', 'Future Learn'],
    University: [
      'Harward University',
      'Rice University',
      'IIT RORKEE',
      'Stanford University',
    ],
  };
  return (
    <>
      <Grid container className="footerContainer">
        <Grid xs={12} md={3} className="footerItem">
          <Typography className="footerHeading">Browser By Subject </Typography>
          {allObj.Subjects.map((row, index) => (
            <Typography variant="caption" key={index}>
              {row}
            </Typography>
          ))}
        </Grid>
        <Grid xs={12} md={3} className="footerItem">
          <Typography className="footerHeading">
            Browser By Provider{' '}
          </Typography>
          {allObj.Subjects.map((row, index) => (
            <Typography variant="caption" key={index}>
              {row}
            </Typography>
          ))}
        </Grid>
        <Grid xs={12} md={3} className="footerItem">
          <Typography className="footerHeading">
            Browser By University{' '}
          </Typography>
          {allObj.Subjects.map((row, index) => (
            <Typography variant="caption" key={index}>
              {row}
            </Typography>
          ))}
        </Grid>
        <Grid xs={12} md={2} className="footerItem">
          <Typography className="footerHeading">Information </Typography>
          <Typography variant="caption">info@classbazaar.com</Typography>
          <Typography variant="caption">
            522, Zest Business Spaces, MG Road, Ghatkopar East, Mumbai 400077{' '}
          </Typography>
          <Box className="social_icons">
            <img src={facebook} alt="social_icon" />
            <img src={instagram} alt="social_icon" />
          </Box>
        </Grid>
      </Grid>
      <Divider className={'divider'}></Divider>
      {/* // copywriter */}
      <Box className="copywriter">
        <Typography variant="caption">Class Bazaar © 2023</Typography>
      </Box>
      {/* // copywrite ends */}
    </>
  );
}
