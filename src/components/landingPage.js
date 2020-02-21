import React, { Component } from 'react';
import {
  degreeData,
  freeCourses,
  subjectsData,
  trendingData,
} from './../utils/data';
import { fade, makeStyles } from '@material-ui/core/styles';

import AuthProvider from './authProvider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CS from './../assets/CS.png';
import { Collapse } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactGA from 'react-ga';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import HomeModal from './HomeModal';
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import { Paper } from 'material-ui';
import SearchBG1 from './../assets/Search-Option3.jpg';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import TopAppBar from './appBar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Smicon from '../assets/smicon.svg';
import { trackEvent } from 'react-with-analytics/lib/utils';
import StaticCourseDetails from './StaticCourseDetails';
import { clearConfigCache } from 'prettier';
import { store } from '../App';
const styles = theme => ({
  dashboardLink: {
    color: 'white',
  },
  brandingContainer: {
    marginTop: '2%',
  },
  subHeading: {
    position: 'absolute',
    bottom: '20%',
    color: 'white',
    fontSize: '1rem',
  },
  filter: {
    background: '#00000005',
  },
  search: {
    background: '#FFF',
    position: 'relative',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '120%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#FFA502',
    border: '2px solid #FFA502',
    borderRadius: '6px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  imgCricular: {
    borderRadius: '50%',
    height: '10vh',
    width: '10vh',
  },
  imgCricularUniversity: {
    borderRadius: '50%',
    height: 80,
    width: 80,
  },
  subjectCardContainer: {
    padding: 20,
  },
  courseCardImage: {
    // objectFit: 'cover !important',
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
  },
});

const defaultProps = {
  padding: '1rem',
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '12rem', height: '15rem' },
  borderColor: 'text.primary',
};

const Search = withRouter(({ history, ...data }) => {
  const classes = data.classes;
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon color="primary" />
      </div>
      <InputBase
        placeholder="Search for a course"
        onChange={data.onSearchChange}
        inputProps={{ 'aria-label': 'search' }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onKeyPress={ev => {
          if (ev.key === 'Enter') {
            const query = data.getQuery;
            trackEvent('search', 'onSearch', 'Search_homepage');
            ReactGA.ga('send', 'pageview', query);
            console.log(ReactGA);
            history.push({
              pathname: data.routingURL,
              state: {
                query: query(),
              },
            });
            ev.preventDefault();
          }
        }}
      />
    </div>
  );
});

const ShowMore = withRouter(({ history, ...data }) => {
  const classes = data.classes;
  return (
    <Button
      onClick={() => {
        history.push({
          pathname: data.routingURL,
          state: {
            filter: data.filter,
          },
        });
      }}
      variant="contained"
      color="primary"
      className="landing-showmore"
    >
      <div className="flex">
        <div style={{ alignSelf: 'center' }}>Show More</div>
        <div className="flex">
          <div style={{ alignSelf: 'center', height: '25px' }}>
            <img className="smicon no-desktop" src={Smicon} alt="sm-icon" />
          </div>
        </div>
      </div>
    </Button>
  );
});

const SubjectCard = withRouter(({ history, ...data }) => {
  const classes = data.classes;
  return (
    <Grid
      item
      xs={12}
      sm={4}
      style={{ marginTop: '20px' }}
      onClick={() => {
        history.push({
          pathname: data.routingURL,
          state: {
            subject: data.name,
          },
        });
      }}
    >
      <Grid container>
        <Grid xs={3} sm={12} align="center">
          <img
            className="course-cat-icon-sm click-h"
            src={data.image}
            alt="Avatar"
          ></img>
        </Grid>

        <Grid
          xs={9}
          style={{ alignSelf: 'center' }}
          alignItems={'center'}
          sm={12}
        >
          <Typography
            className="course-cat-text-sm"
            color="primary"
            style={{ fontWeight: '600' }}
            align="center"
            variant="body1"
            component="p"
          >
            {data.name}
          </Typography>
          <Typography className="show-only-mobile cat-sub"></Typography>
        </Grid>
      </Grid>
    </Grid>
  );
});

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      start: 0,
      filterValue: 'all',
      q: '',
      filter: '',
      subjects: subjectsData.slice(0, 3),
      showMoreButtonText: 'Show More',
      popUp: sessionStorage.getItem('cbpop'),
      nsEmail: '',
      user: null,
    };
    console.log('landing', this.state);
    console.log('onrender', sessionStorage.getItem('cbpop'));
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.showMore = this.showMore.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }

  onFilterChange(event) {
    this.setState({ filterValue: event.target.value });
    // Call api after this.
  }

  componentDidMount() {
    store.getItem('user').then(res => {
      this.setState({ user: res });
    });
    // window.addEventListener('scroll', this.handleScroll);
    if (sessionStorage.getItem('cbpop') == null) {
      this.timeouts = setTimeout(() => {
        if (sessionStorage.getItem('cbpop') !== false)
          this.setState({ popUp: true });
      }, 5000);
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('topTrendingCourses');
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      console.log(sessionStorage.getItem('cbpop'));
      if (!sessionStorage.getItem('cbpop')) this.setState({ popUp: true });
    }
  };

  componentWillUnmount() {
    this.clearTimeouts();
    document.removeEventListener('scroll', this.trackScrolling);
  }

  clearTimeouts = () => {
    clearTimeout(this.timeouts);
  };

  handlePageChange(page) {
    this.setState({ page }, () => {
      this.updateData();
    });
  }

  onSearchChange(query) {
    console.log('onSearchChange', { q: query.target.value });
    this.setState({ q: query.target.value });
  }

  showMore() {
    trackEvent('showmore', 'click', 'Subject_showmore');
    if (this.state.subjects.length === 3)
      this.setState({
        subjects: subjectsData,
        showMoreButtonText: 'Show Less',
      });
    else
      this.setState({
        subjects: subjectsData.slice(0, 3),
        showMoreButtonText: 'Show More',
      });
  }

  getQuery() {
    return this.state.q;
  }

  getDegreeCard(degree, classes, type, dataType) {
    const padding = { paddingTop: 6, paddingBottom: 6 };
    if (degree.url) {
      return (
        <Grid container className="c-card">
          <Grid item xs={12}>
            <Box display="flex" style={{ height: '149px', margin: '30' }}>
              <Grid
                item
                xs={8}
                style={{ margin: 'auto', paddingLeft: 30 }}
                className="card-content"
              >
                <Link
                  onClick={() => {
                    switch (dataType) {
                      case 'degree':
                        return trackEvent(
                          'Degree_course',
                          'click',
                          `${degree.name}`
                        );
                      case 'trending':
                        return trackEvent(
                          'Trending_course',
                          'click',
                          `${degree.name}`
                        );
                      case 'free':
                        return trackEvent(
                          'Free_course',
                          'click',
                          `${degree.name}`
                        );
                    }
                  }}
                  to={'/coursedetails' + degree.url}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    align="left"
                    className="card-uni"
                  >
                    <Box>{degree.university.trim()}</Box>
                  </Typography>
                </Link>
                <Typography variant="body2" align="left">
                  <Box className="card-course">{degree.name}</Box>
                </Typography>
                <Typography
                  variant="body2"
                  align="left"
                  style={{ paddingTop: 6, paddingBottom: 6, fontColor: '#ddd' }}
                >
                  <Box
                    height="100%"
                    fontWeight="fontWeightlight"
                    fontStyle="italic"
                    className="card-provider"
                    style={{ color: '#949494', fontSize: '0.8rem' }}
                  >
                    via {degree.provider}
                  </Box>
                </Typography>
              </Grid>
              {type === 1 && (
                <Grid item xs={4} style={{ height: '100%' }}>
                  <img
                    className={classes.courseCardImage}
                    src={degree.image}
                  ></img>
                </Grid>
              )}
              {type === 2 && (
                <Grid
                  item
                  className="card-image"
                  style={{ height: '100%', width: 224 }}
                >
                  <img
                    className={classes.courseCardImage}
                    src={degree.image}
                  ></img>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container className="c-card">
          <Grid item xs={12}>
            <Box display="flex" style={{ height: '149px', margin: '30' }}>
              <Grid
                item
                xs={8}
                style={{ margin: 'auto', paddingLeft: 30 }}
                className="card-content"
              >
                <Link
                  onClick={() => {
                    switch (dataType) {
                      case 'degree':
                        return trackEvent(
                          'Degree_course',
                          'click',
                          `${degree.name}`
                        );
                      case 'trending':
                        return trackEvent(
                          'Trending_course',
                          'click',
                          `${degree.name}`
                        );
                      case 'free':
                        return trackEvent(
                          'Free_course',
                          'click',
                          `${degree.name}`
                        );
                    }
                  }}
                  to={{
                    pathname: '/coursedetail',
                    state: {
                      data: degree.data,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    align="left"
                    className="card-uni"
                  >
                    <Box>{degree.university.trim()}</Box>
                  </Typography>
                </Link>
                <Typography variant="body2" align="left">
                  <Box className="card-course">{degree.name}</Box>
                </Typography>
                <Typography
                  variant="body2"
                  align="left"
                  style={{ paddingTop: 6, paddingBottom: 6, fontColor: '#ddd' }}
                >
                  <Box
                    height="100%"
                    fontWeight="fontWeightlight"
                    fontStyle="italic"
                    className="card-provider"
                    style={{ color: '#949494', fontSize: '0.8rem' }}
                  >
                    via {degree.provider}
                  </Box>
                </Typography>
              </Grid>
              {type === 1 && (
                <Grid item xs={4} style={{ height: '100%' }}>
                  <img
                    className={classes.courseCardImage}
                    src={degree.image}
                  ></img>
                </Grid>
              )}
              {type === 2 && (
                <Grid
                  item
                  className="card-image"
                  style={{ height: '100%', width: 224 }}
                >
                  <img
                    className={classes.courseCardImage}
                    src={degree.image}
                  ></img>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      );
    }
  }

  renderSnackbar() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openSnackbaar}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar}
      ></Snackbar>
    );
  }

  handlePopupClose = () => {
    trackEvent('Homepage PopUp', 'click', 'side-close');
    this.setState({ popUp: false });
    console.log('CLOSED');
    sessionStorage.setItem('cbpop', false);
  };

  render() {
    const { classes, theme } = this.props;
    console.log('popup', this.state.popUp);
    console.log('LANDING', this.state);
    console.log('session', sessionStorage.getItem('cbpop'));
    return (
      <>
        <Grid style={{ margin: 0, width: '100%' }}>
          <TopAppBar
            onChange={this.onSearchChange}
            isSearchIncluded={false}
            onLoginClick={this.onLoginClick}
            noHome={true}
          />

          {this.state.popUp === true && this.state.user === null ? (
            <HomeModal
              Mstate={0}
              openState={this.state.popUp}
              handlePopupClose={this.handlePopupClose}
            />
          ) : null}

          <AuthProvider />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{
              minHeight: '60vh',
              background: 'url(' + SearchBG1 + ')',
              backgroundSize: 'cover',
            }}
          >
            <Grid className="main-search" item xs={12}>
              <Search
                getQuery={this.getQuery}
                onSearchChange={this.onSearchChange}
                classes={classes}
                props={this.props}
                routingURL={'/listing'}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{
              minHeight: '20vh',
              margin: 0,
              width: '100%',
              background: '#fff',
            }}
          >
            <Grid item xs={12} style={{ paddingTop: 30 }}>
              <Typography
                variant="h5"
                color="primary"
                style={{ fontWeight: '600' }}
                component="h2"
              >
                Browse by Subject
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className="sub-text-landing"
                variant="body2"
                component="p"
                align="center"
              >
                Discover online best courses from top universities around the
                world like MIT, Stanford, Harvard, IIT and many more
              </Typography>
            </Grid>
            <Container maxWidth={'md'}>
              <Grid container className="course-options" justify="center">
                {this.state.subjects.map(subject => {
                  return (
                    <SubjectCard
                      name={subject.name}
                      image={subject.image}
                      classes={classes}
                      routingURL={'/listing'}
                      onClick={() => {
                        trackEvent(
                          'Subject Selected',
                          'click',
                          `${subject.name}`
                        );
                      }}
                    />
                  );
                })}
              </Grid>
            </Container>
            <Grid item xs={12} style={{ margin: 30 }}>
              <Button
                variant="contained"
                color="primary"
                className="landing-showmore"
                onClick={this.showMore}
              >
                <div className="flex">
                  <div style={{ alignSelf: 'center' }}>
                    {this.state.showMoreButtonText}
                  </div>
                  <div className="flex">
                    <div style={{ alignSelf: 'center', height: '25px' }}>
                      {this.state.showMoreButtonText === 'Show More' ? (
                        <img
                          className="smicon no-desktop"
                          src={Smicon}
                          alt="sm-icon"
                        />
                      ) : (
                        <img
                          className="smicon2 no-dekstop"
                          src={Smicon}
                          alt="sm-icon2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Button>
            </Grid>
          </Grid>

          <div align="center" className="ead-sec ead-bg ">
            <Typography
              variant="h5"
              color="primary"
              style={{
                fontWeight: '600',
                background: '#FAFAFA',
                paddingTop: '10px',
              }}
              component="h2"
            >
              Earn a Degree
            </Typography>
            <Grid item xs={12} className="width">
              <Typography
                className="sub-text-landing bt-m-no"
                variant="body2"
                component="p"
                align="center"
              >
                Launch yourself in your career with an online degree. Did you
                know many of the universities’ issue certificates which don’t
                even mention “taken online” on them.
              </Typography>
            </Grid>
            <Container
              style={{ background: '#FAFAFA', marginTop: '35px' }}
              maxWidth={'md'}
            >
              <Grid container>
                {degreeData.map(degree =>
                  this.getDegreeCard(degree, classes, 1, 'degree')
                )}
              </Grid>
            </Container>
            <ShowMore
              onClick={() => {
                trackEvent('showmore', 'click', 'Degree_showmore');
              }}
              classes={classes}
              filter={'paid'}
              routingURL={'/listing'}
            />
          </div>
          <div className="landing-2bar">
            <div className="bar-item bg-change" id="topTrendingCourses">
              <div className="card-flow">
                <Typography
                  color="primary"
                  style={{
                    fontWeight: '600',
                    marginBottom: '20px',
                    textAlign: 'center',
                    marginTop: '20px',
                  }}
                  variant="h5"
                  component="h2"
                >
                  Top Trending Courses
                </Typography>
                {trendingData.map(degree =>
                  this.getDegreeCard(degree, classes, 2, 'trending')
                )}
                <div className="center-button">
                  <ShowMore
                    classes={classes}
                    filter={''}
                    onClick={() => {
                      trackEvent('showmore', 'click', 'Trending_showmore');
                    }}
                    routingURL={'/listing'}
                  />
                </div>
              </div>
            </div>
            <div className="bar-item">
              <div className="card-flow">
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: '600',
                    marginBottom: '20px',
                    textAlign: 'center',
                    marginTop: '20px',
                  }}
                  color="primary"
                  component="h2"
                >
                  Learn for Free
                </Typography>
                {freeCourses.map(degree =>
                  this.getDegreeCard(degree, classes, 2, 'free')
                )}
                <div className="center-button">
                  <ShowMore
                    onClick={() => {
                      trackEvent('showmore', 'click', 'Free_showmore');
                    }}
                    classes={classes}
                    filter={'free'}
                    routingURL={'/listing'}
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <div className="orange-band">
          <div className="inner-orange">
            <Typography
              variant="h6"
              style={{
                color: 'white',
                fontWeight: '500',
                marginBottom: '20px',
              }}
            >
              Never stop learning. Subscribe to our newsletter
            </Typography>
            <div style={{ marginTop: '10px', width: '90%', margin: 'auto' }}>
              <input
                type="email"
                placeholder="Your email"
                className="ns-input"
              />
              <button
                onClick={() => {
                  if (this.state.nsEmail !== '') {
                    trackEvent('Newsletter', 'click', 'Newsletter Email');
                  }
                }}
                className="ns-submit click-h"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <Footer bgColor={'#FFF'} />
      </>
    );
  }
}

LandingPage.propTypes = {};

export default withStyles(styles, { withTheme: true })(LandingPage);
