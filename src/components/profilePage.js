import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactHtmlParser from 'react-html-parser';
import getClosestNextRun from './../utils/edxUtils';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ProviderIcon from '@material-ui/icons/Assignment';
import PlusIcon from '@material-ui/icons/Add';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { titleCase } from './../utils/utils';
import formatDate from './../utils/dateUtils';
import Button from '@material-ui/core/Button';
import TopAppBar from './appBar';
import Fab from '@material-ui/core/Fab';

import CourseCard from './courseCard';

const styles = {
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

const perPage = 10;

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const page = 0;
    const range = JSON.stringify([page * perPage, (page + 1) * perPage]);
    const query = '';
    let parsedFilter = '';
    var url = `http://167.71.231.7:8080/api/courses/?range=${range}&q=${query}&filter=${parsedFilter}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json.data, total: json.total });
      });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={3} style={styles.profile}>
          <img width={100} height={100} />
          <h2>Name Surname</h2>
          <h4>Phone Number</h4>
          <h4> Email Address</h4>
          <h4> Change Password</h4>
        </Grid>
        <Grid item xs={8}>
          <h3>Bookmarked Courses</h3>
          <Grid style={styles.bookmarked}>
            {this.state.data.length > 0 &&
              this.state.data.map((obj, index) => {
                return (
                  <CourseCard
                    key={obj.title}
                    isInstructor={true}
                    university={obj.university}
                    courseName={obj.title}
                    provider={obj.provider}
                    duration={obj.commitment}
                    startingOn={obj.start_date}
                    price={obj.price}
                    rating={obj.rating}
                    uuid={obj.uuid}
                  ></CourseCard>
                );
              })}
          </Grid>
          <h3>Reviews</h3>
          <Grid style={styles.reviews}></Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    );
  }
}

ProfilePage.propTypes = {};

export default ProfilePage;
