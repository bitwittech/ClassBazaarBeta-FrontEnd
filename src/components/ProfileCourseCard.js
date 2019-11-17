import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

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
const ProfileCourseCard = props => {
  return (
    <>
      <div className="c-card">
        <div className="coursecard-header">
          <div>
            <Typography
              color="primary"
              style={{ fontWeight: '600' }}
              variant="subtitle1"
              gutterBottom
            >
              {props.university}
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
          {props.courseName}
        </Typography>
        <Typography
          style={{ padding: '0px 15px 0px 15px' }}
          variant="caption"
          display="block"
          gutterBottom
        >
          {props.provider}
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
              <Grid item sm={3}>
                <WatchLaterIcon
                  fontSize="small"
                  className="mb"
                  color="primary"
                />{' '}
                1 month
              </Grid>
              <Grid item sm={3}>
                <CalendarIcon fontSize="small" className="mb" color="primary" />{' '}
                Flexible
              </Grid>
              <Grid item sm={3}>
                <MoneyIcon fontSize="small" className="mb" color="primary" />
                Subscriptions
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCourseCard;
