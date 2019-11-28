import Box from '@material-ui/core/Box';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
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
  return (
    <>
      <Paper
        style={{ padding: '15px', margin: '20px' }}
        onClick={() =>
          history.push({
            pathname: data.routingURL,
            state: {
              uuid: data.props.uuid,
              provider: data.props.provider,
              ...data.props,
            },
          })
        }
      >
        <Typography
          variant="subtitle2"
          style={{
            fontWeight: '600',
            padding: '0px 15px 0px 15px',
            color: '#FFA502',
          }}
          gutterBottom
        >
          {data.props.university}
        </Typography>
        <Typography
          style={{ padding: '0px 15px 0px 15px' }}
          variant="caption"
          display="block"
          gutterBottom
        >
          <Box fontSize="0.95rem" fontWeight="600">
            {data.props.courseName}
          </Box>
        </Typography>
        <Typography
          variant="caption"
          display="block"
          style={{ padding: '0px 15px 0px 15px', color: '#696969' }}
          gutterBottom
        >
          <Box fontStyle="oblique">via {data.props.provider}</Box>
        </Typography>
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
                <WatchLaterIcon className="mb" color="primary" />{' '}
                {formatDuration(data.props.duration)}
              </Grid>
              <Grid item sm={4}>
                <CalendarIcon className="mb" color="primary" />{' '}
                {data.props.startingOn == null
                  ? 'NA'
                  : formatDate(
                      new Date(data.props.startingOn),
                      'MMMM d, yyyy'
                    )}{' '}
              </Grid>
              <Grid item sm={4}>
                <MoneyIcon className="mb" color="primary" />
                {formatPrice(data.props.price)}
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
    </>
  );
});

const CourseCard = props => {
  return <ProfileCourseCard props={props} routingURL={'/course'} />;
};

export default CourseCard;
