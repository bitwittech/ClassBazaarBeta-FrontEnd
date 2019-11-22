import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import AppBar from './appBar';
import Footer from './Footer';

const CourseDetails = () => {
  return (
    <>
      <AppBar />

      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <div
              style={{
                background: '#fff',
                padding: '20px',
                paddingLeft: '40px',
              }}
            >
              <div className="cd-head">
                <div>
                  <Typography
                    style={{ fontWeight: '600' }}
                    color="primary"
                    variant="subtitle2"
                    gutterBottom
                  >
                    University Name
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    PG Diploma in Data Analytics & Visualization
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider"
                    gutterBottom
                  >
                    via edX
                  </Typography>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <TurnedInIcon color="primary" fontSize="large" />
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: '#898989' }}
                    gutterBottom
                  >
                    4.3(43 review)
                  </Typography>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <StarIcon color="primary" />
                    </div>
                    <div>
                      <StarIcon color="primary" />
                    </div>
                    <div>
                      <StarIcon color="primary" />
                    </div>
                    <div>
                      <StarIcon color="primary" />
                    </div>
                    <div>
                      <StarBorderIcon color="primary" />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="cd-cont">
                <Typography
                  style={{ fontWeight: '600', fontSize: '22px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Course Overview
                </Typography>
                <Typography
                  style={{ fontSize: '16px', fontWeight: '300' }}
                  variant="body1"
                  gutterBotto3
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus aliquam vitae ipsum sit amet egestas. Sed molestie
                  dui id diam tempor, vel tristique turpis ullamcorper. In eget
                  fringilla diam. Ut placerat justo eget tempor aliquam. Etiam
                  bibendum in massa vehicula sagittis. Proin varius nisi mauris,
                  id semper nulla rhoncus at. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Phasellus aliquam vitae ipsum sit
                  amet egestas. Sed molestie dui id diam tempor, vel tristique
                  turpis ullamcorper. In eget fringilla diam. Ut placerat justo
                  eget tempor aliquam. Etiam bibendum in massa vehicula
                  sagittis. Proin varius nisi mauris, id semper nulla rhoncus
                  at.
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: '600', fontSize: '22px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Prerequisites
                </Typography>
                <Typography
                  style={{ fontSize: '16px', fontWeight: '300' }}
                  variant="body1"
                  gutterBotto3
                >
                  - Lorem ipsum dolor sit amet - consectetur adipiscing elit. -
                  Lorem ipsum dolor sit amet - consectetur adipiscing elit. -
                  Lorem ipsum dolor sit amet - consectetur adipiscing elit.
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: '600', fontSize: '22px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  What will you learn? (Bullets)
                </Typography>
                <Typography
                  style={{ fontSize: '16px', fontWeight: '300' }}
                  variant="body1"
                  gutterBotto3
                >
                  - expected_learnings - Lorem ipsum dolor sit amet -
                  consectetur adipiscing elit. - Lorem ipsum dolor sit amet -
                  consectetur adipiscing elit.
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: '600', fontSize: '22px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Professor: <span style={{ fontWeight: '300' }}>Name</span>
                </Typography>{' '}
                <br />
                <Typography
                  style={{ fontWeight: '600', fontSize: '22px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Reviews
                </Typography>
                {/* <div className="reviews">
                <div className="review">
                    <div className="review-left">
                        <img src="" alt=""/>
                    </div>
                </div>
                </div> */}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div
              style={{
                background: '#fff',
                padding: '20px',
                paddingLeft: '40px',
              }}
            >
              <Typography
                style={{ fontWeight: '600', fontSize: '22px' }}
                variant="subtitle2"
                color="primary"
                gutterBottom
              >
                At a Glance
              </Typography>
              <div style={{ display: 'flex' }}>
                <div>
                  <QueryBuilderIcon color="primary" /> &nbsp;
                </div>
                <div>8 hours per week, 4 weeks</div>
              </div>

              <div style={{ display: 'flex', marginTop: '15px' }}>
                <div>
                  <DateRangeIcon color="primary" /> &nbsp;
                </div>
                <div>Starts on Sep.2</div>
              </div>

              <div style={{ display: 'flex', marginTop: '15px' }}>
                <div>
                  <MonetizationOnIcon color="primary" /> &nbsp;
                </div>
                <div>Free</div>
              </div>

              <div style={{ display: 'flex', marginTop: '15px' }}>
                <div>
                  <ListAltIcon color="primary" /> &nbsp;
                </div>
                <div>edX</div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <button className="enroll-btn">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: '600',
                      }}
                    >
                      <div>Enroll Now &nbsp;</div>
                    </div>
                    <div>
                      <ArrowForwardIcon
                        style={{ fontSize: '22px', marginTop: '2px' }}
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CourseDetails;
