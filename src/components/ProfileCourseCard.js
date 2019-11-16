import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import React from 'react';
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
const ProfileCourseCard = withRouter(({ history, ...data }) => {
  return (
    <>
      <Paper
        style={{ padding: '15px' }}
        onClick={() =>
          history.push({
            pathname: data.routingURL,
            state: {
              uuid: data.props.uuid,
              provider: data.props.provider,
            },
          })
        }
      >
        <Typography
          color="primary"
          style={{ fontWeight: '600' }}
          variant="subtitle1"
          gutterBottom
        >
          {data.props.university}
        </Typography>
        <Typography
          variant="h5"
          style={{ color: '#3C3C3C', fontWeight: '500' }}
          gutterBottom
        >
          {data.props.courseName}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          via {data.props.provider}
        </Typography>
        <br />
        <div>
          <div className={styles.root}>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <WatchLaterIcon className="mb" color="primary" />{' '}
                {formatDate(new Date(data.props.startingOn), 'MMMM d, yyyy')}{' '}
              </Grid>
              <Grid item sm={3}>
                <CalendarIcon className="mb" color="primary" />{' '}
                {data.props.duration}
              </Grid>
              <Grid item sm={3}>
                <MoneyIcon className="mb" color="primary" />
                {data.props.price}
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
      <br />
    </>
  );
});

const CourseCard = props => {
  return <ProfileCourseCard props={props} routingURL={'/course'} />;
};

export default CourseCard;
