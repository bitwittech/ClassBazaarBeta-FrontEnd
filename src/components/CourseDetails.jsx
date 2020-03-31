import { Container, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import ReactGA from 'react-ga';
import MovieIcon from '@material-ui/icons/Movie';
import AppBar from './AppBar';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Footer from './Footer';
import HomeModal from './HomeModal';
import { Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Logo from '../assets/logo.png';
import MobileTopbar from './MobileTopbar';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Rupee from '../assets/rupee.svg';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarRatings from 'react-star-ratings';
import Store from '../store/Context';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import { addBookmark } from '../actions/ContextActions';
import axios from 'axios';
import formatDate from './../utils/dateUtils';
import getClosestNextRun from './../utils/edxUtils';
import { trackEvent } from 'react-with-analytics/lib/utils';

const formatPrice = price => {
  if (!price || price === null || price === undefined) return 'Free';
  else return Math.round(price);
};

const formatDuration = duration => {
  if (!duration || duration === null || duration === undefined)
    return 'Self Paced';
  else return duration;
};

const CourseDetails = props => {
  const [Gstate, setState] = useState({
    data: null,
    summaryData: null,
    loading: true,
    popUp: false,
    reviews: [],
    q: '',
    rloading: true,
  });
  console.log('PRICE', Gstate);
  const { state, dispatch } = useContext(Store);
  const handleBookmark = (uuid, provider, name) => {
    trackEvent(
      'Bookmarked_details',
      'click',
      `${provider}|${Gstate.data && Gstate.data.title}`
    );
    console.log(uuid, provider);
    if (state.user === null) {
      return dispatch({
        type: 'ALERT',
        payload: {
          varient: 'info',
          message: 'Please login ',
        },
      });
    }
    const userId = state.user.id;
    const courseId = uuid;
    const user = state.user;
    addBookmark(courseId, userId, user, provider, dispatch);
  };

  const isBookmarked = uuid => {
    console.log('isbookmarked', uuid);
    if (state.user === null || state.user.data === undefined) {
      return false;
    }
    const globalBookmarks = state.user.data.bookmarks;
    if (globalBookmarks.find(e => e.id === uuid) === undefined) {
      return false;
    } else {
      return true;
    }
  };

  // const provider = props.location.pathname.split('/')[2];
  // let uuid = props.location.pathname.split('/')[3];
  const uuid = props.match.params.uuid;
  const provider = props.match.params.provider;
  useEffect(() => {
    window.scrollTo(0, 0);
    const getCourseDetails = async () => {
      const token = localStorage.getItem('cbtoken');
      const body = JSON.stringify({
        token: token,
        courseID: uuid,
        provider,
      });
      console.log('TOKEN', token);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      var url = `https://api.classbazaar.in/api/course?uuid=${uuid}&provider=${provider}`;
      // var url = `http://localhost:8080/api/course?uuid=${uuid}&provider=${provider}`;
      console.log(url, uuid);
      const res = await fetch(url);
      const data = await res.json();
      console.log('Course Details', url, data);
      const reviews = await axios.post(
        'https://api.classbazaar.in/api/review/course',
        body,
        config
      );

      if (provider === 'upGrad' || provider === 'FutureLearn') {
        setState({
          ...Gstate,
          data: data.summaryData,
          summaryData: data.summaryData,
          loading: false,
          reviews: reviews.data.data,
          rloading: false,
        });
      } else {
        setState({
          ...Gstate,
          data: data.data,
          summaryData: data.summaryData,
          loading: false,
          reviews: reviews.data.data,
          rloading: false,
        });
      }
    };

    getCourseDetails();
  }, []);

  const reviewSection = (ratingNumber, noOfReviews) => {
    console.log({ ratingNumber, noOfReviews });
    return (
      <>
        {isBookmarked(Gstate.data._id) ? (
          <TurnedInIcon
            onClick={() => handleBookmark(uuid, provider)}
            color="primary"
            className="click-h"
            fontSize="large"
          />
        ) : (
          <TurnedInNotIcon
            onClick={() => handleBookmark(uuid, provider)}
            color="primary"
            fontSize="large"
            className="click-h"
          />
        )}

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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
    setState({ ...Gstate, popUp: false });
  };

  const courseSummary = () =>
    Gstate.summaryData && (
      <>
        <div
          style={{
            background: '#fff',
            padding: '20px',
            paddingLeft: '40px',
          }}
          className="cd-card"
        >
          <Typography
            style={{ fontWeight: '600', fontSize: '22px' }}
            variant="subtitle2"
            color="primary"
            gutterBottom
          >
            At a Glance
          </Typography>
          <div className="d-flex">
            <div style={{ display: 'flex' }}>
              <div>
                {provider === 'Udemy' ? (
                  <MovieIcon color="primary" />
                ) : (
                  <QueryBuilderIcon color="primary" />
                )}
                &nbsp;
              </div>
              <div>{Gstate.summaryData.commitment}</div>
            </div>

            <div style={{ display: 'flex', marginTop: '15px' }}>
              <div>
                <DateRangeIcon color="primary" /> &nbsp;
              </div>
              <div>{` Starts on ${formatDate(
                new Date(Gstate.summaryData.start_date),
                'MMMM d'
              )}`}</div>
            </div>

            <div style={{ display: 'flex', marginTop: '15px' }}>
              <div>
                <img src={Rupee} alt="cb-rupee" /> &nbsp;
              </div>
              <div>
                {provider === 'Swayam'
                  ? 'Free'
                  : Gstate.summaryData.price === '' ||
                    Gstate.summaryData.price === null
                  ? 'Provider subscription required'
                  : Gstate.summaryData.price === 0
                  ? 'Free'
                  : formatPrice(Gstate.summaryData.price).toLocaleString(
                      'en-IN'
                    )}
              </div>
            </div>

            <div class="pr-pad" style={{ display: 'flex', marginTop: '15px' }}>
              <div>
                <ListAltIcon color="primary" /> &nbsp;
              </div>
              <div>{Gstate.summaryData.provider}</div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => {
                  trackEvent(
                    'Enroll Now',
                    'click',
                    `${provider}|${Gstate.data.title}`
                  );
                  window.open(
                    provider === 'Swayam'
                      ? Gstate.summaryData &&
                          Gstate.summaryData.url.replace(
                            'www.swayam.com',
                            'www.swayam.gov.in'
                          )
                      : Gstate.summaryData && Gstate.summaryData.url,
                    '_blank'
                  );
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
        </div>
      </>
    );

  const reviews = () => (
    <>
      {Gstate.rlaoding ? (
        <p>Loading</p>
      ) : Gstate.reviews.length > 0 ? (
        Gstate.reviews.map(data => (
          <Grid
            key={data.course_id}
            container
            style={{
              padding: 20,
              background: '#00000015',
              marginTop: '15px',
            }}
          >
            <Grid item xs={3}>
              <Grid item xs={12}>
                <Box style={{ padding: '0 10px' }}>
                  <img
                    className="review-image"
                    src="https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                    alt="user-image"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Typography color="primary" variant="h6">
                {data.username}
              </Typography>
              <Box
                style={{
                  padding: 30,
                  paddingTop: 5,
                  paddingLeft: 5,
                }}
              >
                {data.review}
              </Box>
            </Grid>
          </Grid>
        ))
      ) : (
        <p>No reviews for this course</p>
      )}
    </>
  );

  const edX = () =>
    Gstate.data && (
      <div maxwidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card">
                <div className="cd-head">
                  <div className="cd-head-o">
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {Gstate.summaryData.title}
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
                    {ReactHtmlParser(Gstate.data.full_description, {
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
                  {Gstate.data.outcome !== '' && (
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
                        {ReactHtmlParser(Gstate.data.outcome, {
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
                  {Gstate.data.prerequisites_raw !== '' ? (
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
                        {ReactHtmlParser(Gstate.data.prerequisites_raw)}
                      </Typography>
                    </>
                  ) : null}
                  <br />

                  {Gstate.data.closestRun !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        {this.Gstate.closestRun.staff.map((obj, index) => (
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
                        setState({ ...Gstate, popUp: !Gstate.popUp });
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
                  {reviews()}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const udemy = () => {
    return (
      Gstate.data && (
        <div maxwidth="lg" className="ead-sec">
          <div className="cd-container">
            <Grid container spacing={3} direction="row-reverse">
              <Grid item xs={12} sm={3}>
                {courseSummary()}
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className="d-card">
                  <div className="cd-head">
                    <div className="cd-head-o">
                      <Typography
                        style={{ fontWeight: '600' }}
                        color="primary"
                        variant="subtitle2"
                        className="u-uni"
                        gutterBottom
                      >
                        {Gstate.summaryData.instructors[0]}
                      </Typography>
                      <Typography variant="h6" className="u-title" gutterBottom>
                        {Gstate.summaryData.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        className="provider u-provider"
                        gutterBottom
                      >
                        via {provider}
                      </Typography>
                    </div>
                    <div style={{ textAlign: 'right' }} className="cd-head-t">
                      {reviewSection(
                        Gstate.data.avg_rating,
                        Gstate.data.num_reviews
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
                      {ReactHtmlParser(Gstate.data.description)}
                    </Typography>
                    <br />
                    {Gstate.data.outcome !== '' && (
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
                          {Gstate.data.what_you_will_learn_data.items.map(
                            (e, i) => (
                              <li key={i}>{e}</li>
                            )
                          )}
                        </Typography>{' '}
                      </>
                    )}
                    {Gstate.data.prerequisites_raw !== '' ? (
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
                          {Gstate.data.prerequisites.map((e, i) => (
                            <li key={i}>{e}</li>
                          ))}
                        </Typography>
                      </>
                    ) : null}
                    <br />
                    {Gstate.data.closestRun !== undefined && (
                      <>
                        <Typography
                          style={{ fontWeight: '600', fontSize: '22px' }}
                          variant="subtitle2"
                          gutterBottom
                        >
                          Professor:{' '}
                          {this.Gstate.closestRun.staff.map((obj, index) => (
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
                          setState({ ...Gstate, popUp: !Gstate.popUp });
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
                    {reviews()}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )
    );
  };

  const fl = () =>
    Gstate.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card">
                <div className="cd-head">
                  <div className="cd-head-o">
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.data.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {Gstate.data.title}
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
                  <div style={{ textAlign: 'right' }} className="cd-head-t">
                    {reviewSection(
                      Gstate.data.avg_rating,
                      Gstate.data.num_reviews
                    )}
                  </div>
                </div>
                <br />
                <div className="cd-cont">
                  {Gstate.data.description && (
                    <>
                      {' '}
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
                        {ReactHtmlParser(Gstate.data.description)}
                      </Typography>{' '}
                    </>
                  )}

                  <br />
                  {Gstate.data.learning_outcomes && (
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
                        {Gstate.data.learning_outcomes.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </Typography>{' '}
                    </>
                  )}
                  {Gstate.data.requirements && (
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
                        {Gstate.data.requirements}
                      </Typography>{' '}
                    </>
                  )}

                  <br />

                  {Gstate.data.educator && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        <span style={{ fontWeight: '300' }}>
                          {Gstate.data.educator}
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
                        setState({ ...Gstate, popUp: !Gstate.popUp });
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
                  {reviews()}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const sl = () =>
    Gstate.data && (
      <div maxwidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card">
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(Gstate.data.courseData.fields.title)}
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
                      parseFloat(Gstate.data.courseData.fields.star_ratings),
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
                    {ReactHtmlParser(Gstate.data.courseData.highlights.content)}
                  </Typography>

                  {Gstate.data.closestRun !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        {this.Gstate.closestRun.staff.map((obj, index) => (
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
                        setState({ ...Gstate, popUp: !Gstate.popUp });
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
                  {reviews()}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const swayam = () =>
    Gstate.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card">
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(Gstate.data.title)}
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
                    {ReactHtmlParser(Gstate.data.sections[0], {
                      transform: node => {
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
                    {ReactHtmlParser(Gstate.data.sections[2], {
                      transform: node => {
                        if (node.name === 'h3') {
                          return null;
                        }
                      },
                    })}
                  </Typography>

                  {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Certificate
                  </Typography> */}
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.sections[5], {
                      transform: (node, index, transform) => {
                        if (node.children && node.children[8]) {
                          node.children = node.children.slice(0, 8);
                          return convertNodeToElement(node, index, transform);
                        }
                      },
                    })}
                  </Typography>

                  {Gstate.data.closestRun !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        {this.Gstate.closestRun.staff.map((obj, index) => (
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
                        setState({ ...Gstate, popUp: !Gstate.popUp });
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
                  {reviews()}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const upGrad = () =>
    Gstate.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card">
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.data.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {Gstate.data.title}
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
                      parseInt(Gstate.data.no_of_reviews)
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
                    {Gstate.data.short_description}
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
                    {Gstate.data.who_is_this_program_for}
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
                    {Gstate.data.top_Skills}
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
                    {Gstate.data['Minimum Eligibility']}
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
                    {Gstate.data['job_opportunities\n']}
                  </Typography>

                  {/* <Typography
                  style={{ fontWeight: '600', fontSize: '18px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Professor:{' '}
                  {this.Gstate.closestRun.staff.map((obj, index) => (
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
                        setState({ ...Gstate, popUp: !Gstate.popUp });
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
                  {reviews()}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const udacity = () =>
    Gstate.data && (
      <div
        maxWidth="lg"
        style={{ marginTop: '40px', background: '#FAFAFA' }}
        className="ead-sec"
      >
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9} className="bgwhite">
              <div className="d-card">
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(Gstate.data.title)}
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
                    {ReactHtmlParser(Gstate.data.summary)}
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
                    {ReactHtmlParser(Gstate.data.syllabus, {
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
                  {Gstate.data.instructors !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '18px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor(s):{' '}
                        {Gstate.data.instructors.map((obj, index) => (
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
                        setState({ ...Gstate, popUp: !Gstate.popUp });
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
                  {reviews()}
                </div>
              </div>
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

  const addReviewToCurrentState = data => {
    console.log('HIT HERE', data);
    setState({
      ...Gstate,
      reviews: [data, ...Gstate.reviews],
    });
  };

  const searchChange = e => {
    setState({
      ...Gstate,
      q: e.target.value,
    });
  };
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      trackEvent('search', 'onSearch', 'Search_homepage');
      ReactGA.ga('send', 'pageview', `/homepage?q=${Gstate.q}`);
      props.history.push({
        pathname: '/listing',
        state: {
          query: Gstate.q,
        },
      });
      e.preventDefault();
    }
  };

  return (
    <>
      <AppBar
        home={true}
        noHome={true}
        isSearchIncluded={true}
        onChange={searchChange}
        onKeyPress={onKeyPress}
      />
      <MobileTopbar onlySearch={true} />
      <HomeModal
        openState={Gstate.popUp}
        uuid={uuid}
        provider={provider}
        handlePopupClose={handlePopupClose}
        course={Gstate.data && Gstate.data.title}
        Mstate={1}
        addReviewToCurrentState={addReviewToCurrentState}
      />
      {Gstate.loading ? (
        <Grid
          align="center"
          style={{
            margin: '20px 0',
            width: '100%',
            height: '70vh',
            marginTop: '100px',
          }}
        >
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        renderSwitch(provider)
      )}
      <div className="footer" style={{ background: '#FAFAFA' }}>
        <div style={{ marginTop: '20px' }}>
          <img className="footer-logo" src={Logo} alt="classbazarLogo" />
        </div>
        <div className="footer-links">
          <div>
            <p>
              <Link
                onClick={() => {
                  trackEvent('About Us', 'click', 'footer');
                }}
                to="/about"
              >
                About Us
              </Link>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <Link to="/contact">Contact Us</Link>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </p>
          </div>
        </div>
        <p class="footer-text"> Email: info@classbazaar.com </p>
        <p class="footer-text tsm">
          © Copyright 2019 <strong>Class Bazaar</strong>, All Right Reserved
        </p>
      </div>
    </>
  );
};

export default CourseDetails;
