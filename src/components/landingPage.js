import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CourseCard from './courseCard';
import Pagination from 'material-ui-flat-pagination';
import { black } from 'material-ui/styles/colors';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TopAppBar from './appBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import CS from './../assets/CS-image.jpg';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

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

const subjectsData = [
  {
    name: 'Computer Science',
    code: 'CS',
    content: '',
  },
  {
    name: 'Business',
    code: 'B',
    content: '',
  },
  {
    name: 'Arts & Design',
    code: 'A',
    content: '',
  },
  {
    name: 'Data Science',
    code: 'DA',
    content: '',
  },
  {
    name: 'Health & Lifestyle',
    code: 'HL',
    content: '',
  },
  {
    name: 'Science & Engineering',
    code: 'SENG',
    content: '',
  },
  {
    name: 'Social Studies',
    code: 'SO',
    content: '',
  },
  {
    name: 'Developers/Programming',
    code: 'DEV',
    content: '',
  },
  {
    name: 'Others',
    code: 'O',
    content: '',
  },
  {
    name: 'Math',
    code: 'M',
    content: '',
  },
];

const degreeData = [
  {
    name: 'Name of Degree',
    university: 'University Name',
  },
  {
    name: 'Name of Degree',
    university: 'University Name',
  },
  {
    name: 'Name of Degree',
    university: 'University Name',
  },
  {
    name: 'Name of Degree',
    university: 'University Name',
  },
  {
    name: 'Name of Degree',
    university: 'University Name',
  },
  {
    name: 'Name of Degree',
    university: 'University Name',
  },
];

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

  getSubjectCard(courseName, classes) {
    return (
      <Grid container>
        <Grid item xs={5}>
          <img className={classes.imgCricular} src={CS} alt="Avatar"></img>
        </Grid>
        <Grid item xs={7} justify="center" style={{ margin: 'auto' }}>
          <Typography variant="body2" component="p" align="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor …
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
              <Grid item xs={3} justify="center" style={{ margin: 'auto' }}>
                <img
                  className={classes.imgCricularUniversity}
                  src={CS}
                  alt="Avatar"
                ></img>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={6} justify="center" style={{ margin: 'auto' }}>
                <Typography variant="body2" component="p" align="center">
                  {name}
                </Typography>
                <Typography variant="body2" component="p" align="center">
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

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <TopAppBar onChange={this.onSearchChange} isSearchIncluded={false} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '30vh', background: '#F1F8FE' }}
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
          //   justify="center"
          style={{ minHeight: '40vh' }}
        >
          <Grid item xs={12} spacing={3} style={{ paddingTop: 30 }}>
            <Typography variant="h5" component="h2">
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
          <Grid container>
            {this.state.subjects.map(subject => {
              return (
                <Grid item xs={4} style={{ padding: 30 }}>
                  {this.getSubjectCard(subject.name, classes)}
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12}>
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
          style={{ minHeight: '60vh', width: '100%', margin: 10 }}
        >
          <Grid container spacing={0} direction="column" alignItems="center">
            <Grid item xs={12} spacing={3} style={{ paddingTop: 30 }}>
              <Typography variant="h5" component="h2">
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
          </Grid>
        </Box>
      </div>
    );
  }
}

LandingPage.propTypes = {};

export default withStyles(styles, { withTheme: true })(LandingPage);
