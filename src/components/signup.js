import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  input: {
    color: 'white',
    borderColor: 'white !important',
  },
  cssLabel: {
    color: 'white',
  },
  cross: {
    color: 'white',
  },
  padding: {
    padding: '10px',
  },
  buttonStyle: {
    borderRadius: 0,
    borderWidth: 2,
  },
  icon: {
    margin: theme.spacing(2),
    color: '#FFF',
  },
});

class SignUp extends Component {
  constructor(props) {
    console.log('Constructor called');
    super(props);
    this.state = {
      data: [],
      prefixText: 'Already have an account?',
      linkText: 'Log In here',
      buttonText: 'Sign Up',
      state: 0, //0: Signup, 1: LoginIn, 2; Subscribe
      open: true,
      showFullName: true,
      showEmail: true,
      showPassword: true,
      showSubscribeButton: false,
    };

    this.dismissDialog = this.dismissDialog.bind(this);
    this.setupLoginDialog = this.setupLoginDialog.bind(this);
    this.setupSignUpDialog = this.setupSignUpDialog.bind(this);
    this.switchDialog = this.switchDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: true });
  }

  dismissDialog() {
    this.setState({ open: false });
  }

  setupSignUpDialog() {
    this.setState({
      prefixText: 'Already have an account?',
      linkText: 'Log In here',
      buttonText: 'Sign Up',
      showFullName: true,
      showEmail: true,
      showPassword: true,
      showSubscribeButton: false,
    });
  }

  setupLoginDialog() {
    this.setState({
      prefixText: 'First time here?',
      linkText: 'Create a Class Bazaar Account',
      buttonText: 'Login',
      showFullName: false,
      showEmail: true,
      showPassword: true,
      showSubscribeButton: false,
    });
  }

  setupSubscribeDialog() {
    this.setState({
      prefixText: '',
      linkText: '',
      buttonText: 'Login',
      showFullName: false,
      showEmail: true,
      showPassword: false,
      showSubscribeButton: true,
    });
  }

  switchDialog() {
    console.log(this.state.buttonText);
    if (this.state.buttonText === 'Login') {
      this.setupSignUpDialog();
    } else {
      this.setupLoginDialog();
    }
  }

  render() {
    const { classes } = this.props;
    console.log('Rendering Signup');
    console.log(this.state);
    return (
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: '#070000',
            boxShadow: 'none',
            opacity: 0.5,
          },
        }}
        open={this.props.open && this.state.open}
      >
        <form id="my-form-id" onSubmit={this.onSubmit}>
          <Grid container>
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
              <CloseIcon
                onClick={this.dismissDialog}
                className={classes.padding}
                color={'primary'}
                classes={{
                  colorPrimary: classes.cross,
                }}
              />
            </Grid>
            {this.state.showFullName && <Grid item xs={1}></Grid>}
            {this.state.showFullName && (
              <Grid item xs={10}>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.input,
                      notchedOutline: classes.input,
                      root: classes.cssOutlinedInput,
                      focused: classes.cssLabel,
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssLabel,
                    },
                  }}
                  fullWidth
                  id="outlined-dense"
                  label="Full Name"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            )}
            {this.state.showFullName && <Grid item xs={1}></Grid>}
            {this.state.showEmail && <Grid item xs={1}></Grid>}
            {this.state.showEmail && (
              <Grid item xs={10}>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.input,
                      notchedOutline: classes.input,
                      root: classes.cssOutlinedInput,
                      focused: classes.cssLabel,
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssLabel,
                    },
                  }}
                  fullWidth
                  id="outlined-dense"
                  label="Email"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            )}
            {this.state.showEmail && <Grid item xs={1}></Grid>}
            {this.state.showPassword && <Grid item xs={1}></Grid>}
            {this.state.showPassword && (
              <Grid item xs={10}>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.input,
                      notchedOutline: classes.input,
                      root: classes.cssOutlinedInput,
                      focused: classes.cssLabel,
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssLabel,
                    },
                  }}
                  fullWidth
                  id="outlined-dense"
                  label="Password"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            )}
            {this.state.showPassword && <Grid item xs={1}></Grid>}
            <Grid item xs={1}></Grid>
            <Grid item xs={4} className={classes.padding}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="primary"
                className={classes.buttonStyle}
                onClick={this.props.onSignupClick}
              >
                <b>{this.state.buttonText}</b>
              </Button>
            </Grid>
            <Grid item xs={3} className={classes.padding}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <Typography variant="body2" color="primary">
                  <Box height="100%" fontWeight="fontWeightBold">
                    or with
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <Icon
                  className="fa fa-google-plus"
                  style={{ color: 'white', width: '100%' }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <Icon
                  className="fa fa-facebook"
                  style={{ color: 'white', width: '100%' }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12} style={{ padding: 20 }}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{
                  height: '100%',
                }}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  style={{
                    color: 'white',
                    verticalAlign: 'middle',
                    display: 'inline-flex',
                  }}
                >
                  <Box
                    height="100%"
                    fontWeight="fontWeightlight"
                    fontStyle="italic"
                  >
                    {this.state.prefixText}
                  </Box>
                  <Box
                    style={{ color: 'white', textDecoration: 'underline' }}
                    onClick={this.switchDialog}
                    height="100%"
                    fontWeight="fontWeightlight"
                    fontStyle="italic"
                    underline="always"
                  >
                    {this.state.linkText}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
