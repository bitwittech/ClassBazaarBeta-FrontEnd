import React, { useContext, useState, useEffect } from 'react';
// import { Popup } from 'jso';
import {
  register,
  signin,
  googleLogin,
  facebookLogin,
} from '../actions/ContextActions';
import config from '../config.json';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { LOGIN_MODAL } from '../store/Types';
import Modal from '@material-ui/core/Modal';
import Store from '../store/Context';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { googleClient, facebookClient } from '../utils/oauth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { trackEvent } from 'react-with-analytics';
import { GoogleLogin } from 'react-google-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: '8px',
    width: '40%',
    margin: '0',
  },
  button: {
    padding: '10px 20px',
    textTransform: 'none',
  },
  loginButton: {
    margin: theme.spacing(1),
    padding: '10px 20px',
    width: '30%',
    textTransform: 'none',
  },
  input: {
    display: 'none',
  },
  social: {
    padding: '10px 20px',
    textTransform: 'none',
  },
}));

const Login = () => {
  const { state, dispatch } = useContext(Store);
  const { loginModal } = state;
  const classes = useStyles();
  const [modal, setModal] = useState({
    state: 0, //0 - Login 1-Signup
    formData: {
      username: '',
      password: '',
      phone: '',
      email: '',
      school: '',
      city: '',
      gender: '',
      classYear: ''
    },
    errors: {
      username: null,
      password: null,
      phone: null,
      email: null,
      school: null,
      city: null
    },
  });
  console.log(loginModal);
  useEffect(() => {
    setModal({ ...modal, state: loginModal.state });
  }, []);
  console.log(modal.state);
  const handleClose = () => {
    dispatch({
      type: LOGIN_MODAL,
      payload: {
        state: loginModal.state,
        open: false,
      },
    });
  };

  const responseFacebook = res => {
    facebookLogin(res, dispatch);
    trackEvent('social-icon', 'click', 'facebook');
  };

  const responseLinkedin = data => {
    console.log(data);
  };
  const handleLinkedInFailure = data => {
    console.log(data);
  };

  const setGender = e => {
    modal.formData.gender = e.target.value;
  }

  const setClassYear = e => {
    modal.formData.classYear = e.target.value;
    console.log(modal.formData)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    const errors = modal.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    const phoneRegex = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
    switch (name) {
      case 'username':
        errors.username = !value.toString().trim().length
          ? 'Username required'
          : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Invalid email';
        break;
      case 'phone':
        errors.phone = phoneRegex.test(value) ? '' : 'Invalid phone';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long' : '';
      case 'city':
        errors.city = !value.toString().trim().length
          ? 'City required'
          : '';
        break;
      case 'school':
        errors.school = !value.toString().trim().length
          ? 'School required'
          : '';
        break;
      default:
        break;
    }
    setModal({
      ...modal,
      formData: {
        ...modal.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (loginModal.state === 0) {
      await signin(modal.formData, dispatch);
    }
    if (loginModal.state === 1) {
      await register(modal.formData, dispatch);
    }

    setModal({
      ...modal,
      formData: {
        username: '',
        password: '',
        phone: '',
        email: '',
      },
    });
  };
  console.log('STATE', state.loading);
  const responseGoogle = res => {
    googleLogin(res, dispatch);
    trackEvent('social-icon', 'click', 'google');
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginModal.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginModal.open}>
          <div className={classes.paper}>
            <Container maxWidth="sm">
              <Typography component="div" align="center">
                <Typography
                  style={{
                    fontWeight: '600',
                    fontSize: '12px',
                    color: '#888888',
                  }}
                  variant="subtitle1"
                  gutterBottom
                >
                  Stay ahead of the curve! Get personalized course
                  recommendations, track subjects and more.
                </Typography>

                

                <form onSubmit={handleSubmit}>
                  {loginModal.state === 1 ? (
                    <>
                      <Typography
                        style={{
                          fontWeight: '900',
                          fontSize: '12px',
                        }}
                        color="primary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        User Name
                      </Typography>
                      <input
                        type="text"
                        name="username"
                        value={modal.formData.username}
                        onChange={handleChange}
                        className="text-field"
                        placeholder="Enter your User name"
                        required
                      />
                      <div className="color-red">{modal.errors.username}</div>
                    </>
                  ) : null}

                  <Typography
                    style={{
                      fontWeight: '900',
                      fontSize: '12px',
                      marginTop: '6px',
                    }}
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                  >
                    Email ID
                  </Typography>
                  <input
                    onChange={handleChange}
                    name="email"
                    value={modal.formData.email}
                    type="email"
                    className="text-field"
                    placeholder="Enter your Email ID"
                    required
                  />
                  <div className="color-red">{modal.errors.email}</div>
                  {loginModal.state === 1 ? (
                    <>
                      {' '}
                      <Typography
                        style={{
                          fontWeight: '900',
                          fontSize: '12px',
                          marginTop: '6px',
                        }}
                        color="primary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        Mobile Number
                      </Typography>
                      <input
                        type="text"
                        name="phone"
                        value={modal.formData.phone}
                        onChange={handleChange}
                        className="text-field"
                        placeholder="Enter your number"
                        required
                      />
                      <div className="color-red">{modal.errors.phone}</div>
                    </>
                  ) : null}

                  {loginModal.state === 1 ? (
                  <>
                  {' '}
                  <Typography
                    style={{
                      fontWeight: '900',
                      fontSize: '12px',
                      marginTop: '6px',
                    }}
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                  >
                    Gender
                  </Typography>
                  <select className="select-box"
                        onChange={setGender}>
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  </>
                  ): null}

                  {loginModal.state === 1 ? (
                                    <>
                                    {' '}
                  <Typography
                    style={{
                      fontWeight: '900',
                      fontSize: '12px',
                      marginTop: '6px',
                    }}
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                  >
                    Class
                  </Typography>
                  <select className="select-box"
                        onChange={setClassYear}>
                    <option value="">--Select Class/Year--</option>
                    <option value="class_6">Class - 6</option>
                    <option value="class_7">Class - 7</option>
                    <option value="class_8">Class - 8</option>
                    <option value="class_9">Class - 9</option>
                    <option value="class_10">Class - 10</option>
                    <option value="class_11">Class - 11</option>
                    <option value="class_12">Class - 12</option>
                    <option value="college_1">Year - 1</option>
                    <option value="college_2">Year - 2</option>
                    <option value="college_3">Year - 3</option>
                    <option value="college_4">Year - 4</option>
                    <option value="college_5">Year - 5</option>
                  </select>
                                    </>
                  ): null}

                  <Typography
                    style={{
                      fontWeight: '900',
                      fontSize: '12px',
                      marginTop: '6px',
                    }}
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                  >
                    Password
                  </Typography>
                  <input
                    name="password"
                    value={modal.formData.password}
                    type="password"
                    className="text-field"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    minLength={8}
                  />
                  <div className="color-red">{modal.errors.password}</div>
                  
                  {loginModal.state === 1 ? (
                  <>
                  {' '}
                  <Typography
                    style={{
                      fontWeight: '900',
                      fontSize: '12px',
                      marginTop: '6px',
                    }}
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                  >
                    School Name
                  </Typography>
                  <input
                    name="school"
                    value={modal.formData.school}
                    type="text"
                    className="text-field"
                    onChange={handleChange}
                    placeholder="Enter your School Name"
                  />
                  <div className="color-red">{modal.errors.school}</div>
                  </>
                  ): null}

                  {loginModal.state === 1 ? (
                                    <>
                                    {' '}
                                    <Typography
                                      style={{
                                        fontWeight: '900',
                                        fontSize: '12px',
                                        marginTop: '6px',
                                      }}
                                      color="primary"
                                      variant="subtitle1"
                                      gutterBottom
                                    >
                                      City
                                    </Typography>
                                    <input
                                      name="city"
                                      value={modal.formData.city}
                                      type="text"
                                      className="text-field"
                                      onChange={handleChange}
                                      placeholder="Enter your City"
                                    />
                                    <div className="color-red">{modal.errors.city}</div>
                                    </>
                  ): null}

                  <Typography
                    className="link-button"
                    variant="body2"
                    gutterBottom
                    style={{ marginTop: '10px' }}
                  >
                    Forgot password?
                  </Typography>
                  {loginModal.state === 0 ? (
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      className={classes.loginButton}
                    >
                      {!state.loading ? (
                        'Login'
                      ) : (
                          <CircularProgress color="white" size={'1.5rem'} />
                        )}
                    </Button>
                  ) : null}
                  {loginModal.state === 1 ? (
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      className={classes.loginButton}
                    >
                      {!state.loading ? (
                        'Register'
                      ) : (
                          <CircularProgress color="white" size={'1.5rem'} />
                        )}
                    </Button>
                  ) : null}
                </form>

                <Grid style={{ marginTop: '20px' }} container spacing={3}>
                  <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
                  <LinkedIn
                  clientId="81vr4cluxkzpau"
                  onFailure={handleLinkedInFailure}
                  className="btn-l"
                  onSuccess={responseLinkedin}
                  redirectUri="http://localhost:3000"
                  scope="r_emailaddress"
                >
                  <Button
                    variant="contained"
                    style={{ background: '#0077B6', color: 'white' }}
                    className={classes.button}
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </Button>
                </LinkedIn>
                </Grid>
                  <Grid item xs={12} sm={4}>
                   
                    <FacebookLogin
                      appId={config.fbAppId}
                      autoLoad={false}
                      callback={responseFacebook}
                      scope="public_profile"
                      render={renderProps => (
                        <Button
                          variant="contained"
                          style={{ background: '#4267B3', color: 'white' }}
                          className={classes.social}
                          onClick={renderProps.onClick}
                        >
                          <i class="fab fa-facebook-f"></i>
                        </Button>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ textAlign: 'left' }}>
                    <GoogleLogin
                      clientId={config.GOAUTH}
                      render={renderProps => (
                        <Button
                          variant="contained"
                          style={{ background: '#DD6D5C', color: 'white' }}
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className={classes.social}
                        >
                          <i class="fab fa-google" aria-hidden="true"></i>
                        </Button>
                      )}
                      onSuccess={responseGoogle}
                      onFailure={() => {
                        dispatch({
                          type: 'ALERT',
                          payload: {
                            varient: 'error',
                            message: 'Login failed',
                          },
                        });
                        dispatch({
                          type: 'LOGOUT',
                        });
                      }}
                      autoLoad={false}
                      cookiePolicy={'single_host_origin'}
                    />
                  </Grid>
                </Grid>
                {loginModal.state === 0 ? (
                  <Typography
                    className="link-button"
                    variant="body2"
                    gutterBottom
                    onClick={() => {
                      dispatch({
                        type: LOGIN_MODAL,
                        payload: {
                          state: 1,
                          open: true,
                        },
                      });
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    Create a Class Bazaar account.
                  </Typography>
                ) : null}
                {loginModal.state === 1 ? (
                  <Typography
                    className="link-button"
                    variant="body2"
                    gutterBottom
                    onClick={() => {
                      dispatch({
                        type: LOGIN_MODAL,
                        payload: {
                          state: 0,
                          open: true,
                        },
                      });
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    Already got an account? Login.
                  </Typography>
                ) : null}
              </Typography>
            </Container>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Login;
