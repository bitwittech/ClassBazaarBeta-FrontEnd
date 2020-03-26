import { Container, Divider } from '@material-ui/core';
import React, { Component } from 'react';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CourseCard from './ProfileCourseCard';
import CourseList from './CourseList';
import Footer from './Footer';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import MobileTopbar from './MobileTopbar';
import NestedMenu from './nestedCheckbox';
import Pagination from 'material-ui-flat-pagination';
import ProfileCourseCard from './ProfileCourseCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ReactGA from 'react-ga';
import ScrollToTop from './ScrollToTop';
import TopAppBar from './AppBar';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import Typography from '@material-ui/core/Typography';
import { black } from 'material-ui/styles/colors';
import config from '../config.json';
import { store } from '../App';
import { subjectsData } from '../utils/data';
import { trackEvent } from 'react-with-analytics/lib/utils';
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
let { API, API_LOCAL } = config;

// const debug = process.env.NODE_ENV === 'production' ? false : true;
// if (debug) API = API_LOCAL;

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
  clearAll: {
    position: 'relative',
    float: 'right',
    color: '#ffa502',
    bottom: -20,
    textDecorationLine: 'underline',
    fontSize: '1rem',
    margin: '0px 10px',
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
      subjecttReset: false,
      feeReset: false,
      providerReset: false,
      startReset: false,
      loading: true,
      popUp: false,
      queryURL: '',
      mobileFilter: false,
      totalCount: null,
      providerOffset: [0, 0, 0, 0, 0, 0, 0],
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
    this.getCheckedProvidersFromString = this.getCheckedProvidersFromString.bind(
      this
    );
    this.udpateOffsets = this.udpateOffsets.bind(this);
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
    if (filter === 'Provider subscription required')
      feeFilter = 'price:Provider subscription required';
    if (filter === 'flexible') startDateFilter = 'start:flexible';
    if (filter === 'lte30') startDateFilter = 'start:lte30';
    if (filter === 'gte30') startDateFilter = 'start:gte30';

    const range = JSON.stringify([
      page * this.state.perPage,
      (page + 1) * this.state.perPage,
    ]);
    const subjects = encodeURIComponent(this.state.subjects);

    var url = `${API}/api/v2/courses/?q=${query}&filter=${parsedFilter}&subjects=${subjects}&provider=${
      this.state.providers
      }&feeFilter=${feeFilter}&startDateFilter=${startDateFilter}&providerOffset=${this.state.providerOffset.join(
        '::'
      )}`;
    console.log("FETCH URL", url);
    this.setState({ queryURL: url }, () => {
      const state = this.state;
      store.removeItem('filterData').then(s => {
        store.setItem('filterData', this.state).then(d => {
          console.log('Data updated in localstorage');

        });
      });
    });
  }

  handleCourseNumber = count => {
    this.setState({
      totalCount: count,
    });
  };

  udpateOffsets = offsets => {
    console.log('Updating offsets', offsets);
    this.setState({
      providerOffset: offsets,
    });
  };

  onSubjectFilterChange = subjectList => {
    let subjectFilter = '';
    subjectsData.forEach((obj, index) => {
      if (subjectList[index]) {
        subjectFilter += obj.name + '::';
      }
    });
    subjectFilter = subjectFilter.substring(0, subjectFilter.length - 2);
    let isLevel1CheckedSubjects = true;
    if (subjectFilter === '') {
      subjectFilter = 'all';
      isLevel1CheckedSubjects = false;
    }
    this.setState({ subjects: subjectFilter, isLevel1CheckedSubjects }, () => {
      this.updateData();
    });
  };

  onFeeFilterChange = feeType => {
    console.log({ feeType });
    let filterValue;
    if (feeType[0] === true) filterValue = 'free';
    else if (feeType[1] === true) filterValue = 'paid';
    else if (feeType[2] === true)
      filterValue = 'Provider subscription required';
    else filterValue = '';
    this.setState({ filterValue }, async () => {
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
    this.setState({ filterValue }, async () => {
      console.log(this.state);
      this.updateData();
    });
  };

  onProviderFilterChange = async providerList => {
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

  async onFilterChange(event) {
    const value = event.target.value;
    trackEvent('Filter Applied', 'click', `${value}`);
    this.setState({ filterValue: value }, async () => {
      console.log('Filter changed to', value);
      this.updateData();
    });
    // Call api after this.
  }

  setupDefaultFilters() {
    trackEvent('Filter Unapplied', 'click', 'clearall');
    console.log('Setting up default filters');
    // Uncheck all boxes. Reset all radios.
    this.setState(
      {
        filterValue: 'all',
        subjecttReset: true,
        feeReset: true,
        providerReset: true,
        startReset: true,
        subjects: 'all',
        providers: 'all',
        fee: 'all',
        isLevel1CheckedSubjects: false,
        checkedLevel2Subjects: subjectsData.map(s => false),
      },
      async () => {
        await this.updateData();
        this.setState({
          subjecttReset: false,
          feeReset: false,
          providerReset: false,
          startReset: false,
        });
      }
    );
  }

  /*
    This is used to update filters coming from other pages.
  */
  componentDidMount() {
    if (this.props.history.action === 'POP') {
      console.log('From back button');
      store.getItem('filterData').then(data => {
        console.log('Data from localForage', data);
        this.setState(
          {
            ...data,
          },
          () => {
            this.updateData();
          }
        );
      });
    }
    console.log('componentDidMount Call', this.state, this.props);
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
    ReactGA.ga('send', 'pageview', `/listing?q=${query.target.value}`);
    trackEvent('search', 'onSearch', 'Search_rest');

    this.setState({ q: query.target.value }, () => {
      this.updateData();
    });
  }

  getCheckedProvidersFromString() {
    const selectedProviders = this.state.providers.split('::');
    const checkedData = this.state.providerData.map(s => {
      return selectedProviders.indexOf(s) > -1;
    });
    console.log({ checkedData });
    return checkedData;
  }
  handleFilterClick = () => {
    this.setState({
      mobileFilter: !this.state.mobileFilter,
    });
  };

  filter = () => (
    <Container className="no-desktop filter-overlay mt-a">
      <Grid container>
        <Grid item xs={12} sm={3} className="filter-overlay-content">
          <Container maxWidth={'md'}>
            <Box className="border-right">
              <Typography
                style={{ fontWeight: '600' }}
                variant="h6"
                gutterBottom
              >
                Filter
                <Box onClick={this.handleFilterClick} className="filter-close">
                  ×
                </Box>
              </Typography>
              <Divider style={{ marginBottom: '25px', marginTop: '15px' }} />
              <Box
                className="click-h mt-no"
                onClick={this.setupDefaultFilters}
                style={styles.clearAll}
              >
                Clear all
              </Box>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="filter"
                  name="filter"
                  value={this.state.filterValue}
                  onChange={this.onFilterChange}
                >
                  <NestedMenu
                    shouldReset={this.state.providers !== 'all'}
                    shouldUpdate={true}
                    isLevel1Checked={this.state.providers !== 'all'}
                    checkedLevel2={this.getCheckedProvidersFromString()}
                    isOnlyOneAllowed={false}
                    level1Name={'Providers'}
                    level2List={this.state.providerData}
                    onChangeOptions={s => this.onProviderFilterChange(s)}
                  />
                  <NestedMenu
                    shouldReset={this.state.feeReset}
                    shouldUpdate={false}
                    isLevel1Checked={false}
                    isOnlyOneAllowed={true}
                    level1Name={'Fees'}
                    level2List={[
                      'Free',
                      'Paid',
                      'Provider subscription required',
                    ]}
                    onChangeOptions={s => this.onFeeFilterChange(s)}
                  />
                  <NestedMenu
                    shouldReset={this.state.startReset}
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
                    shouldReset={this.state.subjecttReset}
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
          </Container>
        </Grid>
      </Grid>
    </Container>
  );

  render() {
    console.log('HoME', this.state);
    return (
      <>
        <ScrollToTop />
        <div>
          <TopAppBar
            home={true}
            noHome={true}
            onChange={this.onSearchChange}
            isSearchIncluded={true}
            initialSearchValue={this.state.q}
          />
          {this.state.mobileFilter ? this.filter() : null}
        </div>
        {!this.state.mobileFilter ? (
          <MobileTopbar
            title="Top Courses"
            filter="true"
            onSearchChange={this.onSearchChange}
            handleFilterClick={this.handleFilterClick}
            q={this.state.q}
            lnope={true}
            onlySearch={false}
          />
        ) : null}
        <Container
          className={this.state.mobileFilter ? 'no-mobile mg' : 'mg'}
          maxWidth={'lg'}
        >
          <Grid container spacing={3}>
            <Grid className="no-mobile" item xs={12} sm={3}>
              <Box borderRight={1} style={{ borderColor: '#DCDCDC' }}>
                <Typography variant="h6" gutterBottom>
                  Filter by
                  <Box
                    className="click-h"
                    onClick={this.setupDefaultFilters}
                    style={styles.clearAll}
                  >
                    Clear all
                  </Box>
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
                      shouldReset={this.state.providers !== 'all'}
                      shouldUpdate={true}
                      isLevel1Checked={this.state.providers !== 'all'}
                      checkedLevel2={this.getCheckedProvidersFromString()}
                      isOnlyOneAllowed={false}
                      level1Name={'Providers'}
                      level2List={this.state.providerData}
                      onChangeOptions={s => this.onProviderFilterChange(s)}
                    />
                    <NestedMenu
                      shouldReset={this.state.feeReset}
                      shouldUpdate={false}
                      isLevel1Checked={false}
                      isOnlyOneAllowed={true}
                      level1Name={'Fees'}
                      level2List={[
                        'Free',
                        'Paid',
                        'Provider subscription required',
                      ]}
                      onChangeOptions={s => this.onFeeFilterChange(s)}
                    />
                    <NestedMenu
                      shouldReset={this.state.startReset}
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
                      shouldReset={this.state.subjecttReset}
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
            <Grid item xs={12} sm={8}>
              <Container>
                <Typography className="no-mobile" variant="h6" gutterBottom>
                  Top Courses
                </Typography>
              </Container>
              <Divider
                className="no-mobile"
                style={{
                  marginBottom: '25px',
                  marginTop: '15px',
                  marginLeft: '-25px',
                }}
              />
              <div className="show">
                <div>
                  <p className="col2">{this.state.totalCount} courses</p>
                </div>
              </div>
              <CourseList
                url={this.state.queryURL}
                urlChanged={true}
                handleCourseNumber={this.handleCourseNumber}
                udpateOffsets={this.udpateOffsets}
              />
            </Grid>
          </Grid>
        </Container>
        <Footer bgColor="white" />
      </>
    );
  }
}

HomePage.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
