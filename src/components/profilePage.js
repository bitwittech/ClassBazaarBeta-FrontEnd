import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactHtmlParser from 'react-html-parser';
import getClosestNextRun from './../utils/edxUtils';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import CourseCard from './courseCard';
import ProviderIcon from '@material-ui/icons/Assignment';
import PlusIcon from '@material-ui/icons/Add';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { titleCase } from './../utils/utils';
import formatDate from './../utils/dateUtils';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ProfileCourseCard from './ProfileCourseCard';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TopAppBar from './appBar';
import Fab from '@material-ui/core/Fab';

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

const perPage = 10;

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      start: 0,
      end: perPage,
      perPage: perPage,
      filterValue: 'all',
      q: '',
      filter: '',
      isStateUpdatedFromProp: false,
      subjects: 'all',
      providers: 'all',
      fee: 'all',
    };
  }
  updateData() {
    const page = this.state.page;
    const query = this.state.q;
    const filter = this.state.filterValue;
    let parsedFilter = '';
    if (filter === 'free') parsedFilter = 'price:free';
    if (filter === 'flexible') parsedFilter = 'start:flexible';
    if (filter === 'paid') parsedFilter = 'certificates';
    const range = JSON.stringify([
      page * this.state.perPage,
      (page + 1) * this.state.perPage,
    ]);
    // var url = `http://localhost:8080/api/courses/?range=${range}&q=${query}&filter=${parsedFilter}&subjects=${this.state.subjects}&provider=${this.state.providers}`;
    var url = `http://167.71.231.7:8080/api/courses/?range=${range}&q=${query}&filter=${parsedFilter}&subjects=${this.state.subjects}&provider=${this.state.providers}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json.data, total: json.total });
      });
  }
  componentDidMount() {
    console.log(this.state, this.props);
    const query =
      this.props.location.state !== undefined
        ? this.props.location.state.query
        : '';
    if (!this.state.isStateUpdatedFromProp) {
      this.setState({ q: query, isStateUpdatedFromProp: true }, () => {
        this.updateData();
      });
    } else {
      this.updateData();
    }
  }

  render() {
    console.log(this.state);
    return (
      <>
        <TopAppBar />

        <div className="background">
          <br />
          <br />
          <Container maxWidth="lg">
            <div className={styles.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={styles.paper}>
                    <Container maxWidth="lg">
                      <div className={styles.grid}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            container
                            align-center
                            justify="center"
                            alignItems="center"
                            xs={12}
                            md={12}
                          >
                            <div>
                              <img
                                src="https://via.placeholder.com/150"
                                alt="profile-img"
                                className="profile-img"
                              />
                            </div>
                            <div>
                              <Typography
                                align="center"
                                variant="h6"
                                gutterBottom
                                className="profile-subtext"
                              >
                                Clayton Allen
                              </Typography>
                              <Typography
                                align="center"
                                variant="subtitle2"
                                gutterBottom
                              >
                                Los Angeles, California
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                              Phone No
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              +333 245 9632
                            </Typography>
                            <Divider variant="left" />
                            <br />
                            <Typography variant="body1" gutterBottom>
                              Email ID{' '}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              dorothy.daniel@domain.com
                            </Typography>
                            <Divider variant="left" />
                            <br />
                            <br />
                            <Typography variant="body2" gutterBottom>
                              116 Annabell Rapid Apt. 654
                            </Typography>
                            <Divider variant="left" />
                            <br />
                            <br />
                            <Typography variant="body1" gutterBottom>
                              Settings{' '}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Change Password
                            </Typography>
                            <Divider variant="left" />
                            <br />
                          </Grid>
                        </Grid>
                      </div>
                    </Container>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Container maxWidth="md">
                    <Typography
                      variant="h4"
                      style={{ color: '#3E3E3E' }}
                      gutterBottom
                    >
                      Bookmarked Courses
                    </Typography>
                    <Divider />
                    {/* {this.state.data.length > 0 &&
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
                      })} */}
                    <br />
                    <ProfileCourseCard />
                    <br />
                    <Typography
                      variant="h4"
                      style={{ color: '#3E3E3E' }}
                      gutterBottom
                    >
                      Reviews
                    </Typography>
                    <br />
                    <Paper>
                      <div className="review-util">
                        <Typography
                          variant="h5"
                          style={{ color: '#9B9B9B' }}
                          gutterBottom
                          align="center"
                        >
                          You’ve not written any reviews yet
                        </Typography>
                      </div>
                    </Paper>
                  </Container>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

const ProfileSidebar = () => (
  <div>
    <h1>hey</h1>
  </div>
);

ProfilePage.propTypes = {};

export default ProfilePage;
