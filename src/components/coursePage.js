import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactHtmlParser from 'react-html-parser';

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

function getHeader(header) {
  return (
    <Typography variant="body1">
      <Box fontWeight="fontWeightBold">{header}</Box>
    </Typography>
  );
}

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    const uuid = this.props.location.state.uuid;
    const provider = this.props.location.state.provider;
    var url = `http://167.71.231.7:8080/api/course?uuid=${uuid}&provider=${provider}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json.data });
      });
  }

  render() {
    return (
      <div>
        {this.state.data !== undefined && (
          <Grid container spacing={2} style={{ margin: 20 }}>
            <Grid item xs={8}>
              <Typography variant="subtitle1" component="h6">
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
              {getHeader('What will you learn?')}
              {this.state.data.learning_outcomes.map((obj, index) => (
                <Typography variant="body2">
                  <Box>{` - ${obj}`}</Box>
                </Typography>
              ))}
              {getHeader('Who is this course for?')}
              <Typography variant="body2">
                <Box>{this.state.data.requirements}</Box>
              </Typography>
              {this.state.data.educator !== '' && (
                <div>
                  {getHeader('Professor')}
                  <Typography variant="body2">
                    <Box>{this.state.data.educator}</Box>
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={3}>
              <Box style={{ padding: 20 }} borderTop={3}>
                At a Glance
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

CoursePage.propTypes = {};

export default CoursePage;
