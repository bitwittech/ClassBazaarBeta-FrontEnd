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
import Container from '@material-ui/core/Container';
import CS from './../assets/CS.png';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchBG1 from './../assets/Search-option1.jpg';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import TopAppBar from './appBar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

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
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
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
    color: 'inherit',
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
        <SearchIcon />
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
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.showMore = this.showMore.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  onFilterChange(event) {
    this.setState({ filterValue: event.target.value });
    // Call api after this.
  }

  componentDidMount() {}

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

  getSubjectCard(courseName, image, classes) {
    return (
      <Grid container>
        <Grid align="center" justify="center" alignContent="center" item xs={9}>
          <img className={classes.imgCricular} src={image} alt="Avatar"></img>
          <Typography
            color="primary"
            style={{ fontWeight: '600' }}
            align="center"
            variant="body1"
            component="p"
          >
            {courseName}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  getQuery() {
    return this.state.q;
  }

  getDegreeCard(name, university, classes) {
    return (
      <Grid item xs={6} style={{ width: '100%', padding: 20 }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Box
              display="flex"
              border={1}
              style={{ height: '100px', margin: '30' }}
            >
              <Grid item xs={3} style={{ margin: 'auto' }}>
                <img
                  className={classes.imgCricularUniversity}
                  src={CS}
                  alt="Avatar"
                ></img>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={6} style={{ margin: 'auto' }}>
                <Typography variant="body1" align="center">
                  <Box fontWeight="fontWeightBold">{name}</Box>
                </Typography>
                <Typography variant="body2" align="center">
                  {university}
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        {/* </Box> */}
      </Grid>
    );
  }

  getTopTrendingCoursesCard(name, provider, classes) {
    return (
      <Grid item xs={12} style={{ width: '100%', padding: 10 }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Box
              display="flex"
              border={1}
              style={{ height: '100px', margin: '30' }}
            >
              <Grid item xs={9} style={{ margin: 'auto', paddingLeft: 30 }}>
                <Typography variant="body2" align="left">
                  <Box fontWeight="fontWeightBold">{name}</Box>
                </Typography>
                <Typography variant="body2" align="left">
                  {provider}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{ background: '#BCE0FD', height: '100%' }}
              ></Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
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

  render() {
    const { classes, theme } = this.props;
    return (
      <Grid style={{ margin: 0, width: '100%' }}>
        <TopAppBar
          onChange={this.onSearchChange}
          isSearchIncluded={false}
          onLoginClick={this.onLoginClick}
        />
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
          <Grid item xs={12}>
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
          style={{ minHeight: '20vh', margin: 0, width: '100%' }}
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
            <Typography variant="body2" component="p" align="center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Typography>
          </Grid>
          <Container maxWidth={'md'}>
            <Grid justify="center" container>
              {this.state.subjects.map(subject => {
                return (
                  <Grid item xs={4} style={{ padding: 30 }}>
                    {this.getSubjectCard(subject.name, subject.image, classes)}
                  </Grid>
                );
              })}
            </Grid>
          </Container>
          <Grid item xs={12} style={{ margin: 30 }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.showMore}
            >
              {this.state.showMoreButtonText}
            </Button>
          </Grid>
        </Grid>

        <Box
          border={1}
          style={{ minHeight: '30vh', width: '100%', margin: 10 }}
        >
          <Grid container spacing={0} direction="column" alignItems="center">
            <Grid item xs={12} style={{ paddingTop: 30 }}>
              <Typography
                variant="h5"
                color="primary"
                style={{ fontWeight: '600' }}
                component="h2"
              >
                Earn a Degree
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" align="center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut ero labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </Typography>
            </Grid>
            <Grid container>
              {degreeData.map(degree =>
                this.getDegreeCard(degree.name, degree.university, classes)
              )}
            </Grid>
            <Grid item xs={12} style={{ margin: 30 }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Show More
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <Box
              border={1}
              style={{ minHeight: '60vh', width: '96%', margin: 10 }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <Grid item xs={12} style={{ paddingTop: 30 }}>
                  <Typography variant="h5" component="h2">
                    Top Trending Courses
                  </Typography>
                </Grid>
                <Grid container>
                  {trendingData.map(degree =>
                    this.getTopTrendingCoursesCard(
                      degree.name,
                      degree.university,
                      classes
                    )
                  )}
                </Grid>
                <Grid item xs={12} style={{ margin: 30 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Show More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              border={1}
              style={{ minHeight: '60vh', width: '95%', margin: 10 }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <Grid item xs={12} style={{ paddingTop: 30 }}>
                  <Typography variant="h5" component="h2">
                    Learn for Free
                  </Typography>
                </Grid>
                <Grid container>
                  {freeCourses.map(degree =>
                    this.getTopTrendingCoursesCard(
                      degree.name,
                      degree.university,
                      classes
                    )
                  )}
                </Grid>
                <Grid item xs={12} style={{ margin: 30 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Show More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

LandingPage.propTypes = {};

export default withStyles(styles, { withTheme: true })(LandingPage);
