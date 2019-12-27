import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

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
  button: {
    margin: theme.spacing(3),
    textTransform: 'none',
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
      showPassword: props.showSubcriptionDialog ? false : true,
      showSubscribeButton: props.showSubcriptionDialog ? true : false,
      showBottomTwoRows: props.showSubcriptionDialog ? false : true,
      fullName: '',
      email: '',
      password: '',
    };

    this.dismissDialog = this.dismissDialog.bind(this);
    this.setupLoginDialog = this.setupLoginDialog.bind(this);
    this.setupSignUpDialog = this.setupSignUpDialog.bind(this);
    this.switchDialog = this.switchDialog.bind(this);
    this.setupSubscribeDialog = this.setupSubscribeDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: true });
    console.log({ nextProps });
    if (nextProps.showSubcriptionDialog) {
      this.setupSubscribeDialog();
    }
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
      showBottomTwoRows: true,
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
      showBottomTwoRows: true,
    });
  }

  setupSubscribeDialog() {
    this.setState({
      prefixText: '',
      linkText: '',
      buttonText: '',
      showFullName: true,
      showEmail: true,
      showPassword: false,
      showSubscribeButton: true,
      showBottomTwoRows: false,
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
                  validators={['required']}
                  fullWidth
                  id="outlined-dense"
                  label="Full Name"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={this.handleChange('fullName')}
                />
              </Grid>
            )}
            {this.state.showFullName && <Grid item xs={1}></Grid>}
            {this.state.showEmail && <Grid item xs={1}></Grid>}
            {this.state.showEmail && (
              <Grid item xs={10}>
                <TextField
                  validators={['isEmail', 'required']}
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
                  value={this.state.email}
                  onChange={this.handleChange('email')}
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
                  validators={['required', 'minStringLength:8']}
                  id="outlined-dense"
                  label="Password"
                  type="password"
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
              </Grid>
            )}
            {this.state.showPassword && <Grid item xs={1}></Grid>}
            {this.state.showBottomTwoRows && (
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} className={classes.padding}>
                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    color="primary"
                    className={classes.buttonStyle}
                    onClick={() => this.props.onLoginOrSignupClick(this.state)}
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
                      onClick={() =>
                        this.props.onLoginOrSignupGoogle(this.state)
                      }
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
                      onClick={() =>
                        this.props.onLoginOrSignupFacebook(this.state)
                      }
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
                  <Grid></Grid>
                </Grid>
              </Grid>
            )}
            {!this.state.showBottomTwoRows && (
              <Grid container justify="center" alignItems="center">
                <Button
                  onClick={this.props.onSubscribeClick}
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  Stay Updated on Newest Courses and Certificates
                </Button>
              </Grid>
            )}
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
