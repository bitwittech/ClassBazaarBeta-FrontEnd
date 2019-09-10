import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  gridRoot: {
    padding: theme.spacing(1, 1),
  },
}));

const titleCase = str => {
  if (str === null) return '';
  return str
    .replace(/[a-z]/i, function(letter) {
      return letter.toUpperCase();
    })
    .trim();
};

const Card = withRouter(({ history, ...data }) => {
  return (
    <Grid
      container
      className={data.classes.gridRoot}
      spacing={0}
      onClick={() =>
        history.push({
          pathname: data.routingURL,
          state: { uuid: data.props.uuid, provider: data.props.provider },
        })
      }
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={7}>
        <Paper className={data.classes.root}>
          <Grid container>
            <Grid xs={7}>
              <Typography
                variant="subtitle1"
                component="h6"
                color="textSecondary"
              >
                {data.props.university}
              </Typography>
              <Typography variant="body1">
                <Box fontWeight="fontWeightBold">{data.props.courseName} </Box>
              </Typography>
              <Typography component="p" color="textSecondary">
                <Box fontStyle="oblique">via {data.props.provider}</Box>
              </Typography>
              <div>
                <Typography component="p">{data.props.rating}</Typography>
              </div>
            </Grid>
            <Grid xs={4} container spacing={2}>
              <Grid xs={12}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <WatchLaterIcon />
                  <Typography spacing={1} variant="body2" color="textSecondary">
                    {titleCase(data.props.duration)}
                  </Typography>
                </div>
              </Grid>
              <Grid xs={12}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CalendarIcon />
                  <Typography variant="body2" color="textSecondary">
                    <Box fontWeight="fontWeightLight">
                      {' '}
                      {titleCase(data.props.startingOn)}{' '}
                    </Box>
                  </Typography>
                </div>
              </Grid>
              <Grid xs={12}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <MoneyIcon />
                  <Typography variant="body2" color="textSecondary">
                    {titleCase(data.props.price)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
});

const CourseCard = props => {
  const classes = useStyles();

  return <Card classes={classes} props={props} routingURL={'/course'} />;
};

export default CourseCard;
