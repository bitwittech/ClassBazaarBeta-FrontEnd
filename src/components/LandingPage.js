import React, { Component } from 'react';
import {
  degreeData,
  freeCourses,
  subjectsData,
  trendingData,
  exclusiveCourses
} from '../utils/data';
import { fade, makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import AuthProvider from './authProvider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CS from './../assets/CS.png';
import { Collapse } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { EarnADegreeComponent } from './earn-a-degree/earn-a-degree-component';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import HomeModal from './HomeModal';
import InputBase from '@material-ui/core/InputBase';
import LOGO_PNG from '../assets/img/logo.png';
import { LearnForFreeComponent } from './learn-for-free/learn-for-free';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import ReactGA from 'react-ga';
import SEARCH_THEMED from '../assets/img/search-themed.svg';
import SearchBG1 from './../assets/Search-Option3.jpg';
import SearchIcon from '@material-ui/icons/Search';
import Smicon from '../assets/smicon.svg';
import Snackbar from '@material-ui/core/Snackbar';
import StaticCourseDetails from './StaticCourseDetails';
import TopAppBar from './AppBar';
import { TrendingCoursesComponent } from './trending-cources/trending-cources';
import { ExclusiveCourseComponent } from './exclusive-course/exclusive-course';
import Typography from '@material-ui/core/Typography';
import { store } from '../App';
import { trackEvent } from 'react-with-analytics/lib/utils';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Banner1 from '../assets/img/main-banner.jpg'
import Banner2 from '../assets/img/offerbanner.png';
import Banner3 from '../assets/img/banner3.png';
import { useState } from 'react';
// import DignityHealthWhiteLogo from '../assets/dignityHealthWhiteLogo.jpeg';
import DignityLogo from '../assets/dignity.png'
import EduWhite from '../assets/edubuk white.png';

import dataScience from '../assets/subjects/20402.jpg';
import scienceAndEngin from '../assets/subjects/female-engineer-in-laboratory-3861449.jpg';
import socialStudies from '../assets/subjects/happy-ethnic-woman-sitting-at-table-with-laptop-3769021.jpg';
import computerScience from '../assets/subjects/Image-2.jpg';
import art from '../assets/subjects/Image-3.jpg';
import business from '../assets/subjects/Image-4.jpg';
import mathImage from '../assets/subjects/Image-16.jpg';
import developer from '../assets/subjects/person-looking-at-phone-and-at-macbook-pro-1181244.jpg';
import health from '../assets/subjects/photo-of-woman-practicing-yoga-3820320.jpg';


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
    color: '#f15a29',
    border: '2px solid #f15a29',
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
    <div className="main-searchbar-wrapper">
      <input
        type="text"
        name="search"
        className="form-control-plaintext"
        placeholder="Search for a Course"
        onChange={data.onSearchChange}
        onKeyPress={onSearchPressed(data, history)}
      />
      <img src={SEARCH_THEMED} className="search-icon2"/>
    </div>
  );
});

const TopAppBarWithRouter = withRouter(({ history, ...data }) => {
  const classes = data.classes;
  return (
    <TopAppBar
      onChange={data.onSearchChange}
      isSearchIncluded={true}
      onLoginClick={data.onLoginClick}
      onKeyPress={onSearchPressed(data, history)}
      noHome={true}
    />
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
            <img className="smicon no-desktop" src={Smicon} alt="sm-icon"/>
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
    this.exclusiveCourseSection = React.createRef();
    this.state = {
      data: [],
      page: 0,
      start: 0,
      subjectsExpanded: false,
      filterValue: 'all',
      q: '',
      filter: '',
      subjects: subjectsData.slice(0, 3),
      showMoreButtonText: 'Show More',
      popUp: localStorage.getItem('cbpop'),
      nsEmail: '',
      user: null,
    };
    console.log('landing', this.state);
    console.log('onrender', localStorage.getItem('cbpop'));
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
    trackEvent('Homepage', 'page', 'opened');
    store.getItem('user').then(res => {
      this.setState({ user: res });
    });
    // window.addEventListener('scroll', this.handleScroll);
    if (localStorage.getItem('cbpop') == null) {
      this.timeouts = setTimeout(() => {
        if (localStorage.getItem('cbpop') !== false)
          this.setState({ popUp: true });
      }, 5000);
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  isBottom(el) {
    return el && el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('topTrendingCourses');
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      console.log(localStorage.getItem('cbpop'));
      if (!localStorage.getItem('cbpop')) this.setState({ popUp: true });
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
                          `${degree.name}`,
                        );
                      case 'trending':
                        return trackEvent(
                          'Trending_course',
                          'click',
                          `${degree.name}`,
                        );
                      case 'free':
                        return trackEvent(
                          'Free_course',
                          'click',
                          `${degree.name}`,
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
                          `${degree.name}`,
                        );
                      case 'trending':
                        return trackEvent(
                          'Trending_course',
                          'click',
                          `${degree.name}`,
                        );
                      case 'free':
                        return trackEvent(
                          'Free_course',
                          'click',
                          `${degree.name}`,
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
    localStorage.setItem('cbpop', false);
  };
  toggleExpand = () => {
    this.setState({ subjectsExpanded: !this.state.subjectsExpanded });
  };

  // turn off by yashwant sahu
  // handleScrollToStats = () => {
  //   console.log('scroll this t exclusive course',this.exclusiveCourseSection);
  //   window.scrollTo({
  //       top: this.exclusiveCourseSection.current.offsetTop,
  //       behavior: 'smooth'
  //   })
  // }

  render() {
    const { classes, theme } = this.props;
    const bannerCenter = "center";
    const bannerStart = "start";
    const content = [
      {
      image: Banner1
    },
    {
      image: Banner3
    },
    {
      image: Banner2
    }
  ]
    console.log('popup', this.state.popUp);
    console.log('LANDING', this.state);
    console.log('session', localStorage.getItem('cbpop'));
    return (
      <>
        <Grid style={{ margin: 0, width: '100%' }}>
          <TopAppBarWithRouter
            onLoginClick={this.onLoginClick}
            getQuery={this.getQuery}
            onSearchChange={this.onSearchChange}
            classes={classes}
            props={this.props}
            routingURL={'/listing'}
          />
          <AuthProvider/>
          <div className={'landing-page-wrapper'}>
            <section className="main-banner posiition-relative">
              <Slider autoplay={3000} >
                {content.map((item, index) => (
                  <div
                    key={index}
                    style={{ backgroundImage: `url('${item.image}')`,backgroundSize: "cover", backgroundRepeat: "no-repeat", 
                            display: "flex",
                            justifyContent: `${index !==2 ? bannerCenter: bannerStart}`,
                            alignItems: "center"}}
                  >
                    {index === 0 ? (
                      <>
                      <div className="d-flex align-items-center justify-content-center"  id = "0">
                      <div className="banner-content text-center position-absolute text-white">
                      <div className="h5 mt-2" style={{ fontSize: '18px' }}>
                        We believe in
                      </div>
                      <div className="h1" className="passionBanner">
                        Passion for Learning
                      </div>
                      <form>
                        <Search
                          getQuery={this.getQuery}
                          onSearchChange={this.onSearchChange}
                          classes={classes}
                          props={this.props}
                          routingURL={'/listing'}
                        />
                      </form>
                    </div>
                
                    </div>
                    <div className="slider__dots">
                       {content.map((item, index1) => (
                         (index == index1)?
                         <a href= {"#"+index} key={index} className = "slider__dot" style={{background: "white"}} ></a>
                         :<a href= {"#"+index} key={index} className = "slider__dot" style={{background: "#f15a29"}} ></a>
                       ))}
                       </div>
                  </>
                    ): (null)}

                    {index === 1 ? (
                      <>
                      <div className="d-flex"  id = "1">
                      <div className="banner-content position-absolute text-white" style={{top:'40%', paddingTop: 0, width: '40%', display:"flex", flexDirection: "column", justifyContent: "flex-end"}}>
                      <img src={EduWhite} alt="edubuk" className="edubuk"  />
                      <div className="edubukmain">
                      <div className="h1 edubukh1">
                        Discover your true passion and turn it into a career
                      </div>
                      <div className="h1" className="edu">
                        With the most popular and trusted career mapping test for <strong>FREE!</strong>
                      </div>
                      <Link
                        to={{
                          pathname: '/edubuk',
                        }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          className="login-btn signup-btn"
                        >
                          See Tests
                        </Button>
                      </Link>
                      </div>
                    </div>
                    </div>
                    <div className="slider__dots">
                       {content.map((item, index1) => (
                         (index == index1)?
                         <a href= {"#"+index} key={index} className = "slider__dot" style={{background: "white"}} ></a>
                         :<a href= {"#"+index} key={index} className = "slider__dot" style={{background: "#f15a29"}} ></a>
                       ))}
                       </div>
                       </>
                    ): (<div></div>)}

                    {index === 2 ? (
                      <>
                      <div className="d-flex" id = "2">
                      <div className="banner-content position-absolute text-white" style={{top:'40%',left:'50%' ,paddingTop: 0, width: '40%', display:"flex", flexDirection: "column", justifyContent: "flex-start"}}>
                      <div  style={{marginLeft:'4rem', marginTop:'11rem'}}> 
                      <Button
                          variant="outlined"
                          color="primary"
                          className="select-course-btn seeCourse"
                          style={{ marginTop: '1rem'}}
                          onClick={() => this.props.history.push({
                            pathname: '/listing',
                            state: {
                              filter: 'free',
                              providers: 'all',
                            }
                          })}
                        >
                          Enroll Today
                        </Button>
                      </div>
                    </div>
                    </div>
                    <div className="slider__dots">
                       {content.map((item, index1) => (
                         (index == index1)?
                         <a href= {"#"+index} key={index} className = "slider__dot" style={{background: "white"}} ></a>
                         :<a href= {"#"+index} key={index} className = "slider__dot" style={{background: "#f15a29"}} ></a>
                       ))}
                       </div>
                    </>
                    ): (<div></div>)}

                    
                  </div>
                ))}
              </Slider>
              <div className="overlay"/>
             
            </section>
          </div>
          {/*<div className="landing-page-wrapper">*/}
          {/*  <section className="tiles-section py-5">*/}
          {/*    <div className="container">*/}
          {/*      <div className="row">*/}
          {/*        <div className="col-md-6 col-sm-12">*/}
          {/*          <div className="tiles-content">*/}
          {/*            <div className="tiles-heading">*/}
          {/*              Find courses on any topic*/}
          {/*            </div>*/}
          {/*            <p>*/}
          {/*              Discover best online courses from top universities*/}
          {/*              around the world like MIT, Stanford, Harvard, IIT and*/}
          {/*              many more*/}
          {/*            </p>*/}
          {/*            <span*/}
          {/*              style={{*/}
          {/*                borderBottom: '1px solid #000',*/}
          {/*                paddingBottom: '3px',*/}
          {/*                cursor: 'pointer',*/}
          {/*              }}*/}
          {/*            >*/}
          {/*              Show More*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="col-md-6 col-sm-12">*/}
          {/*          <div className="row">*/}
          {/*            <div className="col-6">*/}
          {/*              <figure className="position-relative d-flex align-items-end justify-content-center tile tile1">*/}
          {/*                <div className="title">Computer Science</div>*/}
          {/*              </figure>*/}
          {/*              <figure className="browse-box-wrapper text-right">*/}
          {/*                <div className="browse-box">*/}
          {/*                  <span className="h2" onClick={() => this.toggleExpand()}>*/}
          {/*                    Browse by <br/>*/}
          {/*                    Subject*/}
          {/*                  </span>*/}
          {/*                </div>*/}
          {/*              </figure>*/}
          {/*            </div>*/}
          {/*            <div className="col-6">*/}
          {/*              <figure className="position-relative d-flex align-items-end justify-content-center tile tile2">*/}
          {/*                <div className="title">Arts & Design</div>*/}
          {/*              </figure>*/}
          {/*              <figure className="position-relative d-flex align-items-end justify-content-center tile tile3">*/}
          {/*                <div className="title">Business</div>*/}
          {/*              </figure>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </section>*/}
          {/*</div>*/}

          <div className="home-grid-wrapper container" style={{ marginTop: '100px' }}>
            <div className="left-wrapper">
              <div className="row-1">
                <div className="text-section">
                  <div className="tiles-content">
                    <div className="tiles-heading">
                      Find courses on any topic
                    </div>
                    <p>
                      Discover best online courses from top universities
                      around the world like MIT, Stanford, Harvard, IIT and
                      many more
                    </p>
                    <span
                      onClick={() => this.props.history.push({
                        pathname: '/listing',
                        state: {
                        },
                      })}
                      style={{
                        borderBottom: '1px solid #000',
                        paddingBottom: '3px',
                        cursor: 'pointer',
                      }}
                    >
                        Show More
                      </span>
                  </div>
                </div>
                <div className="box box-4">
                  <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[3].tile})` }}
                       onClick={() => this.props.history.push({
                         pathname: '/listing',
                         state: {
                           subject: subjectsData[3]['name'],
                           filter: 'subject',
                           providers: 'all',
                         }
                       })
                       }>
                    <div className="label">
                      {subjectsData[3]['name']}
                    </div>
                  </div>
                </div>
              </div>
              {
                !this.state.subjectsExpanded && <div className="browseCourse" >
                  <figure className="browse-box-wrapper text-right" onClick={() => this.toggleExpand()}>
                    <div className="browse-box">
                            <span className="h2">
                              Browse by <br/>
                              Subject
                            </span>
                    </div>
                  </figure>
                </div>
              }
              {
                this.state.subjectsExpanded && <div className={'row-2'}>
                  <div className="row-row-1">
                    <figure className="browse-box-wrapper text-right"
                            onClick={() => {
                              this.props.history.push({
                                pathname: '/listing',
                                state: {
                                },
                              });
                            }}
                            style={{ marginTop: '100px', paddingTop: '60px', height: '120px' }}>
                      <div className="browse-box">
                            <span className="h2">
                             Others
                            </span>
                      </div>
                    </figure>
                    <div className="box box-5">
                      <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[4].tile})` }}
                           onClick={() => this.props.history.push({
                             pathname: '/listing',
                             state: {
                               subject: subjectsData[4]['name'],
                               filter: 'subject',
                               providers: 'all',
                             },
                           })}>
                        <div className="label">
                          {subjectsData[4]['name']}
                        </div>
                      </div>
                    </div>
                    <div className="box box-7">
                      <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[8].tile})` }}
                           onClick={() => this.props.history.push({
                             pathname: '/listing',
                             state: {
                               subject: subjectsData[8]['name'],
                               filter: 'subject',
                               providers: 'all',
                             },
                           })}>
                        <div className="label">
                          {subjectsData[8]['name']}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row-row-2">
                    <div className="box box-6">
                      <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[5].tile})` }}
                           onClick={() => this.props.history.push({
                             pathname: '/listing',
                             state: {
                               subject: subjectsData[5]['name'],
                               filter: 'subject',
                               providers: 'all',
                             },
                           })}>
                        <div className="label">
                          {subjectsData[5]['name']}
                        </div>
                      </div>
                    </div>
                    <div className="box box-7">
                      <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[6].tile})` }}
                           onClick={() => this.props.history.push({
                             pathname: '/listing',
                             state: {
                               subject: subjectsData[6]['name'],
                               filter: 'subject',
                               providers: 'all',
                             },
                           })}>
                        <div className="label">
                          {subjectsData[6]['name']}
                        </div>
                      </div>
                    </div>
                    <div className="box box-8">
                      <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[7].tile})` }}
                           onClick={() => this.props.history.push({
                             pathname: '/listing',
                             state: {
                               subject: subjectsData[7]['name'],
                               filter: 'subject',
                               providers: 'all',
                             },
                           })}>
                        <div className="label">
                          {subjectsData[7]['name']}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              }
            </div>
            <div className="right-wrapper">
              <div className="box-1 box">
                <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[0].tile})` }}
                     onClick={() => this.props.history.push({
                       pathname: '/listing',
                       state: {
                         subject: subjectsData[0]['name'],
                         filter: 'subject',
                         providers: 'all',
                       },
                     })}>
                  <div className="label">
                    {subjectsData[0]['name']}
                  </div>
                </div>
              </div>
              <div className="box box-2">
                <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[1].tile})` }}
                     onClick={() => this.props.history.push({
                       pathname: '/listing',
                       state: {
                         subject: subjectsData[1]['name'],
                         filter: 'subject',
                         providers: 'all',
                       },
                     })}>
                  <div className="label">
                    {subjectsData[1]['name']}
                  </div>
                </div>
              </div>
              {
                this.state.subjectsExpanded && <div className="box box-3">
                  <div className="inner-box" style={{ backgroundImage: `url(${subjectsData[2].tile})` }}
                       onClick={() => this.props.history.push({
                         pathname: '/listing',
                         state: {
                           subject: subjectsData[2]['name'],
                           filter: 'subject',
                           providers: 'all',
                         },
                       })}>
                    <div className="label">
                      {subjectsData[2]['name']}
                    </div>
                  </div>
                </div>}
            </div>
          </div>

          <EarnADegreeComponent
            trackEvent={trackEvent}
            degreeData={degreeData}
            filter={'trending'}
            routingURL={'/listing'}
          />
          <TrendingCoursesComponent
            trendingData={trendingData}
            filter={'trending'}
            trackEvent={trackEvent}
            routingURL={'/listing'}
          />
          <LearnForFreeComponent
            trendingData={freeCourses}
            filter={'free'}
            trackEvent={trackEvent}
            routingURL={'/listing'}
          />
          {/* <div ref={this.exclusiveCourseSection}></div>
          <ExclusiveCourseComponent
            exclusiveCourse={exclusiveCourses}
            filter={'free'}
            trackEvent={trackEvent}
            routingURL={'/listing'}
          /> */}
        </Grid>
        <div className="orange-band" >
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
        <Footer bgColor={'#FFF'}/>
      </>
    );
  }
}

LandingPage.propTypes = {};

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage));

function onSearchPressed(data, history) {
  return ev => {
    if (ev.key === 'Enter') {
      const query = data.getQuery;
      trackEvent('search', 'onSearch', 'Search_homepage');
      ReactGA.ga('send', 'pageview', `/homepage?q=${query()}`);
      history.push({
        pathname: data.routingURL,
        state: {
          query: query(),
        },
      });
      ev.preventDefault();
    }
  };
}
