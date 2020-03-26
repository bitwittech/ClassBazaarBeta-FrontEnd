import { Button, Container, Divider } from '@material-ui/core';
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
import TopAppBar from './AppBar';
import Typography from '@material-ui/core/Typography';
import { black } from 'material-ui/styles/colors';
import config from '../config.json';
import { store } from './../App';
import { subjectsData } from './../utils/data';
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
// 35.224.4.2
const ADDED_NETWORK_DELAY = 1500;
class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      start: 1,
      end: perPage,
      perPage: perPage,
      loading: true,
      queryURL: props.url,
      elements: [],
      isInfiniteLoading: true,
      urlChanged: this.props.urlChanged,
      isFirstLoad: true,
      isFirstResultFetched: false,
      isFromLoadMore: false,
    };
    this.getUniversityForUdemy = this.getUniversityForUdemy.bind(this);
    this.buildElements = this.buildElements.bind(this);
    this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.getElements = this.getElements.bind(this);
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
        console.log(url)
        console.log("YOYO")
        console.log('FETCH', json);
        this.props.handleCourseNumber(json.total);
        this.props.udpateOffsets(json.offset);
        return json.data.map(obj => {
          let uni = obj.university;
          if (obj.provider === 'Udemy') {
            uni = obj.instructors.join(', ');
          }
          return (
            <CourseCard
              key={obj.title}
              isInstructor={true}
              university={uni}
              courseName={obj.title}
              provider={obj.provider}
              duration={obj.commitment}
              startingOn={obj.start_date}
              price={obj.price}
              rating={obj.rating}
              uuid={obj.uuid}
              url={obj.url}
              from={'listing'}
            />
          );
        });
      });
  }

  handleInfiniteLoad() {
    let that = this;

    if (this.state.isFromLoadMore || this.state.urlChanged) {
      this.setState({
        isInfiniteLoading: true,
      });
      if (this.state.urlChanged) {
        this.setState({ elements: [] }, () => {
          if (!this.state.isFirstLoad) {
            setTimeout(() => {
              this.update(that);
            }, ADDED_NETWORK_DELAY);
          } else {
            this.update(that);
          }
        });
      } else {
        if (!this.state.isFirstLoad) {
          setTimeout(() => {
            this.update(that);
          }, ADDED_NETWORK_DELAY);
        } else {
          trackEvent('ScrollNo_listing', 'scroll', `${this.state.page * 10}`);
          this.update(that);
        }
      }
    }
  }

  getElements(newElements) {
    return this.state.elements.concat(newElements);
  }

  update(that) {
    that.buildElements().then(newElements => {
      // console.log({ newElements: newElements.map(e => e.key) });
      that.setState({
        isInfiniteLoading: false,
        elements: this.getElements(newElements),
        loading: false,
        urlChanged: false,
        page: that.state.isFirstLoad ? 1 : this.state.page + 1,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.queryURL !== nextProps.url) {
      this.setState(
        {
          queryURL: nextProps.url,
          elements: [],
          isInfiniteLoading: false,
          loading: true,
          page: 0,
          urlChanged: true,
          isFirstResultFetched: false,
          isFirstLoad: true,
        },
        () => {
          this.handleInfiniteLoad();
        }
      );
    }
  }

  getUniversityForUdemy(obj) {
    let names = obj.visible_instructors.map(i => i.name + ', ').join('');
    return names.slice(0, names.length - 2);
  }

  getCheckedProvidersFromString() {
    const selectedProviders = this.state.providers.split('::');
    const checkedData = this.state.providerData.map(s => {
      return selectedProviders.indexOf(s) > -1;
    });
    return checkedData;
  }

  elementInfiniteLoad() {
    if (this.state.isFirstLoad && !this.state.isFirstResultFetched) {
      return (
        <Grid align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              trackEvent('Infinite Load More', 'click', 'button');
              this.setState(
                {
                  isInfiniteLoading: false,
                  isFirstLoad: false,
                  isFromLoadMore: true,
                  isFirstResultFetched: true,
                },
                () => {
                  this.handleInfiniteLoad();
                }
              );
            }}
          >
            Load More
          </Button>
        </Grid>
      );
    } else {
      return (
        <Grid align="center">
          <CircularProgress />
        </Grid>
      );
    }
  }

  render() {
    return (
      <Container
        maxWidth={'lg'}
        style={{ paddingRight: '0' }}
        className="c-list"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {this.state.loading ? (
              <Grid align="center">
                <CircularProgress />
              </Grid>
            ) : this.state.elements.length > 0 ? (
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
            ) : (
                  <Grid align="center">
                    <Typography color="primary" variant="h6" gutterBottom>
                      No course found.
                </Typography>
                  </Grid>
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
