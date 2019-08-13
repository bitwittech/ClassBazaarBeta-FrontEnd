import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import MoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  gridRoot: {
    padding: theme.spacing(1, 1),
  },
}));

const CourseCard = props => {
  const classes = useStyles();
  const titleCase = str => {
    return str
      .replace(/[a-z]/i, function(letter) {
        return letter.toUpperCase();
      })
      .trim();
  };

  return (
    <Grid container className={classes.gridRoot} spacing={0}>
      <Grid item xs={1}></Grid>
      <Grid item xs={7}>
        <Paper className={classes.root}>
          <Grid container>
            <Grid xs={7}>
              <Typography variant="h5" component="h3">
                {props.university}
              </Typography>
              <Typography component="p">{props.courseName}</Typography>
              <Typography component="p">via {props.provider}</Typography>
              <div>
                <StarRatings
                  rating={props.rating}
                  starRatedColor="#f1bd50"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1px"
                />
                <Typography component="p">{props.rating}</Typography>
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
                  <Typography spacing={1}>
                    {titleCase(props.duration)}
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
                  <Typography>{titleCase(props.startingOn)}</Typography>
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
                  <Typography>{titleCase(props.price)}</Typography>
                </div>
              </Grid>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CourseCard;
