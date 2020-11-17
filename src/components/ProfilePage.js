import React, { Component } from 'react';
import MobileTopBar from './MobileTopbar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import { Container } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Alert from './Alert';
import Footer from './Footer';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';
import PlusIcon from '@material-ui/icons/Add';
import ProfileCourseCard from './ProfileCourseCard';
import ProviderIcon from '@material-ui/icons/Assignment';
import ReactHtmlParser from 'react-html-parser';
import { CircularProgress } from '@material-ui/core';
import TopAppBar from './AppBar';
import Typography from '@material-ui/core/Typography';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import formatDate from '../utils/dateUtils';
import getClosestNextRun from '../utils/edxUtils';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { store } from '../App';
import AlertSnackbar from './AlertSnackbar';
import { titleCase } from '../utils/utils';
import { Redirect, withRouter } from 'react-router';
import SaveIcon from '@material-ui/icons/Save';
import {
  updateUser,
  updatePassword,
  updateLocation,
} from '../actions/ContextActions';
import { Link } from 'react-router-dom';

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
      user: {},
      loading: true,
      phoneB: false,
      emailB: false,
      changePasswordB: false,
      locationB: false,
      location: '',
      email: '',
      phone: '',
      newPassword: '',
      curPassword: '',
      msg: null,
      rLoading: true,
      userImage: '',
      reviews: [],
    };
    this.updateData = this.updateData.bind(this);
  }
  updateData() {
    store.getItem('user').then(user => {
      if (user == null) {
        return this.props.history.push('/');
      }
      this.setState({
        user,
        phone: user.mobilePhone,
        email: user.email,
        userImage:
          user.data && user.data.image
            ? user.data && user.data.image
            : 'https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
        location:
          user.data && user.data.location
            ? user.data && user.data.location
            : 'Add Location',
      });

      if (user.data === undefined) {
        return this.setState({ data: [], reviews: [], loading: false });
      }
      if (!user.data.bookmarks) {
        return this.setState({ data: [], loading: false });
      }

      const data = user.data.bookmarks;
      console.log(data);
      // var url = `http://localhost:8080/api/bookmarks/?data=${JSON.stringify(
      //   data
      // )}`;
      var url = `https://api.classbazaar.com/api/bookmarks/?data=${JSON.stringify(
        data
      )}`;

      return fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log('BOOKMARK DATA', json);
          this.setState({ data: json.data, loading: false });
        });
    });
  }

  fetchReviews = async () => {
    try {
      const token = localStorage.getItem('cbtoken');
      const body = JSON.stringify({
        token: token,
      });
      console.log('TOKEN', token);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        'https://api.classbazaar.com/api/review/user',
        body,
        config
      );

      this.setState({ reviews: res.data.data, rloading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.updateData();
    this.fetchReviews();
  }

  resetMsg = () => {
    this.setState({ msg: null });
  };

  render() {
    if (this.state.user == null) return <Redirect to="/" />;
    console.log('STATE PROFILE', this.state);
    return (
      <>
        <TopAppBar noHome={true} />
        {this.state.msg && (
          <AlertSnackbar resetMsg={this.resetMsg} data={this.state.msg} />
        )}
        <MobileTopBar title="My Profile" onlySearch={false} />
        <div className="background">
          <Container maxWidth="lg" className="top-push">
            <div className={styles.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={styles.paper}>
                    <Container maxWidth="lg" style={{ padding: '0 25px' }}>
                      <div className={styles.grid}>
                        <Grid container spacing={3}>
                          <Grid
                            item
                            container
                            align-center
                            justify="center"
                            alignItems="center"
                          >
                            <img
                              src={this.state.userImage}
                              alt="profile-img"
                              className="profile-img"
                            />
                          </Grid>
                          <Grid
                            item
                            container
                            align-center
                            justify="center"
                            alignItems="center"
                            style={{ paddingBottom: '0' }}
                          >
                            <Typography
                              align="center"
                              variant="h6"
                              gutterBottom
                              className="profile-subtext"
                              style={{
                                color: '#274E5D',
                                fontWeight: '600',
                              }}
                            >
                              {this.state.user.username}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            align-center
                            justify="center"
                            alignItems="center"
                            xs={12}
                            md={12}
                            style={{ paddingTop: '0' }}
                          >
                            <Grid container spacing={3}>
                              <Grid item xs={2}></Grid>
                              <Grid item xs={8} style={{ paddingLeft: '0' }}>
                                {!this.state.locationB ? (
                                  <Typography
                                    align="center"
                                    variant="subtitle2"
                                    gutterBottom
                                  >
                                    {this.state.location}
                                  </Typography>
                                ) : (
                                  <input
                                    value={this.state.location}
                                    onChange={e =>
                                      this.setState({
                                        location: e.target.value,
                                      })
                                    }
                                    style={{
                                      background: 'white',
                                      border: '1px solid rgb(231, 231, 231)',
                                      width: '100%',
                                    }}
                                    name="name"
                                    type="text"
                                    className="text-field"
                                    placeholder="Your Location"
                                  />
                                )}
                              </Grid>

                              <Grid item xs={2}>
                                {!this.state.locationB ? (
                                  <CreateIcon
                                    className="click-h"
                                    onClick={() =>
                                      this.setState({ locationB: true })
                                    }
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                ) : (
                                  <SaveIcon
                                    className="click-h"
                                    onClick={async () => {
                                      try {
                                        const res = await updateLocation(
                                          this.state.user.id,
                                          this.state.location,
                                          this.state.user
                                        );
                                        this.setState({
                                          locationB: false,
                                          msg: res,
                                        });
                                      } catch {
                                        this.setState({
                                          locationB: false,
                                          msg: {
                                            varient: 'error',
                                            message:
                                              'Unable to change location',
                                          },
                                        });
                                      }
                                    }}
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              style={{ color: '#274E5D', fontWeight: '600' }}
                              variant="body1"
                              gutterBottom
                            >
                              Phone No
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={10}>
                                {!this.state.phoneB ? (
                                  <Typography variant="body2" gutterBottom>
                                    {this.state.phone}
                                  </Typography>
                                ) : (
                                  <input
                                    value={this.state.phone}
                                    onChange={e =>
                                      this.setState({ phone: e.target.value })
                                    }
                                    style={{
                                      background: 'white',
                                      border: '1px solid rgb(231, 231, 231)',
                                      width: '100%',
                                    }}
                                    name="phone"
                                    type="text"
                                    className="text-field"
                                  />
                                )}
                              </Grid>
                              <Grid item xs={2}>
                                {!this.state.phoneB ? (
                                  <CreateIcon
                                    className="click-h"
                                    onClick={() =>
                                      this.setState({ phoneB: true })
                                    }
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                ) : (
                                  <SaveIcon
                                    className="click-h"
                                    onClick={async () => {
                                      try {
                                        const res = await updateUser(
                                          'mobilePhone',
                                          this.state.user.id,
                                          this.state.phone
                                        );
                                        this.setState({
                                          phoneB: false,
                                          msg: res,
                                        });
                                      } catch (error) {
                                        this.setState({
                                          msg: {
                                            varient: 'error',
                                            message: 'Unable to update',
                                          },
                                          phoneB: false,
                                        });
                                      }
                                    }}
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                )}
                              </Grid>
                            </Grid>

                            <br />
                            <Divider variant="left" />
                            <br />
                            <Typography
                              style={{ color: '#274E5D', fontWeight: '600' }}
                              variant="body1"
                              gutterBottom
                            >
                              Email ID{' '}
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={10}>
                                {!this.state.emailB ? (
                                  <Typography variant="body2" gutterBottom>
                                    {this.state.email}
                                  </Typography>
                                ) : (
                                  <input
                                    onChange={e =>
                                      this.setState({ email: e.target.value })
                                    }
                                    value={this.state.email}
                                    style={{
                                      background: 'white',
                                      border: '1px solid rgb(231, 231, 231)',
                                      width: '100%',
                                    }}
                                    name="email"
                                    type="text"
                                    className="text-field"
                                    placeholder="Name"
                                  />
                                )}
                              </Grid>
                              <Grid item xs={2}>
                                {!this.state.emailB ? (
                                  <CreateIcon
                                    className="click-h"
                                    onClick={() =>
                                      this.setState({ emailB: true })
                                    }
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                ) : (
                                  <SaveIcon
                                    className="click-h"
                                    onClick={async () => {
                                      try {
                                        const res = await updateUser(
                                          'email',
                                          this.state.user.id,
                                          this.state.email
                                        );
                                        this.setState({
                                          msg: res,
                                          emailB: false,
                                        });
                                      } catch (error) {
                                        this.setState({
                                          emailB: false,
                                          msg: {
                                            varient: 'error',
                                            message: 'Unable to update',
                                          },
                                        });
                                      }
                                    }}
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                )}
                              </Grid>
                            </Grid>

                            <br />
                            <Divider variant="left" />
                            <br />
                            <Typography variant="body2" gutterBottom>
                              {this.state.user.data &&
                              this.state.user.data.address
                                ? this.state.user.data.location
                                : ''}
                            </Typography>
                            <Typography
                              style={{ color: '#274E5D', fontWeight: '600' }}
                              variant="body1"
                              gutterBottom
                            >
                              Settings{' '}
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={10}>
                                {!this.state.changePasswordB ? (
                                  <Typography variant="body2" gutterBottom>
                                    Change Password
                                  </Typography>
                                ) : (
                                  <>
                                    <input
                                      value={this.state.password}
                                      onChange={e =>
                                        this.setState({
                                          curPassword: e.target.value,
                                        })
                                      }
                                      style={{
                                        background: 'white',
                                        border: '1px solid rgb(231, 231, 231)',
                                        width: '100%',
                                        marginBottom: '10px',
                                      }}
                                      name="password"
                                      type="password"
                                      className="text-field"
                                      placeholder="Current Password"
                                    />
                                    <input
                                      value={this.state.password}
                                      onChange={e =>
                                        this.setState({
                                          newPassword: e.target.value,
                                        })
                                      }
                                      style={{
                                        background: 'white',
                                        border: '1px solid rgb(231, 231, 231)',
                                        width: '100%',
                                      }}
                                      name="password"
                                      type="password"
                                      className="text-field"
                                      placeholder="New Password"
                                    />
                                  </>
                                )}
                              </Grid>
                              <Grid item xs={2}>
                                {!this.state.changePasswordB ? (
                                  <CreateIcon
                                    className="click-h"
                                    onClick={() =>
                                      this.setState({ changePasswordB: true })
                                    }
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                ) : (
                                  <SaveIcon
                                    className="click-h"
                                    onClick={async () => {
                                      try {
                                        const {
                                          curPassword,
                                          newPassword,
                                        } = this.state;

                                        const res = await updatePassword(
                                          curPassword,
                                          newPassword,
                                          this.state.user.email,
                                          this.state.user.id
                                        );
                                        this.setState({
                                          changePasswordB: false,
                                          msg: res,
                                        });
                                      } catch (error) {
                                        this.setState({
                                          changePasswordB: false,
                                          msg: {
                                            varient: 'error',
                                            message: 'Unable to update',
                                          },
                                        });
                                      }
                                    }}
                                    color="primary"
                                    style={{ fontSize: '1.2em' }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                            <br />
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
                      className="Bookmark-profile-title"
                      style={{ color: '#3E3E3E' }}
                      gutterBottom
                    >
                      Bookmarked Courses
                    </Typography>
                    <Divider />
                    <br />
                    {this.state.loading ? (
                      <Grid align="center">
                        <CircularProgress color="primary" />
                      </Grid>
                    ) : !this.state.data.length > 0 ? (
                      <Grid align="center">
                        <Typography variant="h6" gutterBottom>
                          No Bookmarks
                        </Typography>
                      </Grid>
                    ) : (
                      this.state.data.map(obj => (
                        <ProfileCourseCard
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
                          url={obj.url}
                          from={'profile'}
                        />
                      ))
                    )}

                    <br />
                    <Typography
                      variant="h4"
                      style={{ color: '#3E3E3E' }}
                      gutterBottom
                      className="reviews-profile"
                    >
                      My Reviews
                    </Typography>
                    <br />
                    {this.state.rloading ? (
                      <p>Loading</p>
                    ) : this.state.reviews.length > 0 ? (
                      this.state.reviews.map(data => (
                        <div key={Math.random()}>
                          <div className="c-card">
                            <div className="coursecard-header">
                              <div>
                                <Typography
                                  color="primary"
                                  style={{ fontWeight: '600' }}
                                  variant="subtitle2"
                                  className="hover"
                                  gutterBottom
                                >
                                  {data.course && data.course.university}
                                </Typography>
                              </div>
                              <div></div>
                            </div>
                            <Link
                              to={`/coursedetails/${data.course &&
                                data.course.provider}/${data.course &&
                                data.course.uuid}`}
                            >
                              <Typography
                                variant="subtitle1"
                                style={{
                                  color: '#3C3C3C',
                                  fontWeight: '600',
                                  padding: '0px 15px 0px 15px',
                                }}
                                className="hover"
                                gutterBottom
                              >
                                {data.course && data.course.title}
                              </Typography>
                            </Link>
                            <Typography
                              style={{
                                padding: '0px 15px 0px 15px',
                                color: '#968484',
                              }}
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {data.review.provider}
                            </Typography>
                            <div>
                              <Typography
                                style={{
                                  padding: '0px 15px 0px 15px',
                                }}
                                color="primary"
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Review
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                style={{
                                  padding: '0px 15px 0px 15px',
                                  color: '#000',
                                }}
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                {data.review.review}
                              </Typography>
                            </div>
                            <br />
                            <div>
                              <div
                                className={styles.root}
                                style={{
                                  background: '#F4F2F2',
                                  padding: '0px 15px 0px 15px',
                                  borderRadius: '0px 0px 4px 4px',
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
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
                    )}
                  </Container>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <br />
        <br />
        <br />
        <Footer />
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

export default withRouter(ProfilePage);
