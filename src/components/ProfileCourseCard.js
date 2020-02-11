import React, { useContext } from 'react';

import { ALERT } from '../store/Types';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import ReactHtmlParser from 'react-html-parser';
import Store from '../store/Context';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import Typography from '@material-ui/core/Typography';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { addBookmark } from '../actions/ContextActions';
import formatDate from './../utils/dateUtils';
import { withRouter } from 'react-router-dom';
import { trackEvent } from 'react-with-analytics/lib/utils';

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

const formatPrice = price => {
  if (!price || price === null || price === undefined) return 'Free';
  else return price;
};

const formatDuration = duration => {
  if (!duration || duration === null || duration === undefined)
    return 'Self Paced';
  else return duration;
};

const ProfileCourseCard = withRouter(({ history, ...data }) => {
  console.log('DATAAA', data);
  const { state, dispatch } = useContext(Store);

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

  const isBookmarked = uuid => {
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

  return (
    <>
      <div className="c-card">
        <div className="coursecard-header">
          <div>
            <Typography
              color="primary"
              style={{ fontWeight: '600' }}
              variant="subtitle2"
              className="hover"
              onClick={() => {
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
              }}
              gutterBottom
            >
              {data.university}
            </Typography>
          </div>
          <div>
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
          </div>
        </div>
        <Typography
          variant="subtitle1"
          style={{
            color: '#3C3C3C',
            fontWeight: '600',
            padding: '0px 15px 0px 15px',
          }}
          className="hover"
          onClick={() =>
            history.push({
              pathname: `/coursedetails/${data.provider}/${data.uuid.replace(
                /[`~!",.<>\{\}\[\]\\\/]/gi,
                ''
              )}`,
              state: {
                uuid: data.uuid.replace(/[`~!",.<>\{\}\[\]\\\/]/gi, ''),
                provider: data.provider,
                ...data,
              },
            })
          }
          gutterBottom
        >
          {data.provider !== 'SimpliLearn'
            ? data.courseName
            : ReactHtmlParser(data.courseName)}
        </Typography>
        <Typography
          style={{ padding: '0px 15px 0px 15px', color: '#968484' }}
          variant="caption"
          display="block"
          gutterBottom
        >
          {data.provider}
        </Typography>
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
        <div>
          <div
            className={styles.root}
            style={{
              background: '#F4F2F2',
              padding: '0px 15px 0px 15px',
              borderRadius: '0px 0px 4px 4px',
            }}
          >
            <Grid container align="left" spacing={2}>
              <Grid item sm={4}>
                <WatchLaterIcon
                  fontSize="small"
                  className="mb"
                  color="primary"
                />{' '}
                {formatDuration(data.duration)}
              </Grid>
              <Grid item sm={4}>
                <CalendarIcon fontSize="small" className="mb" color="primary" />{' '}
                {data.startingOn == null
                  ? 'NA'
                  : formatDate(new Date(data.startingOn), 'MMMM d, yyyy')}{' '}
              </Grid>
              <Grid item sm={4}>
                <i class="fas fa-rupee-sign" style={{ color: '#FFA502' }} />
                {` ${formatPrice(data.price)}`}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
});

export default ProfileCourseCard;
