import React, { useState } from 'react';
import { Redirect } from 'react-router';
import AppBar from './appBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Typography, Grid } from '@material-ui/core';
import ForgotPassword from './ForgotPassword';
const MobileAuth = () => {
  const [state, setState] = useState({ state: 0 });
  const [forgotPassword, setForgotPassword] = useState(false);
  if (window.innerWidth >= 760) return <Redirect to="/"></Redirect>;

  const handlePopupClose = () => {
    setForgotPassword(false);
  };
  return (
    <div className="no-desktop margin-toper">
      <ForgotPassword
        openState={forgotPassword}
        handlePopupClose={handlePopupClose}
      />
      <AppBar />
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
        <form>
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
                name="username"
                className="text-field"
                style={{ width: '250px' }}
                placeholder="Enter your User name"
                required
              />
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
            name="email"
            type="email"
            style={{ width: '250px' }}
            className="text-field"
            placeholder="Enter your Email ID"
            required
          />
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
                style={{ width: '250px' }}
                className="text-field"
                placeholder="Enter your number"
                required
              />
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
            className="text-field"
            style={{ width: '250px' }}
            placeholder="Enter your password"
            minLength={8}
          />
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
            <Button
              variant="contained"
              style={{
                background: '#fff',
                border: '#4267B3 2px solid',
                color: '#4267B3',
                padding: '20px 30px',
              }}
            >
              <i class="fab fa-facebook-f"></i>
            </Button>
          </Grid>

          <Grid item xs={6} align="left">
            <Button
              variant="contained"
              style={{
                background: '#fff',
                border: '#DD6D5C 2px solid',
                color: 'white',
                padding: '20px 30px',
              }}
            >
              <i
                class="fab fa-google"
                style={{ color: '#DD6D5C' }}
                aria-hidden="true"
              ></i>
            </Button>
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
