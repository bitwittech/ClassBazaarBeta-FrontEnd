import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarIcon from '@material-ui/icons/CalendarToday';
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
const ProfileCourseCard = () => {
  return (
    <>
      <Paper style={{ padding: '15px' }}>
        <Typography variant="subtitle1" gutterBottom>
          University Name
        </Typography>
        <Typography variant="h6" gutterBottom>
          Introduction to Computer Science : CS101
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          via edX
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          aliquam vitae ipsum sit amet egestas. Sed molestie dui id diam tempor,
          vel tristique turpis ullamcorper. In eget fringilla diam. Ut placerat
          justo eget tempor aliquam. Etiam bibendum in massa vehicula sagittis.
          Proin varius nisi mauris, id semper nulla rhoncus at.
        </Typography>
        <br />
        <div>
          <div className={styles.root}>
            <Grid container spacing={10}>
              <Grid item xs={3}>
                <WatchLaterIcon /> 1 month
              </Grid>
              <Grid item xs={3}>
                <CalendarIcon /> Flexible
              </Grid>
              <Grid item xs={3}>
                <MoneyIcon /> Subscriptions
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
      <br />
    </>
  );
};

export default ProfileCourseCard;
