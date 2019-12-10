import { Container, Divider } from '@material-ui/core';
import React, { Component } from 'react';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CourseCard from './ProfileCourseCard';
import Footer from './Footer';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import NestedMenu from './nestedCheckbox';
import Pagination from 'material-ui-flat-pagination';
import ProfileCourseCard from './ProfileCourseCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TopAppBar from './appBar';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import Typography from '@material-ui/core/Typography';
import { black } from 'material-ui/styles/colors';
import config from '../config.json';
import { subjectsData } from './../utils/data';
import { withStyles } from '@material-ui/core/styles';

const providerData = [
  'edX',
  'FutureLearn',
  'SimpliLearn',
  'Udemy',
  'Udacity',
  'upGrad',
  'Swayam',
];
const { API, API_LOCAL } = config;

const styles = {
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
    background: '#333',
  },
};

const defaultProps = {
  padding: '1rem',
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '12rem', height: '15rem' },
  borderColor: 'text.primary',
};

const perPage = 10;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerData,
      data: [],
      page: 0,
      start: 0,
      end: perPage,
      perPage: perPage,
      filterValue: 'all',
      q: '',
      filter: '',
      feeFilter: '',
      startDateFilter: '',
      isStateUpdatedFromProp: false,
      subjects: 'all',
      providers: 'all',
      fee: 'all',
      isLevel1CheckedSubjects: false,
    };
    this.getUniversityForUdemy = this.getUniversityForUdemy.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSubjectFilterChange = this.onSubjectFilterChange.bind(this);
    this.onFeeFilterChange = this.onFeeFilterChange.bind(this);
    this.onStartFilterChange = this.onStartFilterChange.bind(this);
    this.onProviderFilterChange = this.onProviderFilterChange.bind(this);
    this.setupDefaultFilters = this.setupDefaultFilters.bind(this);
  }

  updateData() {
    const page = this.state.page;
    const query = this.state.q;
    const filter = this.state.filterValue;
    let parsedFilter = '';
    let feeFilter = '';
    let startDateFilter = '';

    console.log({ filter });

    if (filter === 'free') feeFilter = 'price:free';
    if (filter === 'paid') feeFilter = 'price:paid';

    if (filter === 'flexible') startDateFilter = 'start:flexible';
    if (filter === 'lte30') startDateFilter = 'start:lte30';
    if (filter === 'gte30') startDateFilter = 'start:gte30';

    const range = JSON.stringify([
      page * this.state.perPage,
      (page + 1) * this.state.perPage,
    ]);
    const subjects = encodeURIComponent(this.state.subjects);
    var url = `${API}/api/courses/?range=${range}&q=${query}&filter=${parsedFilter}&subjects=${subjects}&provider=${this.state.providers}&feeFilter=${feeFilter}&startDateFilter=${startDateFilter}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json.data, total: json.total }, () => {
          console.log('After data update');
          console.log(this.state);
        });
      });
  }

  onSubjectFilterChange = subjectList => {
    let subjectFilter = '';
    subjectsData.forEach((obj, index) => {
      if (subjectList[index]) {
        subjectFilter += obj.name + '::';
      }
    });
    subjectFilter = subjectFilter.substring(0, subjectFilter.length - 2);
    if (subjectFilter === '') subjectFilter = 'all';
    this.setState({ subjects: subjectFilter }, () => {
      this.updateData();
    });
  };

  onFeeFilterChange = feeType => {
    console.log({ feeType });
    let filterValue;
    if (feeType[0] === true) filterValue = 'free';
    else if (feeType[1] === true) filterValue = 'paid';
    else filterValue = '';
    this.setState({ filterValue }, () => {
      this.updateData();
    });
  };
  onStartFilterChange = startDateType => {
    console.log({ startDateType });
    let filterValue;
    if (startDateType[2] === true) filterValue = 'flexible';
    else if (startDateType[0] === true) filterValue = 'lte30';
    else if (startDateType[1] === true) filterValue = 'gte30';
    else filterValue = '';
    console.log({ filterValue });
    this.setState({ filterValue }, () => {
      console.log(this.state);
      this.updateData();
    });
  };

  onProviderFilterChange = providerList => {
    let providerFilter = '';
    this.state.providerData.forEach((obj, index) => {
      if (providerList[index]) {
        providerFilter += obj + '::';
      }
    });
    providerFilter = providerFilter.substring(0, providerFilter.length - 2);
    if (providerFilter === '') providerFilter = 'all';
    this.setState({ providers: providerFilter }, () => {
      this.updateData();
    });
  };

  onFilterChange(event) {
    const value = event.target.value;
    this.setState({ filterValue: value }, () => {
      console.log('Filter changed to', value);
      this.updateData();
    });
    // Call api after this.
  }

  setupDefaultFilters() {}

  /*
    This is used to update filters coming from other pages.
  */
  componentDidMount() {
    console.log(this.state, this.props);
    let query = '';
    let subjects = 'all';
    let isLevel1CheckedSubjects = false;
    let checkedLevel2Subjects = subjectsData.map(s => false);
    let filterValue = '';

    if (this.props.location.state !== undefined) {
      if (this.props.location.state.query !== undefined)
        query = this.props.location.state.query;
      if (this.props.location.state.subject !== undefined) {
        subjects = this.props.location.state.subject;
        isLevel1CheckedSubjects = true;
        checkedLevel2Subjects[
          subjectsData
            .map(s => s.name)
            .indexOf(this.props.location.state.subject)
        ] = true;
      }
      if (this.props.location.state.filter !== undefined) {
        filterValue = this.props.location.state.filter;
      }
    }
    console.log({ filterValue });
    if (!this.state.isStateUpdatedFromProp) {
      this.setState(
        {
          q: query,
          isStateUpdatedFromProp: true,
          subjects,
          isLevel1CheckedSubjects,
          checkedLevel2Subjects,
          filterValue,
        },
        () => {
          console.log('After the mount', this.state);
          this.updateData();
        }
      );
    } else {
      this.updateData();
    }
  }

  getUniversityForUdemy(obj) {
    let names = obj.visible_instructors.map(i => i.name + ', ').join('');
    return names.slice(0, names.length - 2);
  }

  handlePageChange(page) {
    this.setState({ page }, () => {
      this.updateData();
    });
  }

  onSearchChange(query) {
    console.log('onSearchChange', { q: query.target.value });
    this.setState({ q: query.target.value }, () => {
      this.updateData();
    });
  }

  render() {
    console.log('Rendering now');
    return (
      <>
        <div>
          <TopAppBar
            onChange={this.onSearchChange}
            isSearchIncluded={true}
            initialSearchValue={this.state.q}
          />
        </div>
        <br />
        <br />
        <Container maxWidth={'lg'}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box borderRight={1} style={{ borderColor: '#DCDCDC' }}>
                <Typography variant="h6" gutterBottom>
                  Filter by
                </Typography>
                <Divider style={{ marginBottom: '25px', marginTop: '15px' }} />
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="filter"
                    name="filter"
                    value={this.state.filterValue}
                    onChange={this.onFilterChange}
                  >
                    <NestedMenu
                      shouldUpdate={false}
                      isLevel1Checked={false}
                      isOnlyOneAllowed={false}
                      level1Name={'Providers'}
                      level2List={this.state.providerData}
                      onChangeOptions={s => this.onProviderFilterChange(s)}
                    />
                    <NestedMenu
                      shouldUpdate={false}
                      isLevel1Checked={false}
                      isOnlyOneAllowed={true}
                      level1Name={'Fees'}
                      level2List={['Free', 'Paid']}
                      onChangeOptions={s => this.onFeeFilterChange(s)}
                    />
                    <NestedMenu
                      shouldUpdate={false}
                      isLevel1Checked={false}
                      isOnlyOneAllowed={true}
                      level1Name={'Start Date'}
                      level2List={[
                        'Starts within 30 days',
                        'Starts after 30 days',
                        'Flexible',
                      ]}
                      onChangeOptions={s => this.onStartFilterChange(s)}
                    />
                    <NestedMenu
                      shouldUpdate={true}
                      isLevel1Checked={this.state.isLevel1CheckedSubjects}
                      checkedLevel2={this.state.checkedLevel2Subjects}
                      isOnlyOneAllowed={false}
                      level1Name={'Subject'}
                      level2List={subjectsData.map(s => s.name)}
                      onChangeOptions={s => this.onSubjectFilterChange(s)}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Container>
                <Typography variant="h6" gutterBottom>
                  Top Courses
                </Typography>
              </Container>
              <Divider
                style={{
                  marginBottom: '25px',
                  marginTop: '15px',
                  marginLeft: '-25px',
                }}
              />
              {this.state.data.length > 0 ? (
                this.state.data.length > 0 &&
                this.state.data.map((obj, index) => {
                  return (
                    <>
                      <Container>
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
                          url={obj.url}
                        />
                      </Container>
                    </>
                  );
                })
              ) : (
                <Grid align="center">
                  <CircularProgress />
                </Grid>
              )}
              {this.state.data.length > 0 && (
                <Grid container spacing={10}>
                  <Grid item xs={3} />
                  <Grid item xs={6}>
                    <Pagination
                      classes={{ colorInherit: { color: black } }}
                      currentPageColor={'inherit'}
                      limit={this.state.perPage}
                      offset={this.state.page * this.state.perPage}
                      total={this.state.total}
                      nextPageLabel={<ArrowForward fontSize="inherit" />}
                      previousPageLabel={<ArrowBack fontSize="inherit" />}
                      onClick={(e, offset, page) =>
                        this.handlePageChange(page - 1)
                      }
                    />
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
}

HomePage.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
