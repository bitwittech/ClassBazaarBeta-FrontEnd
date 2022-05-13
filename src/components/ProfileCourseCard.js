import React, { useState, useContext } from 'react';

import { ALERT } from '../store/Types';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import ReactHtmlParser from 'react-html-parser';
import Store from '../store/Context';
import MovieIcon from '@material-ui/icons/Movie';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import Typography from '@material-ui/core/Typography';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { addBookmark } from '../actions/ContextActions';
import formatDate from './../utils/dateUtils';
import { trackEvent } from 'react-with-analytics/lib/utils';
import { withRouter } from 'react-router-dom';
import Converter from './converter.js';
import { Pre_LOG_Box } from '../store/Types';
import axios from 'axios';

const styles = {
  grid: {
    flexGrow: 1,
  },
  paper: {
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  },
  bookmarked: {
    maxHeight: '500px',
    minHeight: '70px',
    overflow: 'auto',
    border: '1px solid #c0c3c6',
  },
  reviews: {
    minHeight: '70px',
    border: '1px solid #c0c3c6',
  },
  profile: {
    maxHeight: '500px',
    backgroundColor: 'aliceblue',
  },
};

const formatDuration = (duration) => {
  if (!duration || duration === null || duration === undefined)
    return 'Self Paced';
  else return duration;
};

const ProfileCourseCard = withRouter(({ history, ...data }) => {
  const { state, dispatch } = useContext(Store);
  const { isAuth } = state;
  const [price, setPrice] = useState(null);

  const handleBookmark = (uuid, provider, name) => {
    trackEvent('Bookmarked_lisitng', 'click', `${provider}|${name}`);
    if (state.user === null) {
      localStorage.setItem('GA-track', true);
      return dispatch({
        type: ALERT,
        payload: {
          varient: 'info',
          message: 'Please login ',
        },
      });
    }
    const userId = state.user.id;
    const courseId = uuid;
    const user = state.user;
    addBookmark(courseId, userId, user, provider, dispatch, data.from);
  };

  // Append by yashwant sahu

  const OpenLogin = () => {
    // sessionStorage.setItem('ShowBox',true);

    if (isAuth === false) {
      return dispatch({
        type: Pre_LOG_Box,
        payload: {
          state: 1,
          open: true,
        },
      });
    }
  };
  // turn off by Yashwant Sahu
  // const isBookmarked = uuid => {
  //   if (state.user === null || state.user.data === undefined) {
  //     return false;
  //   }
  //   // const globalBookmarks = state.user.data.bookmarks;
  //   // if (globalBookmarks.find(e => e.id === uuid) === undefined) {
  //   //   return false;
  //   // } else {
  //     return false;
  //   // }
  // };
  const officialURL = 'https://api.classbazaar.com/';
  const localURL = 'http://0.0.0.0:8080/';

  const handleUnload = async (ev) => {
    const user_email = localStorage.getItem('user') || 'User Not Loged In';

    console.log('Card_track');

    await axios.get(
      `${officialURL}api/cardTrack?user_email=${user_email}&card_title=${data.courseName}&card_uuid=${data.uuid}&provider=${data.provider}`
    );
  };

  return (
    <>
      <div
        className="c-card click-h"
        onClick={() => {
          handleUnload();
          OpenLogin();
          if (isAuth === true) {
            if (data.from === 'profile') {
              trackEvent('Profile Action', 'click', 'Bookmarked_card_profile');
            }
            trackEvent(
              'Course Card clicked',
              'click',
              `${data.povider}|${data.courseName}`
            );
            history.push({
              pathname: `/coursedetails/${data.provider}/${data.uuid}`,
              state: {
                uuid: data.uuid,
                provider: data.provider,
                ...data,
              },
            });
          }
        }}
      >
        <div className="c-card-inner">
          <div className="coursecard-header">
            {/* <div>
              {isBookmarked(data.uuid) ? (
                <TurnedInIcon
                  className="click-h"
                  onClick={() =>
                    handleBookmark(data.uuid, data.provider, data.courseName)
                  }
                  color="primary"
                />
              ) : (
                <TurnedInNotIcon
                  className="click-h"
                  onClick={() =>
                    handleBookmark(data.uuid, data.provider, data.courseName)
                  }
                  color="primary"
                />
              )}
            </div> */}
          </div>
          <div style={{ padding: '0 15px' }}>
            <Typography
              color="primary"
              style={{ fontWeight: '600', color: '#777777' }}
              variant="subtitle2"
              className="hover"
              onClick={() => {
                if (isAuth === true) {
                  if (data.from === 'profile') {
                    trackEvent(
                      'Profile Action',
                      'click',
                      'Bookmarked_card_profile'
                    );
                  }
                  trackEvent(
                    'Course Card clicked',
                    'click',
                    `${data.povider}|${data.courseName}`
                  );
                  history.push({
                    pathname: `/coursedetails/${data.provider}/${data.uuid}`,
                    state: {
                      uuid: data.uuid,
                      provider: data.provider,
                      ...data,
                    },
                  });
                }
              }}
              gutterBottom
            >
              {data.university}
            </Typography>
          </div>
          <div className={'expandable'}>
            <Typography
              variant="subtitle1"
              style={{
                color: '#3C3C3C',
                fontSize: '20px',
                fontWeight: '600',
                padding: '0px 15px 0px 15px',
              }}
              className="hover"
              onClick={() => {
                if (isAuth === true) {
                  history.push({
                    pathname: `/coursedetails/${
                      data.provider
                    }/${data.uuid.replace(/[`~!",.<>\{\}\[\]\\\/]/gi, '')}`,
                    state: {
                      uuid: data.uuid.replace(/[`~!",.<>\{\}\[\]\\\/]/gi, ''),
                      provider: data.provider,
                      ...data,
                    },
                  });
                }
              }}
              gutterBottom
            >
              {data.provider !== 'SimpliLearn'
                ? data.courseName
                : ReactHtmlParser(data.courseName)}
            </Typography>
          </div>
          <div className={'provider-wrapper'}>
            <Typography
              className={'provider-text'}
              variant="caption"
              display="block"
              gutterBottom
            >
              {data.provider}
            </Typography>
          </div>
          {/* <Typography
          style={{ padding: '15px 15px 0px 15px' }}
          variant="body2"
          gutterBottom
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          aliquam vitae ipsum sit amet egestas. Sed molestie dui id diam tempor,
          vel tristique turpis ullamcorper. In eget fringilla diam. Ut placerat
          justo eget tempor aliquam. Etiam bibendum in massa vehicula sagittis.
          Proin varius nisi mauris, id semper nulla rhoncus at.
        </Typography> */}
          <br />
          <div className={'bottom-section'}>
            <div className={styles.root}>
              <Grid container align="left" spacing={1}>
                <Grid item sm={4} style={{ textAlign: 'center' }}>
                  {data.provider === 'Udemy' ? (
                    <MovieIcon
                      fontSize="small"
                      className="mb"
                      color="secondary"
                    />
                  ) : (
                    <WatchLaterIcon
                      fontSize="small"
                      className="mb"
                      color="secondary"
                    />
                  )}

                  <span className="fs-m" style={{ fontSize: '12px' }}>
                    {' '}
                    {formatDuration(data.duration)}
                  </span>
                </Grid>
                <Grid item sm={4} style={{ textAlign: 'center' }}>
                  <CalendarIcon
                    fontSize="small"
                    className="mb"
                    color="secondary"
                  />{' '}
                  <span className="fs-m" style={{ fontSize: '14px' }}>
                    {' '}
                    {data.startingOn == null
                      ? 'Flexible'
                      : formatDate(new Date(data.startingOn), 'MMMM d, yyyy')}
                  </span>
                </Grid>
                <Grid item sm={4} style={{ textAlign: 'center' }}>
                  {/* // modifies by Yashwant sahu */}
                  <i
                    className="fas fa-rupee-sign"
                    style={{ color: '#086065' }}
                  />
                  &nbsp;
                  <span className="fs-m" style={{ fontSize: '14px' }}>
                    {data.price === null ? (
                      `Free`
                    ) : (
                      <Converter
                        price={data.price}
                        currency={data.price_currency}
                      />
                    )}
                  </span>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ProfileCourseCard;
