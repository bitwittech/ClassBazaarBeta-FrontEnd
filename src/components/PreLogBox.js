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
import { Pre_LOG_Box } from '../store/Types';
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

const PreLogBox = () => {
  const { state, dispatch } = useContext(Store);
 
  const { preLogBox } = state;
 
  const classes = useStyles();

  const [modal, setModal] = useState({
    state: 0, //0 - Login 1-Signup
    formData: {
      username: '',
      password: '',
      phone: '',
      email: ''
    },
    errors: {
      username: null,
      password: null,
      phone: null,
      email: null
    },
  });

  useEffect(() => {
    setModal({ ...modal, state: preLogBox.state });
  }, []);
  console.log(modal.state);

  
  const handleClose = () => {
    return dispatch({
      type: Pre_LOG_Box,
      payload: {
        state: preLogBox.state,
        open: false,
      },
    });
  };

 

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
    // console.log("==="+modal.formData.refferral);

  };

  const handleSubmit = async e => {
    e.preventDefault();
   
  
    if (preLogBox.state === 1) {
      await register(modal.formData, dispatch);
      await signin(modal.formData, dispatch);
      handleClose();
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
        open={preLogBox.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={preLogBox.open}>
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
                  {preLogBox.state === 1 ? (
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
                  {preLogBox.state === 1 ? (
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
                  
                  

                  

                  

                  <Typography
                    className="link-button"
                    variant="body2"
                    gutterBottom
                    style={{ marginTop: '10px' }}
                  >
                    Forgot password?
                  </Typography>
                  {preLogBox.state === 0 ? (
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
                  {preLogBox.state === 1 ? (
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
                 
                </Grid>
                {preLogBox.state === 0 ? (
                  <Typography
                    className="link-button"
                    variant="body2"
                    gutterBottom
                    onClick={() => {
                      dispatch({
                        type: Pre_LOG_Box,
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
                {preLogBox.state === 1 ? (
                  <Typography
                    className="link-button"
                    variant="body2"
                    gutterBottom
                    onClick={() => {
                      dispatch({
                        type: Pre_LOG_Box,
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

export default PreLogBox;