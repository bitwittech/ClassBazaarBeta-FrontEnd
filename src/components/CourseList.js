import { Container, Divider } from '@material-ui/core';
import React, { Component } from 'react';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CourseCard from './ProfileCourseCard';
import Footer from './Footer';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Infinite from 'react-infinite';
import NestedMenu from './nestedCheckbox';
import Pagination from 'material-ui-flat-pagination';
import RadioGroup from '@material-ui/core/RadioGroup';
import TopAppBar from './appBar';
import Typography from '@material-ui/core/Typography';
import { black } from 'material-ui/styles/colors';
import config from '../config.json';
import { store } from './../App';
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

class CourseList extends Component {
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
      queryURL: props.url,
      elements: [],
      isInfiniteLoading: true,
    };
    this.getUniversityForUdemy = this.getUniversityForUdemy.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.buildElements = this.buildElements.bind(this);
    this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
  }

  async buildElements() {
    const page = this.state.page;
    const range = JSON.stringify([
      page * this.state.perPage,
      (page + 1) * this.state.perPage,
    ]);
    var url = this.state.queryURL + `&range=${range}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ page: page + 1 });
        return json.data.map(obj => {
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
              url={obj.url}
            />
          );
        });
      });
  }

  handleInfiniteLoad() {
    let that = this;
    this.setState({
      isInfiniteLoading: true,
    });
    this.buildElements().then(newElements => {
      console.log({ newElements });

      this.setState({
        isInfiniteLoading: false,
        elements: that.state.elements.concat(newElements),
      });
    });
  }

  updateData() {
    const page = this.state.page;
    const range = JSON.stringify([
      page * this.state.perPage,
      (page + 1) * this.state.perPage,
    ]);
    var url = this.state.queryURL + `&range=${range}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json.data, total: json.total, loading: false });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(
        {
          queryURL: nextProps.url,
          elements: [],
          isInfiniteLoading: false,
        },
        async () => {
          this.updateData();
          this.handleInfiniteLoad();
        }
      );
    }
  }

  componentDidMount() {
    this.updateData();
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

  getCheckedProvidersFromString() {
    const selectedProviders = this.state.providers.split('::');
    const checkedData = this.state.providerData.map(s => {
      return selectedProviders.indexOf(s) > -1;
    });
    console.log({ checkedData });
    return checkedData;
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item">Loading...</div>;
  }

  render() {
    console.log('Rendering now');
    return (
      <Container maxWidth={'lg'} style={{ paddingRight: '0' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {this.state.elements.length > 0 && (
              <Infinite
                elementHeight={161}
                useWindowAsScrollContainer={true}
                infiniteLoadBeginEdgeOffset={200}
                onInfiniteLoad={this.handleInfiniteLoad}
                loadingSpinnerDelegate={this.elementInfiniteLoad()}
                isInfiniteLoading={this.state.isInfiniteLoading}
              >
                {this.state.elements}
              </Infinite>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

CourseList.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseList);
