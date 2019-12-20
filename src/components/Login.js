import React, { useContext, useState, useEffect } from 'react';
import { register, signin } from '../actions/ContextActions';

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

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '8px',
    width: '60%',
    margin: '0',
  },
  button: {
    margin: theme.spacing(1),
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
    width: '60%',
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
        state: 0,
        open: false,
      },
    });
  };

  const handleChange = e => {
    setModal({
      ...modal,
      formData: {
        ...modal.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (loginModal.state === 0) {
      signin(modal.formData, dispatch);
    }
    if (loginModal.state === 1) {
      register(modal.formData, dispatch);
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
                <Button
                  variant="contained"
                  style={{ background: '#0077B6', color: 'white' }}
                  className={classes.button}
                >
                  <i class="fab fa-linkedin-in"></i>&nbsp; Connect Linked-In
                </Button>

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
                    onChange={handleChange}
                    name="email"
                    value={modal.formData.email}
                    type="text"
                    className="text-field"
                    placeholder="Enter your Email ID"
                  />
                  {loginModal.state === 1 ? (
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
                        className="text-field"
                        placeholder="Enter your number"
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
                    value={modal.formData.password}
                    type="password"
                    className="text-field"
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
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
                      color="primary"
                      type="submit"
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
                  <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      style={{ background: '#4267B3', color: 'white' }}
                      className={classes.social}
                    >
                      <i class="fab fa-facebook-f"></i> &nbsp; Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
                    <Button
                      variant="contained"
                      style={{ background: '#DD6D5C', color: 'white' }}
                      className={classes.social}
                    >
                      <i class="fab fa-google" aria-hidden="true"></i>
                      &nbsp;Google Plus
                    </Button>
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
                          open: false,
                        },
                      });
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    First time here? Create a Class Bazaar account.
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
