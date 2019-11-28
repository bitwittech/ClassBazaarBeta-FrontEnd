import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import getClosestNextRun from './../utils/edxUtils';
import ReactHtmlParser from 'react-html-parser';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Box from '@material-ui/core/Box';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AppBar from './appBar';
import Footer from './Footer';

const CourseDetails = props => {
  const [state, setState] = useState({
    data: null,
  });
  const provider = props.match.params.provider;
  const uuid = props.match.params.uuid;
  useEffect(() => {
    const getCourseDetails = async () => {
      var url = `https://api.classbazaar.in/api/course?uuid=${uuid}&provider=${provider}`;
      const res = await fetch(url);
      const data = await res.json();

      setState({
        ...state,
        data: data.data,
      });
    };
    getCourseDetails();
  }, []);

  console.log(state);
  console.log(props);
  const reviewSection = () => (
    <>
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
    </>
  );

  const courseSummary = () => (
    <>
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
    </>
  );
  const edX = () =>
    state.data && (
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
                    {state.data.owners[0].name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {state.data.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider"
                    gutterBottom
                  >
                    via {provider}
                  </Typography>
                </div>
                <div style={{ textAlign: 'right' }}>{reviewSection()}</div>
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
                  gutterBottom
                >
                  {ReactHtmlParser(state.data.full_description, {
                    transform: node => {
                      if (node.name === 'h2' || node.name === 'h3') {
                        // console.log({ node });
                        return <Box>{node.children[0].children[0].data}</Box>;
                      }
                      if (node.name === 'br') {
                        return null;
                      }
                      if (node.name === 'strong') {
                        console.log({ node });
                        return <Box>{node.children[0].data}</Box>;
                      }
                    },
                  })}
                </Typography>
                <br />
                {state.data.outcome !== '' && (
                  <>
                    <Typography
                      style={{ fontWeight: '600', fontSize: '22px' }}
                      variant="subtitle2"
                      gutterBottom
                    >
                      What will you learn?
                    </Typography>
                    <Typography
                      style={{ fontSize: '16px', fontWeight: '300' }}
                      variant="body1"
                      gutterBottom
                    >
                      {ReactHtmlParser(state.data.outcome, {
                        transform: node => {
                          // console.log({ node });
                          if (node.name === 'h2') {
                            return <Box>{node.children[0].data}</Box>;
                          }
                        },
                      })}
                    </Typography>{' '}
                  </>
                )}
                {state.data.prerequisites_raw !== '' ? (
                  <>
                    {' '}
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
                      gutterBottom
                    >
                      {state.data.prerequisites_raw}
                    </Typography>
                  </>
                ) : null}
                <br />

                {state.data.closestRun !== undefined && (
                  <>
                    <Typography
                      style={{ fontWeight: '600', fontSize: '22px' }}
                      variant="subtitle2"
                      gutterBottom
                    >
                      Professor:{' '}
                      {this.state.closestRun.staff.map((obj, index) => (
                        <span key={index} style={{ fontWeight: '300' }}>
                          {obj.given_name}
                        </span>
                      ))}
                    </Typography>
                  </>
                )}
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
            {courseSummary()}
          </Grid>
        </Grid>
      </Container>
    );

  const renderSwitch = provider => {
    switch (provider) {
      case 'EDx':
        return edX();
      default:
        return <h1>Coming Soon</h1>;
    }
  };
  return (
    <>
      <AppBar />
      {renderSwitch(provider)}
      <Footer />
    </>
  );
};

export default CourseDetails;
