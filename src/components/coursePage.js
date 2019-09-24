import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactHtmlParser from 'react-html-parser';
import getClosestNextRun from './../utils/edxUtils';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ProviderIcon from '@material-ui/icons/Assignment';
import PlusIcon from '@material-ui/icons/Add';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { titleCase } from './../utils/utils';
import formatDate from './../utils/dateUtils';
import Button from '@material-ui/core/Button';
import TopAppBar from './appBar';
import Fab from '@material-ui/core/Fab';

const styles = theme => {
  return {
    spacing: 8,
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  };
};

const summaryStyles = {
  icon: {
    marginLeft: 20,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  iconBig: {
    marginLeft: 40,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 30,
  },
  filter: {
    background: '#00000005',
    paddingBottom: 20,
  },
};

function getHeader(header) {
  return (
    <Typography variant="body1">
      <Box fontWeight="fontWeightBold">{header}</Box>
    </Typography>
  );
}

function getBold(text) {
  return (
    <Typography variant="body1">
      <Box fontWeight="fontWeightBold">{text}</Box>
    </Typography>
  );
}

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      closestRun: undefined,
    };
    this.renderEdx = this.renderEdx.bind(this);
    this.renderFL = this.renderFL.bind(this);
    this.getSummary = this.getSummary.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    console.log('Inside course page');
    console.log(this.props.location.state);
    const uuid = this.props.location.state.uuid;
    const provider = this.props.location.state.provider;
    var url = `http://167.71.231.7:8080/api/course?uuid=${uuid}&provider=${provider}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json.data });
        if (provider === 'EDx') {
          let closestRun = getClosestNextRun(this.state.data.course_runs);
          this.setState({ closestRun });
        }
      });
  }

  getReviews() {
    return (
      <div>
        <br></br>
        <Grid>
          {getHeader('Reviews')}
          <Grid container style={{ padding: 20, background: '#00000015' }}>
            <Grid item xs={3}>
              <Grid item xs={12}>
                {/* <Fab color="primary" aria-label="add" className={classes.fab}>
                  <AddIcon />
                </Fab> */}
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Box style={{ padding: 30 }}>
                Natus error sit voluptartem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore.
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  getSummary() {
    return (
      <Grid item xs={3}>
        <Grid style={summaryStyles.filter}>
          <Box style={{ padding: 20 }} borderTop={3} borderColor="primary">
            <Typography spacing={1} variant="h6" color="#FFA502">
              {getBold('At a Glance')}
            </Typography>
          </Box>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <WatchLaterIcon style={summaryStyles.icon} color="primary" />
            <Typography spacing={1} variant="body2">
              {getBold(titleCase(this.props.location.state.duration))}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CalendarIcon style={summaryStyles.icon} color="primary" />
            <Typography spacing={1} variant="h6">
              {getBold(
                ` Starts on ${formatDate(
                  new Date(this.props.location.state.startingOn),
                  'MMMM d'
                )}`
              )}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MoneyIcon style={summaryStyles.icon} color="primary" />
            <Typography spacing={1} variant="h6">
              {getBold(
                this.props.location.state.price === '' ||
                  this.props.location.state.price === null
                  ? 'Free'
                  : this.props.location.state.price
              )}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ProviderIcon style={summaryStyles.icon} color="primary" />
            <Typography spacing={1} variant="h6">
              {getBold(this.props.location.state.provider)}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PlusIcon style={summaryStyles.iconBig} color="primary" />
            <Button variant="contained" color="primary">
              <Box>Enroll Now</Box>
              <ArrowForward />
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }

  renderFL() {
    return (
      <div>
        <TopAppBar onChange={this.onSearchChange} />
        {this.state.data !== undefined && (
          <Grid container spacing={2} style={{ margin: 20 }}>
            <Grid item xs={8}>
              <Typography variant="title" component="h2">
                {this.state.data.name}
              </Typography>
              <Typography variant="body2">
                <Box display="inline" fontWeight="fontWeightBold">
                  {this.state.data.organisation.name}{' '}
                </Box>
                <Box display="inline" fontStyle="oblique">
                  via {this.props.location.state.provider}
                </Box>
              </Typography>
              <br></br>
              {getHeader('Course Overview')}
              <Typography variant="body2">
                <Box>
                  {ReactHtmlParser(this.state.data.description, {
                    transform: node => {
                      console.log({ node });
                      if (node.name === 'h2') {
                        return <Box>{node.children[0].data}</Box>;
                      }
                    },
                  })}
                </Box>
              </Typography>
              <br></br>
              {getHeader('What will you learn?')}
              {this.state.data.learning_outcomes.map((obj, index) => (
                <Typography variant="body2">
                  <Box>{` - ${obj}`}</Box>
                </Typography>
              ))}
              <br></br>
              {getHeader('Who is this course for?')}
              <Typography variant="body2">
                <Box>{this.state.data.requirements}</Box>
              </Typography>
              {this.state.data.educator !== '' && (
                <div>
                  <br></br>
                  {getHeader('Professor')}
                  <Typography variant="body2">
                    <Box>{this.state.data.educator}</Box>
                  </Typography>
                </div>
              )}
              {this.getReviews()}
            </Grid>
            {this.getSummary()}
          </Grid>
        )}
      </div>
    );
  }

  renderEdx() {
    return (
      <div>
        <TopAppBar onChange={this.onSearchChange} />
        {this.state.data !== undefined && (
          <Grid container spacing={2} style={{ margin: 20 }}>
            <Grid item xs={8}>
              <Typography variant="title" component="h2">
                {this.state.data.title}
              </Typography>
              <Typography variant="body2">
                <Box display="inline" fontWeight="fontWeightBold">
                  {this.state.data.owners[0].name}{' '}
                </Box>
                <Box display="inline" fontStyle="oblique">
                  via {this.props.location.state.provider}
                </Box>
              </Typography>
              <br></br>
              {getHeader('Course Overview')}
              <Typography variant="body2">
                <Box>
                  {ReactHtmlParser(this.state.data.full_description, {
                    transform: node => {
                      if (node.name === 'h2' || node.name === 'h3') {
                        // console.log({ node });
                        return <Box>{node.children[0].children[0].data}</Box>;
                      }
                      if (node.name === 'br') {
                        return null;
                      }
                      if (node.name === 'strong') {
                        console.log({ node });
                        return <Box>{node.children[0].data}</Box>;
                      }
                    },
                  })}
                </Box>
              </Typography>
              {this.state.data.outcome !== '' && (
                <div>
                  {getHeader('What will you learn?')}
                  <Typography variant="body2">
                    <Box>
                      {ReactHtmlParser(this.state.data.outcome, {
                        transform: node => {
                          // console.log({ node });
                          if (node.name === 'h2') {
                            return <Box>{node.children[0].data}</Box>;
                          }
                        },
                      })}
                    </Box>
                  </Typography>
                </div>
              )}
              {this.state.data.prerequisites_raw !== '' && (
                <div>
                  {getHeader('Prerequisites')}
                  <Typography variant="body2">
                    <Box>{this.state.data.prerequisites_raw}</Box>
                  </Typography>
                </div>
              )}
              {this.state.closestRun !== undefined && (
                <div>
                  {getHeader('Professor')}
                  {this.state.closestRun.staff.map((obj, index) => (
                    <Typography variant="body2">
                      <Box>{`${obj.given_name}`}</Box>
                    </Typography>
                  ))}
                </div>
              )}
              {this.getReviews()}
            </Grid>
            {this.getSummary()}
          </Grid>
        )}
      </div>
    );
  }

  render() {
    if (this.props.location.state.provider === 'EDx') return this.renderEdx();
    if (this.props.location.state.provider === 'FutureLearn')
      return this.renderFL();
  }
}

CoursePage.propTypes = {};

export default CoursePage;
