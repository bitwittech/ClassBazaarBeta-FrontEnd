import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const CourseCard = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.university}
        </Typography>
        <Typography component="p">
          {props.courseName}
        </Typography>
        <Typography component="p">
          via {props.provider}
        </Typography>
        <div>
            <StarRatings
                rating={props.rating}
                starRatedColor="#f1bd50"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="1px"
            />
            <Typography component="p">
                {props.rating}
            </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default CourseCard;