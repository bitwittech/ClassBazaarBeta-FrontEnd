import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import Typography from '@material-ui/core/Typography';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import formatDate from './../utils/dateUtils';
import { withRouter } from 'react-router-dom';
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
  console.log(data);
  return (
    <>
      <div
        className="c-card"
        onClick={() =>
          history.push({
            pathname: `/coursedetails/${data.provider}/${data.uuid}`,
            state: {
              uuid: data.uuid,
              provider: data.provider,
              ...data,
            },
          })
        }
      >
        <div className="coursecard-header">
          <div>
            <Typography
              color="primary"
              style={{ fontWeight: '600' }}
              variant="subtitle1"
              gutterBottom
            >
              {data.university}
            </Typography>
          </div>
          <div>
            <TurnedInNotIcon color="primary" />
          </div>
        </div>
        <Typography
          variant="subtitle2"
          style={{
            color: '#3C3C3C',
            fontWeight: '600',
            padding: '0px 15px 0px 15px',
          }}
          gutterBottom
        >
          {data.courseName}
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
                <MoneyIcon fontSize="small" className="mb" color="primary" />
                {formatPrice(data.price)}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
});

export default ProfileCourseCard;
