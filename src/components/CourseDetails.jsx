import { Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import AppBar from './appBar';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Footer from './Footer';
import HomeModal from './HomeModal';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ReactHtmlParser from 'react-html-parser';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarRatings from 'react-star-ratings';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import formatDate from './../utils/dateUtils';
import getClosestNextRun from './../utils/edxUtils';

const CourseDetails = props => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    popUp: false,
  });
  const provider = props.match.params.provider;
  let uuid = props.match.params.uuid;
  if (provider === 'SimpliLearn') {
    uuid = props.location.state.uuid.replace(/[`~!",.<>\{\}\[\]\\\/]/gi, '');
  }
  useEffect(() => {
    const getCourseDetails = async () => {
      var url = `https://api.classbazaar.in/api/course?uuid=${uuid}&provider=${provider}`;
      console.log(url, uuid);
      const res = await fetch(url);
      const data = await res.json();

      setState({
        ...state,
        data: data.data,
        loading: false,
      });
    };
    getCourseDetails();
  }, []);

  console.log(state);
  console.log(props);
  const reviewSection = (ratingNumber, noOfReviews) => {
    console.log({ ratingNumber, noOfReviews });
    return (
      <>
        <TurnedInIcon color="primary" fontSize="large" />
        <Typography
          variant="caption"
          display="block"
          style={{ color: '#898989' }}
          gutterBottom
        >
          {noOfReviews >= 0 && ratingNumber && (
            <>{`${Math.round(ratingNumber * 10) /
              10}(${noOfReviews} reviews)`}</>
          )}
          {noOfReviews < 0 && ratingNumber && (
            <>{`${Math.round(ratingNumber * 10) / 10}`}</>
          )}
          {noOfReviews >= 0 && !ratingNumber && <>{`${noOfReviews} reviews`}</>}
        </Typography>
        {ratingNumber && (
          <div style={{ display: 'flex' }}>
            <StarRatings
              rating={ratingNumber}
              starRatedColor="#FFA502"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="0px"
              name="rating"
            />
          </div>
        )}
      </>
    );
  };
  const handlePopupClose = () => {
    setState({ ...state, popUp: false });
  };
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
          <div>{props.location.state.duration}</div>
        </div>

        <div style={{ display: 'flex', marginTop: '15px' }}>
          <div>
            <DateRangeIcon color="primary" /> &nbsp;
          </div>
          <div>{` Starts on ${formatDate(
            new Date(props.location.state.startingOn),
            'MMMM d'
          )}`}</div>
        </div>

        <div style={{ display: 'flex', marginTop: '15px' }}>
          <div>
            <MonetizationOnIcon color="primary" /> &nbsp;
          </div>
          <div>
            {props.location.state.price === '' ||
            props.location.state.price === null
              ? 'Free'
              : props.location.state.price}
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '15px' }}>
          <div>
            <ListAltIcon color="primary" /> &nbsp;
          </div>
          <div>{provider}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => {
              window.open(props.location.state.url, '_blank');
            }}
            className="enroll-btn"
          >
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
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
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
                        {ReactHtmlParser(state.data.prerequisites_raw)}
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

                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                  <AddIcon />
                </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const udemy = () =>
    state.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
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
                      {props.location.state.university}
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
                  <div style={{ textAlign: 'right' }}>
                    {reviewSection(
                      state.data.avg_rating,
                      state.data.num_reviews
                    )}
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
                    gutterBottom
                  >
                    {
                      (ReactHtmlParser(state.data.description),
                      {
                        transform: node => {
                          console.log({ node });
                          if (node.name === 'h1') {
                            return (
                              <Typography
                                style={{ fontWeight: '600', fontSize: '22px' }}
                                variant="subtitle2"
                                gutterBottom
                              >
                                {node.children[0].data}{' '}
                              </Typography>
                            );
                          }
                        },
                      })
                    }
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
                        {state.data.what_you_will_learn_data.items.map(
                          (e, i) => (
                            <li key={i}>{e}</li>
                          )
                        )}
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
                        {state.data.prerequisites.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
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
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                  <AddIcon />
                </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const fl = () =>
    state.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
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
                      {state.data.organisation.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {state.data.name}
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
                    {ReactHtmlParser(state.data.description)}
                  </Typography>
                  <br />
                  {state.data.learning_outcomes !== '' && (
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
                        {state.data.learning_outcomes.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </Typography>{' '}
                    </>
                  )}
                  {state.data.requirements !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Who is this course for?
                      </Typography>
                      <Typography
                        style={{ fontSize: '16px', fontWeight: '300' }}
                        variant="body1"
                        gutterBottom
                      >
                        {state.data.requirements}
                      </Typography>{' '}
                    </>
                  )}

                  <br />

                  {state.data.educator !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        <span style={{ fontWeight: '300' }}>
                          {state.data.educator}
                        </span>
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
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                  <AddIcon />
                </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const sl = () =>
    state.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
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
                      {props.location.state.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(state.data.courseData.fields.title)}
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
                  <div style={{ textAlign: 'right' }}>
                    {reviewSection(
                      parseFloat(state.data.courseData.fields.star_ratings),
                      -1
                    )}
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
                    gutterBottom
                  >
                    {ReactHtmlParser(state.data.courseData.highlights.content)}
                  </Typography>

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
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
              </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const swayam = () =>
    state.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
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
                      {props.location.state.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(state.data.title)}
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
                    {ReactHtmlParser(state.data.sections[0], {
                      transform: node => {
                        console.log({ node });
                        if (node.name === 'b') {
                          return (
                            <Typography
                              style={{ fontWeight: '600', fontSize: '22px' }}
                              variant="subtitle2"
                              gutterBottom
                            >
                              {node.children[0].data}{' '}
                            </Typography>
                          );
                        }
                      },
                    })}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Layout
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(state.data.sections[2], {
                      transform: node => {
                        console.log({ node });
                        if (node.name === 'h3') {
                          return null;
                        }
                      },
                    })}
                  </Typography>

                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Certificate
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(state.data.sections[5], {
                      transform: node => {
                        console.log({ node });
                        if (node.name === 'h3') {
                          return null;
                        }
                      },
                    })}
                  </Typography>

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
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
              </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const upGrad = () =>
    state.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
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
                      {state.data.university}
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
                  <div style={{ textAlign: 'right' }}>
                    {reviewSection(
                      undefined,
                      parseInt(state.data.no_of_reviews)
                    )}
                  </div>
                </div>
                <br />
                <div className="cd-cont">
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
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
                    {state.data.short_description}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Whos is this course for?
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {state.data.who_is_this_program_for}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
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
                    {state.data.top_Skills}
                  </Typography>

                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Minimum Eligibility
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {state.data['Minimum Eligibility']}
                  </Typography>

                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Job Opportunities
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {state.data['job_opportunities\n']}
                  </Typography>

                  {/* <Typography
                  style={{ fontWeight: '600', fontSize: '18px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Professor:{' '}
                  {this.state.closestRun.staff.map((obj, index) => (
                    <span key={index} style={{ fontWeight: '300' }}>
                      {obj.given_name}
                    </span>
                  ))}
                </Typography> */}
                  <br />
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '18px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
              </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const udacity = () =>
    state.data && (
      <div
        maxWidth="lg"
        style={{ marginTop: '40px', background: '#FAFAFA' }}
        className="ead-sec"
      >
        <div className="cd-container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} className="bgwhite">
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
                      {props.location.state.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(state.data.title)}
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
                    style={{ fontWeight: '600', fontSize: '18px' }}
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
                    {ReactHtmlParser(state.data.summary)}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Syllabus
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(state.data.syllabus, {
                      transform: node => {
                        if (node.name === 'h1') {
                          return (
                            <Typography
                              style={{ fontWeight: '600', fontSize: '18px' }}
                              variant="subtitle2"
                              gutterBottom
                            >
                              {node.children[0].data}
                            </Typography>
                          );
                        }
                      },
                    })}
                  </Typography>
                  {state.data.instructors !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '18px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor(s):{' '}
                        {state.data.instructors.map((obj, index) => (
                          <span key={index} style={{ fontWeight: '300' }}>
                            {obj.name + ', '}
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
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...state, popUp: !state.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <br />
                  <Grid
                    container
                    style={{ padding: 20, background: '#00000015' }}
                  >
                    <Grid item xs={3}>
                      <Grid item xs={12}>
                        {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
              </Fab> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={9}>
                      <Box style={{ padding: 30 }}>
                        Natus error sit voluptartem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore.
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {courseSummary()}
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const renderSwitch = provider => {
    switch (provider) {
      case 'edX':
        return edX();
      case 'Udemy':
        return udemy();
      case 'FutureLearn':
        return fl();
      case 'SimpliLearn':
        return sl();
      case 'upGrad':
        return upGrad();
      case 'Udacity':
        return udacity();
      case 'Swayam':
        return swayam();
      default:
        return <h1>Coming Soon</h1>;
    }
  };
  console.log('Course Details', state);
  return (
    <>
      <AppBar />
      <HomeModal
        openState={state.popUp}
        handlePopupClose={handlePopupClose}
        course={state.data && state.data.title}
        state={1}
      />
      {state.loading ? (
        <Grid
          align="center"
          style={{ margin: '20px 0', width: '100%', height: '70vh' }}
        >
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        renderSwitch(provider)
      )}
      <Footer />
    </>
  );
};

export default CourseDetails;
