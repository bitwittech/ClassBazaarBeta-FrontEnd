import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import AppBar from './appBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Typography, Grid } from '@material-ui/core';
import {
  register,
  signin,
  googleLogin,
  facebookLogin,
} from '../actions/ContextActions';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Store from '../store/Context';
import { trackEvent } from 'react-with-analytics';
import config from '../config.json';
import ForgotPassword from './ForgotPassword';
const MobileAuth = () => {
  const global = useContext(Store);
  const [state, setState] = useState({ state: 0 });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [modal, setModal] = useState({
    state: 0, //0 - Login 1-Signup
    formData: {
      username: '',
      password: '',
      phone: '',
      email: '',
    },
    errors: {
      username: null,
      password: null,
      phone: null,
      email: null,
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(modal.formData);
    console.log(state);
    if (state.state === 0) {
      signin(modal.formData, global.dispatch);
    }
    if (state.state === 1) {
      register(modal.formData, global.dispatch);
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
  if (window.innerWidth >= 760) return <Redirect to="/"></Redirect>;

  const handlePopupClose = () => {
    setForgotPassword(false);
  };

  const responseFacebook = res => {
    facebookLogin(res, global.dispatch);
    trackEvent('social-icon', 'click', 'facebook');
  };

  const responseGoogle = res => {
    googleLogin(res, global.dispatch);
    trackEvent('social-icon', 'click', 'google');
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
  };
  if (global.state.isAuth) return <Redirect to="/" />;
  return (
    <div className="no-desktop margin-toper">
      <ForgotPassword
        openState={forgotPassword}
        handlePopupClose={handlePopupClose}
      />
      <AppBar noHome={true} />
      <Container maxWidth={'lg'} align="center">
        {state.state === 0 ? (
          <Typography
            style={{ marginTop: '30px', fontWeight: '500', fontSize: '30px' }}
            variant="h5"
            gutterBottom
          >
            {' '}
            Login
          </Typography>
        ) : (
          <Typography
            style={{ marginTop: '30px', fontWeight: '500', fontSize: '30px' }}
            variant="h5"
            gutterBottom
          >
            {' '}
            Signup
          </Typography>
        )}
        <Typography
          style={{
            fontWeight: '600',
            fontSize: '12px',
            color: '#888888',
            textAlign: 'center',
          }}
          variant="subtitle1"
          gutterBottom
        >
          Sign-in via Linked-in to receive
          <br /> personalised course recommendation
        </Typography>
        <Button
          variant="contained"
          style={{
            background: '#0077B6',
            color: 'white',
            textTransform: 'none',
            boxShadow: 'none',
            fontWeight: '600',
            padding: '10px 10px',
            marginTop: '16px',
          }}
        >
          <i class="fab fa-linkedin-in"></i>&nbsp; Connect Linked-In
        </Button>
        <form onSubmit={handleSubmit}>
          {state.state === 1 ? (
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
                value={modal.formData.username}
                onChange={handleChange}
                name="username"
                className="text-field"
                style={{ width: '250px' }}
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
              marginTop: '20px',
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
            style={{ width: '250px' }}
            className="text-field"
            placeholder="Enter your Email ID"
            required
          />
          <div className="color-red">{modal.errors.email}</div>
          {state.state === 1 ? (
            <>
              {' '}
              <Typography
                style={{
                  fontWeight: '900',
                  fontSize: '12px',
                  marginTop: '20px',
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
                style={{ width: '250px' }}
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
              marginTop: '20px',
            }}
            color="primary"
            variant="subtitle1"
            gutterBottom
          >
            Password
          </Typography>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={modal.formData.password}
            className="text-field"
            style={{ width: '250px' }}
            placeholder="Enter your password"
            minLength={8}
          />
          <div className="color-red">{modal.errors.password}</div>
          {state.state === 0 ? (
            <Typography
              className="link-button"
              variant="body2"
              gutterBottom
              style={{ marginTop: '10px' }}
              onClick={() => {
                setForgotPassword(true);
              }}
            >
              Forgot password?
            </Typography>
          ) : null}
          {state.state === 0 ? (
            <Button
              style={{
                width: '170px',
                padding: '10px 10px',
                paddingRight: '13px',
                marginBottom: '20px',
                textTransform: 'none',
                fontWeight: '600',
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              {!state.loading ? (
                'Login'
              ) : (
                <CircularProgress color="white" size={'1.5rem'} />
              )}
            </Button>
          ) : null}
          {state.state === 1 ? (
            <Button
              style={{
                width: '170px',
                padding: '10px 10px',
                paddingRight: '13px',
                marginBottom: '20px',
                textTransform: 'none',
                marginTop: '20px',
                fontWeight: '600',
              }}
              variant="contained"
              type="submit"
              color="primary"
            >
              {!state.loading ? (
                'Register'
              ) : (
                <CircularProgress color="white" size={'1.5rem'} />
              )}
            </Button>
          ) : null}
        </form>
        <Grid container spacing={2}>
          <Grid item xs={6} align="right">
            <FacebookLogin
              appId={config.fbAppId}
              autoLoad={false}
              callback={responseFacebook}
              scope="public_profile"
              render={renderProps => (
                <Button
                  variant="contained"
                  style={{
                    background: '#fff',
                    border: '#4267B3 2px solid',
                    color: '#4267B3',
                    padding: '20px 30px',
                  }}
                  onClick={renderProps.onClick}
                >
                  <i class="fab fa-facebook-f"></i>
                </Button>
              )}
            />
          </Grid>

          <Grid item xs={6} align="left">
            <GoogleLogin
              clientId={config.GOAUTH}
              render={renderProps => (
                <Button
                  variant="contained"
                  style={{
                    background: '#fff',
                    border: '#DD6D5C 2px solid',
                    color: 'white',
                    padding: '20px 30px',
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <i
                    class="fab fa-google"
                    style={{ color: '#DD6D5C' }}
                    aria-hidden="true"
                  ></i>
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={() => {
                global.dispatch({
                  type: 'ALERT',
                  payload: {
                    varient: 'error',
                    message: 'Login failed',
                  },
                });
                global.dispatch({
                  type: 'LOGOUT',
                });
              }}
              autoLoad={false}
              cookiePolicy={'single_host_origin'}
            />
          </Grid>
        </Grid>{' '}
        {state.state === 0 ? (
          <Typography
            className="link-button"
            variant="body2"
            gutterBottom
            onClick={() => {
              setState({
                ...state,
                state: 1,
              });
            }}
            style={{ marginTop: '10px', marginBottom: '20pz' }}
          >
            First time here? <br />
            Create a Class Bazaar account.
          </Typography>
        ) : null}
        {state.state === 1 ? (
          <Typography
            className="link-button"
            variant="body2"
            gutterBottom
            onClick={() => {
              setState({
                ...state,
                state: 0,
              });
            }}
            style={{ marginTop: '10px', marginBottom: '20px' }}
          >
            Already got an account? Login.
          </Typography>
        ) : null}
      </Container>
    </div>
  );
};

export default MobileAuth;
