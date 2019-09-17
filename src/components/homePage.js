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
      data: [],
      page: 0,
      start: 0,
      end: perPage,
      perPage: perPage,
      filterValue: 'all',
    };
    this.getUniversityForUdemy = this.getUniversityForUdemy.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  updateData() {
    const page = this.state.page;
    const range = JSON.stringify([
      page * this.state.perPage,
      (page + 1) * this.state.perPage,
    ]);
    var url = `http://167.71.231.7:8080/api/courses/?range=${range}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json.data, total: json.total });
      });
  }

  onFilterChange(event) {
    this.setState({ filterValue: event.target.value });
    // Call api after this.
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

  render() {
    return (
      <Grid container>
        <Grid item xs={8}>
          {this.state.data.length > 0 &&
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
            })}
        </Grid>
        <Grid item xs={4}>
          <Box border={1} {...defaultProps}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Filters</FormLabel>
              <RadioGroup
                aria-label="filter"
                name="filter"
                value={this.state.filterValue}
                onChange={this.onFilterChange}
              >
                <FormControlLabel
                  value="free"
                  control={<Radio />}
                  label="Free Courses"
                />
                <FormControlLabel
                  value="flexible"
                  control={<Radio />}
                  label="Start Date/Flexible"
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio />}
                  label="Paid Certificates"
                />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        {this.state.data.length > 0 && (
          <Grid container spacing={16}>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Pagination
                classes={{ colorInherit: { color: black } }}
                currentPageColor={'inherit'}
                limit={this.state.perPage}
                offset={this.state.page * this.state.perPage}
                total={this.state.total}
                nextPageLabel={<ArrowForward fontSize="inherit" />}
                previousPageLabel={<ArrowBack fontSize="inherit" />}
                onClick={(e, offset, page) => this.handlePageChange(page - 1)}
              />
            </Grid>
            <Grid item xs={4} />
          </Grid>
        )}
        <Grid container spacing={16} />
      </Grid>
    );
  }
}

HomePage.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
